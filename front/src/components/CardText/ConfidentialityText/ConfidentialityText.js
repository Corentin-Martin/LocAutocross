import { Card, ListGroup } from 'react-bootstrap';

function ConfidentialityText() {
  return (
    <>
      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">1. Collecte des Informations Personnelles</Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">
          Nous pouvons collecter des informations personnelles, telles que :

        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <ListGroup variant="flush">
            <ListGroup.Item variant="primary">Nom</ListGroup.Item>
            <ListGroup.Item variant="primary">Adresse e-mail</ListGroup.Item>
            <ListGroup.Item variant="primary">Autres informations que vous nous fournissez
              volontairement lors de votre utilisation de notre site
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">2. Utilisation des Informations</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">
          Les informations personnelles que nous collectons peuvent
          être utilisées pour les finalités suivantes :
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <ListGroup variant="flush">
            <ListGroup.Item variant="primary">Fournir, exploiter et maintenir notre site</ListGroup.Item>
            <ListGroup.Item variant="primary">Vous envoyer des informations sur notre site</ListGroup.Item>
            <ListGroup.Item variant="primary">Vous envoyer des newsletters et
              d'autres communications marketing
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">3. Confidentialité des Informations</Card.Subtitle>
      <ListGroup>
        <ListGroup.Item variant="primary"> Vos informations personnelles sont stockées de manière sécurisée et ne seront
          pas vendues, échangées, transférées ou fournies à des tiers sans votre consentement.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">4. Sécurité</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary"> Nous prenons des mesures de sécurité raisonnables pour protéger vos informations
          personnelles contre tout accès non autorisé ou toute divulgation.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">5. Cookies</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">   Notre site n'utilise pas de cookies non-essentiels au fonctionnement du site.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">6. Liens Externes</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">    Notre site peut contenir des liens vers d'autres sites. Nous ne sommes pas
          responsables du contenu ou de la politique de confidentialité de ces sites.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">7. Droits de Confidentialité</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">   Vous avez le droit d'accéder, de corriger ou de supprimer vos informations
          personnelles. Pour exercer ces droits, veuillez nous contacter à corentin@locautocross.fr.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">8. Modifications de la Politique de Confidentialité</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout
          moment. Toute modification sera publiée sur cette page.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">9. Contact</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Pour toute question ou préoccupation concernant cette politique de
          confidentialité, veuillez nous contacter à : corentin@locautocross.fr.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">10. Date d'Entrée en Vigueur</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Cette politique de confidentialité est entrée en vigueur le : 31/10/23.</ListGroup.Item>
      </ListGroup>

    </>
  );
}

export default ConfidentialityText;
