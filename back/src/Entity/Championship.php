<?php

namespace App\Entity;

use App\Repository\ChampionshipRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ChampionshipRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Championship
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"championships"})
     * @Groups({"championship"})
     * @Groups({"championshipWithoutEvents"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"federation"})
     * @Groups({"rentals"})
     * @Groups({"track"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"championships"})
     * @Groups({"championship"})
     * @Groups({"championshipWithoutEvents"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"federation"})
     * @Groups({"rentals"})
     * @Groups({"track"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"championships"})
     * @Groups({"championship"})
     * @Groups({"championshipWithoutEvents"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"federation"})
     * @Groups({"rentals"})
     * @Groups({"track"})
     */
    private $alias;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Federation::class, inversedBy="championships")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"championship"})
     * @Groups({"rentals"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"track"})
     */
    private $federation;

    /**
     * @ORM\OneToMany(targetEntity=Event::class, mappedBy="championship")
     * @Groups({"federations"})
     * @Groups({"championship"})
     */
    private $events;

    /**
     * @ORM\Column(type="string", length=7, nullable=true)
     * @Groups({"championships"})
     * @Groups({"championship"})
     * @Groups({"championshipWithoutEvents"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"federation"})
     */
    private $color;

    public function __construct()
    {
        $this->events = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function setAlias(?string $alias): self
    {
        $this->alias = $alias;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getFederation(): ?Federation
    {
        return $this->federation;
    }

    public function setFederation(?Federation $federation): self
    {
        $this->federation = $federation;

        return $this;
    }

    /**
     * @return Collection<int, Event>
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setChampionship($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getChampionship() === $this) {
                $event->setChampionship(null);
            }
        }

        return $this;
    }

    /**
     * Gets triggered only on insert

     * @ORM\PrePersist
     */
    public function onPrePersist()
    {
        $this->createdAt = new \DateTime("now");
    }

    /**
     * Gets triggered every time on update

     * @ORM\PreUpdate
     */
    public function onPreUpdate()
    {
        $this->updatedAt = new \DateTime("now");
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }
}
