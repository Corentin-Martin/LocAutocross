import './App.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Skeleton from '../Skeleton/Skeleton';
import Homepage from '../../pages/Homepage/Homepage';
import Rental from '../../pages/Rental/Rental';
import Calendar from '../../pages/Calendar/Calendar';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import Vehicles from '../../pages/Vehicles/Vehicles';
import RentalGestion from '../../pages/RentalGestion/RentalGestion';
import { setFederations } from '../../actions/generalCalendar';
import { setMyVehicles } from '../../actions/dashboard';
import {
  setConversations, setToken, setUser, setUserConnected,
} from '../../actions/user';
import Conversation from '../../pages/Conversation/Conversation';
import ProtectedRoute from '../../utils/ProtectedRoute';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';
import Events from '../../pages/Events/Events';
import Tracks from '../../pages/Tracks/Tracks';
import EventPage from '../../pages/EventPage/EventPage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import About from '../../pages/About/About';
import LegalNotice from '../../pages/LegalNotice/LegalNotice';
import Confidentiality from '../../pages/Confidentiality/Confidentiality';
import Track from '../../pages/Track/Track';
import Rentals from '../../pages/Rentals/Rentals';
import Profil from '../../pages/Profil/Profil';

function App() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const conversation = useSelector((state) => state.dashboard.conversation);

  const dispatch = useDispatch();
  useEffect(() => {
    AxiosPublic.get('federations')
      .then((response) => {
        dispatch(setFederations(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      dispatch(setToken(localStorage.getItem('token')));
      dispatch(setUserConnected(true));
    }
  }, [token]);

  useEffect(() => {
    if (token !== null) {
      AxiosPrivate.get('vehicles?my')
        .then((response) => {
          dispatch(setMyVehicles(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token !== null) {
      AxiosPrivate.get('user')
        .then((response) => {
          dispatch(setUser(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);

  const location = useLocation();

  useEffect(() => {
    if (token !== null) {
      AxiosPrivate.get('conversations')
        .then((response) => {
          dispatch(setConversations(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token, conversation === null, location.pathname]);

  if (token !== null && user === null) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ flexGrow: '1' }}>
        <LoadingSpinner />
      </div>
    );
  }

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
            path="/circuits"
            element={(<Skeleton page={<Tracks />} />)}
          />
          <Route
            path="/locations"
            element={(<Skeleton page={<Rentals />} />)}
          />
          <Route
            path="/location/:rentalId"
            element={(<Skeleton page={<Rental />} />)}
          />
          <Route
            path="/evenement/:eventId"
            element={(<Skeleton page={<EventPage />} />)}
          />
          <Route
            path="/circuit/:trackId"
            element={(<Skeleton page={<Track />} />)}
          />
          <Route
            path="/connexion"
            element={(<Skeleton page={<Login />} />)}
          />
          <Route
            path="/reset/:token?"
            element={(<Skeleton page={<ResetPassword />} />)}
          />
          <Route
            path="/inscription"
            element={(<Skeleton page={<Registration />} />)}
          />
          <Route
            path="/a-propos"
            element={(<Skeleton page={<About />} />)}
          />
          <Route
            path="/mentions-legales"
            element={(<Skeleton page={<LegalNotice />} />)}
          />
          <Route
            path="/confidentialite"
            element={(<Skeleton page={<Confidentiality />} />)}
          />

          {/* RESERVED FOR PRO */}
          <Route element={<ProtectedRoute pro />}>
            <Route
              path="/mon-garage"
              element={(<Skeleton page={<Vehicles />} />)}
            />
            <Route
              path="/mes-locations"
              element={(<Skeleton page={<RentalGestion />} />)}
            />
            <Route
              path="/mes-evenements"
              element={(<Skeleton page={<Events />} />)}
            />
          </Route>

          {/* RESERVED FOR USER */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/mon-profil"
              element={(<Skeleton page={<Profil />} />)}
            />
            <Route
              path="/mes-conversations"
              element={(<Skeleton page={<Conversation />} />)}
            />
          </Route>

        </Routes>
      </div>
    </Container>

  );
}

export default App;
