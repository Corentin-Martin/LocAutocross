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
import Vehicles from '../../pages/Vehicles/Vehicles';

function App() {
  return (
    <Container>
      <div className="App">

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

          {/* PROTECTED */}
          <Route
            path="/garage"
            element={(<Skeleton page={<Vehicles />} />)}
          />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="conversation/:id" element={<Chat />} />
        </Routes>
      </div>
    </Container>

  );
}

export default App;
