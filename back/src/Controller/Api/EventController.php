<?php

namespace App\Controller\Api;

use App\Entity\Event;
use App\Entity\User;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/events", name="app_api_events_")
 */
class EventController extends AbstractController
{

    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(EventRepository $eventRepository): JsonResponse
    {
        return (empty($eventRepository->findAll())) ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                    : $this->json($eventRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["event_browse", "championship_browse", "category_championship_browse", "track_browse"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Event $event): JsonResponse
    {
        return (is_null($event)) ? $this->json(["message" => "Cet évenement n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($event, Response::HTTP_OK, [], ["groups" => ["event_browse", "event_read", "championship_browse", "category_championship_browse", "track_browse", "track_read", "event_find", "vehicle_browse", "vehicle_read", "rental_found"]]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, EventRepository $eventRepository): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        /** @var Event */
        $newEvent = $serializerInterface->deserialize($request->getContent(), Event::class, 'json');

        $newEvent->setAssociatedUser($user);

        $eventRepository->add($newEvent, true);

        return $this->json($newEvent, Response::HTTP_CREATED, [], ["groups" => ["event_browse", "event_read", "championship_browse", "category_championship_browse", "track_browse", "track_read"]]);
    }

    /**
     * @Route("/{id}", name="edit", requirements={"id"="\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(?Event $event, Request $request, SerializerInterface $serializerInterface, EventRepository $eventRepository): JsonResponse
    {

        if (is_null($event)) {
            return $this->json(["message" => "Cet évenement n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($event->getAssociatedUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas modifier cet evenement"], Response::HTTP_FORBIDDEN, []);
        }

        $serializerInterface->deserialize($request->getContent(), Event::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $event]);

        $eventRepository->add($event, true);

        return $this->json($event, Response::HTTP_OK, [], ["groups"=> ["event_browse", "event_read", "championship_browse", "category_championship_browse", "track_browse", "track_read"]]);
    }

    /**
     * @Route("/{id}", name="delete", requirements={"id"="\d+"}, methods={"DELETE"})
     */
    public function delete(?Event $event, EventRepository $eventRepository): JsonResponse
    {
        if (is_null($event)) {
            return $this->json(["message" => "Cet évenement n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($event->getAssociatedUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas supprimer cet evenement"], Response::HTTP_FORBIDDEN, []);
        }

        $eventRepository->remove($event, true);

        return $this->json(["message" => "L'évènement a été supprimé"], Response::HTTP_OK, []);
    }
}
