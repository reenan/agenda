import update from 'react-addons-update';

const notes = (state = {noteList: []}, action) => {
	let noteList = null;
	let item = null;
	let id = null;
	let settings = null;

	switch (action.type) {

		case 'SET_NOTES':
			id = null;
			let list = action.notes.map((item) => {
				item = update(item, {
					begin: {$set: new Date(item.begin)}, 
					end: {$set: new Date(item.end)}
				});

				return item;
			});

			return { noteList: list }

		case 'SAVE_NOTE':
			item = action.noteItem;
			let oldItem = action.noteItem;
			noteList = state.noteList;

			let begin = item.begin;
			let end = item.end;

			if(item.begin) {
				begin = begin.toISOString().split(".");
				begin = begin[0];
			}

			if(item.end) {
				end = end.toISOString().split(".");
				end = end[0];
			}

			item = update(item, {
				begin: {$set: begin},
				end: {$set: end}
			});

			settings = {
				async: false,
				crossDomain: true,
				"headers": {
					"content-type": "application/json"
				},
				processData: false,
				method: item.id == null ? "POST" : "PUT",
				data: JSON.stringify(item)
			};

			$.ajax(update(settings, {$merge: {url: helper.urls.notes + (item.id == null ? '' : item.id)}})).done((response) => {
				noteList = update(state.noteList, {[response.id]: {$set: update(oldItem, {$merge: {id: response.id}})}});
			});

			return { noteList: noteList };

		case 'DELETE_NOTE':
			id = action.id;
			let index = getIndexById(state.noteList, id);

			settings = {
				async: false,
				crossDomain: true,
				processData: false,
				method: "DELETE",
				data: JSON.stringify({id: id})
			};

			$.ajax(update(settings, {$merge: {url: helper.urls.notes + id}}));

			return { noteList: update(state.noteList, {$splice: [[index, 1]]}) };

		default:
			return state
	}
}

function getIndexById(list, id) {
	for(let i = 0; i < list.length; i++) {
		if(list[i] && list[i].id == id) {
			return i;
		}
	}
}

export default notes