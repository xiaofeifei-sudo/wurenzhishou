<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="content">
      <header class="logo center">
        <img alt
             src="../../assets/images/login-logo.png" />
      </header>
      <div class="form-con">
        <login-form @on-success-valid="handleSubmit"></login-form>
      </div>
      <footer class="center footerDesc">无人值守客服管理系统 由重庆市集域大千科技有限公司创新驱动</footer>
    </div>
  </div>
</template>
<script>
import LoginForm from './components/login-form';
import { mapActions } from 'vuex';
import $ from 'jquery';
import { lonWave, canvasParticle } from './canvas';
export default {
  name: 'login',
  props: {},
  components: {
    LoginForm
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.$Spin.hide();
  },
  methods: {
    ...mapActions(['handleLogin']),
    // 提交
    handleSubmit (params) {
      console.log(params)
      // this.handleLogin(params).then(res => {
      //   this.$router.push({
      //     name: this.$config.homeName
      //   });
      // });
    }
  }
};
</script>
