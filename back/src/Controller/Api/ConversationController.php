<?php

namespace App\Controller\Api;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Rental;
use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Repository\RentalRepository;
use App\Services\EmailSender;
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
    public function browse(Request $request, ConversationRepository $conversationRepository, ?RentalRepository $rentalRepository): JsonResponse
    {

        if (!is_null($request->query->get('rental'))) {
            $rental = $rentalRepository->findBy(['id' => $request->query->get('rental')]);
            $conversations = $conversationRepository->findBy(['rental' => $rental]);


            if (!empty($conversations)) {
                
                foreach ($conversations as $conv) {
                    $messages = $conv->getMessages()->getValues();
        
                    $lastMessage = end($messages);
                    
                    $conversationsWithLastMessage[] = [
                        'conversation' => $conv,
                        'lastMessage' => $lastMessage,
                    ];
                }
                
                usort($conversationsWithLastMessage, function ($a, $b) {
                    $lastMessageA = $a['lastMessage'];
                    $lastMessageB = $b['lastMessage'];
        
                    return $lastMessageB->getCreatedAt() <=> $lastMessageA->getCreatedAt();
                    
                });
        
                $conversationsOk = [];
                foreach ($conversationsWithLastMessage as $ok) {
                    $conversationsOk[] = $ok['conversation'];
                }

            } else {
                $conversationsOk = [];
            }


            return (empty($conversationsOk))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                            : $this->json($conversationsOk, Response::HTTP_OK, [], ["groups" => ["conversation"]]);
        }

        $conversationsWhereUserAsksAndDoesNotRead = $conversationRepository->findBy(['interestedUser' => $this->getUser(), 'isReadByInterestedUser' => false]);
        $conversationsWhereUserAsksAndRead = $conversationRepository->findBy(['interestedUser' => $this->getUser(), 'isReadByInterestedUser' => true]);

        $conversationsWhereUserIsOwnerAndDoesNotRead = $conversationRepository->findByOwnerUser($this->getUser(), false);
        $conversationsWhereUserIsOwnerAndRead = $conversationRepository->findByOwnerUser($this->getUser(), true);

        $unread = array_merge($conversationsWhereUserAsksAndDoesNotRead, $conversationsWhereUserIsOwnerAndDoesNotRead);

        $unreadedConversationsWithLastMessage = [];

        foreach ($unread as $conv) {
            $messages = $conv->getMessages()->getValues();

            $lastMessage = end($messages);
            
            $unreadedConversationsWithLastMessage[] = [
                'conversation' => $conv,
                'lastMessage' => $lastMessage,
            ];
        }
        
        usort($unreadedConversationsWithLastMessage, function ($a, $b) {
            $lastMessageA = $a['lastMessage'];
            $lastMessageB = $b['lastMessage'];

            return $lastMessageB->getCreatedAt() <=> $lastMessageA->getCreatedAt();
            
        });

        $unreadOk = [];
        foreach ($unreadedConversationsWithLastMessage as $ok) {
            $unreadOk[] = $ok['conversation'];
        }
        
        $read = array_merge($conversationsWhereUserAsksAndRead, $conversationsWhereUserIsOwnerAndRead);

        $readedConversationsWithLastMessage = [];

        foreach ($read as $conv) {
            $messages = $conv->getMessages()->getValues();

            $lastMessage = end($messages);
            
            $readedConversationsWithLastMessage[] = [
                'conversation' => $conv,
                'lastMessage' => $lastMessage,
            ];
        }

        usort($readedConversationsWithLastMessage, function ($a, $b) {
            $lastMessageA = $a['lastMessage'];
            $lastMessageB = $b['lastMessage'];
            
            return $lastMessageB->getCreatedAt() <=> $lastMessageA->getCreatedAt();
        });

        $readOk = [];
        foreach ($readedConversationsWithLastMessage as $ok) {
            $readOk[] = $ok['conversation'];
        }

        $conversations = ['unread' => array_unique($unreadOk), 'read' => array_unique($readOk)];


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
    public function add(?Rental $rental, Request $request, SerializerInterface $serializerInterface, ConversationRepository $conversationRepository, MessageRepository $messageRepository, EmailSender $emailSender): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        $conversation = $conversationRepository->findOneBy(["rental" => $rental, "interestedUser" => $user]);

        if (is_null($conversation)) {
            $conversation = new Conversation;

            if ($user === $rental->getOwnerUser()) {
                $conversation->setRental($rental)
                             ->setInterestedUser($rental->getTenantUser())
                             ->setIsReadByInterestedUser(false)
                             ->setIsReadByOwnerUser(true);

                $emailSender->sendNotifNewConv($user, $rental, true);
            } else {
                $conversation->setRental($rental)
                             ->setInterestedUser($user)
                             ->setIsReadByInterestedUser(true)
                             ->setIsReadByOwnerUser(false);

                $emailSender->sendNotifNewConv($user, $rental);
            }

            $conversationRepository->add($conversation, true);

        }

        /** @var Message */
        $newMessage = $serializerInterface->deserialize($request->getContent(), Message::class, 'json');

        $newMessage->setConversation($conversation);
        $newMessage->setUser($user);

        $messageRepository->add($newMessage, true);

        $toSend = ["conversation" => $conversation, "message" => $newMessage];

        return $this->json($toSend, Response::HTTP_CREATED, [], ["groups" => ["message", "conversation"]]);
    }

    /**
     * @Route("/location/{id}", name="browseOne", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function browseOne(?Rental $rental, ConversationRepository $conversationRepository): JsonResponse
    {
        if (is_null($rental))
        {
            return $this->json(["message" => "Cette location n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }
        $conversation = $conversationRepository->findOneBy(["rental" => $rental, "interestedUser" => $this->getUser()]);

        return is_null($conversation)   ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                        : $this->json($conversation, Response::HTTP_OK, [], ["groups" => ["conversation"]]);

    }

}
