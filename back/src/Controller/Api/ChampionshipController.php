<?php

namespace App\Controller\Api;

use App\Entity\Championship;
use App\Repository\ChampionshipRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public function read(?Championship $championship): JsonResponse
    {
        return (is_null($championship)) ? $this->json(["message" => "Ce championnat n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($championship, Response::HTTP_OK, [], ["groups" => ["championship"]]);
    }
}