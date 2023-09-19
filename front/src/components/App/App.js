import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from '../Dashboard/Dashboard';
import Chat from '../Chat/Chat';
import './App.scss';
import Skeleton from '../Skeleton/Skeleton';
import Homepage from '../../pages/Homepage/Homepage';
import Rental from '../../pages/Rental/Rental';
import Calendar from '../../pages/Calendar/Calendar';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';

function App() {
  return (
    <Container>

      <Routes>
        <Route
          path="/"
          element={(<Skeleton page={<Homepage />} />)}
        />
        <Route
          path="/calendrier"
          element={(<Skeleton page={<Calendar />} />)}
        />
        <Route
          path="/location/:rentalId"
          element={(<Skeleton page={<Rental />} />)}
        />
        <Route
          path="/connexion"
          element={(<Skeleton page={<Login />} />)}
        />
        <Route
          path="/inscription"
          element={(<Skeleton page={<Registration />} />)}
        />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="conversation/:id" element={<Chat />} />
      </Routes>
    </Container>

  );
}

export default App;
