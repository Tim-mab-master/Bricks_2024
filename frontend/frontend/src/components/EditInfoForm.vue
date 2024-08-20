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
  
   //個人資訊開頭
import axios from "axios";
  export default {
    
    props: {
      user_name: {
        type: String,
        default: ''  
      }
    },
    data() {
      return {
        email: '',
        password: '',
        user_name: this.user_name,
        showPassword: false // 控制密碼顯示或隱藏
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword; // 切換密碼為隱藏
      }
    },
    mounted(){
        const show_info = "http://35.201.168.185:5000/show_info";
        axios
        .post(show_info, null,{
            headers: { authorization: JSON.parse(localStorage.getItem("auth")) },
        })
        .then((res) => {
            if (res.data.status === "success"){
                this.user_name = res.data.user_info.user_name;
            }
        })
    }
  };
  </script>
  <style scoped>
  /* 可選：自定義顯示密碼圖標的樣式 */
  .el-input__suffix {
    cursor: pointer;
  }
  
  </style>
  
