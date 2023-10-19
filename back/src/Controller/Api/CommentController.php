<?php

namespace App\Controller\Api;

use App\Entity\Comment;
use App\Entity\Rental;
use App\Entity\User;
use App\Repository\CommentRepository;
use App\Services\EmailSender;
use App\Services\UpdateRatingService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/comments", name="app_api_comments_")
 */
class CommentController extends AbstractController
{
    /**
     * @Route("/{id}", name="add", methods={"POST"})
     */
    public function add(?Rental $rental, Request $request, CommentRepository $commentRepository, SerializerInterface $serializerInterface, EmailSender $emailSender, UpdateRatingService $updateRatingService): JsonResponse
    {
        /** @var User */
        $user = $this->getUser();

        if (is_null($rental)) {
            return $this->json(["message" => "Cette location n'existe pas"], Response::HTTP_NOT_FOUND);
        }

        if(!is_null($rental->getComment())) {
            return $this->json(["message" => "Un commentaire a déjà été laissé pour cette location"], Response::HTTP_FORBIDDEN);
        }

        if ($rental->getTenantUser() !== $user) {
            return $this->json(["message" => "Vous ne pouvez pas laisser de commentaire pour cette location"], Response::HTTP_FORBIDDEN);
        }

        /** @var Comment */
        $newComment = $serializerInterface->deserialize($request->getContent(), Comment::class, 'json');

        $newComment->setAssociatedUser($user);
        $newComment->setRental($rental);

        $emailSender->sendNewComment($rental, $newComment);

        $commentRepository->add($newComment, true);

        $updateRatingService->update($rental);

        return $this->json($newComment, Response::HTTP_CREATED, [], ["groups" => ["comment"]]);

    }
}
