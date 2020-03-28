import HTTP from '../../utils/http'
import { URL } from '../../config/config'

class UserModel extends HTTP {
  async getUserData () {
    const {status, data} = await this.$axios.get(URL.API_BASE_URL + '/users/getUser');
    if (status === 200) {
      if (data) {
        this.user = data.user;
      }
    }
  }
}
module.exports = UserModel;