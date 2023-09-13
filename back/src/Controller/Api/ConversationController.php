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

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Conversation $conversation, ConversationRepository $conversationRepository): JsonResponse
    {
        if (is_null($conversation))
        {
            return $this->json(["message" => "Cet conversation n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }
        
        if($conversation->getInterestedUser() !== $this->getUser() && $conversation->getRental()->getOwnerUser() !== $this->getUser())
        {
            return $this->json(["message" => "Accès interdit à cette conversation"], Response::HTTP_UNAUTHORIZED, []);
        }

        if($conversation->getInterestedUser() === $this->getUser()) {
            $conversation->setIsReadByInterestedUser(true);
        }
        
        if($conversation->getRental()->getOwnerUser() === $this->getUser()) {
            $conversation->setIsReadByOwnerUser(true);
        }

        $conversationRepository->add($conversation, true);

        return  $this->json($conversation, Response::HTTP_OK, [], ["groups" => ["conversation_browse", "rental_browse", "user_browse", "message_read"]]);
    }

    /**
     * @Route("/location/{id}", name="add", requirements={"id"="\d+"}, methods={"POST"})
     */
    public function add(?Rental $rental, Request $request, SerializerInterface $serializerInterface, ConversationRepository $conversationRepository, MessageRepository $messageRepository): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        $conversation = $conversationRepository->findOneBy(["rental" => $rental, "interestedUser" => $user]);

        if (is_null($conversation)) {
            $conversation = new Conversation;
            $conversation->setRental($rental)
                         ->setInterestedUser($user)
                         ->setIsReadByInterestedUser(true)
                         ->setIsReadByOwnerUser(false);

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
