import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from '../Dashboard/Dashboard';
import GeneralCalendar from '../GeneralCalendar/GeneralCalendar';
import Login from '../Login/Login';
import Rental from '../Rental/Rental';
import Chat from '../Chat/Chat';
import './App.scss';
import Skeleton from '../Skeleton/Skeleton';
import Homepage from '../../pages/Homepage/Homepage';

function App() {
  return (
    <Container>

      <Routes>
        <Route
          path="/"
          element={(<Skeleton page={<Homepage />} />)}
        />
        <Route path="location/:rentalId" element={<Rental />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="conversation/:id" element={<Chat />} />
      </Routes>
    </Container>

  );
}

export default App;
