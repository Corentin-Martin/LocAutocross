<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231024113333 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("INSERT INTO `federation` (`id`, `name`, `alias`, `created_at`, `updated_at`) VALUES (1,	'Fédération Française du Sport Automobile',	'FFSA',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `federation` (`id`, `name`, `alias`, `created_at`, `updated_at`) VALUES (2,	'UFOLEP',	'UFOLEP',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (1,	1,	'Challenge de l\'Ouest',	'OUEST',	'2023-10-24 11:08:41',	NULL,	'#FFC317')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (2,	1,	'Sud-Est Autocross',	'SEAC',	'2023-10-24 11:08:41',	NULL,	'#EA2C31')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (3,	1,	'Challenge CORAC',	'CORAC',	'2023-10-24 11:08:41',	NULL,	'#545554')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (4,	1,	'Off-Road Nord-Est Challenge',	'ORNEC',	'2023-10-24 11:08:41',	NULL,	'#820081')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (5,	1,	'Championnats & Coupes de France',	'France',	'2023-10-24 11:08:41',	NULL,	'#005CB7')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (6,	2,	'Trophée Auvergne',	'Auvergne',	'2023-10-24 11:08:41',	NULL,	'#573692')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (7,	2,	'Trophée Rhône-Alpes',	'Rhône-Alpes',	'2023-10-24 11:08:41',	NULL,	'#573692')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (8,	2,	'Trophée Bretagne',	'Bretagne',	'2023-10-24 11:08:41',	NULL,	'#C6B29')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (9,	2,	'Trophée Centre',	'Centre',	'2023-10-24 11:08:41',	NULL,	'#F8991F')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (10,	2,	'Trophée Grand-Est',	'Grand-Est',	'2023-10-24 11:08:41',	NULL,	'#7BD3F7')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (11,	2,	'Trophée Hauts de France',	'Hauts de France',	'2023-10-24 11:08:41',	NULL,	'#92C83E')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (12,	2,	'Trophée Nouvelle Aquitaine',	'Nouvelle Aquitaine',	'2023-10-24 11:08:41',	NULL,	'#E25444')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (13,	2,	'Trophée Poitou-Charentes Vendée',	'Poitou-Charentes Vendée',	'2023-10-24 11:08:41',	NULL,	'#E25444')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (14,	2,	'Trophée Challenge Sud',	'Challenge Sud',	'2023-10-24 11:08:41',	NULL,	'#D11B7C')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (15,	2,	'Trophée Loire-Atlantique',	'Loire-Atlantique',	'2023-10-24 11:08:41',	NULL,	'#FEC21F')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (16,	2,	'Trophée Maine Anjou',	'Maine Anjou',	'2023-10-24 11:08:41',	NULL,	'#FEC21F')");
        $this->addSql("INSERT INTO `championship` (`id`, `federation_id`, `name`, `alias`, `created_at`, `updated_at`, `color`) VALUES (17,	2,	'Trophée Sud-Est',	'Sud-Est',	'2023-10-24 11:08:41',	NULL,	'#933B95')");
        $this->addSql("INSERT INTO `discipline` (`id`, `federation_id`, `name`, `created_at`, `updated_at`) VALUES (1,	1,	'Autocross',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `discipline` (`id`, `federation_id`, `name`, `created_at`, `updated_at`) VALUES (2,	1,	'Sprint Car',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `discipline` (`id`, `federation_id`, `name`, `created_at`, `updated_at`) VALUES (3,	2,	'Poursuite sur Terre',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `discipline` (`id`, `federation_id`, `name`, `created_at`, `updated_at`) VALUES (4,	2,	'Kart Cross',	'2023-10-24 11:08:41',	NULL)");
       
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (1,	'Tourisme Cup',	'2023-10-24 11:08:41',	NULL,	1)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (2,	'Buggy Cup',	'2023-10-24 11:08:41',	NULL,	1)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (3,	'Maxi Tourisme',	'2023-10-24 11:08:41',	NULL,	1)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (4,	'Buggy 1600',	'2023-10-24 11:08:41',	NULL,	1)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (5,	'Super Buggy',	'2023-10-24 11:08:41',	NULL,	1)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (6,	'Maxi Sprint',	'2023-10-24 11:08:41',	NULL,	2)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (7,	'Sprint Girls',	'2023-10-24 11:08:41',	NULL,	2)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (8,	'Junior Sprint',	'2023-10-24 11:08:41',	NULL,	2)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (9,	'Super Sprint',	'2023-10-24 11:08:41',	NULL,	2)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (10,	'T1',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (11,	'T2',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (12,	'T3',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (13,	'P1',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (14,	'P2',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (15,	'Monoplace Auto',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (16,	'Monoplace Moto',	'2023-10-24 11:08:41',	NULL,	3)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (17,	'ER6 bridé',	'2023-10-24 11:08:41',	NULL,	4)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (18,	'ER6',	'2023-10-24 11:08:41',	NULL,	4)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (19,	'602',	'2023-10-24 11:08:41',	NULL,	4)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (20,	'500',	'2023-10-24 11:08:41',	NULL,	4)");
        $this->addSql("INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`, `discipline_id`) VALUES (21,	'Open',	'2023-10-24 11:08:41',	NULL,	4)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (1,	'Roscross',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (2,	'Camotos',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (3,	'G-Speed',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (4,	'Squal\'Car',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (5,	'3R',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (6,	'CJC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (7,	'JPS',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (8,	'Speed Car',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (9,	'MV Racing',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (10,	'CPC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (11,	'MTC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (12,	'Sprint\'R',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (13,	'Squal\'Car',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (14,	'Kamikaz',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (15,	'MMS',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (16,	'GRX',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (17,	'Fouquet',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (18,	'Will\'Oz',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (19,	'PP-XC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (20,	'BRC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (21,	'CPS',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (22,	'GR Tech',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (23,	'Mygale',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (24,	'MSX',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (25,	'Christec',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (26,	'Lemaitre',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (27,	'TDR',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (28,	'AJC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (29,	'BGF',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (30,	'Ago Sport',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (31,	'VRR',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (32,	'Stinger',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (33,	'ASK',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (34,	'Raptors',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (35,	'Semog',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (36,	'MBSCR',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (37,	'BALROG',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (38,	'Panthera',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (39,	'MGSL',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (40,	'Peters',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (41,	'2JS',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (42,	'Barracuda',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (43,	'Peugeot',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (44,	'Smart',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (45,	'Alpine',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (46,	'Renault',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (47,	'Porsche',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (48,	'Skoda',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (49,	'Opel',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (50,	'Fiat',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (51,	'Citroën',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (52,	'Volkswagen',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (53,	'Suzuki',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (54,	'BMW',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (55,	'Ford',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (56,	'Audi',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (57,	'Honda',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (58,	'Alfa Roméo',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (59,	'Nissan',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (60,	'Propulsion',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (61,	'Speed-Pic',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (62,	'Fast and Speed',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (63,	'ORT',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (64,	'BG16',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (65,	'Alfa Racing',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (66,	'Zedek',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (67,	'GRR',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (68,	'MAC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (69,	'JVDC',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (70,	'Trackline',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (71,	'Gembo',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (72,	'Diablo',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (73,	'Saubiac',	'2023-10-24 11:08:41',	NULL)");
        $this->addSql("INSERT INTO `brand` (`id`, `name`, `created_at`, `updated_at`) VALUES (74,	'Souchard',	'2023-10-24 11:08:41',	NULL)");


    }

    public function down(Schema $schema): void
    {

    }
}




