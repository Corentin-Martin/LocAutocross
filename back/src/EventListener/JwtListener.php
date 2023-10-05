<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        // Récupérez l'utilisateur actuellement authentifié
        $user = $event->getUser();

        $bytes = random_bytes(32); // Générer 32 octets aléatoires
        $CsrfToken = bin2hex($bytes);
        // Ajoutez des données personnalisées au payload du JWT
        $payload = $event->getData();
        $payload['custom_data'] = 'valeur personnalisée';


        // Mettez à jour le payload avec les données personnalisées
        $event->setData($payload);
    }
}
