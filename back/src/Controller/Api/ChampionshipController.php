<?php

namespace App\Controller\Api;

use App\Entity\Championship;
use App\Repository\ChampionshipRepository;
use App\Repository\EventRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Date;

/**
 * @Route("/api/championships", name="app_api_championships_")
 */
class ChampionshipController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(ChampionshipRepository $championshipRepository): JsonResponse
    {
        return (empty($championshipRepository->findAll()))  ? $this->json(["message" => "Rien à afficher"], Response::HTTP_OK, [])
                                                            : $this->json($championshipRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["championships"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Championship $championship, Request $request, EventRepository $eventRepository): JsonResponse
    {
        if (!is_null($request->query->get('tracks'))) {
            if (is_null($championship)) {
                $events = $eventRepository->findBy(["championship" => null, "isCancelled" => false]);
            } else {
                $events = $championship->getEvents();
            }
            $tracks = [];
            foreach ($events as $event) {
                
                if ($event->getStart() > new DateTime('now') && !$event->isIsCancelled()) {
                    $tracks[$event->getTrack()->getId()] = $event->getTrack();
                }
                
            }

            $tracksWithoutDouble = array_unique($tracks);

            return $this->json(["championship" => $championship, "tracks" => array_values($tracksWithoutDouble)], Response::HTTP_OK, [], ["groups" => ["championshipWithoutEvents", "track", "eventWithoutTrack"]]);
        }


        return (is_null($championship)) ? $this->json(["message" => "Ce championnat n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($championship, Response::HTTP_OK, [], ["groups" => ["championship"]]);
    }
}