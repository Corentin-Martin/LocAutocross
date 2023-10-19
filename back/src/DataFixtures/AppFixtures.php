<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\Championship;
use App\Entity\Discipline;
use App\Entity\Event;
use App\Entity\Federation;
use App\Entity\Rental;
use App\Entity\Track;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\Vehicle;
use DateTime;
use Symfony\Component\Validator\Constraints\Date;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user   ->setPassword("$2y$13\$CvRuNAKG5a8HTTgbsJsX4.QnTeQNswwEgxKxmw.CSX4JVCq99k.72")
                ->setPseudo("Admin")
                ->setFirstname('Corentin')
                ->setLastname("Martin")
                ->setEmail("corentin.mrtn@yahoo.com")
                ->setRoles(["ROLE_ADMIN"]);
                
        $manager->persist($user);

        $users = [
            [
                "Mich",
                "Michel",
                "Fourzif",
                "mich@mich.com",
                "$2y$13\$CvRuNAKG5a8HTTgbsJsX4.QnTeQNswwEgxKxmw.CSX4JVCq99k.72"
            ],
            [
                "Claude",
                "Claude",
                "Bartoil",
                "claude@mich.com",
                "$2y$13\$CvRuNAKG5a8HTTgbsJsX4.QnTeQNswwEgxKxmw.CSX4JVCq99k.72"
            ],
            [
                "Herbert",
                "François",
                "Herbelet",
                "herb@123.com",
                "$2y$13\$CvRuNAKG5a8HTTgbsJsX4.QnTeQNswwEgxKxmw.CSX4JVCq99k.72"
            ],
        ];
        $allUsers = [];

        foreach ($users as $user) {
            $newUser = new User();
            $newUser->setPseudo($user[0])
                    ->setFirstname($user[1])
                    ->setLastname($user[2])
                    ->setEmail($user[3])
                    ->setPassword($user[4]);

            $manager->persist($newUser);
            $allUsers[] = $newUser;
        }

        $brands = ["Roscross", "Camotos", "G-Speed", "Squal'Car", "3R", "CJC", "JPS", "Speed Car"];
        $allBrands = [];

        foreach ($brands as $brand) {
            $newBrand = new Brand();
            $newBrand->setName($brand);
            $manager->persist($newBrand);
            $allBrands[] = $newBrand;
        }

        $federations = [["Fédération Française du Sport Automobile", "FFSA"], ["UFOLEP", "UFOLEP"]];
        $allFederations = [];

        foreach ($federations as $federation) {
            $newFederation = new Federation();
            $newFederation  ->setName($federation[0])
                            ->setAlias($federation[1]);

            $manager->persist($newFederation);
            $allFederations[] = $newFederation;
        }

        $disciplines = ["Autocross", "Sprint Car", "Poursuite sur Terre", "Kart Cross"];
        $allDisciplines = [];

        foreach ($disciplines as $key => $discipline) {
            $newDiscipline = new Discipline();
            $newDiscipline  ->setName($discipline)
                            ->setFederation($allFederations[($key < 2 ? 0 : 1)]);

            $manager->persist($newDiscipline);
            $allDisciplines[] = $newDiscipline;

        }

        $categories = ["Tourisme Cup", "Buggy Cup", "Maxi Tourisme", "Buggy 1600", "Super Buggy", "Maxi Sprint", "Sprint Girls", "Junior Sprint", "Super Sprint", "T1", "T2", "T3", "P1", "P2", "Monoplace Auto", "Monoplace Moto", "ER6 bridé", "ER6", "602", "500", "Open"];
        $allCategories = [];

        foreach ($categories as $key => $category) {
            $newCategory = new Category();
            $newCategory->setName($category);

            if ($key < 5) {
                $discipline = 0;
            } else if ($key < 9) {
                $discipline = 1;
            } else if ($key < 16) {
                $discipline = 2;
            } else {
                $discipline = 3;
            }

            $newCategory->setDiscipline($allDisciplines[$discipline]);

            $manager->persist($newCategory);

            $allCategories[] = $newCategory;
        }

        $championships = [
            [
                "Challenge de l'Ouest",
                "OUEST",
                $allFederations[0],
                '#FFC317',
            ],
            [
                "Sud-Est Autocross",
                "SEAC",
                $allFederations[0],
                '#EA2C31',
            ],
            [
                "Challenge CORAC",
                "CORAC",
                $allFederations[0],
                '#545554',
            ],
            [
                "Off-Road Nord-Est Challenge",
                "ORNEC",
                $allFederations[0],
                '#820081',
            ],
            [
                "Championnats & Coupes de France",
                "France",
                $allFederations[0],
                '#005CB7',
            ],
            [
                "Trophée Sud Bretagne",
                "TSB",
                $allFederations[1],
                '#FAC881',
            ],
            [
                "Trophée Aquitaine",
                "Aquitaine",
                $allFederations[1],
                '#C6A4A4',
            ],
        ];
        $allChampionships = [];

        foreach ($championships as $championship) {
            $newChampionship = new Championship();
            $newChampionship->setName($championship[0])
                            ->setAlias($championship[1])
                            ->setFederation($championship[2])
                            ->setColor($championship[3]);

            $manager->persist($newChampionship);

            $allChampionships[] = $newChampionship;
        }

        $tracks = [
            [
                "Circuit Bernard Seiller",
                "Saint Vincent des Landes",
                "Loire-Atlantique",
                "44590"
            ],            
            [
                "Circuit de Canteperdrix",
                "Mazan",
                "Vaucluse",
                "84380"
            ],
            [
                "Circuit Marcel Moulineuf",
                "Mauron",
                "Morbihan",
                "56430"
            ],
            [
                "Circuit du Marais",
                "Pipriac",
                "Ille et Vilaine",
                "35550"
            ],
        ];
        $allTracks = [];

        foreach ($tracks as $track) {
            $newTrack = new Track();
            $newTrack   ->setName($track[0])
                        ->setCity($track[1])
                        ->setDepartment($track[2])
                        ->setPostCode($track[3]);

            $manager->persist($newTrack);

            $allTracks[] = $newTrack;
        }

        $events = [
            [
                $allTracks[0],
                $allChampionships[0],
                "Camion Cross / Sprint Car",
                true,
                true,
                new DateTime('2023-09-16'),
                new DateTime('2023-09-17'),
                "Avant dernière épreuve du Challenge de l'Ouest pour les Sprint Car"
            ],
            [
                $allTracks[3],
                null,
                "Journée roulage",
                false,
                false,
                new DateTime('2023-09-23 08:30:00'),
                new DateTime('2023-09-23 17:30:00'),
                "Journée tranquille avant la fin de saison"
            ],
        ];
        $allEvents = [];

        foreach ($events as $event) {
            $newEvent = new Event();
            $newEvent   ->setTrack($event[0])
                        ->setChampionship($event[1])
                        ->setTitle($event[2])
                        ->setIsOfficial($event[3])
                        ->setAllDay($event[4])
                        ->setStart($event[5])
                        ->setEnd($event[6])
                        ->setDescription($event[7]);

            $manager->persist($newEvent);

            $allEvents[] = $newEvent;
        }

        $vehicles = [
            [
                $allUsers[0],
                $allBrands[0],
                new DateTime(2019),
                'Chassis refait à neuf il y a 2 courses',
                'Yamaha MT-09',
                'Ohlins TTX',
                'XC'
            ],
            [
                $allUsers[1],
                $allBrands[1],
                new DateTime(2023),
                'Chassis neuf full FIA',
                'Yamaha R6',
                'EMC GP4R',
                'Rapace'
            ],
            [
                $allUsers[2],
                $allBrands[2],
                new DateTime(2019),
                'Ex Olivier Barré',
                'Yamaha R6',
                'P2S',
                'XF'
            ],
        ];
        $allVehicles = [];

        foreach ($vehicles as $vehicle) {
            $newVehicle = new Vehicle();
            $newVehicle ->setOwnerUser($vehicle[0])
                        ->setBrand($vehicle[1])
                        ->setYear($vehicle[2])
                        ->setDescription($vehicle[3])
                        ->setEngine($vehicle[4])
                        ->setShocks($vehicle[5])
                        ->setModel($vehicle[6])
                        ->addCategory($allCategories[6])
                        ->addCategory($allCategories[8]);
            $manager->persist($newVehicle);
            $allVehicles[] = $newVehicle;
        }

        $rentals = [
            [
                $allVehicles[0],
                $allVehicles[0]->getOwnerUser(),
                $allEvents[0],
                950,
                1,
                'Assistance non comprise'
            ],
            [
                $allVehicles[1],
                $allVehicles[1]->getOwnerUser(),
                $allEvents[1],
                450,
                1,
                'La demi-journée'
            ]
        ];
        $allRentals = [];

        foreach ($rentals as $rental) {
            $newRental = new Rental();
            $newRental  ->setVehicle($rental[0])
                        ->setOwnerUser($rental[1])
                        ->setEvent($rental[2])
                        ->setPrice($rental[3])
                        ->setStatus($rental[4])
                        ->setDescription($rental[5]);
            $manager->persist($newRental);
            $allRentals[] = $newRental;
        }

        $manager->flush();

    }
}
