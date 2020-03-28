<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="tip">已有美团账号？</em>
          <nuxt-link to="/login">
            <el-button type="primary" size="samll">登录</el-button>
          </nuxt-link>
        </span>
      </header>
    </article>
    <section>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sengMsg('ruleForm')" :disabled="isableBtn">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resister">同意以下协议并注册</el-button>
          <div class="error">{{errorMsg}}</div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>

import CryptoJS from 'crypto-js';
import { URL } from '@/config/config'
export default {
  layout: 'blank',
  data() {
    return {
      errorMsg: '',
      statusMsg: '',
      isableBtn: false,
      ruleForm: {
        name: '',
        email: '',
        password: '',
        cpwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' , type: 'email'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        cpwd: [
          { required: true, message: '确认密码', trigger: 'blur' },
          {validator: (rule, value, callback) => {
            if (value === '请再次输入密码') {
              callback(new Error())
            }else if (value !== this.ruleForm.password) {
              callback(new Error('两次输入密码不一致'))
            }else {
              callback()
            }
          }}
        ]
      }
    }
  },
  methods: {
    // 发送验证码
    sengMsg (formName) {
      let _self = this;
      let nameErrMsg,
          emailErrMsg;
      _self.$refs[formName].validateField('name', (errMsg) => {
        nameErrMsg = errMsg;
      })
      if (nameErrMsg) {
        return false
      }
      _self.$refs[formName].validateField('email', (errMsg) => {
        emailErrMsg = errMsg;
      })
      if (emailErrMsg) {
        return false
      }
      if (!nameErrMsg && !emailErrMsg) {
        
        _self.$axios.post(URL.API_BASE_URL + '/users/verify', {
          username: encodeURIComponent(_self.ruleForm.name),
          email: _self.ruleForm.email
        }).then(({status, data}) => {
          if (status === 200 && data.code === 0) {
            let count = 60;
            _self.statusMsg = `验证码已发送，剩余${count--}秒`;
            _self.isableBtn = true;
            let _time = setInterval(function(){
               if (count === 0) {
                 clearInterval(_time);
                 _self.statusMsg = '';
                 _time = null;
                _self.isableBtn = false;
               }else{
                 _self.statusMsg = `验证码已发送，剩余${count--}秒`;
               }
               
            },1000)

          }
        })
      }
    },
    // 注册用户
    resister () {
      let _self = this;
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          _self.$axios.post(URL.API_BASE_URL + '/users/signup', {
            username: encodeURIComponent(_self.ruleForm.name), // 中文名字转字符编码
            password: CryptoJS.MD5(_self.ruleForm.password).toString(), // MD5加密
            email: _self.ruleForm.email,
            code: _self.ruleForm.code
          }).then(({status, data}) => {
            if (status === 200) {
              if (data && data.code === 0) {
                location.href = '/login'
              }else{
                _self.errorMsg = data.msg;
              }
            }else{
              _self.errorMsg = `服务器出错，错误码为${status}`;
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" >
  @import '@/assets/css/register/index.scss';
  .page-register /deep/  .el-form-item__error {
    padding-left: 4px;
    top: 30%;
    left: 100%;
    width: 100px;
  }
  .page-register /deep/ .email .el-form-item__error {
    padding-left: 4px;
    top: 15%;
    left: 100%;
    width: 100px;
  }
  .page-register  /deep/  .el-form-item {
    margin-bottom: 12px;
  }
  .page-register  /deep/.el-form-item.email {
    margin-bottom: 2px;
  }
  .page-register  /deep/.el-form {
    width: 50%;
    margin: 0 auto;
  }
</style>