import { Accordion, Card } from 'react-bootstrap';

function FAQText() {
  const faqData = [
    {
      id: '1',
      question: "Quel est l'objectif principal de Loc'Autocross ?",
      answer: "L'objectif principal de Loc'Autocross est de faciliter les mises en relation entre les loueurs et les pilotes, tout en recensant toutes les options de location de véhicules pour l'Autocross et le Sprint Car en France.",
    },
    {
      id: '4',
      question: 'Comment Loc\'Autocross facilite-t-il la mise en relation entre les loueurs et les pilotes ?',
      answer: "Loc'Autocross facilite la mise en relation en permettant aux loueurs de créer des comptes et de proposer leurs véhicules à la location. Les pilotes peuvent également s'inscrire et réserver un véhicule pour un week-end de course. Il y a également une fonction de messagerie en temps réel pour faciliter les échanges.",
    },
    {
      id: '5',
      question: "Quels sont les évènements couverts par Loc'Autocross ?",
      answer: "Absolument tous les évènements d'Autocross et Sprint Car appartenant à la FFSA, ceux de poursuite sur terre et Kart Cross de l'UFOLEP et même des évènements \"non officiels\" comme des journées de roulage organisées sur un circuit. Si un évènement n'est pas présent sur le site, l'utilisateur peut le créer lui-même.",
    },
    {
      id: '7',
      question: "Loc'Autocross propose-t-il une application mobile ?",
      answer: "Pour le moment, Loc'Autocross ne propose pas d'application mobile dédiée. Cependant, il est accessible via des navigateurs mobiles sur smartphones et tablettes.",
    },
    {
      id: '8',
      question: 'Comment puis-je m\'inscrire sur Loc\'Autocross ?',
      answer: "L'inscription sur Loc'Autocross est simple. Il suffit de créer un compte en fournissant les informations nécessaires, telles que le nom, le prénom, l'adresse e-mail, etc. Une fois inscrit, vous pourrez utiliser les fonctionnalités du site.",
    },
    {
      id: '10',
      question: 'Comment puis-je réserver un véhicule sur Loc\'Autocross ?',
      answer: "Pour réserver un véhicule sur Loc'Autocross, vous devez d'abord vous inscrire sur la plateforme. Ensuite, vous pouvez parcourir les annonces des véhicules disponibles, entrer en contact avec les loueurs, discuter des détails de la réservation et finaliser la transaction.",
    },
    {
      id: '11',
      question: "Comment puis-je laisser un avis ou une note sur Loc'Autocross ?",
      answer: "Vous pouvez laisser un avis ou une note sur Loc'Autocross en utilisant les fonctionnalités de notation et de commentaires disponibles pour chaque transaction. Après avoir effectué une location, vous aurez l'opportunité de partager votre expérience et de laisser des commentaires pour aider d'autres utilisateurs.",
    },

  ];

  return (

    <Accordion defaultActiveKey="0" className="col-12">
      {faqData.map((item) => (
        <Accordion.Item key={item.id} eventKey={item.id}>
          <Accordion.Header>
            {item.question}
          </Accordion.Header>
          <Accordion.Body>
            <Card.Body>{item.answer}</Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>

  );
}

export default FAQText;
