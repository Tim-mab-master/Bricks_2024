<template>
  <div style="width: 100%; position: absolute; left: 0; top: 0">
    <div>
      <div class="nav">
        <a href="./homepage">
          <img src="../assets/brickslogo.svg" alt="" />
        </a>
        <div class="tribtn">
          <a href="" class="btn">試用</a>
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
        <div class="warning">
          <Transition name="errorIn">
            <el-alert
              title="請輸入有效之信箱"
              v-if="errorMessage1"
              type="error"
              show-icon
          /></Transition>
          <Transition name="errorIn">
            <el-alert
              title="您輸入的兩個密碼並不相符，請再試一次"
              v-if="errorMessage2"
              type="error"
              show-icon
            />
          </Transition>
          <Transition name="errorIn">
            <el-alert
              title="請輸入2~10個字元的使用者名稱"
              v-if="errorMessage3"
              type="error"
              show-icon
            />
          </Transition>
          <Transition name="errorIn">
            <el-alert
              title="請勾選隱私權政策"
              v-if="errorMessage4"
              type="error"
              show-icon
            />
          </Transition>
          <Transition name="errorIn">
            <el-alert
              title="此信箱已被註冊"
              v-if="errorMessage5"
              type="error"
              show-icon
          /></Transition>
          <Transition name="errorIn">
            <el-alert
              title="密碼長度需介於8~12之間"
              v-if="errorMessage6"
              type="error"
              show-icon /></Transition
          ><Transition name="errorIn">
            <el-alert
              title="密碼需由數字及英文組成"
              v-if="errorMessage7"
              type="error"
              show-icon
          /></Transition>
        </div>
        <div class="middle">
          <p class="title">註冊</p>

          <div class="enter">
            <input
              autofocus
              required
              type="text"
              class="email"
              placeholder="請輸入帳號 (電子信箱)"
              v-model="email"
            />
            <div v-if="showpassword_1" class="input_password">
              <input
                required
                class="password"
                type="text"
                placeholder="請輸入 6~20 含英數之密碼"
                v-model="password1"
              />
              <img
                class="eye1"
                v-if="showpassword_1"
                id="eye_on_1"
                src="../assets/eye/eye_on.svg"
                alt=""
                @click="eyebtn_1"
              />
              <img
                class="eye1"
                v-else
                id="eye_off_1"
                src="../assets/eye/eye_origin.svg"
                alt=""
                @click="eyebtn_1"
              />
            </div>
            <div v-else class="input_password">
              <input
                required
                class="password"
                type="password"
                placeholder="請輸入 6~20 含英數之密碼"
                v-model="password1"
              />
              <img
                class="eye1"
                v-if="showpassword_1"
                id="eye_on_1"
                src="../assets/eye/eye_on.svg"
                alt=""
                @click="eyebtn_1"
              />
              <img
                class="eye1"
                v-else
                id="eye_off_1"
                src="../assets/eye/eye_origin.svg"
                alt=""
                @click="eyebtn_1"
              />
            </div>
            <div v-if="showpassword_2" class="input_password">
              <input
                required
                class="password"
                type="text"
                placeholder="請再次輸入密碼"
                v-model="password2"
              />
              <img
                class="eye2"
                v-if="showpassword_2"
                id="eye_on_2"
                src="../assets/eye/eye_on.svg"
                alt=""
                @click="eyebtn_2"
              />
            </div>
            <div v-else class="input_password">
              <input
                required
                class="password"
                type="password"
                placeholder="請再次輸入密碼"
                v-model="password2"
              />
              <img
                class="eye2"
                id="eye_off_2"
                src="../assets/eye/eye_origin.svg"
                alt=""
                @click="eyebtn_2"
              />
            </div>
            <input
              required
              class="account"
              style=""
              placeholder="請輸入2~10個字元的使用者名稱 (可更改)"
              v-model="account"
            />
          </div>
          <div class="agree">
            <img
              src="../assets/checkbox/CheckBox_off.svg"
              class="agree_checkbox agree_checkbox_off"
              v-if="!checked"
              @click="check_btn"
            />
            <img
              src="../assets/checkbox/CheckBox_on.svg"
              class="agree_checkbox agree_checkbox_on"
              v-else
              @click="check_btn"
            />
            <p style="user-select: none">
              我已閱讀 Bricks 之
              <a href="" style="text-decoration: underline; color: #3b3838"
                >隱私權政策</a
              >
            </p>
          </div>
          <!-- 下面兩個是登入鍵 -->
          <a
            class="login_btn"
            v-if="counter == 4"
            @click="register_next"
            style="
              background-color: #b82c30;
              cursor: pointer;
              display: inline-block;
            "
            >下一步</a
          >
          <div class="login_btn" v-else>下一步</div>
          <div class="line">
            <div class="left_line"></div>
            <div class="right_line"></div>
            <p>或</p>
          </div>
          <div class="other_resource">
            <a href="">
              <div>
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
          <div class="login">
            <p>已經有帳戶？</p>
            <a href="./login">
              <p>登入</p>
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

      <!-- <component :is="currentPage" v-if="page2"></component> -->
    </div>
  </div>
</template>

<script>
import Register from "./Register.vue";
import axios from "axios";
import store from "../store/store.js";
export default {
  name: "Reigster",

  data() {
    return {
      showpassword_1: false,
      showpassword_2: false,
      checked: false,
      account: "",
      password1: "",
      password2: "",
      email: "",
      counter: 0,
      errorMessage1: false,
      errorMessage2: false,
      errorMessage3: false,
      errorMessage4: false,
      errorMessage5: false,
      errorMessage6: false, //密碼長度不介於8~12
      errorMessage7: false,
      userId: 0, // 0 就等於沒有使用者id
      // page1: true,
      // page2: false,
      // currentPage: "Register_second",
    };
  },
  methods: {
    eyebtn_1() {
      this.showpassword_1 = !this.showpassword_1;
    },
    eyebtn_2() {
      this.showpassword_2 = !this.showpassword_2;
    },
    check_btn() {
      this.checked = !this.checked;
    },
    // 註冊的下一步事件
    register_next() {
      this.errorMessage5 = false;
      if (
        this.email.indexOf("@") == -1 ||
        this.email.indexOf("@") == 0 ||
        this.email.indexOf("@") == this.email.length - 1
      ) {
        this.errorMessage1 = true;
        console.log("@", this.email.indexOf("@"));
      } else {
        this.errorMessage1 = false;
      }

      if (this.password1 !== this.password2) {
        this.errorMessage2 = true;
      } else {
        this.errorMessage2 = false;
      }

      if (this.account.length < 2 || this.account.length > 10) {
        this.errorMessage3 = true;
      } else {
        this.errorMessage3 = false;
      }

      if (!this.checked) {
        this.errorMessage4 = true;
        // console.log("t", this.errorMessage4);
      } else {
        this.errorMessage4 = false;
        // console.log("f", this.errorMessage4);
      }
      if (this.password1.length < 6 || this.password1.length > 20) {
        this.errorMessage6 = true;
      } else {
        this.errorMessage6 = false;
      }
      if (!this.errorMessage6) {
        var testEnglish = new RegExp("[A-Za-z]+");
        var testNumber = new RegExp("[0-9]+");
        if (!testEnglish.test(this.password1)) {
          this.errorMessage7 = true;
        } else {
          if (!testNumber.test(this.password1)) {
            this.errorMessage7 = true;
          }
        }
      }
      if (
        !(
          this.errorMessage1 ||
          this.errorMessage2 ||
          this.errorMessage3 ||
          this.errorMessage4 ||
          this.errorMessage6
        )
      ) {
        const path = "http://35.201.168.185:5000/register";
        const user = {
          user_email: this.email,
          user_password: this.password1,
          user_name: this.account,
        };
        // console.log(user);
        this.email = "";
        this.password1 = "";
        this.password2 = "";
        this.account = "";
        axios
          .post(path, user)
          .then((res) => {
            if (res.data.status == "success") {
              this.userId = res.data.user_id;
              this.setAuth(res.headers.authorization);

              this.$router.push({
                path: "/questionnaire",
                // params: { user_id: this.userId },
              });
            } else {
              // this.$refs.account.style = "border-color : #e03939";
              // this.$refs.password.style = "border-color : #e03939";
              // this.$refs.wrong1.style = "display : block";
              // this.$refs.wrong2.style = "display : block";
              // this.accountError = res.data.accountError;
              // this.passwordError = res.data.passwordError;
              this.errorMessage5 = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("failure");
      }
      // href="./Register_second"
    },
    setAuth(authorization) {
      store.commit("setAuth", authorization);
    },
  },
  watch: {
    account(newaccount, oldaccount) {
      if ((newaccount != "") & (oldaccount == "")) {
        this.counter += 1;
      }
      if ((newaccount == "") & (oldaccount != "")) {
        this.counter -= 1;
      }
    },
    password1(newpassword1, oldpassword1) {
      if ((newpassword1 != "") & (oldpassword1 == "")) {
        this.counter += 1;
      }
      if ((newpassword1 == "") & (oldpassword1 != "")) {
        this.counter -= 1;
      }
    },
    password2(newpassword2, oldpassword2) {
      if ((newpassword2 != "") & (oldpassword2 == "")) {
        this.counter += 1;
      }
      if ((newpassword2 == "") & (oldpassword2 != "")) {
        this.counter -= 1;
      }
    },
    email(newemail, oldemail) {
      if ((newemail != "") & (oldemail == "")) {
        this.counter += 1;
      }
      if ((newemail == "") & (oldemail != "")) {
        this.counter -= 1;
      }
    },
    check_btn(newValue, oldValue) {
      if (newValue) {
        this.frontBlock[4] = true;
        // this.errorMessage = "請勾選隱私權政策";
      } else {
        this.frontBlock[4] = false;
      }
    },
    // frontBlock(newValue, oldValue) {
    //     if (newValue[0]) {
    //         this.errorMessage = "請填寫所有欄位";
    //     } else if (newValue[1]) {
    //         this.errorMessage = "帳號或密碼格式錯誤";
    //     } else if (newValue[2]) {
    //         this.errorMessage = "您輸入的兩個密碼並不相符，請再試一次";
    //     } else if (newValue[3]) {
    //         this.errorMessage = "請輸入2~10個字元的使用者名稱";
    //     } else if (newValue[4]) {
    //         this.errorMessage = "請勾選隱私權政策";
    //     } else {
    //         this.errorMessage = "pass";
    //     }
    // },
    // account(newValue, oldValue) {
    //     if (newValue.length < 2 || newValue.length > 10) {
    //         this.frontBlock[3] = true;
    //         // this.errorMessage = "請輸入2~10個字元的使用者名稱";
    //     } else {
    //         this.frontBlock[3] = false;
    //     }
    // },
    // password2(newValue, oldValue) {
    //     if (this.password1 !== newValue) {
    //         this.frontBlock[2] = true;
    //         console.log(this.frontBlock);
    //         // this.errorMessage = "您輸入的兩個密碼並不相符，請再試一次";
    //     } else {
    //         this.frontBlock[2] = false;
    //     }
    // },
    // email(newValue, oldValue) {
    //     if (newValue.indexOf('@') == -1 || newValue.indexOf('@') == 0 || newValue.indexOf('@') == newValue.length - 1) {
    //         this.frontBlock[1] = true;
    //         // this.errorMessage = "帳號或密碼格式錯誤";
    //         console.log("@", this.email.indexOf('@'));
    //         console.log(this.frontBlock);
    //     } else {
    //         this.frontBlock[1] = false;
    //     }
    // },
    // counter(newValue, oldValue) {
    //     console.log("cc ", this.counter)
    //     if (newValue != 4) {
    //         this.frontBlock[0] = true;
    //         // this.errorMessage = "請填寫所有欄位";
    //     } else {
    //         this.frontBlock[0] = false;
    //     }
    // }else{
    //     this.errorMessage = "pass";
    // }
    //     // 帳號（信箱）一定要包含@且，@一定不能在第一個或最後一個
    // } else if (this.email.indexOf('@') == -1 || this.email.indexOf('@') == 0 || this.email.indexOf('@') == this.email.length - 1) {
    //     this.errorMessage = "帳號或密碼格式錯誤";
    //     console.log("@", this.email.indexOf('@'));

    // } else if (this.password1 !== this.password2) {
    //     this.errorMessage = "您輸入的兩個密碼並不相符，請再試一次";
    // } else if (this.account.length < 2 || this.account.length > 10) {
    //     this.errorMessage = "請輸入2~10個字元的使用者名稱";
    // } else if (checked) {
    //     this.errorMessage = "請勾選隱私權政策";
    // } else {
    //     this.errorMessage = "pass";
    // }

    // }
    //},
    // computed: {
    //     front_block() {
    //         if (this.counter != 4) {
    //             this.errorMessage = "請填寫所有欄位";

    //             // 帳號（信箱）一定要包含@且，@一定不能在第一個或最後一個
    //         } else if (this.email.indexOf('@') == -1 || this.email.indexOf('@') == 0 || this.email.indexOf('@') == this.email.length - 1) {
    //             this.errorMessage = "帳號或密碼格式錯誤";

    //         } else if (this.password1 !== this.password2) {
    //             this.errorMessage = "您輸入的兩個密碼並不相符，請再試一次";
    //         } else if (this.account.length < 2 || this.account.length > 10) {
    //             this.errorMessage = "請輸入2~10個字元的使用者名稱";
    //         } else if (checked) {
    //             this.errorMessage = "請勾選隱私權政策";
    //         } else {
    //             this.errorMessage = "pass";
    //         }
    //     },

    // },
    created() {},
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.nav {
  width: 100%;
  height: 65px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
}

@media screen and (min-width: 1920px) {
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
  .middle {
    width: 576px;
    height: auto;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 950px;
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

@media screen and (min-width: 1600px) and (max-width: 1920px) {
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
  .middle {
    width: 470px;
    height: auto;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 950px;
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

@media screen and (max-width: 1600px) {
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

  .middle {
    width: 360px;
    height: auto;
    position: absolute;
    top: 105px;
    left: 50%;
    transform: translate(-50%);
  }

  .bg {
    height: 710px;
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

.enter {
  width: 100%;
  height: auto;
  position: relative;
  margin-top: 24px;
}

.enter input {
  width: 99.8%;
  height: 33.75px;
  border: 1.5px solid #c7c2c2;
  border-radius: 12px;
  font-size: 14.5px;
  font-family: "Noto Sans TC";
  font-weight: 500;
  letter-spacing: 1.25px;
  text-indent: 33.5px;
  margin-bottom: 25.5px;
}

input::placeholder {
  color: #b6aeae;
}

.wrong {
  width: 100%;
  height: 46px;
  border: 1px solid #c65659;
  border-radius: 14px;
  background-color: #f1d5d6;
  font-size: 16px;
  line-height: 46px;
  color: #c65659;
  font-weight: 500;
  font-family: "Noto Sans TC";
  position: relative;
  top: 0px;
  letter-spacing: 0.5px;
  margin-top: 24px;
  /* visibility: hidden; */
}

.wrong p {
  text-indent: 48px;
  position: relative;
  top: -46px;
}

.wrong img {
  position: relative;
  top: 6px;
  left: 12px;
}

.input_password {
  height: 60px;
}

.input_password img {
  cursor: pointer;
  z-index: 9;
  user-select: none;
  position: relative;
  top: -56px;
  left: 90%;
  display: block;
  height: 26px;
}

#eye_off_1:hover {
  content: url(../assets/eye/eye_origin_hover.svg);
}

#eye_on_1:hover {
  content: url(../assets/eye/eye_on_hover.svg);
}

#eye_off_2:hover {
  content: url(../assets/eye/eye_origin_hover.svg);
}

#eye_on_2:hover {
  content: url(../assets/eye/eye_on_hover.svg);
}

.login_btn {
  width: 100%;
  height: 36px;
  background-color: #c7c2c2;
  border-radius: 14px;
  position: relative;
  transform: translate(0%, -30%);
  font-size: 16px;
  font-weight: 500;
  font-family: "Noto Sans TC";
  color: white;
  line-height: 34px;
  text-align: center;
  user-select: none;
  text-decoration: none;
  margin-bottom: 16px;
}

.agree {
  width: 294px;
  height: 32px;
  position: relative;
  left: 50%;
  transform: translate(-50%, -30%);
  margin-bottom: 24px;
  font-size: 18px;
  font-family: "Noto Sans TC";
  line-height: 32px;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-align: right;
  color: #3b3838;
}

.agree_checkbox {
  float: left;
  margin-top: 7px;
  cursor: pointer;
}

.agree_checkbox_off:hover {
  content: url(../assets/checkbox/CheckBox_off_hover.svg);
  margin-top: 2px;
  margin-left: -4.5px;
}

.agree_checkbox_on:hover {
  content: url(../assets/checkbox/CheckBox_on_hover.svg);
  margin-top: 2px;
  margin-left: -4.5px;
}

.line {
  height: 33px;
  width: 100%;
  position: relative;
  transform: translate(0%, -60%);
  font-size: 18px;
  font-weight: 500;
  font-family: "Noto Sans TC";
  line-height: 33px;
  color: #b6aeae;
  text-align: center;
  user-select: none;
  /* margin-bottom: -2px; */
}

.left_line {
  width: 47%;
  height: 16px;
  border-bottom: 1px solid #b6aeae;
  float: left;
}

.right_line {
  width: 47%;
  height: 16px;
  border-bottom: 1px solid #b6aeae;
  float: right;
}

.other_resource {
  transform: translate(0%, -20%);
  width: 100%;
  height: 48px;
  position: relative;
  margin-bottom: 12px;
}

.other_resource div {
  width: 150px;
  height: 34.5px;
  border: 1px solid #b6aeae;
  border-radius: 14px;
  font-size: 14.5px;
  line-height: 32px;
  color: #b6aeae;
  font-weight: 500;
  font-family: "Noto Sans TC";
  letter-spacing: 1.25px;
  float: left;
  position: relative;
  text-indent: 40px;
  background-color: white;
}

#FB_login_btn {
  width: 162px;
  float: right;
  text-indent: 38px;
}

.other_resource a img {
  width: 18px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 12px;
}

.login {
  width: 201px;
  height: 32px;
  position: relative;
  bottom: 0px;
  left: 50%;
  transform: translate(-42%);
  /* border: 2px solid black; */
}

.login p {
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  color: #b6aeae;
  letter-spacing: 1.25px;
  font-family: "Noto Sans TC";
  float: left;
  margin-right: 12px;
}

.login a p {
  color: #c65659;
}

.title {
  width: 100%;
  height: 48px;
  font-size: 33px;
  text-align: center;
  font-family: "Noto Sans TC";
  letter-spacing: 0.25px;
  font-weight: 700;
  line-height: 48px;
  user-select: none;
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
</style>
