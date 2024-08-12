<template>
    <div>
      <el-input v-model="email" placeholder="請輸入你的新郵件地址"></el-input>
      <el-input 
      v-model="password" 
      placeholder="請輸入你的新密碼" 
      :type="showPassword ? 'text' : 'password'" 
      style="margin-top: 10px;"
      suffix-icon="el-icon-view"
      @click-suffix="togglePasswordVisibility"
    ></el-input>      
    <el-input v-model="user_name" placeholder="請輸入你的新名字" style="margin-top: 10px;"></el-input>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        user_name: '',
        showPassword: false // 控制密碼顯示或隱藏
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword; // 切換密碼為隱藏
      }
    },
  };
  </script>
  <style scoped>
  
  </style>