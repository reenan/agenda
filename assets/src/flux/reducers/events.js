import update from 'react-addons-update';

let eventList = [{
	id: 0,
	name: 'Show Legal',
	date: new Date(new Date().setDate(new Date().getDate())),
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
	hour: '12:00',
	tag: 'red'
},{
	id: 1,
	name: 'Teatro Cultural Apresentação Única em Porto Alegre',
	description: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vulputate, diam scelerisque aliquet ultrices, metus risus dictum augue.',
	date: new Date(new Date().setDate(new Date().getDate() + 10)),
	hour: '11:00',
	tag: 'blue'
},{
	id: 2,
	name: 'Reunião',
	description: 'Pellentesque luctus neque neque, in congue erat vulputate sed. Vestibulum egestas felis et enim posuere, vel tristique elit feugiat.',
	date: new Date(new Date().setDate(new Date().getDate() + 20)),
	hour: '13:00',
	tag: 'green'
},{
	id: 3,
	name: 'Aniversário',
	description: 'Fusce velit elit, aliquet quis mauris in, lobortis eleifend sem. Nunc porttitor elit efficitur luctus blandit. Etiam nec dui ut lorem malesuada tincidunt a ac lectus.',
	date: new Date(new Date().setDate(new Date().getDate() + 30)),
	hour: '14:00',
	tag: 'yellow'
},{
	id: 4,
	name: 'Viagem',
	description: 'Suspendisse potenti. Vivamus fermentum cursus magna ac tempus. Sed aliquet congue augue, eu egestas diam fringilla et.',
	date: new Date(new Date().setDate(new Date().getDate() + 40)),
	hour: '15:00',
	tag: 'blue'
},{
	id: 5,
	name: 'Trabalho',
	description: 'Vivamus mauris risus, tempus at auctor sed, ornare ac erat. Aliquam felis erat, aliquam ac ipsum vel, tempor faucibus felis. Suspendisse condimentum nisl sodales ante consequat molestie.',
	date: new Date(new Date().setDate(new Date().getDate() + 50)),
	hour: '19:00',
	tag: 'red'
}];

const events = (state = {eventList: eventList}, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export default events