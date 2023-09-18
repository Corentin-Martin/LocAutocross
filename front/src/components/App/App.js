import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import './App.scss';
import Skeleton from '../Skeleton/Skeleton';
import Homepage from '../../pages/Homepage/Homepage';
import Rental from '../../pages/Rental/Rental';
import Calendar from '../../pages/Calendar/Calendar';

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

        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="conversation/:id" element={<Chat />} />
      </Routes>
    </Container>

  );
}

export default App;
