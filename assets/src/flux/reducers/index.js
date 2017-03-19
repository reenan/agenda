import { combineReducers } from 'redux'
import calendar from './calendar.js';
import menu from './menu.js';

const reducer = combineReducers({
	calendar,
	menu
})

export default reducer