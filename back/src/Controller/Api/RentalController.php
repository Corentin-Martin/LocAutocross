<?php

namespace App\Controller\Api;

use App\Entity\Rental;
use App\Entity\User;
use App\Repository\RentalRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/rentals", name="app_api_rentals_")
 */
class RentalController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(Request $request, RentalRepository $rentalRepository): JsonResponse
    {
        if (!is_null($request->query->get('last'))) {
            $rentals = $rentalRepository->findBy([],['createdAt' => 'DESC'],4);
            return $this->json($rentals, Response::HTTP_OK, [], ["groups" => ["rental_browse", "rental_read", "rental_found", "event_browse"]]);
        }
        return (empty($rentalRepository->findAll())) ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                    : $this->json($rentalRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["rental_browse", "rental_read", "rental_found", "event_browse"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Rental $rental): JsonResponse
    {
        return (is_null($rental)) ? $this->json(["message" => "Cette location n'existe pas"], Response::HTTP_NOT_FOUND, [])
                                        : $this->json($rental, Response::HTTP_OK, [], ["groups" => ["rental_browse", "rental_read", "rental_found", "event_browse"]]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(Request $request, SerializerInterface $serializerInterface, RentalRepository $rentalRepository): JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        /** @var Rental */
        $newRental = $serializerInterface->deserialize($request->getContent(), Rental::class, 'json');

        $newRental->setOwnerUser($user);

        $rentalRepository->add($newRental, true);

        return $this->json($newRental, Response::HTTP_CREATED, [], ["groups" => ["rental_browse", "rental_read", "championship_browse", "category_championship_browse", "track_browse", "user_browse", "vehicle_browse", "vehicle_read", "rental_found"]]);
    }

    /**
     * @Route("/{id}", name="edit", requirements={"id"="\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(?Rental $rental, Request $request, SerializerInterface $serializerInterface, RentalRepository $rentalRepository): JsonResponse
    {

        if (is_null($rental)) {
            return $this->json(["message" => "Cette location n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($rental->getOwnerUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas modifier cette location"], Response::HTTP_FORBIDDEN, []);
        }

        $serializerInterface->deserialize($request->getContent(), Rental::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $rental]);

        $rentalRepository->add($rental, true);

        return $this->json($rental, Response::HTTP_OK, [], ["groups"=> ["rental_browse", "rental_read", "event_read", "event_browse", "championship_browse", "category_championship_browse", "track_browse", "user_browse", "vehicle_browse", "vehicle_read", "rental_found"]]);
    }

    /**
     * @Route("/{id}", name="delete", requirements={"id"="\d+"}, methods={"DELETE"})
     */
    public function delete(?Rental $rental, RentalRepository $rentalRepository): JsonResponse
    {
        if (is_null($rental)) {
            return $this->json(["message" => "Cette location n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if ($rental->getOwnerUser() !== $this->getUser()) {
            return $this->json(["message" => "L'utilisateur ne peut pas supprimer cette location"], Response::HTTP_FORBIDDEN, []);
        }

        $rentalRepository->remove($rental, true);

        return $this->json(["message" => "La location a été supprimé"], Response::HTTP_OK, []);
    }

    /**
     * @Route("/book/{id}", requirements={"id"="\d+"}, methods={"PUT", "PATCH"})
     */
    public function book(?Rental $rental, Request $request, SerializerInterface $serializerInterface, RentalRepository $rentalRepository) : JsonResponse
    {

        /** @var User */
        $user = $this->getUser();

        if (is_null($rental)) {
            return $this->json(["message" => "Cette location n'existe pas"], Response::HTTP_NOT_FOUND, []);
        }

        if (!is_null($rental->getTenantUser()) && ($rental->getTenantUser() !== $user)) {
            return $this->json(["message" => "L'utilisateur ne peut pas modifier cette location"], Response::HTTP_FORBIDDEN, []);
        }

        $serializerInterface->deserialize($request->getContent(), Rental::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $rental]);

        $requestInArray = json_decode($request->getContent(), true);

        if ((sizeOf($requestInArray) > 1) || (!array_key_exists("status", $requestInArray)))
        {
            return $this->json(["message" => "L'utilisateur ne peut pas modifier ces informations"], Response::HTTP_FORBIDDEN, []);
        }

        $rental->setTenantUser($user);

        $rentalRepository->add($rental, true);

        return $this->json($rental, Response::HTTP_OK, [], ["groups"=> ["rental_browse", "rental_read", "event_read", "event_browse", "championship_browse", "category_championship_browse", "track_browse", "user_browse", "vehicle_browse", "vehicle_read", "rental_found"]]);
    }
}
