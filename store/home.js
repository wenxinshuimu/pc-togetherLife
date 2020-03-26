export const state = () => ({
  menu: [], // 菜单
  hotSearch: [] // 热门搜索
})

export const mutations = {
	setMenu (state, val) {
		state.menu = val;
	},
	setHotSearch (state, val) {
		state.hotSearch = val;
	}
}

export const actions = {
	setMenu ({commit}, menu) {
		commit('setMenu', menu)
	},
	setHotSearch ({commit}, hotSearch) {
		commit('setHotSearch', hotSearch)
	}
}