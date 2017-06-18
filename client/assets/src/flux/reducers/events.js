import update from 'react-addons-update';

const events = (state = {eventList: []}, action) => {
	let eventList = null;
	let item = null;
	let id = null;
	let settings = null;

	switch (action.type) {

		case 'SET_EVENTS':
			let list = action.events.map((item) => {
				item = update(item, {
					date: {$set: new Date(item.date)},
					hour: {$set: new Date(item.date)},
					name: {$set: item.title}
				});

				return item;
			});

			return { eventList: (list) }

		case 'SAVE_EVENT':
			item = action.eventItem;
			let oldItem = action.eventItem;
			eventList = state.eventList;

			let date = item.date;

			if(item.hours) {
				date.setHours(item.hours.getHours());
				date.setMinutes(item.hours.getMinutes());
				date = date.toISOString().split(".");
				date = date[0];
			} else {
				date.setHours('00');
				date.setMinutes('00');
				date = date.toISOString().split(".");
				date = date[0];
			}

			item = update(item, {
				date: {$set: date},
				title: {$set: item.name}
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

			$.ajax(update(settings, {$merge: {url: helper.urls.events + (item.id == null ? '' : item.id)}})).done((response) => {
				console.log(response.id);
				eventList = (update(state.eventList, {[response.id]: {$set: update(oldItem, {$merge: {id: response.id}})}}));
			});

			return { eventList: eventList };

		case 'DELETE_EVENT':
			id = action.id;

			console.log(id, state.eventList);

			let index = getIndexById(state.eventList, id);

			settings = {
				async: false,
				crossDomain: true,
				processData: false,
				method: "DELETE",
				data: JSON.stringify({id: id})
			};

			$.ajax(update(settings, {$merge: {url: helper.urls.events + id}}));

			return { eventList: (update(state.eventList, {$splice: [[index, 1]]})) };

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

export default events