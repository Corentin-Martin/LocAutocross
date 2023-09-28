<?php

namespace App\Controller\Api;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Rental;
use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Repository\RentalRepository;
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
    public function browse(Request $request, ConversationRepository $conversationRepository, RentalRepository $rentalRepository): JsonResponse
    {

        if (!is_null($request->query->get('rental'))) {
            $rental = $rentalRepository->findBy(['id' => $request->query->get('rental')]);
            $conversations = $conversationRepository->findBy(['rental' => $rental]);
            return (empty($conversations))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                            : $this->json($conversations, Response::HTTP_OK, [], ["groups" => ["conversation"]]);
        }

        $conversationsWhereUserAsksAndDoesNotRead = $conversationRepository->findBy(['interestedUser' => $this->getUser(), 'isReadByInterestedUser' => false]);
        $conversationsWhereUserAsksAndRead = $conversationRepository->findBy(['interestedUser' => $this->getUser(), 'isReadByInterestedUser' => true]);

        $conversationsWhereUserIsOwnerAndDoesNotRead = $conversationRepository->findByOwnerUser($this->getUser(), false);
        $conversationsWhereUserIsOwnerAndRead = $conversationRepository->findByOwnerUser($this->getUser(), true);

        $conversations = [];

        $unread =  array_merge($conversationsWhereUserAsksAndDoesNotRead, $conversationsWhereUserIsOwnerAndDoesNotRead);
        $conversations['unread'] = array_unique($unread);

        $read = array_merge($conversationsWhereUserAsksAndRead, $conversationsWhereUserIsOwnerAndRead);
        $conversations['read'] = array_unique($read);

        return (empty($conversations))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                        : $this->json($conversations, Response::HTTP_OK, [], ["groups" => ["conversation"]]);
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

        return  $this->json($conversation, Response::HTTP_OK, [], ["groups" => ["conversation"]]);
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

        return $this->json($newMessage, Response::HTTP_CREATED, [], ["groups" => ["message"]]);
    }

}
