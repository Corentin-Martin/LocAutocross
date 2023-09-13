import axios from 'axios';
import { useEffect, useState } from 'react';
import './Dashboard.scss';

function Dashboard() {
  const [conversations, setConversations] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
                  <li key={conv.id}>Entre {`${conv.rental.ownerUser.pseudo} `}
                    et {conv.interestedUser.pseudo}
                  </li>
                ))}
              </ul>
            </details>

            <p>{conversations.unread.length + conversations.read.length} conversation{conversations.unread.length + conversations.read.length > 1 ? 's' : ''} au total</p>
          </>
        )}
    </div>
  );
}

export default Dashboard;
