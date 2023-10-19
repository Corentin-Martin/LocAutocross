<?php

namespace App\Command;

use App\Repository\EventRepository;
use App\Repository\MovieRepository;
use App\Services\EmailSender;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class CommentEmailCommand extends Command
{
    protected static $defaultName = 'mail:comment';
    protected static $defaultDescription = 'Envoi des mails pour inviter à commenter et noter';

    private $eventRepository;
    private $emailSender;

    public function __construct(EventRepository $eventRepository, EmailSender $emailSender)
    {
        parent::__construct();
        $this->eventRepository = $eventRepository;
        $this->emailSender = $emailSender;
    }

    protected function configure(): void
    {
    
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $events = $this->eventRepository->createQueryBuilder('e')
                                        ->select('e')
                                        ->where('e.end BETWEEN :now AND :end')
                                        ->setParameters(array(
                                        'now' => new DateTime('-1 days'),
                                        'end' => new DateTime('now'),
                                        ))
                                        ->getQuery()
                                        ->getResult();


        if (count($events) > 0) {

            foreach ($events as $event) {
                $rentals = $event->getRentals();

                if(count($rentals) > 0) {

                    foreach ($rentals as $rental) {
                        if ($rental->getStatus() == '4') {
                            $this->emailSender->sendReminderToComment($rental);
                            $io->success("Email envoyé à " . $rental->getTenantUser()->getEmail());
                        } else {
                            $io->success("Pas de mail à envoyer pour cette location");
                        }
                    }
                } else {
                    $io->success("Aucun mail à envoyer pour " . $event->getTrack()->getCity());
                }
    
            }
        } else {
            $io->success("Aucun évènement terminé aujourd'hui, rien à envoyer");
        }


        return Command::SUCCESS;
    }
}