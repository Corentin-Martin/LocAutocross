<?php

namespace App\Controller\Api;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Rental;
use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/messages", name="app_api_messages_")
 */
class MessageController extends AbstractController
{
    /**
     * @Route("/{id}", name="add", requirements={"id"="\d+"}, methods={"POST"})
     */
    public function add(?Rental $rental, Request $request, SerializerInterface $serializerInterface, ConversationRepository $conversationRepository, MessageRepository $messageRepository): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        $conversation = $conversationRepository->findOneBy(["rental" => $rental, "interestedUser" => $user]);

        if (is_null($conversation)) {
            $conversation = new Conversation;
            $conversation->setRental($rental)
                    ->setInterestedUser($user);

            $conversationRepository->add($conversation, true);

        }

        /** @var Message */
        $newMessage = $serializerInterface->deserialize($request->getContent(), Message::class, 'json');

        $newMessage->setConversation($conversation);
        $newMessage->setUser($user);

        $messageRepository->add($newMessage, true);

        return $this->json($newMessage, Response::HTTP_CREATED, [], ["groups" => ["message_read"]]);
    }
}
