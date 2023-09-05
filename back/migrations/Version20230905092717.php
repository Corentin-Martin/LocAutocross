<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230905092717 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD associated_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7BC272CD1 FOREIGN KEY (associated_user_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7BC272CD1 ON event (associated_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7BC272CD1');
        $this->addSql('DROP INDEX IDX_3BAE0AA7BC272CD1 ON event');
        $this->addSql('ALTER TABLE event DROP associated_user_id');
    }
}
