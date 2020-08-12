<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像-->
      <div class="img_box">
        <div class="avatar_box">
          <img src="../assets/img/7.jpg">
        </div>
        <div class="login_form">
          <el-form label-width="0px" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
            <!--            用户名-->
            <el-form-item label="" prop="username">
              <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
            </el-form-item>
            <!--            密码-->
            <el-form-item label="" prop="password">
              <el-input prefix-icon="el-icon-key" v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <!--            按钮-->
            <el-form-item label="" class="form_botton">
              <div>
                <el-button round type="success" @click="login">登录</el-button>
                <el-button round style="float:right;" @click="resetLoginForm">重置</el-button>
              </div>
            </el-form-item>
          </el-form>

        </div>
      </div>
      <!--      表单-->

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      // 登录表单数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证对象
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入正确的用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入正确的密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    cl () {
      console.log(this)
    },

    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) {
          return
        }
        // console.log(this.loginForm)
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败!!!')
        this.$message.success('登录成功!!!')
        // 将token保存到sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        //  跳转后台主页 /home

        this.$router.push('/home')
      })
    },
    resetLoginForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    }
  }

}
</script>
<style scoped lang="less">
.login_container {
  background-color: #bbe6d6;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_box {
  height: 22em;
  width: 25vw;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  justify-content: center;
  //align-items: center;
  //头像
  .img_box {
    width: 100%;
    height: 60px;

    .avatar_box {
      //z-index: 10;
      //float: left;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      border: 1px solid #eee;
      padding: 10px;
      background-color: #fff;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;

      img {
        border-radius: 50%;
        height: 100%;
        width: 100%;
        background-color: #eee;
        box-shadow: 0 0 10px #ddd;
      }

      img:hover {
        height: 97%;
        width: 97%;
        transition: all 0.3s linear;
      }
    }

  }

  //输入框
  el-form {
    width: 90%;

    el-form-item el-input {
      width: 80%;
    }
  }

  .login_form {
    //height: 200px;
    //background-color: #000;
    display: flex;
    justify-content: center;
  }
}
</style>
