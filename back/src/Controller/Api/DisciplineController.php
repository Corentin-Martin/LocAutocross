<?php

namespace App\Controller\Api;

use App\Entity\Discipline;
use App\Repository\DisciplineRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/disciplines", name="app_api_disciplines_")
 */
class DisciplineController extends AbstractController
{

    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(DisciplineRepository $disciplineRepository): JsonResponse
    {
        return (empty($disciplineRepository->findAll()))  ? $this->json(["message" => "Rien à afficher"], Response::HTTP_OK, [])
                                                        : $this->json($disciplineRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["disciplines"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Discipline $discipline): JsonResponse
    {
        return (is_null($discipline)) ? $this->json(["message" => "Cette discipline n'existe pas"], Response::HTTP_NOT_FOUND, []) 
                                    : $this->json($discipline, Response::HTTP_OK, [], ["groups" => ["disciplines"]]);
    }
}
