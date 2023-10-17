<?php

namespace App\Services;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
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

    public function sendWelcomeEmail($user): void
    {

        $htmlContent = $this->twig->render('email/welcome.html.twig', [
            'user' => $user,
        ]);

        $email = (new Email())
            ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
            ->to($user->getEmail())
            ->subject('Bienvenue - Inscription validée')
            ->html($htmlContent);

        $this->mailer->send($email);
    }

    public function sendBookUpdate($rental): void
    {

        $htmlContent = $this->twig->render('email/book-update.html.twig', [
            'rental' => $rental,
        ]);

        $email = (new Email())
            ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
            ->to($rental->getOwnerUser()->getEmail())
            ->subject('Du nouveau pour votre location à ' . $rental->getEvent()->getTrack()->getCity())
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
            ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
            ->to($exTenant->getEmail())
            ->subject('Du nouveau pour la location à ' . $rental->getEvent()->getTrack()->getCity())
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
            ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
            ->to($to)
            ->subject('Nouvelle conversation - Location à ' . $rental->getEvent()->getTrack()->getCity())
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
                ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
                ->to($personne[1])
                ->subject('Réservation validée pour ' . $rental->getEvent()->getTrack()->getCity())
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
                    ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
                    ->to($personne[1]->getEmail())
                    ->subject('Attention, évènement annulé')
                    ->html($htmlContent);
        
                $this->mailer->send($email);
            }
        }
    }

    public function sendReminderToComment($rental): void
    {
        $htmlContent = $this->twig->render('email/reminder-comment.html.twig', [
            'rental' => $rental,
        ]);

        $email = (new Email())
            ->from(new Address('info@pronautocross.fr', "Loc'Autocross"))
            ->to($rental->getTenantUser()->getEmail())
            ->subject("Qu'avez-vous pensé de votre location à " . $rental->getEvent()->getTrack()->getCity() . " ?")
            ->html($htmlContent);

        $this->mailer->send($email);
    }


}
