<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\CommentRepository;
use App\Repository\ConversationRepository;
use App\Repository\EventRepository;
use App\Repository\MessageRepository;
use App\Repository\RentalRepository;
use App\Repository\UserRepository;
use App\Repository\VehicleRepository;
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

        
        if ($userRepository->findOneBy(["email" => $newUser->getEmail()])) {
            return $this->json(["message" => "Cette adresse email existe déjà"], Response::HTTP_CONFLICT, []);
        }

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

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(User $user, UserRepository $userRepository, MessageRepository $messageRepository, RentalRepository $rentalRepository, CommentRepository $commentRepository, ConversationRepository $conversationRepository, VehicleRepository $vehicleRepository, EventRepository $eventRepository): JsonResponse
    {

        if ($user !== $this->getUser()) {
            return $this->json(["message" => "Vous ne pouvez pas supprimer cet utilisateur"], Response::HTTP_FORBIDDEN);
        }

        $removedUser = $userRepository->findOneBy(["id" => 60]);

        foreach ($user->getMessages() as $message) {
            $message->setUser($removedUser);
            $messageRepository->add($message, true);
        }

        foreach ($user->getConversations() as $conversation) {
            $conversation->setInterestedUser($removedUser);
            $conversationRepository->add($conversation, true);
        }

        foreach ($user->getEvents() as $event) {
            $event->setAssociatedUser($removedUser);
            $eventRepository->add($event, true);
        }

        foreach ($user->getVehicles() as $vehicle) {
            $vehicle->setOwnerUser($removedUser);
            $vehicleRepository->add($vehicle, true);
        }

        foreach ($user->getComments() as $comment) {
            $comment->setAssociatedUser($removedUser);
            $commentRepository->add($comment, true);
        }

        foreach ($user->getReservations() as $rental) {
            $rental->setTenantUser($removedUser);
            $rental->setStatus(1);
            $rentalRepository->add($rental, true);
        }

        foreach($user->getPropositions() as $rental) {
            $rental->setOwnerUser($removedUser);
            $rental->setStatus(5);
            $rentalRepository->add($rental, true);
        }
        
        $userRepository->remove($user, true);

        return $this->json(["message" => "L'utilisateur a été supprimé"], Response::HTTP_OK);
    }
}

