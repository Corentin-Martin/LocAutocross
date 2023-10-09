<?php

namespace App\Services;

use App\Entity\Event;
use App\Entity\Vehicle;

class UploadImageService
{
    private $imageOptimizer;

    public function __construct(ImageOptimizerService $imageOptimizerService)
    {
        $this->imageOptimizer = $imageOptimizerService;
    }

    public function upload($entity)
    {
        if (!method_exists($entity, 'getPicture') || empty($entity->getPicture()) || str_starts_with($entity->getPicture(), 'images/')) {
            return $entity;
        }
        if (get_class($entity) === Vehicle::class) {
            $folder = 'vehicle-picture/';
        } else if (get_class($entity) === Event::class) {
            $folder = 'event-picture/';
        }

        $base64 = explode("base64,", $entity->getPicture());
        $format = trim(str_replace('data:image/', '', $base64[0]), ';');

        $stringToConvert = base64_decode($base64[1]);
        
        $file = "images/" . $folder . uniqid() . '.' . $format;

        file_put_contents($file, $stringToConvert);

        $entity->setPicture($file);

        $this->imageOptimizer->resize($file);

        return $entity;
    }

}