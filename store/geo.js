export const state = () => ({
	position: {
		city: '成都市',
		province: '四川省'
	}
})

export const mutations = {
	setPosition (state, val) {
		state.position = val;
	}
}

export const actions = {
	setPosition ({commit}, position) {
		commit('setPosition', position)
	}
}