<?php

namespace App\Entity;

use App\Repository\VehicleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=VehicleRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Vehicle
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"brand"})
     * @Groups({"category"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"brand"})
     * @Groups({"category"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $year;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"user-detail"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"user-detail"})
     */
    private $engine;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"user-detail"})
     */
    private $shocks;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"user-detail"})
     */
    private $picture;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Rental::class, mappedBy="vehicle")
     * @Groups({"vehicle"})
     */
    private $rentals;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="vehicles")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"federations"})
     */
    private $ownerUser;

    /**
     * @ORM\ManyToOne(targetEntity=Brand::class, inversedBy="vehicles")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"category"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $brand;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, inversedBy="vehicles")
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"brand"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"vehicles"})
     * @Groups({"vehicle"})
     * @Groups({"brand"})
     * @Groups({"category"})
     * @Groups({"event"})
     * @Groups({"federations"})
     * @Groups({"rentals"})
     * @Groups({"conversation"})
     * @Groups({"comment"})
     * @Groups({"user-detail"})
     */
    private $model;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActiv;

    public function __construct()
    {
        $this->rentals = new ArrayCollection();
        $this->category = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYear(): ?\DateTimeInterface
    {
        return $this->year;
    }

    public function setYear(\DateTimeInterface $year): self
    {
        $this->year = $year;

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

    public function getEngine(): ?string
    {
        return $this->engine;
    }

    public function setEngine(string $engine): self
    {
        $this->engine = $engine;

        return $this;
    }

    public function getShocks(): ?string
    {
        return $this->shocks;
    }

    public function setShocks(?string $shocks): self
    {
        $this->shocks = $shocks;

        return $this;
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
            $rental->setVehicle($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getVehicle() === $this) {
                $rental->setVehicle(null);
            }
        }

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

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     */
    public function getCategory()
    {
        return $this->category->getValues();
    }

    public function addCategory(Category $category): self
    {
        if (!$this->category->contains($category)) {
            $this->category[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        $this->category->removeElement($category);

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

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(?string $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function isIsActiv(): ?bool
    {
        return $this->isActiv;
    }

    public function setIsActiv(bool $isActiv): self
    {
        $this->isActiv = $isActiv;

        return $this;
    }
}
