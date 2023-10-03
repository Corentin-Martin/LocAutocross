<?php

namespace App\Services;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailSender
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendNotificationEmail(string $recipient, string $subject, string $message): void
    {
        $email = (new Email())
            ->from('info@pronautocross.fr')
            ->to($recipient)
            ->subject($subject)
            ->html($message);

        $this->mailer->send($email);
    }
}
