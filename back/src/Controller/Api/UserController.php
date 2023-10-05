<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Services\EmailSender;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/user", name="app_api_user_")
 */
class UserController extends AbstractController
{

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasherInterface, JWTTokenManagerInterface $JWTTokenManagerInterface, EmailSender $emailSender): JsonResponse
    {

        /** @var User */
        $newUser = $serializerInterface->deserialize($request->getContent(), User::class, 'json');

        $newUser->setPassword($userPasswordHasherInterface->hashPassword($newUser, $newUser->getPassword()));

        $userRepository->add($newUser, true);

        $token = $JWTTokenManagerInterface->create($newUser);

        $emailSender->sendNotificationEmail($newUser, 'Bienvenue !');

        return $this->json(["user" => $newUser, "token" => $token], Response::HTTP_CREATED, [], ["groups" => ["user"]]);
    }

    /**
     * @Route("", name="read", methods={"GET"})
     */
    public function read(): JsonResponse
    {
        $user = $this->getUser();

        return $this->json($user, Response::HTTP_OK, [], ["groups" => ["user"]]);
    }

    /**
     * @Route("", name="edit", methods={"PUT", "PATCH"})
     */
    public function edit(Request $request, SerializerInterface $serializerInterface, UserPasswordHasherInterface $userPasswordHasherInterface, UserRepository $userRepository): JsonResponse
    {
        /** @var User */
        $user = $serializerInterface->deserialize($request->getContent(), User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $this->getUser()]);

        $user->setPassword($userPasswordHasherInterface->hashPassword($user, $user->getPassword()));

        $userRepository->add($user, true);

        return $this->json($user, Response::HTTP_OK, [], ["groups" => ["user"]]);
    }
}

