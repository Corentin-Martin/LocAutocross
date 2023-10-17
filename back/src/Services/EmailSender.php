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

    public function sendNotAcceptedMail($rental, $exTenant): void
    {

        $htmlContent = $this->twig->render('email/not-accepted.html.twig', [
            'rental' => $rental,
            'exTenant' => $exTenant,
        ]);

        $email = (new Email())
            ->from('info@pronautocross.fr')
            ->to($exTenant->getEmail())
            ->subject('Concernant votre demande de réservation')
            ->html($htmlContent);

        $this->mailer->send($email);
    }

    public function sendNotifNewConv($user, $rental, $byOwner = false): void
    {
        $template = ($byOwner) ? 'email/new-conv-by-owner.html.twig' : 'email/new-conv.html.twig';

        $htmlContent = $this->twig->render($template, [
            'user' => $user,
            'rental' => $rental,
        ]);

        $to = ($byOwner) ? $rental->getTenantUser()->getEmail() : $rental->getOwnerUser()->getEmail();

        $email = (new Email())
            ->from('info@pronautocross.fr')
            ->to($to)
            ->subject('Une nouvelle conversation')
            ->html($htmlContent);

        $this->mailer->send($email);
    }

    public function sendReservationMail($rental): void
    {
        $toSend = [
            'owner' => ['email/reservation-owner.html.twig', $rental->getOwnerUser()->getEmail()],
            'tenant'=> ['email/reservation-tenant.html.twig', $rental->getTenantUser()->getEmail()],
        ];

        foreach ($toSend as $personne) {
            $htmlContent = $this->twig->render($personne[0], [
                'rental' => $rental,
            ]);
    
            $email = (new Email())
                ->from('info@pronautocross.fr')
                ->to($personne[1])
                ->subject('Réservation validée')
                ->html($htmlContent);
    
            $this->mailer->send($email);
        }

        
    }

    public function sendAlertEventCancelled($event, $rental): void
    {
        $toSend = [
            'owner' => ['email/alert-cancelled-owner.html.twig', $rental->getOwnerUser()],
            'tenant'=> ['email/alert-cancelled-tenant.html.twig', $rental->getTenantUser()],
        ];

        foreach ($toSend as $personne) {

            if (!is_null($personne[1])) {

                $htmlContent = $this->twig->render($personne[0], [
                    'rental' => $rental,
                    'event' => $event
                ]);
        
                $email = (new Email())
                    ->from('info@pronautocross.fr')
                    ->to($personne[1]->getEmail())
                    ->subject('Evenement annulé')
                    ->html($htmlContent);
        
                $this->mailer->send($email);
            }
        }

        
    }
}
