export const actions = {
  // app 包含所有插件的根实例
  async nuxtServerInit({commit}, {req, app, ctx}) {
    // console.log(app.$cookiz.get('city'))  //每次请求获取cooie
    const city = app.$cookiz.get('city'),
          province = app.$cookiz.get('province');
    if (city && province) {
      //console.log(city)  //每次请求获取cooie
      const position = {
        city,
        province
      }
      commit('geo/setPosition', position);
     }else{
        // 获取地理位置数据
        const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition');
        // 提交mutations,设置值
        commit('geo/setPosition', status === 200 ? {city,province} : {city: '', province: ''});
     }
     //console.log(app.store.state.geo.position)
    // 获取菜单数据
    const {status: statusMenu, data: {menu}} = await app.$axios.get('/geo/menu');
    commit('home/setMenu', statusMenu === 200 ? menu : []);
    // 获取热门搜索数据
    const {status: hotSearchStatus, data: {result}} = await app.$axios.get('search/hotSearch', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    });
    commit('home/setHotSearch', hotSearchStatus === 200 ? result : []);
  }
}