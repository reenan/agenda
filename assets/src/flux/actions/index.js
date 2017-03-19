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
