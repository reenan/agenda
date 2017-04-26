import { combineReducers } from 'redux'
import calendar from './calendar.js';
import menu from './menu.js';
import events from './events.js';
import notes from './notes.js';

const reducer = combineReducers({
	calendar,
	menu,
	events,
	notes
})

export default reducer