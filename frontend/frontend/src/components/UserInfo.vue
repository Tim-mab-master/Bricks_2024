<template>
  <el-dropdown trigger="click" class="all">
    <span class="el-dropdown-link">
      <div id="userInfo">
        <el-avatar shape="square" :size="size" :src="squareUrl" id="avatar" />
        <!-- <p>{{ user_name }}</p> -->
      </div>
    </span>
    <template #dropdown>
      <div id="all">
        <el-dropdown-menu id="dropDown">
          <el-dropdown-item :icon="Plus" class="firstDrop">
            <div id="userInfoInside">
              <el-avatar
                shape="square"
                :size="80"
                :src="squareUrl"
                id="avatarInside"
              />
              <p>{{ user_name }}</p>
            </div>
          </el-dropdown-item>

          <el-dropdown-item @click="editInfo">
            <div class="dropDown">
              <el-icon class="material-icons"><user /></el-icon
              ><span class="text">修改個人檔案</span>
            </div>
          </el-dropdown-item>

          <el-dropdown-item>
            <div class="dropDown">
              <el-icon><span class="material-icons">help_outline</span></el-icon
              ><span class="text">問題回報</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="dropDown">
              <el-icon
                ><span class="material-icons">desktop_windows</span></el-icon
              ><span class="text">介面教學</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item @click="log_out">
            <div class="dropDown">
              <el-icon>
                <i class="material-icons">exit_to_app</i>
              </el-icon>
              <span class="text">登出</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </div>
    </template>
  </el-dropdown>
</template>

<script>
import { h } from "vue";
import axios from "axios";
import EditInfoForm from "./EditInfoForm.vue";

export default {
  props: {
    user_name: {
      type: String,
      required: true,
    },
  },
  components: {
    EditInfoForm,
  },
  setup(props) {
    return {
      squareUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  // 個人資訊開頭
  methods: {
    log_out() {
      this.$confirm(
        "確定登出專案？登出後需重新輸入帳號密碼才可登入",
        "是否登出",
        {
          confirmButtonText: "確定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(() => {
          const logout = "http://35.201.168.185:5000/bricks_logout";
          axios
            .post(logout, null, {
              headers: {
                authorization: JSON.parse(localStorage.getItem("auth")),
              },
            })
            .then((res) => {
              if (res.data.status === "success") {
                console.log("logout success");
              }
            });

          this.$message({
            type: "success",
            message: "登出成功!",
          });
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出",
          });
        });
    },
    editInfo() {
      const EditInfoFormInstance = h(EditInfoForm);

      this.$msgbox({
        title: "修改個人檔案",
        message: EditInfoFormInstance,
        showCancelButton: true,
        confirmButtonText: "完成",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          const form = EditInfoFormInstance.component.proxy;
          if (action === "confirm") {
            // 校验输入
            if (
              !form.email.match(
                /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
              )
            ) {
              instance.message = "信箱格式不正确";
            } else if (form.password.length < 6) {
              instance.message = "密碼至少需要6位字符";
              // } else if (){
            } else {
              done(); //回傳後端
            }
          } else {
            done();
          }
        },
      })
        .then(() => {
          const form = EditInfoFormInstance.component.proxy;
          this.$message({
            type: "success",
            message: "修改完成！",
          });

          // 更新
          console.log("Email:", form.email);
          console.log("Password:", form.password);
          console.log("Name:", form.user_name);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    done() {
      //呼叫後端api
      const edit_info = "http://35.201.168.185:5000/edit_info";
      const edited_info = {
        user_name: "abc",
        user_email: "abc@gmail.com",
      };
      axios
        .post(edit_info, edited_info, {
          headers: { authorization: JSON.parse(localStorage.getItem("auth")) },
        })
        .then((res) => {
          if (res.data.status === "success") {
            console.log("haha");
          }
        });
    },
    mounted() {
      const show_info = "http://35.201.168.185:5000/show_info";
      axios
        .post(show_info, null, {
          headers: { authorization: JSON.parse(localStorage.getItem("auth")) },
        })
        .then((res) => {
          if (res.data.status === "success") {
            this.user_name = res.data.user_info.user_name;
            console.log("user_name", this.user_name);
          }
        });
    },
    // 個人資訊開頭
  },
};
</script>

<style scoped>
#all {
  /* zoom:75%; */
}
#userInfo {
  display: flex;
  /* padding: 0px 0px; */
  align-items: center;
  gap: 8px;
  align-self: stretch;
  cursor: pointer;
}

#userInfo p {
  color: #303133;
  font-family: Noto Sans TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  /* cursor: pointer; */
}

#userInfo #avatar {
  height: 32px;
  width: auto;
}

.dropDown {
  cursor: pointer;
  display: flex;
  /* gap: 4px; */
  /* width: 200px; */
  padding: 8px;
  height: auto;
  justify-content: center;
  align-items: center;
  padding-left: 12px;
}

.dropDown .text {
  /* zoom:75%; */
  display: block;
  color: var(--base-color-text-el-text-color-primary, #303133);
  /* CN regular/body1-Regular */
  font-family: PingFang TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  padding-left: 4px;
  text-align: left;
  margin-left: 4px;
}

#userInfoInside {
  display: flex;
  padding: 16px;
  align-items: center;
  /* gap: 20px; */

  color: #000;
}
#userInfoInside #avartarInside {
  width: 56px;
  height: 56px;
}

#userInfoInside p {
  font-family: PingFang TC;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */
  padding-left: 14px;
}

.material-icons {
  font-size: 18px;
}

.el-input__wrapper {
  border-radius: 15px !important;
}
@media screen and (max-width: 1440px) and (min-width: 1240px) {
  /* #userInfoInside, .firstDrop, .dropDown, .userInfo, .firstDrop, #dropDown{
            transform: scale(0.8);
            transform-origin: left top;
        } */
}
</style>
