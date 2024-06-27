<template>
  <div style="width: 100%; position: absolute; left: 0; top: 0">
    <div class="nav">
      <a href="./homepage">
        <img src="../assets/brickslogo.svg" alt="" />
      </a>
      <div class="tribtn">
        <div class="btn">試用</div>
        <a
          href="./login"
          class="btn nav_login_btn"
          style="
            background-color: #b82c30;
            border-color: #b82c30;
            color: #ffffff;
          "
          >登入</a
        >
        <a href="./register" class="btn" style="margin-right: 0px">註冊</a>
      </div>
    </div>
    <div class="bg">
      <!-- 帳號密碼輸入問題 -->
      <div class="warning">
        <Transition name="errorIn">
          <el-alert
            v-if="alertWrongPassword"
            title="您的帳號或密碼不正確，請再輸入一次"
            type="error"
            show-icon
        /></Transition>
        <Transition name="errorIn">
          <el-alert
            v-if="alertBlankInput"
            title="請填寫您的帳號與密碼資訊"
            type="error"
            show-icon
        /></Transition>
      </div>

      <div class="middle">
        <p class="title">登入</p>
        <div class="enter">
          <div class="wrong" v-if="error">
            <img src="../assets/exclamation.svg" alt="" />
            <!-- 跳出的錯誤信息在這 -->
            <p>{{ errorMessage }}</p>
          </div>
          <div class="wrong" v-else style="opacity: 0">
            <img src="../assets/exclamation.svg" alt="" />
            <!-- 跳出的錯誤信息在這 -->
            <p></p>
          </div>
          <input
            required
            autofocus
            class="account"
            placeholder="帳號 (電子信箱)"
            v-model="account"
          />
          <input
            v-if="showpassword"
            required
            class="password"
            type="text"
            placeholder="請輸入 6~20 含英數之密碼"
            v-model="password"
          />
          <input
            v-else
            required
            class="password"
            type="password"
            placeholder="請輸入 6~20 含英數之密碼"
            v-model="password"
          />
          <img
            v-if="showpassword"
            id="eye_on"
            src="../assets/eye/eye_on.svg"
            alt=""
            @click="eyebtn"
          />
          <img
            v-else
            id="eye_off"
            src="../assets/eye/eye_origin.svg"
            alt=""
            @click="eyebtn"
          />
        </div>
        <div class="keep_login">
          <img
            src="../assets/checkbox/CheckBox_off.svg"
            class="keep_login_checkbox keep_login_checkbox_off"
            v-if="!checked"
            @click="check_btn"
          />
          <img
            src="../assets/checkbox/CheckBox_on.svg"
            class="keep_login_checkbox keep_login_checkbox_on"
            v-else
            @click="check_btn"
          />
          <p
            style="
              user-select: none;
              cursor: pointer;
              font-size: 15.4px;
              margin-top: 1.4px;
            "
            @click="check_btn"
          >
            保持登入
          </p>
        </div>
        <!-- 點擊登入按鈕的事件放在這邊 -->
        <div class="login_btn" @click="goToPersonalPage">登入</div>
        <div
          class="forget_password"
          style="font-size: 15.4px; margin-top: 1.4px"
        >
          忘記密碼
        </div>
        <div class="line">
          <div class="left_line"></div>
          <div class="right_line"></div>
          <p>或</p>
        </div>
        <div class="other_resource">
          <a href="">
            <div id="Google_login_btn">
              <img src="../assets/Google_login.svg" alt="" />
              <p>Google 登入</p>
            </div>
          </a>

          <a href="">
            <div id="FB_login_btn">
              <img src="../assets/FB_login.svg" alt="" />
              <p>Facebook 登入</p>
            </div>
          </a>
        </div>
        <div class="register">
          <p style="font-size: 16px; margin-top: 1.4px">還沒有帳戶？</p>
          <a href="./register">
            <p style="font-size: 16px; margin-top: 1.4px">註冊</p>
          </a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <a href="" class="privacy"
        ># <span style="text-decoration: underline">隱私權政策</span></a
      >
      <a href="" class="contact"
        ># 聯絡我們 <span style="color: #b6aeae">bricks@gmail.com</span></a
      >
      <div class="photo">
        # Photo by
        <a href="https://unsplash.com/@charlesdeluvio">charlesdeluvio</a> on
        Unsplash
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Base64 } from "js-base64";
import PersonalHomepageVue from "./PersonalHomepage.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Login",

  setup() {
    const router = useRouter();

    const account = ref("");
    const password = ref("");
    const showpassword = ref(false);
    const error = ref(false); // 錯誤訊息的div顯示
    const checked = ref(false);

    const authorization = ref("");
    const errorMessage = ref("");
    const errorTime = ref(0);
    const token = ref("");
    const decode_token_json = ref("");
    const loggedIn = ref(false);
    const alertWrongPassword = ref(false);
    const alertBlankInput = ref(false);

    const eyebtn = () => {
      showpassword.value = !showpassword.value;
    };
    const check_btn = () => {
      checked.value = !checked.value;
    };
    // login的事件，目前這個用不到了
    const login = () => {
      //前端部分先進行帳號密碼原則檢驗，還有其他條件式
      if (password == "" || account == "") {
        // this.$refs.account.style = "border-color : #e03939";
        // this.$refs.password.style = "border-color : #e03939";
        // this.$refs.wrong1.style = "display : block";
        // this.$refs.wrong2.style = "display : block";
        alertBlankInput.value = true; // this.errorTime = this.errorTime + 1;
        error = true;
      } else {
        const path = "http://34.81.219.139:5000/bricks_login";
        const user = {
          user_email: account,
          user_password: password,
          isKeepLogin: checked,
        };
        console.log("user: ", user);
        account = "";
        password = "";
        axios
          .post(path, user)
          .then((res) => {
            // token 在 res.data裡面
            token = res.data;
            // 在Vue组件中的某个方法中执行解密操作
            decode_token_json = decodeToken(token);
            // 直接取出要的東西
            if (decode_token_json.status == "success") {
              errorTime = 0;

              this.$router.push({
                name: "PersonalHomepage",
                // params: { user_email: this.decode_token_json.user_email },
              });
            } else {
              // this.$refs.account.style = "border-color : #e03939";
              // this.$refs.password.style = "border-color : #e03939";
              // this.$refs.wrong1.style = "display : block";
              // this.$refs.wrong2.style = "display : block";
              // this.accountError = res.data.accountError;
              // this.passwordError = res.data.passwordError;
              errorTime = errorTime + 1;
              if (errorTime >= 3) {
                errorMessage = "如果登入時遇到困難，可點擊「忘記密碼」";
                errorTime = errorTime + 1;
              } else {
                // 之後改成 this.decode_token_json.message
                errorMessage = "您的帳號或密碼不正確，請再試一次";
              }
              error = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    //登入
    const goToPersonalPage = () => {
      alertBlankInput.value = false;
      alertWrongPassword.value = false;
      if (password == "" || account == "") {
        alertBlankInput.value = true;
      } else {
        axios
          .post("http://34.81.219.139:5000/bricks_login", {
            user_email: account._value,
            user_password: password._value,
          })
          .then((res) => {
            // 請求成功會觸發/執行這個 function 函式
            // 確認用戶是否存在資料庫
            if (res.data.status === "failure") {
              alertWrongPassword.value = true;
            } else if (res.data.status === "success") {
              // authorization.value = res.headers.Authorization;
              if (checked.value) {
                setCookie(account._value, password._value);
              } else {
                deleteCookie("password");
                deleteCookie("account");
              }

              router.push({
                name: "personalHomepage",
                params: { user_id: "25" },
              });
            } else {
              console.log("no");
            }
            // console.log(res);
          })
          .catch((error) => {
            // 請求失敗則觸發/執行這個 function 函式
            console.log(error);
          });
      }
    };

    //保持登入 => 紀錄cookie
    const setCookie = (account, password) => {
      document.cookie = "account=" + account;
      document.cookie = "password=" + password;
    };

    const deleteCookie = (name) => {
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    const decodeToken = (token) => {
      // 获取Token的第二部分（Payload）
      const encodedPayload = token.split(".")[1];
      // 解码Base64字符串
      const decodedPayload = Base64.decode(encodedPayload);
      // 将解码后的字符串转换为JavaScript对象
      const payloadObject = JSON.parse(decodedPayload);
      // 现在您可以在payloadObject中访问解密后的Token数据
      // console.log(payloadObject);
      // 返回解密后的Token数据，或进行其他后续处理
      return payloadObject;
    };

    //保持登入 => 讀取cookie
    const getCookie = () => {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split(";");
        for (let i = 0; i < arr.length; i++) {
          let element = arr[i].trim();
          if (element.substring(0, 8) == "account=") {
            account.value = element.substring(8);
          } else if (element.substring(0, 9) == "password=") {
            password.value = element.substring(9);
          }
        }
      }
    };

    //確認是否有登入過
    const checkCookie = () => {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split(";");
        for (let i = 0; i < arr.length; i++) {
          let element = arr[i].trim();
          if (element.substring(0, 8) == "account=") {
            //有cookie
            checked.value = true;
            getCookie();
          }
        }
      }
    };

    onMounted(() => {
      checkCookie();
    });

    return {
      showpassword,
      error, // 錯誤訊息的div顯示
      checked,
      account,
      password,
      authorization,
      errorMessage,
      errorTime,
      token,
      decode_token_json,
      loggedIn,
      alertWrongPassword,
      alertBlankInput,
      getCookie,
      checkCookie,
      decodeToken,
      setCookie,
      goToPersonalPage,
      eyebtn,
      check_btn,
      login,
      deleteCookie,
    };
  },
  created() {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.googleButton {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
}
.nav {
  width: 100vw;
  height: 65px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  z-index: 100;
  background: #ffff;
}

.nav img {
  height: 32.06px;
  width: auto;
  position: absolute;
  top: 16.47px;
  left: 5.21%;
}

.tribtn {
  width: 284px;
  height: 41px;
  position: absolute;
  top: 12px;
  right: 5.21%;
}

.btn {
  width: 76px;
  height: 39px;
  border: 1px solid #120405;
  background-color: white;
  border-radius: 10px;
  float: left;
  margin-right: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 39px;
  font-family: "Noto Sans TC";
  text-align: center;
  letter-spacing: 1.25px;
  user-select: none;
  text-decoration: none;
  color: black;
}

.btn:hover {
  background-color: rgba(242, 238, 238, 1);
}

.nav_login_btn:hover {
  background-color: rgba(212, 128, 131, 1) !important;
}
.bg {
  background-image: url(../assets/bricks_bg.svg);
  height: 80%;
}

.title {
  width: 100%;
  height: 36px;
  font-size: 24.75px;
  text-align: center;
  font-family: "Noto Sans TC";
  letter-spacing: 0.1875px;
  font-weight: 700;
  line-height: 36px;
  user-select: none;
}

.enter {
  width: 100%;
  height: 144px;
  position: absolute;
  top: 48px;
}

.wrong {
  width: 100%;
  height: 34.5px;
  border: 1px solid #c65659;
  border-radius: 14px;
  background-color: #f1d5d6;
  font-size: 12px;
  line-height: 34.5px;
  color: #c65659;
  font-weight: 500;
  font-family: "Noto Sans TC";
  position: relative;
  top: 0px;
  letter-spacing: 0.375px;
  /* visibility: hidden; */
}

.wrong p {
  text-indent: 36px;
  position: relative;
  top: -36px;
}

.wrong img {
  position: relative;
  top: 4.5px;
  left: 9px;
}

input {
  width: 99.8%;
  height: 33.75px;
  border: 1.5px solid #c7c2c2;
  border-radius: 12px;
  font-size: 13.5px;
  font-family: "Noto Sans TC";
  font-weight: 500;
  letter-spacing: 0.9375px;
  text-indent: 25.125px;
  margin-top: 19.125px;
}

input::placeholder {
  color: #b6aeae;
}

.enter > img {
  position: absolute;
  top: 117px;
  right: 16px;
  height: 24px;
  cursor: pointer;
  z-index: 90;
  user-select: none;
}

#eye_off:hover {
  content: url(../assets/eye/eye_origin_hover.svg);
}

#eye_on:hover {
  content: url(../assets/eye/eye_on_hover.svg);
}

.login_btn {
  width: 100%;
  height: 36px;
  background-color: #b82c30;
  border-radius: 14px;
  position: absolute;
  top: 252px;
  font-size: 13.5px;
  font-weight: 500;
  font-family: "Noto Sans TC";
  color: white;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.keep_login {
  width: 100px;
  height: 24px;
  position: absolute;
  top: 210px;
  left: 6px;
  font-size: 13.5px;
  font-family: "Noto Sans TC";
  line-height: 24px;
  font-weight: 500;
  letter-spacing: 0.9375px;
  text-align: right;
  color: #3b3838;
}

.keep_login_checkbox {
  float: left;
  margin-top: 5.25px;
  margin-left: 6px;
  cursor: pointer;
}

.keep_login_checkbox_off:hover {
  content: url(../assets/checkbox/CheckBox_off_hover.svg);
  margin-top: 1.5px;
  margin-left: 2.25px;
}

.keep_login_checkbox_on:hover {
  content: url(../assets/checkbox/CheckBox_on_hover.svg);
  margin-top: 1.5px;
  margin-left: 2.25px;
}

.forget_password {
  width: auto;
  height: 24px;
  line-height: 24px;
  color: #c65659;
  font-size: 13.5px;
  font-family: "Noto Sans TC";
  position: absolute;
  top: 210px;
  right: 6px;
  cursor: pointer;
  font-weight: 500;
  user-select: none;
}

.line {
  height: 24.75px;
  width: 100%;
  position: relative;
  top: 258px;
  font-size: 13.5px;
  font-weight: 500;
  font-family: "Noto Sans TC";
  line-height: 24.75px;
  color: #b6aeae;
  text-align: center;
  user-select: none;
}

.left_line {
  width: 47%;
  height: 12px;
  border-bottom: 1px solid #b6aeae;
  float: left;
}

.right_line {
  width: 47%;
  height: 12px;
  border-bottom: 1px solid #b6aeae;
  float: right;
}

.other_resource {
  width: 100%;
  height: 36px;
  position: absolute;
  top: 330px;
}

.other_resource div {
  width: 128.25px;
  height: 34.5px;
  border: 1px solid #b6aeae;
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 34.5px;
  color: #b6aeae;
  font-weight: 500;
  font-family: "Noto Sans TC";
  letter-spacing: 0.9375px;
  float: left;
  position: relative;
  text-indent: 33px;
  background-color: white;
}

#FB_login_btn {
  width: 146.25px;
  float: right;
}

.other_resource a img {
  width: 18px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 9px;
}

/* warning登入問題警告 */
.warning {
  /* border: 2px solid black; */
  width: 300px;
  height: auto;
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 58px;
  right: 10px;
  font-family: "Noto Sans TC";
}
.warning .el-alert {
  border-radius: 10px;
  margin: 14px 0 0;
  height: 38px;
  padding-left: 10px;
  font-size: 8px;
}

.errorIn-enter-active {
  transition: opacity 0.5s ease;
}
.errorIn-enter-from {
  opacity: 0;
}

.register {
  width: 160px;
  height: 24px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);
}

.register p {
  font-size: 13.5px;
  font-weight: 500;
  line-height: 24px;
  color: #b6aeae;
  letter-spacing: 0.9375px;
  font-family: "Noto Sans TC";
  float: left;
  margin-right: 9px;
}

.register a p {
  color: #c65659;
}

.bottom {
  width: 100vw;
  height: 48.75px;
  position: fixed;
  bottom: 0px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 100;
}

.privacy {
  width: 87px;
  height: 17.25px;
  font-size: 14.25px;
  font-family: "Noto Sans TC";
  line-height: 17.25px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  letter-spacing: 0.1125px;
  cursor: pointer;
  color: #120406;
  text-decoration: none;
}

.contact {
  width: 203.25px;
  height: 17.25px;
  font-size: 14.25px;
  font-family: "Noto Sans TC";
  line-height: 17.25px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  letter-spacing: 0.1125px;
  cursor: pointer;
  color: #120406;
  text-decoration: none;
}

.photo {
  width: 267.75px;
  height: 17.25px;
  font-size: 14.25px;
  font-family: "Noto Sans TC";
  line-height: 17.25px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  letter-spacing: 0.1125px;
  color: #c7c2c2;
}

.photo a {
  color: #c7c2c2;
}

@media screen and (min-width: 1920px) {
  .middle {
    width: 432px;
    height: 402px;
    position: absolute;
    top: 108.75px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 712.5px;
  }

  .privacy {
    left: 405px;
  }

  .contact {
    left: 516px;
  }

  .photo {
    right: 405px;
  }
}

@media screen and (min-width: 1600px) {
  .middle {
    width: 352.5px;
    height: 402px;
    position: absolute;
    top: 108.75px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 100vh;
  }

  .privacy {
    left: 285px;
  }

  .contact {
    left: 396px;
  }

  .photo {
    right: 285px;
  }
}

/* iPad Mini 直放的寬度 = 768px */
@media screen and (min-width: 768px) and (max-width: 1599px) {
  /* OKay */
  .middle {
    width: 312px;
    height: 402px;
    position: absolute;
    top: 108.75px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 90vh;
  }

  .privacy {
    left: 8%;
  }

  .contact {
    left: 20%;
  }

  .photo {
    right: 10%;
  }
}

@media screen and (max-width: 768px) {
  .middle {
    width: 312px;
    height: 402px;
    position: absolute;
    top: 108.75px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 100vh;
  }

  .privacy {
    font-size: 13px;
    top: 30%;
    left: 23%;
  }

  .contact {
    font-size: 13px;
    top: 30%;
    left: 40%;
  }

  .photo {
    display: block;
    font-size: 10px;
    top: 35px;
    left: 30%;
  }
}
</style>
