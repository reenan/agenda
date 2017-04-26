import update from 'react-addons-update';

let noteList = [{
	id: 0,
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus sem, a rhoncus ex. Vivamus vestibulum sagittis faucibus. Maecenas at massa at dolor finibus egestas sit amet sit amet lacus.',
},{
	id: 1,
	description: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vulputate, diam scelerisque aliquet ultrices, metus risus dictum augue.',
},{
	id: 2,
	description: 'Pellentesque luctus neque neque, in congue erat vulputate sed. Vestibulum egestas felis et enim posuere, vel tristique elit feugiat.',
},{
	id: 3,
	description: 'Fusce velit elit, aliquet quis mauris in, lobortis eleifend sem. Nunc porttitor elit efficitur luctus blandit. Etiam nec dui ut lorem malesuada tincidunt a ac lectus.',
},{
	id: 4,
	description: 'Suspendisse potenti. Vivamus fermentum cursus magna ac tempus. Sed aliquet congue augue, eu egestas diam fringilla et.',
},{
	id: 5,
	description: 'Vivamus mauris risus, tempus at auctor sed, ornare ac erat. Aliquam felis erat, aliquam ac ipsum vel, tempor faucibus felis. Suspendisse condimentum nisl sodales ante consequat molestie.',
}];

const notes = (state = {noteList: noteList}, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export default notes