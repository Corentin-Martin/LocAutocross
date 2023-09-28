<?php

namespace App\Controller\Api;

use App\Entity\Track;
use App\Repository\TrackRepository;
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
    public function browse(TrackRepository $trackRepository): JsonResponse
    {
        return (empty($trackRepository->findAll()))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                            : $this->json($trackRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["tracks"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Track $track): JsonResponse
    {
        return (is_null($track)) ? $this->json(["message" => "Ce championnat n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($track, Response::HTTP_OK, [], ["groups" => ["track"]]);
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
