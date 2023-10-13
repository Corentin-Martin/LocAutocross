import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LegalText() {
  return (
    <>
      <Card.Subtitle className="mt-3 mb-2 text-muted text-center text-center">
        <strong>1. Identification du Site Web</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Site Web : Loc'Autocross</ListGroup.Item>
        <ListGroup.Item variant="primary">URL : www.locautocross.fr</ListGroup.Item>
        <ListGroup.Item variant="primary">Adresse E-mail de Contact : corentin@locautocross.fr</ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>2. Propriétaire du Site</strong>
      </Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Propriétaire du Site : Corentin Martin</ListGroup.Item>
        <ListGroup.Item variant="primary">Adresse E-mail du Propriétaire : corentin@locautocross.fr</ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>3. Responsable de la Publication</strong>
      </Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Responsable de la publication : Corentin Martin</ListGroup.Item>
        <ListGroup.Item variant="primary">Adresse E-mail du Responsable de la
          Publication : corentin@locautocross.fr
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>4. Hébergement</strong>
      </Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Hébergeur du Site : O2 Switch</ListGroup.Item>
        <ListGroup.Item variant="primary">Adresse de l'Hébergeur : Chemin
          des Pardiaux, 63000 Clermont-Ferrand
        </ListGroup.Item>
        <ListGroup.Item variant="primary">Contact de l'Hébergeur : o2switch.fr</ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>5. Protection des Données Personnelles</strong>
      </Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Pour plus d'informations sur la collecte et
          le traitement des données personnelles, veuillez
          consulter
          <Link to="/confidentialite"> notre politique
            de confidentialité
          </Link>.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>6. Propriété Intellectuelle</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Le contenu de ce site est protégé par les lois
          sur la propriété intellectuelle.
          Toute reproduction, distribution ou utilisation non autorisée
          est interdite.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>7. Liens Externes</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">
          Ce site peut contenir des liens vers des sites externes sur
          lesquels nous n'avons aucun
          contrôle. Nous déclinons toute responsabilité quant au
          contenu de ces sites.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>8. Responsabilité</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Nous nous efforçons de fournir des
          informations précises sur ce site, mais nous ne
          pouvons pas garantir leur exactitude. L'utilisation
          des informations présentes sur
          ce site se fait à vos propres risques.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>9. Modifications des Mentions Légales</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Nous nous réservons le droit de
          modifier ces mentions légales à tout moment.
          Toute modification sera publiée sur
          cette page.
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>10. Contact</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">
          Pour toute question ou préoccupation concernant ces mentions légales,
          veuillez nous contacter à : corentin@locautocross.fr
        </ListGroup.Item>
      </ListGroup>

      <Card.Subtitle className="mt-3 mb-2 text-muted text-center">
        <strong>11. Date d'Entrée en Vigueur</strong>
      </Card.Subtitle>

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Ces mentions légales sont entrées en
          vigueur le : 31/10/2023
        </ListGroup.Item>
      </ListGroup>

    </>
  );
}

export default LegalText;
