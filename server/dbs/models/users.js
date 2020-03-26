import mongoose from 'mongoose'
// 用户数据模型
// 设置模式
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    requried: true
  },
  email: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', UserSchema) // (模型名称，模型数据)