<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pseudo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;


    /**
     * @ORM\OneToMany(targetEntity=Rental::class, mappedBy="ownerUser")
     */
    private $propositions;

    /**
     * @ORM\OneToMany(targetEntity=Rental::class, mappedBy="tenantUser")
     */
    private $reservations;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="associatedUser")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Vehicle::class, mappedBy="ownerUser")
     */
    private $vehicles;


    public function __construct()
    {
        $this->propositions = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->vehicles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * @return Collection<int, Rental>
     */
    public function getPropositions(): Collection
    {
        return $this->propositions;
    }

    /**
     * @return Collection<int, Rental>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addProposition(Rental $rental): self
    {
        if (!$this->propositions->contains($rental)) {
            $this->propositions[] = $rental;
            $rental->setOwnerUser($this);
        }

        return $this;
    }

    public function removeProposition(Rental $rental): self
    {
        if ($this->propositions->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getOwnerUser() === $this) {
                $rental->setOwnerUser(null);
            }
        }

        return $this;
    }

    public function addReservation(Rental $rental): self
    {
        if (!$this->reservations->contains($rental)) {
            $this->reservations[] = $rental;
            $rental->setTenantUser($this);
        }

        return $this;
    }

    public function removeReservation(Rental $rental): self
    {
        if ($this->reservations->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getTenantUser() === $this) {
                $rental->setTenantUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setAssociatedUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getAssociatedUser() === $this) {
                $comment->setAssociatedUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Vehicle>
     */
    public function getVehicles(): Collection
    {
        return $this->vehicles;
    }

    public function addVehicle(Vehicle $vehicle): self
    {
        if (!$this->vehicles->contains($vehicle)) {
            $this->vehicles[] = $vehicle;
            $vehicle->setOwnerUser($this);
        }

        return $this;
    }

    public function removeVehicle(Vehicle $vehicle): self
    {
        if ($this->vehicles->removeElement($vehicle)) {
            // set the owning side to null (unless already changed)
            if ($vehicle->getOwnerUser() === $this) {
                $vehicle->setOwnerUser(null);
            }
        }

        return $this;
    }

}
