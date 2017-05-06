import update from 'react-addons-update';

let noteList = [{
	id: 0,
	title: 'Lembrete 1',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	begin: new Date(),
	end: new Date(new Date().setDate(new Date().getDate() + 10))
},{
	id: 1,
	title: 'Lembrete 2',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	begin: new Date(),
	end: new Date(new Date().setDate(new Date().getDate() + 10))
},{
	id: 2,
	title: 'Lembrete 3',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	begin: new Date(),
	end: new Date(new Date().setDate(new Date().getDate() + 10))
},{
	id: 3,
	title: 'Lembrete 4',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	begin: new Date(),
	end: new Date(new Date().setDate(new Date().getDate() + 10))
},{
	id: 4,
	title: 'Lembrete 5',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	begin: new Date(),
	end: new Date(new Date().setDate(new Date().getDate() + 10))
},{
	id: 5,
	title: 'Lembrete 6',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	begin: new Date(),
	end: new Date(new Date().setDate(new Date().getDate() + 10))
}];

noteList = [];

const notes = (state = {noteList: noteList}, action) => {
	switch (action.type) {
		case 'SAVE_NOTE':
			let item = action.noteItem;
			let noteList = state.noteList;

			if(item.id == null) {
				if(state.noteList.length > 0) {
					item.id = state.noteList[state.noteList.length - 1].id + 1;
					noteList = update(state.noteList, {[item.id]: {$set: item}});
				} else {
					item.id = 0;
					noteList[0] = item;
				}
			} else {
				noteList = update(state.noteList, {[item.id]: {$set: item}});
			}

			return { noteList: noteList };

		case 'DELETE_NOTE':
			let id = action.id;
			let index = getIndexById(state.noteList, id);
			return { noteList: update(state.noteList, {$splice: [[index, 1]]}) };

		default:
			return state
	}
}

function getIndexById(list, id) {
	for(let i = 0; i < list.length; i++) {
		if(list[i].id == id) {
			return i;
		}
	}
}

export default notes