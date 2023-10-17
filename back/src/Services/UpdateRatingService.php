<?php

namespace App\Services;

use App\Repository\UserRepository;

class UpdateRatingService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function update($rental) {

        $user = $rental->getOwnerUser();

        $rentals = $user->getPropositions();

        $comments = [];
        foreach ($rentals as $rental) {
            if (!is_null($rental->getComment())) {
                $comments[] = $rental->getComment();
            }
        }

        $rating = [];
        foreach ($comments as $comment) {
            $rating[] = $comment->getRating();
        }

        $sum = array_sum($rating);
        $newRating = round($sum / count($rating), 1);

        $user->setRating($newRating);

        $userToUpdate = $this->userRepository->find($user);

        $this->userRepository->add($userToUpdate, true);
    }
}