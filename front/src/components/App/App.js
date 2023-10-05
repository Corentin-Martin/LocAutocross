import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.scss';
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
import { setToken, setUser, setUserConnected } from '../../actions/user';
import Conversation from '../../pages/Conversation/Conversation';
import ProtectedRoute from '../../utils/ProtectedRoute';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';

function App() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
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
            path="/reset/:token?"
            element={(<Skeleton page={<ResetPassword />} />)}
          />
          <Route
            path="/inscription"
            element={(<Skeleton page={<Registration />} />)}
          />

          {/* PROTECTED */}
          <Route element={<ProtectedRoute user={user} pro />}>
            <Route
              path="/mon-garage"
              element={(<Skeleton page={<Vehicles />} />)}
            />
            <Route
              path="/mes-locations"
              element={(<Skeleton page={<RentalGestion />} />)}
            />
          </Route>
          <Route element={<ProtectedRoute user={user} />}>
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
