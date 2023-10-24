<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Form\ChangePasswordFormType;
use App\Form\ResetPasswordRequestFormType;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

/**
 * @Route("/api/reset-password", name="app_api_reset-password_"))
 */
class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    private ResetPasswordHelperInterface $resetPasswordHelper;
    private EntityManagerInterface $entityManager;

    public function __construct(ResetPasswordHelperInterface $resetPasswordHelper, EntityManagerInterface $entityManager)
    {
        $this->resetPasswordHelper = $resetPasswordHelper;
        $this->entityManager = $entityManager;
    }

    /**
     * Display & process form to request a password reset.
     *
     * @Route("", name="request", methods={"POST"})
     */
    public function request(Request $request, MailerInterface $mailer, TranslatorInterface $translator): Response
    {

        $data = json_decode($request->getContent(), true);

        return $this->processSendingPasswordResetEmail(
                $data["email"],
                $mailer,
                $translator
            );
        
    }

    /**
     * Confirmation page after a user has requested a password reset.
     *
     * @Route("/check-email", name="check_email")
     */
    public function checkEmail(): JsonResponse
    {
        // Generate a fake token if the user does not exist or someone hit this page directly.
        // This prevents exposing whether or not a user was found with the given email address or not
        if (null === ($resetToken = $this->getTokenObjectFromSession())) {
            $resetToken = $this->resetPasswordHelper->generateFakeResetToken();
        }

        return $this->json('', Response::HTTP_OK, [], []);
    }

    /**
     * Validates and process the reset URL that the user clicked in their email.
     *
     * @Route("/reset", name="reset_password", methods={"POST"})
     */
    public function reset(Request $request, UserPasswordHasherInterface $userPasswordHasher, TranslatorInterface $translator, JWTTokenManagerInterface $JWTTokenManagerInterface): JsonResponse
    {

        $data = json_decode($request->getContent(), true);

        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($data['token']);
        } catch (ResetPasswordExceptionInterface $e) {

            return $this->json(["message" => "Erreur, impossible d'identifier l'utilisateur"], Response::HTTP_CONFLICT, [], []);
        }

        
            $this->resetPasswordHelper->removeResetRequest($data['token']);

            // Encode(hash) the plain password, and set it.
            $encodedPassword = $userPasswordHasher->hashPassword(
                $user,
                $data["password"]
            );

            $user->setPassword($encodedPassword);
            $this->entityManager->flush();

            // The session is cleaned up after the password has been changed.
            $this->cleanSessionAfterReset();

            $token = $JWTTokenManagerInterface->create($user);

        return $this->json(["user" => $user, "token" => $token], Response::HTTP_OK, [], ["groups" => ["user"]]);
   
    }

    private function processSendingPasswordResetEmail(string $email, MailerInterface $mailer, TranslatorInterface $translator): JsonResponse
    {

        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $email]); 


        if (!$user) {
            return $this->json('', Response::HTTP_OK, [], []);
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);

        } catch (ResetPasswordExceptionInterface $e) {
            return $this->json('', Response::HTTP_OK, [], []);
        }

        $email = (new TemplatedEmail())
            ->from(new Address('info@locautocross.fr', "Loc'Autocross - Mot de passe"))
            ->to($user->getEmail())
            ->subject('Votre demande de réinitialisation de mot de passe')
            ->htmlTemplate('reset_password/emailOK.html.twig')
            ->context([
                'resetToken' => $resetToken,
                'user' => $user
            ])
        ;

        $mailer->send($email);

        // Store the token object in session for retrieval in check-email route.
        $this->setTokenObjectInSession($resetToken);

        return $this->json('', Response::HTTP_OK, [], []);
    }
}
