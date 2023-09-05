<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230904114549 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE brand (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, federation_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_64C19C16A03EFC5 (federation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE championship (id INT AUTO_INCREMENT NOT NULL, federation_id INT NOT NULL, name VARCHAR(255) NOT NULL, alias VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_EBADDE6A6A03EFC5 (federation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, associated_user_id INT NOT NULL, rental_id INT NOT NULL, rating INT DEFAULT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_9474526CBC272CD1 (associated_user_id), UNIQUE INDEX UNIQ_9474526CA7CF2329 (rental_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contract (id INT AUTO_INCREMENT NOT NULL, rental_id INT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_E98F2859A7CF2329 (rental_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contract_contract_options (contract_id INT NOT NULL, contract_options_id INT NOT NULL, INDEX IDX_85DFC2302576E0FD (contract_id), INDEX IDX_85DFC230239AA4D8 (contract_options_id), PRIMARY KEY(contract_id, contract_options_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contract_options (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event (id INT AUTO_INCREMENT NOT NULL, track_id INT NOT NULL, championship_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, date DATE NOT NULL, is_official TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_3BAE0AA75ED23C43 (track_id), INDEX IDX_3BAE0AA794DDBCE9 (championship_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE federation (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, alias VARCHAR(20) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rental (id INT AUTO_INCREMENT NOT NULL, vehicle_id INT NOT NULL, owner_user_id INT NOT NULL, event_id INT NOT NULL, tenant_user_id INT DEFAULT NULL, price DOUBLE PRECISION DEFAULT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_1619C27D545317D1 (vehicle_id), INDEX IDX_1619C27D2B18554A (owner_user_id), INDEX IDX_1619C27D71F7E88B (event_id), INDEX IDX_1619C27DB5F891A1 (tenant_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE track (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, city VARCHAR(255) NOT NULL, department VARCHAR(255) NOT NULL, post_code INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, pseudo VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle (id INT AUTO_INCREMENT NOT NULL, owner_user_id INT NOT NULL, brand_id INT NOT NULL, year DATE NOT NULL, description LONGTEXT DEFAULT NULL, engine VARCHAR(255) NOT NULL, shocks VARCHAR(255) DEFAULT NULL, picture VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_1B80E4862B18554A (owner_user_id), INDEX IDX_1B80E48644F5D008 (brand_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_category (vehicle_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_DB5E1655545317D1 (vehicle_id), INDEX IDX_DB5E165512469DE2 (category_id), PRIMARY KEY(vehicle_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C16A03EFC5 FOREIGN KEY (federation_id) REFERENCES federation (id)');
        $this->addSql('ALTER TABLE championship ADD CONSTRAINT FK_EBADDE6A6A03EFC5 FOREIGN KEY (federation_id) REFERENCES federation (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CBC272CD1 FOREIGN KEY (associated_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA7CF2329 FOREIGN KEY (rental_id) REFERENCES rental (id)');
        $this->addSql('ALTER TABLE contract ADD CONSTRAINT FK_E98F2859A7CF2329 FOREIGN KEY (rental_id) REFERENCES rental (id)');
        $this->addSql('ALTER TABLE contract_contract_options ADD CONSTRAINT FK_85DFC2302576E0FD FOREIGN KEY (contract_id) REFERENCES contract (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE contract_contract_options ADD CONSTRAINT FK_85DFC230239AA4D8 FOREIGN KEY (contract_options_id) REFERENCES contract_options (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA75ED23C43 FOREIGN KEY (track_id) REFERENCES track (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA794DDBCE9 FOREIGN KEY (championship_id) REFERENCES championship (id)');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27D545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id)');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27D2B18554A FOREIGN KEY (owner_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27D71F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27DB5F891A1 FOREIGN KEY (tenant_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E4862B18554A FOREIGN KEY (owner_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E48644F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
        $this->addSql('ALTER TABLE vehicle_category ADD CONSTRAINT FK_DB5E1655545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vehicle_category ADD CONSTRAINT FK_DB5E165512469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C16A03EFC5');
        $this->addSql('ALTER TABLE championship DROP FOREIGN KEY FK_EBADDE6A6A03EFC5');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CBC272CD1');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA7CF2329');
        $this->addSql('ALTER TABLE contract DROP FOREIGN KEY FK_E98F2859A7CF2329');
        $this->addSql('ALTER TABLE contract_contract_options DROP FOREIGN KEY FK_85DFC2302576E0FD');
        $this->addSql('ALTER TABLE contract_contract_options DROP FOREIGN KEY FK_85DFC230239AA4D8');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA75ED23C43');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA794DDBCE9');
        $this->addSql('ALTER TABLE rental DROP FOREIGN KEY FK_1619C27D545317D1');
        $this->addSql('ALTER TABLE rental DROP FOREIGN KEY FK_1619C27D2B18554A');
        $this->addSql('ALTER TABLE rental DROP FOREIGN KEY FK_1619C27D71F7E88B');
        $this->addSql('ALTER TABLE rental DROP FOREIGN KEY FK_1619C27DB5F891A1');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E4862B18554A');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E48644F5D008');
        $this->addSql('ALTER TABLE vehicle_category DROP FOREIGN KEY FK_DB5E1655545317D1');
        $this->addSql('ALTER TABLE vehicle_category DROP FOREIGN KEY FK_DB5E165512469DE2');
        $this->addSql('DROP TABLE brand');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE championship');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE contract');
        $this->addSql('DROP TABLE contract_contract_options');
        $this->addSql('DROP TABLE contract_options');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE federation');
        $this->addSql('DROP TABLE rental');
        $this->addSql('DROP TABLE track');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE vehicle');
        $this->addSql('DROP TABLE vehicle_category');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
