<?php

namespace App\Controller\Api;

use App\Entity\Track;
use App\Repository\ChampionshipRepository;
use App\Repository\TrackRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/tracks", name="app_api_tracks_")
 */
class TrackController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(Request $request, TrackRepository $trackRepository, ChampionshipRepository $championshipRepository): JsonResponse
    {

        // if (!is_null($request->query->get('championship'))) {
        //     $championship = $championshipRepository->findOneBy(["id" => $request->query->get('championship')]);
        //     $tracks = $trackRepository->findTracksInAChampionship($championship);

        //     return $this->json($tracks, Response::HTTP_OK, [], ["groups" => ["test"]]);
        // }

        return (empty($trackRepository->findAll()))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                            : $this->json($trackRepository->findBy([], ["city" => "ASC"]), Response::HTTP_OK, [], ["groups" => ["tracks"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Track $track): JsonResponse
    {
        if (is_null($track)) {
            return $this->json(["message" => "Ce circuit n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }
    
        $nonCancelledEvents = [];
        foreach ($track->getEvents() as $event) {
            if (!$event->isIsCancelled()) {
                $nonCancelledEvents[] = $event;
            }
        }
    
        $track->setEvents(new ArrayCollection($nonCancelledEvents));
    
        return $this->json($track, Response::HTTP_OK, [], ["groups" => ["track"]]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, TrackRepository $trackRepository): JsonResponse
    {
        /** @var Track */
        $newTrack = $serializerInterface->deserialize($request->getContent(), Track::class, 'json');

        $trackRepository->add($newTrack, true);

        return $this->json($newTrack, Response::HTTP_CREATED, [], ["groups" => ["track"]]);
    }
}
