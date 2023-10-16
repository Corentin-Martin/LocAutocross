import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AxiosPrivate from '../../../utils/AxiosPrivate';
import { setConversation } from '../../../actions/dashboard';

function ChatForm({ conversation, setSendLoadToChat }) {
  const rental = useSelector((state) => state.dashboard.elementToDisplay);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    setSendLoadToChat(true);
    event.preventDefault();
    if (conversation !== null) {
      AxiosPrivate.post(
        `messages/${conversation.id}`,
        {
          content: content,
        },

      )
        .then(() => {
          setContent('');
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      AxiosPrivate.post(
        `conversations/location/${rental.id}`,
        {
          content: content,
        },
      )
        .then((response) => {
          setContent('');
          dispatch(setConversation(response.data.conversation));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="MessageForm mt-3 col-12 d-flex flex-column justify-content-center align-items-center">

      <InputGroup>
        <InputGroup.Text>Votre message</InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="Votre message"
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
          value={content}
        />
      </InputGroup>

      <Button type="submit" className="mt-2 col-8">Envoyer</Button>

    </Form>
  );
}

export default ChatForm;
