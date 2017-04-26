const calendar = (state = {currentDate: new Date()}, action) => {
	switch (action.type) {
		case 'SELECT_DATE':
			return { currentDate: action.currentDate }
		default:
			return state
	}
}

export default calendar