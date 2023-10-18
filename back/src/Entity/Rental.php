<?php

namespace App\Entity;

use App\Repository\RentalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=RentalRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Rental
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"rentals"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"rentals"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"conversation"})
     * @Groups({"user-detail"})
     */
    private $price;

    /**
     * @ORM\Column(type="smallint", length=255)
     * @Groups({"rentals"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"conversation"})
     * @Groups({"user-detail"})
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Vehicle::class, inversedBy="rentals")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rentals"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $vehicle;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="propositions")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rentals"})
     * @Groups({"event"})
     * @Groups({"conversation"})
     */
    private $ownerUser;

    /**
     * @ORM\ManyToOne(targetEntity=Event::class, inversedBy="rentals")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"rentals"})
     * @Groups({"vehicle"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $event;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reservations")
     * @Groups({"rentals"})
     */
    private $tenantUser;

    /**
     * @ORM\OneToOne(targetEntity=Comment::class, mappedBy="rental", cascade={"persist", "remove"})
     * @Groups({"rentals"})
     */
    private $comment;

    /**
     * @ORM\OneToOne(targetEntity=Contract::class, mappedBy="rental", cascade={"persist", "remove"})
     * @Groups({"rentals"})
     */
    private $contract;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"rentals"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"rentals"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"federations"})
     * @Groups({"user-detail"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Conversation::class, mappedBy="rental", cascade={"remove"})
     */
    private $conversations;

    public function __construct()
    {
        $this->conversations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getVehicle(): ?Vehicle
    {
        return $this->vehicle;
    }

    public function setVehicle(?Vehicle $vehicle): self
    {
        $this->vehicle = $vehicle;

        return $this;
    }

    public function getOwnerUser(): ?User
    {
        return $this->ownerUser;
    }

    public function setOwnerUser(?User $ownerUser): self
    {
        $this->ownerUser = $ownerUser;

        return $this;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): self
    {
        $this->event = $event;

        return $this;
    }

    public function getTenantUser(): ?User
    {
        return $this->tenantUser;
    }

    public function setTenantUser(?User $tenantUser): self
    {
        $this->tenantUser = $tenantUser;

        return $this;
    }

    public function getComment(): ?Comment
    {
        return $this->comment;
    }

    public function setComment(Comment $comment): self
    {
        // set the owning side of the relation if necessary
        if ($comment->getRental() !== $this) {
            $comment->setRental($this);
        }

        $this->comment = $comment;

        return $this;
    }

    public function getContract(): ?Contract
    {
        return $this->contract;
    }

    public function setContract(?Contract $contract): self
    {
        // unset the owning side of the relation if necessary
        if ($contract === null && $this->contract !== null) {
            $this->contract->setRental(null);
        }

        // set the owning side of the relation if necessary
        if ($contract !== null && $contract->getRental() !== $this) {
            $contract->setRental($this);
        }

        $this->contract = $contract;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Conversation>
     */
    public function getConversations(): Collection
    {
        return $this->conversations;
    }

    public function addConversation(Conversation $conversation): self
    {
        if (!$this->conversations->contains($conversation)) {
            $this->conversations[] = $conversation;
            $conversation->setRental($this);
        }

        return $this;
    }

    public function removeConversation(Conversation $conversation): self
    {
        if ($this->conversations->removeElement($conversation)) {
            // set the owning side to null (unless already changed)
            if ($conversation->getRental() === $this) {
                $conversation->setRental(null);
            }
        }

        return $this;
    }
}
