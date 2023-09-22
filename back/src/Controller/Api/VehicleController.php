<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Vehicle;
use App\Repository\VehicleRepository;
use App\Services\UploadImageService;
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
    public function browse(Request $request, VehicleRepository $vehicleRepository): JsonResponse
    {
        if (!is_null($request->query->get('my'))) {
            $vehicles = $vehicleRepository->findBy(["ownerUser" => $this->getUser(), "isActiv" => true],['createdAt' => 'DESC']);
            return $this->json($vehicles, Response::HTTP_OK, [], ["groups" => ["vehicles"]]);
        }

        return (empty($vehicleRepository->findAll())) ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                    : $this->json($vehicleRepository->findBy(["isActiv" => true]), Response::HTTP_OK, [], ["groups" => ["vehicles"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Vehicle $vehicle): JsonResponse
    {
        return (is_null($vehicle)) ? $this->json(["message" => "Ce véhicule n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($vehicle, Response::HTTP_OK, [], ["groups" => ["vehicle"]]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, VehicleRepository $vehicleRepository, UploadImageService $uploadImageService): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        /** @var Vehicle */
        $newVehicle = $serializerInterface->deserialize($request->getContent(), Vehicle::class, 'json');

        $newVehicle->setOwnerUser($user);
        $newVehicle->setIsActiv(true);

        $uploadImageService->upload($newVehicle);

        $vehicleRepository->add($newVehicle, true);

        return $this->json($newVehicle, Response::HTTP_CREATED, [], ["groups" => ["vehicle"]]);
    }

    /**
     * @Route("/{id}", name="edit", requirements={"id"="\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(?Vehicle $vehicle, Request $request, SerializerInterface $serializerInterface, VehicleRepository $vehicleRepository, UploadImageService $uploadImageService): JsonResponse
    {

        if (is_null($vehicle)) {
            return $this->json(["message" => "Ce véhicule n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($vehicle->getOwnerUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas modifier ce véhicule"], Response::HTTP_FORBIDDEN, []);
        }

        $serializerInterface->deserialize($request->getContent(), Vehicle::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $vehicle]);

        $uploadImageService->upload($vehicle);

        $vehicleRepository->add($vehicle, true);

        return $this->json($vehicle, Response::HTTP_OK, [], ["groups"=> ["vehicle"]]);
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

        $vehicle->setIsActiv(false);

        $vehicleRepository->add($vehicle, true);

        return $this->json(["message" => "Le véhicule a été désactivé"], Response::HTTP_OK, []);
    }
}
