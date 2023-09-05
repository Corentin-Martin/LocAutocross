<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Vehicle;
use App\Repository\VehicleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/vehicles", name="app_api_vehicles_")
 */
class VehicleController extends AbstractController
{

    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(VehicleRepository $vehicleRepository): JsonResponse
    {
        return (empty($vehicleRepository->findAll())) ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                    : $this->json($vehicleRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["vehicle_browse", "brand_browse", "category_browse", "category_championship_browse"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Vehicle $vehicle): JsonResponse
    {
        return (is_null($vehicle)) ? $this->json(["message" => "Cet évenement n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($vehicle, Response::HTTP_OK, [], ["groups" => ["vehicle_browse", "vehicle_read", "brand_browse", "category_browse", "category_championship_browse"]]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, VehicleRepository $vehicleRepository): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        /** @var Vehicle */
        $newVehicle = $serializerInterface->deserialize($request->getContent(), Vehicle::class, 'json');

        $newVehicle->setOwnerUser($user);

        $vehicleRepository->add($newVehicle, true);

        return $this->json($newVehicle, Response::HTTP_CREATED, [], ["groups" => ["vehicle_browse", "vehicle_read", "brand_browse", "category_browse", "category_championship_browse"]]);
    }

    /**
     * @Route("/{id}", name="edit", requirements={"id"="\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(?Vehicle $vehicle, Request $request, SerializerInterface $serializerInterface, VehicleRepository $vehicleRepository): JsonResponse
    {

        if (is_null($vehicle)) {
            return $this->json(["message" => "Ce véhicule n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($vehicle->getOwnerUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas modifier ce véhicule"], Response::HTTP_FORBIDDEN, []);
        }

        $serializerInterface->deserialize($request->getContent(), Vehicle::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $vehicle]);

        $vehicleRepository->add($vehicle, true);

        return $this->json($vehicle, Response::HTTP_OK, [], ["groups"=> ["vehicle_browse", "vehicle_read", "brand_browse", "category_browse", "category_championship_browse"]]);
    }

    /**
     * @Route("/{id}", name="delete", requirements={"id"="\d+"}, methods={"DELETE"})
     */
    public function delete(?Vehicle $vehicle, VehicleRepository $vehicleRepository): JsonResponse
    {
        if (is_null($vehicle)) {
            return $this->json(["message" => "Ce véhicule n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($vehicle->getOwnerUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas supprimer ce véhicule"], Response::HTTP_FORBIDDEN, []);
        }

        $vehicleRepository->remove($vehicle, true);

        return $this->json(["message" => "Le véhicule a été supprimé"], Response::HTTP_OK, []);
    }
}
