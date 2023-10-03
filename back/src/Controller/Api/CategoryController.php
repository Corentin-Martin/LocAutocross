<?php

namespace App\Controller\Api;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Services\EmailSender;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/categories", name="app_api_categories_")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(CategoryRepository $categoryRepository, EmailSender $emailSender, MailerInterface $mailerInterface): JsonResponse
    {
        return (empty($categoryRepository->findAll()))  ? $this->json('', Response::HTTP_NO_CONTENT, [])
                                                        : $this->json($categoryRepository->findAll(), Response::HTTP_OK, [], ["groups" => ["vehicle"]]);
    }

    /**
     * @Route("/{id}", name="read", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function read(?Category $category): JsonResponse
    {
        return (is_null($category)) ? $this->json(["message" => "Cette catégorie n'existe pas"], Response::HTTP_NOT_FOUND, []) 
                                    : $this->json($category, Response::HTTP_OK, [], ["groups" => ["category"]]);
    }
}
