import { combineReducers } from 'redux';
import generalCalendarReducer from 'src/reducers/generalCalendar';
import userReducer from 'src/reducers/user';

const rootReducer = combineReducers({
  generalCalendar: generalCalendarReducer,
  user: userReducer,
});

export default rootReducer;
