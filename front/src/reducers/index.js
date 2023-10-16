import { combineReducers } from 'redux';
import generalCalendarReducer from 'src/reducers/generalCalendar';
import userReducer from 'src/reducers/user';
import dashboardReducer from 'src/reducers/dashboard';
import mapReducer from 'src/reducers/map';

const rootReducer = combineReducers({
  generalCalendar: generalCalendarReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  map: mapReducer,
});

export default rootReducer;
