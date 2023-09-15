import { Route, Routes } from 'react-router-dom';
import GeneralCalendar from '../GeneralCalendar/GeneralCalendar';
import Rental from '../Rental/Rental';
import './App.scss';

function App() {
  return (

    <Routes>
      <Route path="/" element={<GeneralCalendar />} />
      <Route path="location/:rentalId" element={<Rental />} />
    </Routes>

  );
}

export default App;
