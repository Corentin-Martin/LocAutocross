<?php

namespace App\Controller\Api;

use App\Entity\Brand;
use App\Repository\BrandRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/brands", name="app_api_brands_")
 */
class BrandController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(Request $request, BrandRepository $brandRepository): JsonResponse
    {
        if (!is_null($request->query->get('name'))) {
            $brand = $brandRepository->findOneBy(['name' => $request->query->get('name')]);

            return (is_null($brand))    ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                        : $this->json($brand, Response::HTTP_OK, [], ["groups" => ["brand"]]);
        }
        return (empty($brandRepository->findAll())) ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                    : $this->json($brandRepository->findBy([], ["name" => 'ASC']), Response::HTTP_OK, [], ["groups" => ["brands"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Brand $brand): JsonResponse
    {
        return (is_null($brand))    ? $this->json(["message" => "Cette marque n'existe pas"], Response::HTTP_NOT_FOUND, []) 
                                    : $this->json($brand, Response::HTTP_OK, [], ["groups" => ["brand"]]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, BrandRepository $brandRepository): JsonResponse
    {
        $newBrand = $serializerInterface->deserialize($request->getContent(), Brand::class, 'json');

        $brandRepository->add($newBrand, true);

        return $this->json($newBrand, Response::HTTP_CREATED, ["groups" => ["brand"]]);
    }
}
