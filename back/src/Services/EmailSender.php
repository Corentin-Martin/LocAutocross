<?php

namespace App\Services;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class EmailSender
{
    private $mailer;
    private $twig;

    public function __construct(MailerInterface $mailer, Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function sendNotificationEmail($user, $subject): void
    {

        $htmlContent = $this->twig->render('email/welcome.html.twig', [
            'subject' => $subject,
            'pseudo' => $user->getPseudo(),
        ]);

        $email = (new Email())
            ->from('info@pronautocross.fr')
            ->to($user->getEmail())
            ->subject($subject)
            ->html($htmlContent);

        $this->mailer->send($email);
    }

    public function sendBookUpdate($rental): void
    {

        $htmlContent = $this->twig->render('email/book-update.html.twig', [
            'rental' => $rental,
        ]);

        $email = (new Email())
            ->from('info@pronautocross.fr')
            ->to($rental->getOwnerUser()->getEmail())
            ->subject('Du nouveau pour votre location')
            ->html($htmlContent);

        $this->mailer->send($email);
    }
}
