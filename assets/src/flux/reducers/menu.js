import update from 'react-addons-update';

let menuList = [{
	id: 0,
	name: 'Início',
	icon: 'home'
}, {
	id: 1,
	name: 'Calendário',
	icon: 'calendar'
}, {
	id: 2,
	name: 'Lembretes',
	icon: 'file-text'
}, {
	id: 3,
	name: 'Configurações',
	icon: 'cog'
}];

const menu = (state = {menuList: menuList, activeMenu: 0}, action) => {
	switch (action.type) {
		case 'SELECT_MENU':
			return update(state, {activeMenu: {$set: action.activeMenu}})
		default:
			return state
	}
}

export default menu