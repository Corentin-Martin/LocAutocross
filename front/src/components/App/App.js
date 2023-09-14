import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import GeneralCalendar from '../GeneralCalendar/GeneralCalendar';
import Login from '../Login/Login';
import Rental from '../Rental/Rental';
import Chat from '../Chat/Chat';
import './App.scss';

function App() {
  return (

    <Routes>
      <Route path="/" element={<GeneralCalendar />} />
      <Route path="location/:rentalId" element={<Rental />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="conversation/:id" element={<Chat />} />
    </Routes>

  );
}

export default App;
