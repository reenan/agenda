let eventID, alarmID, noteID = 0;

export const addEvent = () => {
	return {
		type: 'ADD_EVENT',
		id: eventID++
	}
}

export const addAlarm = () => {
	return {
		type: 'ADD_ALARM',
		id: eventID++
	}
}

export const addNote = () => {
	return {
		type: 'ADD_NOTE',
		id: eventID++
	}
}

export const selectDate = (currentDate) => {
	return {
		type: 'SELECT_DATE',
		currentDate: currentDate
	}
}

export const selectMenu = (menu) => {
	return {
		type: 'SELECT_MENU',
		activeMenu: menu
	}
}

export const saveEvent = (item) => {
	return {
		type: 'SAVE_EVENT',
		eventItem: item
	}
}

export const deleteEvent = (id) => {
	return {
		type: 'DELETE_EVENT',
		id: id
	}
}

export const saveNote = (item) => {
	return {
		type: 'SAVE_NOTE',
		noteItem: item
	}
}

export const deleteNote = (id) => {
	return {
		type: 'DELETE_NOTE',
		id: id
	}
}

