<?php

namespace App\Controller\Api;

use App\Entity\Championship;
use App\Repository\ChampionshipRepository;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
        return (empty($championshipRepository->findAll()))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                            : $this->json($championshipRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["championships"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Championship $championship, Request $request, EventRepository $eventRepository): JsonResponse
    {
        if (!is_null($request->query->get('tracks'))) {
            if (is_null($championship)) {
                $events = $eventRepository->findBy(["championship" => null]);
            } else {
                $events = $championship->getEvents();
            }
            $tracks = [];
            foreach ($events as $event) {
                $track = $event->getTrack();

                if (array_key_exists($track->getId(), $tracks)) {
                    array_push($tracks[$track->getId()]['events'], $event);
                } else {

                    $tracks[$track->getId()] =  [
                        'track' => $track,
                        'events' => [$event]
                    ];
                }
            }

            return $this->json(["championship" => $championship, "tracks" => array_values($tracks)], Response::HTTP_OK, [], ["groups" => ["championshipWithoutEvents", "track", "eventWithoutTrack"]]);
        }


        return (is_null($championship)) ? $this->json(["message" => "Ce championnat n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($championship, Response::HTTP_OK, [], ["groups" => ["championship"]]);
    }
}