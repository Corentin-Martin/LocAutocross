import { combineReducers } from 'redux';
import generalCalendarReducer from 'src/reducers/generalCalendar';

const rootReducer = combineReducers({
  generalCalendar: generalCalendarReducer,
});

export default rootReducer;
