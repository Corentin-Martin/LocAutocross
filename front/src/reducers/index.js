import { combineReducers } from 'redux';
import generalCalendarReducer from 'src/reducers/generalCalendar';
import userReducer from 'src/reducers/user';
import dashboardReducer from 'src/reducers/dashboard';

const rootReducer = combineReducers({
  generalCalendar: generalCalendarReducer,
  user: userReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
