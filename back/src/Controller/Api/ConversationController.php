<?php

namespace App\Controller\Api;

use App\Repository\ConversationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/conversations", name="app_api_conversations_")
 */
class ConversationController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(ConversationRepository $conversationRepository): JsonResponse
    {

        $conversationsWhereUserAsks = $conversationRepository->findBy(['interestedUser' => $this->getUser()]);

        $conversationsWhereUserIsOwner = $conversationRepository->findByOwnerUser($this->getUser());

        $conversations = array_merge($conversationsWhereUserAsks, $conversationsWhereUserIsOwner);
        $conversationsWithoutDouble = array_unique($conversations);

        return (empty($conversationsWithoutDouble))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                        : $this->json($conversationsWithoutDouble, Response::HTTP_OK, [], ["groups" => ["conversation_browse", "rental_browse", "user_browse", "message_read"]]);
    }

}
