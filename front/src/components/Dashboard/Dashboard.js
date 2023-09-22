import axios from 'axios';
import { useEffect, useState } from 'react';
import './Dashboard.scss';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [conversations, setConversations] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/conversations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setConversations(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {isLoading ? <p>Chargement...</p>
        : (
          <>
            <details>
              <summary>{conversations.unread.length} conversation{conversations.unread.length > 1 ? 's' : ''} non lu{conversations.unread.length > 1 ? 's' : ''}</summary>
              <ul>

                {conversations.unread.map((conv) => (
                  <li
                    onClick={() => {
                      navigate(`/conversation/${conv.id}`);
                    }}
                    key={conv.id}
                  >Entre {`${conv.rental.ownerUser.pseudo} `}
                    et {conv.interestedUser.pseudo}
                  </li>
                ))}
              </ul>
            </details>

            <p>{conversations.unread.length + conversations.read.length} conversation{conversations.unread.length + conversations.read.length > 1 ? 's' : ''} au total</p>
          </>
        )}
      <Link to="/garage">Ici</Link>
    </div>
  );
}

export default Dashboard;
