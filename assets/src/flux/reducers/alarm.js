let alarmsExample = [{
	id: 1,
	name: 'Alarme1',
	hour: '11:11',
	date: '11/12/1994',
	playing: false
}, {
	id: 2,
	name: 'Alarme2',
	hour: '22:22',
	date: '13/13/1995',
	playing: false
}];

const alarm = (state = {list: alarmsExample}, action) => {
	switch (action.type) {
		case 'ADD_ALARM':
			return { list: state.list.push({id: action.id, name: '', hour: '', date: '', playing: false})}
		default:
			return state
	}
}

export default alarm