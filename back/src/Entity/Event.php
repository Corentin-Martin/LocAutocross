<?php

namespace App\Entity;

use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=EventRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Event
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"vehicle"})
     * @Groups({"championship"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"track"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"vehicle"})
     * @Groups({"championship"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"track"})
     */
    private $title;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"vehicle"})
     * @Groups({"federations"})
     * @Groups({"championship"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"track"})
     */
    private $start;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"track"})
     */
    private $isOfficial;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"events"})
     * @Groups({"event"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"events"})
     * @Groups({"event"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Rental::class, mappedBy="event", cascade={"remove"}))
     * @Groups({"event"})
     * @Groups({"federations"})
     */
    private $rentals;

    /**
     * @ORM\ManyToOne(targetEntity=Track::class, inversedBy="events")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"vehicle"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"championship"})
     */
    private $track;

    /**
     * @ORM\ManyToOne(targetEntity=Championship::class, inversedBy="events")
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"rentals"})
     * @Groups({"track"})
     */
    private $championship;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="events")
     * @Groups({"events"})
     * @Groups({"event"})
     */
    private $associatedUser;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"federations"})
     * @Groups({"track"})
     */
    private $end;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"federations"})
     * @Groups({"track"})
     */
    private $allDay;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"federations"})
     * @Groups({"track"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"track"})
     */
    private $picture;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"eventWithoutTrack"})
     * @Groups({"vehicle"})
     * @Groups({"championship"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"track"})
     */
    private $isCancelled;

    public function __construct()
    {
        $this->rentals = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function isIsOfficial(): ?bool
    {
        return $this->isOfficial;
    }

    public function setIsOfficial(bool $isOfficial): self
    {
        $this->isOfficial = $isOfficial;

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

    /**
     * @return Collection<int, Rental>
     */
    public function getRentals(): Collection
    {
        return $this->rentals;
    }

    public function addRental(Rental $rental): self
    {
        if (!$this->rentals->contains($rental)) {
            $this->rentals[] = $rental;
            $rental->setEvent($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getEvent() === $this) {
                $rental->setEvent(null);
            }
        }

        return $this;
    }

    public function getTrack(): ?Track
    {
        return $this->track;
    }

    public function setTrack(?Track $track): self
    {
        $this->track = $track;

        return $this;
    }

    public function getChampionship(): ?Championship
    {
        return $this->championship;
    }

    public function setChampionship(?Championship $championship): self
    {
        $this->championship = $championship;

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

    public function getAssociatedUser(): ?User
    {
        return $this->associatedUser;
    }

    public function setAssociatedUser(?User $associatedUser): self
    {
        $this->associatedUser = $associatedUser;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function isAllDay(): ?bool
    {
        return $this->allDay;
    }

    public function setAllDay(bool $allDay): self
    {
        $this->allDay = $allDay;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function __toString(): string
    {
        return $this->id;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function isIsCancelled(): ?bool
    {
        return $this->isCancelled;
    }

    public function setIsCancelled(?bool $isCancelled): self
    {
        $this->isCancelled = $isCancelled;

        return $this;
    }
}
