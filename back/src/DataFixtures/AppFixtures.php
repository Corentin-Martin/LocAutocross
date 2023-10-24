<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\Championship;
use App\Entity\Discipline;
use App\Entity\Federation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;

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

        $brands = ["Roscross", "Camotos", "G-Speed", "Squal'Car", "3R", "CJC", "JPS", "Speed Car", "MV Racing", "CPC", "MTC", "Sprint'R", "Squal'Car", "Kamikaz", "MMS", "GRX", "Fouquet", "Will'Oz", "PP-XC", "BRC", "CPS", "GR Tech", "Mygale", "MSX", "Christec", "Lemaitre", "TDR", "AJC", "BGF", "Ago Sport", "VRR", "Stinger", "ASK", "Raptors", "Semog", "MBSCR", "BALROG", "Panthera", "MGSL", "Peters", "2JS", "Barracuda", "Peugeot", "Smart", "Alpine", "Renault", "Porsche", "Skoda", "Opel", "Fiat", "Citroën", "Volkswagen", "Suzuki", "BMW", "Ford", "Audi", "Honda", "Alfa Roméo", "Nissan", "Propulsion", "Speed-Pic", "Fast and Speed", "ORT", "BG16", "Alfa Racing", "Zedek", "GRR", "MAC", "JVDC", "Trackline", "Gembo", "Diablo", "Saubiac", "Souchard"];
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
                "Trophée Auvergne",
                "Auvergne",
                $allFederations[1],
                '#573692',
            ],
            [
                "Trophée Rhône-Alpes",
                "Rhône-Alpes",
                $allFederations[1],
                '#573692',
            ],
            [
                "Trophée Bretagne",
                "Bretagne",
                $allFederations[1],
                '#C6B279',
            ],
            [
                "Trophée Centre",
                "Centre",
                $allFederations[1],
                '#F8991F',
            ],
            [
                "Trophée Grand-Est",
                "Grand-Est",
                $allFederations[1],
                '#7BD3F7',
            ],
            [
                "Trophée Hauts de France",
                "Hauts de France",
                $allFederations[1],
                '#92C83E',
            ],
            [
                "Trophée Nouvelle Aquitaine",
                "Nouvelle Aquitaine",
                $allFederations[1],
                '#E25444',
            ],
            [
                "Trophée Poitou-Charentes Vendée",
                "Poitou-Charentes Vendée",
                $allFederations[1],
                '#E25444',
            ],
            [
                "Trophée Challenge Sud",
                "Challenge Sud",
                $allFederations[1],
                '#D11B7C',
            ],
            [
                "Trophée Loire-Atlantique",
                "Loire-Atlantique",
                $allFederations[1],
                '#FEC21F',
            ],
            [
                "Trophée Maine Anjou",
                "Maine Anjou",
                $allFederations[1],
                '#FEC21F',
            ],
            [
                "Trophée Sud-Est",
                "Sud-Est",
                $allFederations[1],
                '#933B95',
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

        $manager->flush();

    }
}
