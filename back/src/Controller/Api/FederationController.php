<?php

namespace App\Controller\Api;

use App\Entity\Federation;
use App\Repository\FederationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/federations", name="app_api_federations_")
 */
class FederationController extends AbstractController
{

    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(FederationRepository $federationRepository): JsonResponse
    {
        return (empty($federationRepository->findAll()))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                            : $this->json($federationRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["federation_browse"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Federation $federation): JsonResponse
    {
        return (is_null($federation)) ? $this->json(["message" => "Ce championnat n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($federation, Response::HTTP_OK, [], ["groups" => ["federation_browse", "federation_read"]]);
    }
}
