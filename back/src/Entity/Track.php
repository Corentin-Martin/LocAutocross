<?php

namespace App\Entity;

use App\Repository\TrackRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TrackRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Track
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"tracks"})
     * @Groups({"track"})
     * @Groups({"vehicle"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"championship"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"tracks"})
     * @Groups({"track"})
     * @Groups({"vehicle"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"championship"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"tracks"})
     * @Groups({"track"})
     * @Groups({"vehicle"})
     * @Groups({"events"})
     * @Groups({"event"})
     * @Groups({"championship"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"track"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     */
    private $department;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"track"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     */
    private $postCode;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Event::class, mappedBy="track")
     */
    private $events;

    /**
     * @ORM\Column(type="float")
     * @Groups({"tracks"})
     * @Groups({"track"})
     */
    private $latitude;

    /**
     * @ORM\Column(type="float")
     * @Groups({"tracks"})
     * @Groups({"track"})
     */
    private $longitude;

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

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getDepartment(): ?string
    {
        return $this->department;
    }

    public function setDepartment(string $department): self
    {
        $this->department = $department;

        return $this;
    }

    public function getPostCode(): ?int
    {
        return $this->postCode;
    }

    public function setPostCode(int $postCode): self
    {
        $this->postCode = $postCode;

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
            $event->setTrack($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getTrack() === $this) {
                $event->setTrack(null);
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

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }
}
