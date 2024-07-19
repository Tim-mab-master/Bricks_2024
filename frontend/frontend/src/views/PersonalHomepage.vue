<template>
  <div>
    <div class="nav">
      <img src="../assets/brickslogo.svg" @click="" />
      <div class="tri_btn">
        <input
          type="text"
          placeholder="查詢專案"
          class="add_search_project"
          v-model.trim="search_project"
          @keyup.enter="list_add_a_search"
          @keyup="keyboardEvent"
          @blur="show_his_search_list = false"
        />
        <div class="his_search_list" v-show="show_his_search_list">
          <div
            v-for="(history, index) in this.projects
              .slice()
              .reverse()
              .slice(0, 6)"
            :key="index"
            class="add_history_search"
            @click="his_search_choosen"
          >
            {{ history }}
          </div>
          <!-- <div v-for="(history, index) in projectsAll.slice().reverse().slice(0,6)" :key="index" class="add_history_search" @click="his_search_choosen(history)" >
                      {{ history}}
                  </div> -->
          <ul
            class="autoComplete position-absolute box-shadow bg-white w-100 w-md-50 z-index-3"
            :class="autoComplete ? '' : 'd-none'"
          >
            <!--     控制按鈕事件的選取背景 -->
            <li
              class="searchHover p-2 w-100"
              v-for="(item, index) in filterProjects"
              :key="index"
              :class="selectedIndex === i ? 'bg-light' : ''"
            >
              <router-link
                class="text-dark d-inline-block w-100"
                :to="`/project/${item.id}`"
                >{{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="clear_search" @click="clear_search_bar"></div>

        <img src="../assets/search.svg" alt="" class="search" />
        <img src="../assets/Notice/Notice_Default.svg" alt="" class="notice" />
        <img
          src="../assets/Profile/Profile_Default.svg"
          alt=""
          class="profile"
        />
      </div>
    </div>
    <div class="left_bar">
      <div class="add_btn" @click="add_btn">新增專案</div>
      <div class="plus" @click="add_btn"></div>
      <div class="three_pointer">
        <input
          type="radio"
          id="overview"
          class="list"
          name="list"
          value="option1"
          v-model="selectOption"
        />
        <label for="overview" @click="change(1)">專案總覽</label>
        <img src="../assets/icon/icon_file.svg" style="top: 26px" />
        <input
          type="radio"
          id="over"
          class="list"
          name="list"
          value="option2"
          v-model="selectOption"
        />
        <label for="over" @click="change(2)">已結束專案</label>
        <img src="../assets/icon/icon_over.svg" style="top: 102px" />
        <input
          type="radio"
          id="trash"
          class="list"
          name="list"
          value="option3"
          v-model="selectOption"
        />
        <label for="trash" @click="change(3)">垃圾桶</label>
        <img src="../assets/icon/icon_trashcan.svg" style="top: 178px" />
      </div>
    </div>
    <div class="add_proj_box" v-show="add_proj_show">
      <div
        class="close_add_proj_box"
        @click="add_btn();close_add_proj();"></div>
      <p class="add_proj_title">新增專案</p>
      <div class="add_proj_pic">
        <img src="../assets/add_proj_pic_plus.svg" class="add_proj_pic_plus" />
      </div>
      <input
        type="text"
        placeholder="輸入專案名稱"
        class="add_proj_name"
        v-model="add_proj_name"
      />
      <div
        class="add_proj_type"
        @click="add_proj_type_btn"
        :style="{ background: add_proj_type_arrow, color: proj_type_color }"
        ref="add_proj_type"
      >
        {{ proj_type }}
      </div>
      <div
        class="add_proj_type_list"
        v-show="show_add_proj_type_list"
        ref="add_proj_type_list"
      >
        <div class="add_proj_type_option_container">
          <div class="add_proj_type_option" @click="type_not_choose">
            未分類
          </div>
          <div
            v-for="(option, index) in add_proj_type_options"
            :key="index"
            class="add_proj_type_option"
            @click="type_choosen(option)"
          >
            {{ option }}
          </div>
        </div>
        <div class="add_proj_type_list_line"></div>
        <input
          type="text"
          class="add_proj_type_text"
          placeholder="新增類別"
          v-model="add_proj_type_text"
          @keyup.enter="list_add_a_cart"
        />
        <div class="add_proj_type_text_plus" @click="list_add_a_cart"></div>
      </div>
      <div class="add_proj_build" @click="new_project_btn">建立專案</div>
    </div>
    <div class="proj_info" v-if="project_info_show">
      <div class="close_add_proj_box" @click="close_proj_info()"></div>
      <p class="proj_info_title">專案資訊</p>
      <div class="proj_info_pic">
        <img src="../assets/add_proj_pic_plus.svg" class="proj_info_pic_plus" />
      </div>
      <input type="text" class="proj_info_name" v-model="proj_info_title" />
      <input type="text" class="proj_info_type" v-model="proj_info_type" />
      <!-- {{ proj_info_type }} -->

      <div class="proj_info_enter" @click="enter_project_btn">進入專案</div>
    </div>
    <div class="main_body">
      <div class="bg">
        <!-- 背景透明灰色 -->
        <div class="overlay" v-if="showOverlay"></div>
        <div class="middle">
          <!-- 專案總覽 -->
          <div class="overview_page" v-show="middle_show_overview_page">
            <div class="uncategorized cart" ref="uncategorized">
              <p class="cart_title">未分類</p>
              <div class="title_underline"></div>
              <div class="box_container">
                <div
                  class="box"
                  v-for="(proj_name, index) in uncategorized_projs"
                  :key="index"
                  @contextmenu.prevent="right_click_box"
                >
                  {{ proj_name }}
                </div>
              </div>
            </div>
            <div v-for="(cart, index1) in carts" :key="index1">
              <div
                class="cart"
                :ref="'cart_' + index1"
                :data-index="index1"
                >
                <!-- @contextmenu.prevent="showRightClickBox($event, index1)" -->
                <p class="cart_title" style="height: 0px">
                  {{ cart.title_word }}
                </p>
                <img
                  src="../assets/cart_drag_icon.svg"
                  alt=""
                  class="cart_drag_icon"
                />
                <div class="title_underline"></div>
                <div class="box_container">
                  <div class="box" 
                    v-for="(project, index2) in cart.project_box" 
                    :key="index2" 
                    @contextmenu.prevent="showRightClickBox($event, index1, index2, project.project_id)" 
                    @click="proj_info(index1, index2)">
                  {{ index1 }} <!-- index1: cart 的索引 -->
                  {{ project.project_id }} <!-- project_id: 專案 ID -->
                  {{ project.proj_name }} <!-- proj_name: 專案名稱 -->
                </div>
                </div>
              </div>
            </div>
            <div
              class="new_type cart"
              :class="{ new_type_highlight: isFocused }"
            >
              <input
                class="cart_title_input"
                placeholder="新增類型"
                @focus="new_type_focus"
                @blur="new_type_blur"
                @keyup.enter="add_a_cart"
                v-model="cart_title_input"
              />
              <div class="title_underline"></div>
              <div class="box_container"></div>
            </div>
            <div
              class="right_click_box_overview"
              :style="{ top: mouseTop + 'px', left: mouseLeft - 100 + 'px' }"
              v-show="right_click_box_overview_show"
              ref="right_click_box_overview"
            >
              <div
                class="right_click_box_overview_option"
                style="
                  border-top-left-radius: 5px;
                  border-top-right-radius: 5px;
                "
                @click="rename"
              >
                重新命名
              </div>
              <div class="add_proj_type_list_line"></div>
              <div
                class="right_click_box_overview_option"
                style="
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                "
                @click="delete_project"
              >
                刪除專案
              </div>
            </div>
            <div class="delete_confirm" v-show="delete_confirm">
              <div
                class="close_delete_confirm"
                @click="close_delete_confirm"
              ></div>
              <p class="delete_confirm_first_text">刪除專案</p>
              <img src="../assets/delete_icon.svg" alt="" />
              <p class="delete_confirm_second_text">確定刪除專案？</p>
              <p class="delete_confirm_third_text">
                刪除後若需還原，請至「垃圾桶」查看
              </p>
              <div class="delete_confirm_btn_container">
                <button
                  class="forever_delete_confirm_btn forever_delete_confirm_btn_cancel"
                  @click="close_delete_confirm()"
                >
                  取消
                </button>
                <button
                  class="forever_delete_confirm_btn forever_delete_confirm_btn_delete"
                  @click="delete_project_ing()"
                >
                  刪除
                </button>
              </div>
            </div>
            <div class="overlay" v-if="showOverlay_delete"></div>
          </div>
          <!-- 已結束專案 -->
          <div class="over_page" v-show="middle_show_over_page">
            <div class="uncategorized cart" ref="uncategorized">
              <p class="cart_title">未分類</p>
              <div class="title_underline"></div>
              <div class="box_container">
                <div
                  class="box"
                  v-for="(proj_name, index) in uncategorized_projs"
                  :key="index"
                  @contextmenu.prevent="
                    showRightClickBox($event, index1, index2)
                  "
                >
                  {{ proj_name }}
                </div>
              </div>
            </div>
            <div v-for="(cart, index1) in ended_carts" :key="index1">
              <div
                class="cart"
                :ref="'cart_' + index1"
                :data-index="index1"
                >
                <!-- @contextmenu.prevent="showRightClickBox($event, index1)" -->
                <p class="cart_title" style="height: 0px">
                  {{ cart.title_word }}
                </p>
                <img
                  src="../assets/cart_drag_icon.svg"
                  alt=""
                  class="cart_drag_icon"
                />
                <div class="title_underline"></div>
                <div class="box_container">
                  <div 
                    v-for="(cart, index1) in ended_carts" 
                    :key="index1">
                    <div class="box" 
                      v-for="(project, index2) in cart.project_box" 
                      :key="index2" 
                      @contextmenu.prevent="showRightClickBox($event, index1, index2, project.project_id)" 
                      @click="proj_info(index1, index2)">
                      {{ index1 }} <!-- index1: cart 的索引 -->
                      {{ project.project_id }} <!-- project_id: 專案 ID -->
                      {{ project.proj_name }} <!-- proj_name: 專案名稱 -->
                    </div>
                  </div>
                </div>
                <!-- <div class="box_container">
                  <div
                    class="box"
                    v-for="(proj_name, index2) in ended_carts[index1]
                      .project_box"
                    :key="index2"
                    @contextmenu.prevent="showRightClickBox($event, index1, index2)"
                  >
                    {{ proj_name }}
                  </div> -->
              </div>
            </div>
          </div>
          <!-- 垃圾桶 -->
          <div class="trash_page" v-show="middle_show_trash_page">
            <div class="trash_page_middle">
              <div class="last_30_days">
                <div class="time_subline_up"></div>
                <p class="last_time">近 30 天</p>

                <div class="time_subline"></div>
                <img
                  v-if="recover"
                  src="../assets/trash_page/recover_default.svg"
                  alt=""
                  class="recover_trash_pic"
                  style="cursor: pointer"
                  @click="recover_project"
                />
                <img
                  v-else
                  src="../assets/trash_page/recover_active.svg"
                  alt=""
                  class="recover_trash_pic"
                />
                <img
                  v-if="trashcan"
                  src="../assets/trash_page/trashcan_default.svg"
                  alt=""
                  class="forever_delete_trash_pic"
                />
                <img
                  v-else
                  src="../assets/trash_page/trashcan_active.svg"
                  alt=""
                  class="forever_delete_trash_pic"
                  style="cursor: pointer"
                  @click="forever_delete_project"
                />
                <div class="box_container">
                  <div v-for="(cart, index1) in trash_carts" :key="index1">
                    <div
                      class="box"
                      v-for="(proj_name, index2) in cart.proj_box"
                      :key="index2"
                    >
                      {{ proj_name }}
                    </div>
                  </div>
                </div>

                <!-- <div class="trash_box_container">
                  <div
                    class="trash_box"
                    v-for="(trash_box, index) in trash_boxes"
                    :key="index"
                  >
                    <input
                      type="checkbox"
                      :id="'trash_box-' + index"
                      v-model="checked_trash_box[index]"
                      @change="selected_trash_box(index)"
                    />
                    <label
                      :for="'trash_box-' + index"
                      @contextmenu.prevent="right_click_box_trash"
                      >{{ trash_box.text }}</label
                    >
                  </div>
                </div> -->
              </div>
              <div class="last_one_year">
                <p class="last_time">近一年</p>
                <div class="time_subline"></div>
                <div class="trash_box_container"></div>
              </div>
              <div class="recovered" v-show="recovered">
                <img src="../assets/recovered_icon.svg" alt="" />
                <p>檔案已還原</p>
              </div>
              <!-- 調整到這裡7/9 -->
              <div
                class="forever_delete_confirm"
                v-show="forever_delete_confirm"
              >
                <div
                  class="close_forever_delete_confirm"
                  @click="close_forever_delete_confirm"
                ></div>
                <p class="forever_delete_confirm_first_text">永久刪除專案</p>
                <img src="../assets/forever_delete_icon.svg" alt="" />
                <p class="forever_delete_confirm_second_text">
                  確定永久刪除專案？刪除後將無法復原
                </p>
                <div class="forever_delete_confirm_btn_container">
                  <button
                    class="forever_delete_confirm_btn forever_delete_confirm_btn_cancel"
                    @click="close_forever_delete_confirm()"
                  >
                    取消
                  </button>
                  <button
                    class="forever_delete_confirm_btn forever_delete_confirm_btn_delete"
                    @click="close_forever_delete_confirm()"
                  >
                    刪除
                  </button>
                </div>
              </div>
              <div class="overlay" v-if="showOverlay_trash"></div>
              <div
                class="right_click_box_overview"
                :style="{ top: mouseTop + 'px', left: mouseLeft + 'px' }"
                v-show="right_click_box_trash_show"
                ref="right_click_box_trash"
              >
                <div
                  class="right_click_box_overview_option"
                  style="
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                  "
                  @click="recover_project"
                >
                  還原專案
                </div>
                <div class="add_proj_type_list_line"></div>
                <div
                  class="right_click_box_overview_option"
                  style="
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                  "
                  @click="forever_delete_project"
                >
                  刪除專案
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Base64 } from "js-base64";
// import { useRoute } from "vue-router";
export default {
  name: "Personal_homepage",

  data() {
    return {
      middle_show_overview_page: true,
      middle_show_over_page: false,
      middle_show_trash_page: false,
      add_proj_show: false,
      showOverlay: false,
      add_proj_type: "",
      isFocused: false,
      carts: [],
      //已結束專案的cart
      ended_carts: [],
      cart_titles: "",
      cart_title_input: "",
      selectOption: "option1",
      show_add_proj_type_list: false,

      add_proj_type_arrow: "",
      add_proj_type_options: [],
      proj_type: "選擇專案類型",
      proj_type_color: "#b6aeae",
      add_proj_type_text: "",
      add_proj_name: "",
      add_search: "",
      uncategorized_projs: [],
      //已結束專案的
      ended_projs: [],
      cart_box_name_list: [],
      //垃圾桶
      trash_carts: [],
      checked_trash_box: [],
      recover: true,
      trashcan: true,
      recovered: false,
      forever_delete_confirm: false,
      showOverlay_trash: false,
      mouseTop: 0,
      mouseLeft: 0,
      right_click_box_overview_show: false,
      currentCartIndex: null,
      currentProjectIndex: null,
      delete_confirm: false,
      showOverlay_delete: false,
      right_click_box_trash_show: false,
      click_search_bar_time: 0,
      his_search_list: [],
      show_his_search_list: false,
      search_input: "",
      //現在正在找的專案
      search_project: "",
      //所有project
      projectsAll: [],
      // 所有已結束專案
      project_ended: [],
      // 遠端資料庫 分頁資料十筆
      projects: [],
      // 用 autoComplete 來控制是否顯示選單
      autoComplete: false,
      // 用 selectedIndex 來控制選單項目的選取
      selectedIndex: 0,
      user_id: 0,
      project_status: "normal",
      project_image: " ",
      project_id: 0,
      project_creation_date: " ",
      project_edit_data: " ",
      project_info_show: false,
      proj_info_title: "",
      proj_info_type: "",
    };
  },
  methods: {
    // 點擊上角新增專案

    add_btn() {
      console.log("按下新增專案");
      // let au = this.route.query.authorization;
      console.log(this.$route.params.authorization);
      this.add_proj_show = this.add_proj_show === false ? true : false;
      this.showOverlay = !this.showOverlay;
      this.proj_type = "選擇專案類型";
      this.proj_type_color = "#b6aeae";
      this.add_proj_name = "";
      this.forever_delete_confirm = false;
      this.showOverlay_trash = false;
      this.add_proj_type_text = "";
      this.show_add_proj_type_list = false;
      this.show_his_search_list = false;
      this.delete_confirm = false;
      this.showOverlay_delete = false;
    },
    // 新增專案彈窗裡面的叉叉
    close_add_proj() {
      this.show_add_proj_type_list = false;
      this.proj_type_color = "#b6aeae";
      this.add_proj_type_text = "";
    },
    // 新增專案彈窗裡點擊建立專案
    new_project_btn() {
      this.add_proj_show = this.add_proj_show === false ? true : false;
      this.showOverlay = false;
      this.middle_show_overview_page = true;
      this.middle_show_over_page = false;
      this.middle_show_trash_page = false;
      this.selectOption = "option1";
      this.show_add_proj_type_list = false;
      this.proj_type_color = "#b6aeae";
      const path = "http://34.81.219.139:5000/add_project";
      const add_new_project = {
        project_type: [this.proj_type],
        project_image: this.project_image,
        project_name: this.add_proj_name,
        project_trashcan: true,
        project_ended: true,
        project_isEdit: false,
        project_isVisible: false,
        project_isComment: false,
        user_id: this.user_id,
      };
      console.log("add_new_project:", add_new_project);

      axios
        .post(path, add_new_project, { timeout: 5000 })
        .then((res) => {
          console.log("Response Data:", res.data);
          this.token = res.data;
          this.decode_token_json.status = this.decodeToken(this.token);
          if (this.decode_token_json.status == "success") {
            console.log("成功新增專案");
            const list = this.decode_token_json.items;
            console.log(list.message);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
      if (this.add_proj_name !== "") {
        if (this.proj_type === "選擇專案類型" || this.proj_type === "未分類") {
          //歸類未分類
          this.uncategorized_projs.push(this.add_proj_name);
          this.add_proj_name = "";
        } else if (
          this.add_proj_type_options.includes(this.proj_type) === true
        ) {
          this.carts[
            this.add_proj_type_options.indexOf(this.proj_type)
          ].project_box.push(this.add_proj_name);
          this.add_proj_name = "";
        } else if (
          this.add_proj_type_options.includes(this.proj_type) === false
        ) {
          const new_cart = {
            title_word: this.proj_type,
            project_box: [this.add_proj_name],
          };
          this.carts.push(new_cart);
          this.add_proj_type_options.push(new_cart.title_word);

          const path = "http://34.81.186.58:5000/add_type";
          const add_type = {
            user_id: this.user_id,
            project_ended: false,
            project_type: "this.proj_type",
          };
          axios.post(path, add_type).then((res) => {
            this.token = res.data;
            this.decode_token_json = this.decodeToken(this.token);

            if (this.decode_token_json.status == "success") {
              console.log("新增類型成功");
              if (this.user_id === this.decode_token_json.user_id) {
                console.log(this.decode_token_json.proj_name);
              }
            }
          });
        }
      }
      this.add_proj_type_text = "";
    },
    // 左邊總攬、已結束、垃圾桶切換
    change(index) {
      if (index === 1) {
        this.middle_show_overview_page = true;
        this.middle_show_over_page = false;
        this.middle_show_trash_page = false;
      }
      if (index === 2) {
        this.middle_show_over_page = true;
        this.middle_show_overview_page = false;
        this.middle_show_trash_page = false;
      }
      if (index === 3) {
        this.middle_show_trash_page = true;
        this.middle_show_overview_page = false;
        this.middle_show_over_page = false;
      }
    },
    // 我忘了
    blurSelect() {
      this.$refs.select.blur();
    },
    // 滑鼠點擊新增專案的輸入框使其border變寬
    new_type_focus() {
      this.isFocused = true;
    },
    // 滑鼠離開新增專案的輸入框使其border還原
    new_type_blur() {
      this.isFocused = false;
      this.cart_title_input = "";
    },
    // 從新增專案的輸入框直接新增一個類型
    add_a_cart() {
      if (this.cart_title_input !== "") {
        const new_cart = {
          title_word: this.cart_title_input,
          project_box: [],
        };
        this.carts.push(new_cart);
        this.add_proj_type_options.push(this.cart_title_input);
        this.cart_title_input = "";
      }
    },
    // 新增專案彈窗裡點擊選擇專案類型
    add_proj_type_btn() {
      this.show_add_proj_type_list =
        this.show_add_proj_type_list === false ? true : false;
      this.add_proj_type_arrow =
        "url(../assets/dropdown_arrow/dropdown_arrow_down.svg) no-repeat center right;";
    },

    // 新增專案彈窗裡的選擇專案類型選擇其中一個已有專案
    type_choosen(option) {
      this.show_add_proj_type_list = false;
      this.proj_type = option;
      this.proj_type_color = "black";
      this.add_proj_type_text = "";
    },
    //搜尋點擊已有的專案
    his_search_choosen() {
      console.log("koko");
      this.show_his_search_list = false;
      this.search_project = history.name;
      //還要做點到專案的功能
      // 將被點擊的歷史內容設定為輸入框的值
    },

    // 新增專案彈窗裡的選擇專案類型沒有選擇其中一個已有專案
    type_not_choose() {
      this.show_add_proj_type_list = false;
      this.proj_type = "未分類";
      this.proj_type_color = "black";
      this.add_proj_type_text = "";
    },
    // 新增專案彈窗裡的選擇專案類型直接打字輸入新的專案
    list_add_a_cart() {
      if (this.add_proj_type_text !== "") {
        this.show_add_proj_type_list = false;
        this.proj_type = this.add_proj_type_text;
        this.proj_type_color = "black";
        this.add_proj_type_text = "";

        const path = "http://34.81.219.139:5000/add_type";
        const insert_type = {
          user_id: 1,
          project_ended: false,
          project_type: "課業＿高中",
        };
        axios.post(path, insert_type).then((res) => {
          console.log(res);
        });
      }
    },

    //點擊進入專案
    proj_info(index1, index2) {
      this.project_info_show = true;
      this.proj_info_title = this.carts[index1].project_box[index2];
      this.proj_info_type = "類型: " + this.carts[index1].title_word;
      console.log(this.proj_info_type);
      // this.$router.push({ name: "all" });
    },

    //在proj_info裡面點擊進入專案
    enter_project_btn() {
      // this.$router.push({ name: "all" });
    },

    close_proj_info() {
      this.project_info_show = false;
    },

    click_search_bar() {
      // if(this.click_search_bar_time===0){
      //     const path = "http://34.81.186.58:5000/search_history";
      //     const get_search_history = {
      //         "user_id": this.user_id
      //     };
      //     axios
      //         .post(path,get_search_history)
      //         .then((res) => {
      //             this.token = res.data;
      //             this.decode_token_json = this.decodeToken(this.token);

      //             if(this.decode_token_json.status == 'success'){
      //                 const items = this.decode_token_json.items
      //                 const searches = items.search_content
      //                 const searchArray = searches.split(',');
      //                 searchArray.forEach(search => {
      //                     this.his_search_list.push(search.trim());
      //                 });
      //             }
      //         })
      //     this.click_search_bar_time++;
      // }
      this.show_his_search_list = true;
    },
    list_add_a_search() {
      console.log("iij");
    },
    clear_search_bar() {
      this.search_project = "";
    },
    search_bar() {
      const path = "http://34.81.219.139:5000/search_history";
      const search_bar = {
        user_id: this.user_id,
      };
      axios.post(path, search_bar).then((res) => {
        this.token = res.data;
        this.decode_token_json.status = this.decodeToken(this.token);
        if (this.decode_token_json.status == "success") {
          const list = this.decode_token_json.items;
          this.his_search_list = list.search_content;
        }
      });
    },
    // 實驗用，點擊bricks logo後垃圾桶跑一個專案
    // test_btn(){
    //     const trash_box={
    //         text : '實驗',
    //     };
    //     this.trash_boxes.push(trash_box);
    // },

    showRightClickBox(event, cartIndex, projectIndex, project_id) {
      this.right_click_box_overview_show = true;
      const cartElement = this.$refs["cart_" + cartIndex][projectIndex];
      console.log("cartIndex", cartIndex)
      console.log("projectIndex", projectIndex)
      console.log("project_id",project_id)

      if (cartElement) {
        const cartRect = cartElement.getBoundingClientRect(); // cart 元素的邊界框
        console.log("Cart Rect:", cartRect);

        this.mouseLeft = cartRect.left; 
        this.mouseTop = cartRect.top; 
        console.log("this.mousetop", this.mouseTop); //問題在這

        this.currentCartIndex = cartIndex;
        this.currentProjectIndex = projectIndex;
        //找project_id

      }
      // this.mouseTop = event.clientY;
      // this.mouseLeft = event.clientX;
      // console.log("mouseTop:", this.mouseTop);
      // console.log("mouseLeft:",this.mouseLeft);
    },

    rename() {
      this.right_click_box_overview_show = false;
    },
    //刪除後的專案跑到垃圾桶
    delete_project_ing() {
      console.log("this.currentCartIndex", this.currentCartIndex);//第幾個cart
      console.log("this.currentProjectIndex", this.currentProjectIndex);//cart的裡面第幾個projectp'
      

      this.right_click_box_overview_show = false;
      this.delete_confirm = false;
      this.showOverlay_delete = false;
      // 除的项目的 project_id
      const projectId =
        this.carts[this.currentCartIndex].project_box[this.currentProjectIndex]
          .project_id;

      const path = "http://34.81.219.139:5000/to_trashcan";
      const to_trash = {
        project_id: projectId,
      };
      axios.post(path, to_trash).then((res) => {
        if (res.data.status == "success") {
          console.log("有連到了");
          console.log("hello", res.data.message);
        }
      });

      // // 获取要删除的项目名称
      // const deletedProject = this.carts[cartIndex].project_box[projIndex];
      // // 将项目名称添加到垃圾桶
      // const trash_box = {
      //   text: deletedProject
      // };
      // this.trash_boxes.push(trash_box);

      // 从原数组中删除项目
      // this.$set(this.carts[cartIndex].project_box, projIndex, null); // 使用 $set 删除并保持响应式
    },
    // 點擊垃圾桶裡的專案後又上兩個按鈕變色
    selected_trash_box(index) {
      const allFalse = this.checked_trash_box.every(function (element) {
        return element === false;
      });
      if (allFalse) {
        this.recover = true;
        this.trashcan = true;
      } else {
        this.recover = false;
        this.trashcan = false;
      }
    },
    // 垃圾桶點擊還原專案
    recover_project() {
      this.recovered = true;
      setTimeout(() => {
        this.recovered = false;
      }, 1000);
      this.recover = true;
      this.trashcan = true;
    },
    // 垃圾桶點選永久刪除
    forever_delete_project() {
      this.forever_delete_confirm = true;
      this.showOverlay_trash = true;
    },
    // 關閉永久刪除彈窗
    close_forever_delete_confirm() {
      this.forever_delete_confirm = false;
      this.showOverlay_trash = false;
    },
    // 專案總覽右鍵點擊專案
    // right_click_box(event) {
    //   event.preventDefault();
    //   this.right_click_box_overview_show = true;
    //   this.mouseTop = event.clientY - 49;
    //   this.mouseLeft = event.clientX - 368;
    // },
    // 當滑鼠點擊非指定區域時關閉彈窗
    handleClickOutside() {
      // 專案總覽右鍵彈窗
      if (
        this.right_click_box_overview_show === true &&
        !this.$refs.right_click_box_overview.contains(event.target) &&
        this.showOverlay_delete === false
      ) {
        this.right_click_box_overview_show = false;
      }
      // 新增專案彈窗裡的選擇新增專案類型彈窗
      else if (
        this.show_add_proj_type_list === true &&
        !this.$refs.add_proj_type_list.contains(event.target)
      ) {
        if (!this.$refs.add_proj_type.contains(event.target)) {
          this.show_add_proj_type_list = false;
          this.add_proj_type_text = "";
        }
      } else if (
        this.right_click_box_trash_show === true &&
        !this.$refs.right_click_box_trash.contains(event.target) &&
        this.showOverlay_trash === false
      ) {
        this.right_click_box_trash_show = false;
      }
    },
    // 專案總覽右鍵選擇刪除專案
    delete_project() {
      this.delete_confirm = true;
      this.showOverlay_delete = true;
    },
    // 關閉刪除按鈕彈窗
    close_delete_confirm() {
      this.delete_confirm = false;
      this.showOverlay_delete = false;
    },
    // 垃圾桶右鍵點擊專案
    right_click_box_trash(event) {
      event.preventDefault();
      this.right_click_box_trash_show = true;
      this.mouseTop = event.clientY - 49;
      this.mouseLeft = event.clientX - 368;
    },
    decodeToken(token) {
      // 获取Token的第二部分（Payload）
      const encodedPayload = token.split(".")[1];
      // 解码Base64字符串
      const decodedPayload = Base64.decode(encodedPayload);
      // 将解码后的字符串转换为JavaScript对象
      const payloadObject = JSON.parse(decodedPayload);
      // 现在您可以在payloadObject中访问解密后的Token数据
      console.log(payloadObject);
      // 返回解密后的Token数据，或进行其他后续处理
      return payloadObject;
    },
  },
  mounted() {
    window.addEventListener("click", this.handleClickOutside);
    const path = "http://34.81.219.139:5000/project_index";
    const get_proj = {
      user_id: 44,
      project_status: "normal",
    };
    axios.post(path, get_proj).then((res) => {
      if (res.data.status == "success") {
        const items = res.data.items;
        items.forEach((element) => {
          this.proj_type = element.project_type;
          this.proj_name = element.project_name;
          this.proj_id = element.id;

          if (this.projectsAll) {
            this.projectsAll.push(this.proj_name);
          }
          //沒有這個類別才顯示顯示專案
          if (this.add_proj_type_options.includes(this.proj_type) === false) {
            const new_cart = {
              title_word: this.proj_type,
              project_box: [this.proj_name],
              project_id: this.proj_id,
            };
            this.carts.push(new_cart);
            this.add_proj_type_options.push(new_cart.title_word);
          }

          let existingCart = this.carts.find(cart => cart.title_word === this.proj_type);

          if (existingCart) {
            // 如果存在，則將新專案名稱和 ID 添加到現有的 project_box 中
            existingCart.project_box.push({
              proj_name: this.proj_name,
              project_id: this.proj_id,
            });
          } else {
            // 如果不存在，則創建新的 cart 並推入 carts 陣列
            const new_cart = {
              title_word: this.proj_type,
              project_box: [{
                proj_name: this.proj_name,
                project_id: this.proj_id,
              }],
            };
            this.carts.push(new_cart);
            this.add_proj_type_options.push(new_cart.title_word);
          }

        });
      }
    });
    const path_end = "http://34.81.219.139:5000/project_index";
    const get_proj_end = {
      user_id: 44,
      project_status: "ended",
    };
    axios.post(path_end, get_proj_end).then((res) => {
  if (res.data.status === "success") {
    const items = res.data.items;
    items.forEach((element) => {
      const proj_type = element.project_type;
      const proj_name = element.project_name;
      const proj_id = element.id;

      // 搜尋已結束加正在進行
      this.projectsAll.push(proj_name);

      // 查找是否已存在相同類型的 cart
      let existingCart = this.ended_carts.find(ended_cart => ended_cart.title_word === proj_type);
      if (existingCart) {
        // 如果存在，則將新專案名稱和 ID 添加到現有的 project_box 中
        existingCart.project_box.push({ proj_name: proj_name, project_id: proj_id });
      } else {
        // 如果不存在，則創建新的 cart 並推入 ended_carts 陣列
        const new_cart = {
          title_word: proj_type,
          project_box: [{ proj_name: proj_name, project_id: proj_id }],
        };
        this.ended_carts.push(new_cart);
      }
    });

    console.log("1039行：", JSON.stringify(this.ended_carts, null, 2));

  } else {
    console.error("API 調用失敗：", res.data.message);
  }
}).catch((error) => {
  console.error("API 調用錯誤：", error);
});

    const path_trash = "http://34.81.219.139:5000/project_index";
    const get_proj_trash = {
      user_id: 44,
      project_status: "trashcan",
    };
    axios.post(path_trash, get_proj_trash).then((res) => {
      if (res.data.status == "success") {
        const items_in_month = res.data.item.in_month;
        console.log(items_in_month);
        items_in_month.forEach((element) => {
          this.proj_type = element.project_type;
          this.proj_name = element.project_name;

          if (this.projectsAll) {
            this.projectsAll.push(this.proj_name);
          }
          const new_cart = {
            title_word: this.proj_type,
            proj_box: [this.proj_name],
          };
          this.trash_carts.push(new_cart);
          console.log("1056",this.trash_carts.proj_box)
        });
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  },
  searchProjects() {
    this.projects = this.filterProjects;
    this.autoComplete = false;
  },
  // 使用v-on的監聽按鍵事件，控制按鈕事件的選取背景
  keyboardEvent(e) {
    // 按鈕向上
    if (e.keyCode === 38) {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      // 按鈕向下
    } else if (e.keyCode === 40) {
      this.selectedIndex++;
      // enter
    } else if (e.keyCode === 13) {
      this.filterProducts.forEach((item, i) => {
        if (this.selectedIndex === i) {
          // 當 selectedIndex 與 filterProducts 的 index相同，就將 search 改成選取項目的書名
          this.search = item.name;
        }
      });
    }
  },
  watch: {
    search_project() {
      // 如果有搜尋字詞的話，就顯示autoComplete選單
      if (this.search_project) {
        this.projects = this.filterProducts;
        this.show_his_search_list = true;
      } else {
        this.show_his_search_list = false;
      }
    },
    // 當選定選項，將 search 改成選取項目的專案名稱後，關閉autoComplete選單
    prodjects() {
      if (this.projects.length <= 1) {
        this.autoComplete = false;
      }
    },
  },
  computed: {
    filterProducts() {
      const str = this.search_project.toLowerCase();
      const matches = [];
      // 比對字串
      this.projectsAll.forEach((proj) => {
        if (proj.toLowerCase().includes(str)) {
          matches.push(proj);
        }
      });
      // 如果輸入兩個關鍵字就會出現重複的資料，所以需要刪除重複資料。
      // 過濾出重複的元素
      return [...new Set(matches)];
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans TC";
}

/* navigation bar的部分 起點*/
.nav {
  width: 100vw;

  height: calc(49px * 0.9);
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 9;
}

.nav > img {
  height: 32.06px;
  width: auto;
  position: absolute;
  top: 8px;
  left: 2.6%;
  -webkit-user-drag: none;
  user-select: none;
}

.tri_btn {
  width: 340px;
  height: 30px;

  position: absolute;
  right: 50px;
  top: 9.03px;
}

.tri_btn input {
  width: 248px;
  height: 25.2px;
  background-color: #f2eeee;
  border-radius: 24px;
  border: 1px solid transparent;
  outline: none;
  text-indent: 43px;
  font-size: 16px;
  font-weight: 400;
  position: absolute;
}

.tri_btn input:hover {
  background-color: #e1dcdc;
}

.tri_btn input:focus {
  background-color: white;
  border-color: #c7c2c2;
}

.search {
  position: absolute;
  top: 7px;
  left: 15px;
  -webkit-user-drag: none;
  user-select: none;
}

.notice {
  position: absolute;
  right: 45px;
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
}

.notice:hover {
  content: url(../assets/Notice/Notice_Hover.svg);
}

.notice:active {
  content: url(../assets/Notice/Notice_Active.svg);
}

.profile {
  position: absolute;
  right: 0px;
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
}

.profile:hover {
  content: url(../assets/Profile/Profile_Hover.svg);
}

.profile:active {
  content: url(../assets/Profile/Profile_Active.svg);
}

/* navigation bar的部分 終點 */

/* 左側欄的部分 起點 */
.left_bar {
  zoom: 80%;
  width: 270px;
  /* width: calc(125vh - 675px); */
  height: calc(125vh - 48px);

  background-color: #f2eeee;
  border-radius: 0px 14px 14px 0px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0px;
  z-index: 8;
}

.add_btn {
  width: 170px;
  height: 65px;
  /* width: calc(170px * 0.9);
  height: calc(65px * 0.9);  */
  position: relative;
  top: 40px;
  left: 48px;
  border-radius: 32px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  background-color: #b82c30;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.25px;
  line-height: 65px;
  color: white;
  text-indent: 68px;
  user-select: none;
}

.plus {
  position: relative;
  width: 14px;
  height: 14px;
  background-color: transparent;
  border: 1.5px solid transparent;
}

.plus::before,
.plus::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1.5px;
  background-color: white;
  top: 50%;
  left: 83px;
}

.plus::before {
  transform: rotate(90deg);
}

.plus::after {
  transform: rotate(0deg);
}

.three_pointer {
  width: 100%;
  height: 228px;
  position: relative;
  top: 61px;
}

.three_pointer input[type="radio"] {
  display: none;
}

.three_pointer input[type="radio"] + label {
  display: inline-block;
  width: 100%;
  height: 76px;
  background-color: transparent;
  font-size: 19px;
  font-weight: 400;
  line-height: 76px;
  letter-spacing: 0.15px;
  text-indent: 116px;
  cursor: pointer;
  user-select: none;
}

.three_pointer input[type="radio"]:hover + label {
  background-color: #e1dcdc;
  cursor: pointer;
}

.three_pointer input[type="radio"]:checked + label {
  background-color: #e1dcdc;
}

.three_pointer img {
  position: absolute;
  left: 64px;
  -webkit-user-drag: none;
  user-select: none;
  cursor: pointer;
}

/* 左側欄的部分 終點 */

/* 新增專案的框框 起點 */
.add_proj_box {
  width: 344px;
  height: 500px;
  /* width: calc(344px * 0.9);
  height: calc(524px * 0.9); */
  position: fixed;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.4);
  /* top: 244px;
  left: 924px; */
  z-index: 6;
  left: calc((100vw - 344px + 234px) / 2);
  top: calc((100vh - 524px + 50px) / 2);
}

.close_add_proj_box {
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
  top: 25px;
  left: 307px;
}

.close_add_proj_box::before,
.close_add_proj_box::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 17px;
  background-color: black;
}
.close_add_proj_box::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close_add_proj_box::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.clear_search {
  cursor: pointer;
  position: absolute;
  top: 14px;
  left: 225px;
  -webkit-user-drag: none;
  user-select: none;
}

.clear_search::before,
.clear_search::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 10px;
  width: 3px;
  height: 17px;
  background-color: black;
}
.clear_search::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.clear_search::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.add_proj_title {
  font-size: 20px;
  font-weight: 600;
  position: relative;
  top: 20px;
  text-align: center;
  user-select: none;
}

.add_proj_pic {
  width: 280px;
  height: 140px;
  border-radius: 14px;
  background-color: #f2eeee;
  position: relative;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  -webkit-user-drag: none;
}

.add_proj_pic_plus {
  position: relative;
  top: 40px;
  left: 110px;
  user-select: none;
  -webkit-user-drag: none;
}

.add_proj_name {
  width: 278px;
  height: 34px;
  border: 1px solid #c7c2c2;
  border-radius: 12px;
  font-size: 16px;
  letter-spacing: 1.25px;
  line-height: 38px;
  text-indent: 20px;
  position: relative;
  top: 108px;
  left: 50%;
  transform: translate(-50%);
}

.add_search {
  width: 250px;
  height: 38px;
  border: 1px solid #c7c2c2;
  border-radius: 12px;
  font-size: 16px;
  letter-spacing: 1.25px;
  line-height: 38px;
  text-indent: 20px;
  position: relative;
  top: 54px;
  left: 60%;
  transform: translate(-50%);
}

.add_proj_name:hover {
  border-color: #b6aeae;
}

.add_proj_name:focus {
  border-color: #3b3838;
  outline: #7b7b7b;
}

.add_proj_name::placeholder {
  user-select: none;
  color: #b6aeae;
}

.add_proj_type {
  width: 278px;
  height: 34px;
  border: 1px solid #b8b8b8;
  border-radius: 12px;
  position: relative;
  top: 124px;
  left: 50%;
  transform: translate(-50%);
  font-size: 16px;
  letter-spacing: 1.25px;
  line-height: 36px;
  text-indent: 20px;
  color: #b6aeae;
  cursor: pointer;
  user-select: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../assets/dropdown_arrow/dropdown_arrow_right.svg) no-repeat
    center right;
}
.add_proj_type:hover {
  border-color: #7b7b7b;
  background: url(../assets/dropdown_arrow/dropdown_arrow_right_hover.svg)
    no-repeat center right;
}

.add_proj_type_list {
  width: 214px;
  height: auto;
  padding-top: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 15px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  position: absolute;
  top: 260px;
  left: 320px;
  z-index: 3;
  background-color: white;
}
.his_search_list {
  width: 235px;
  height: auto;
  padding-top: 0px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 15px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  position: absolute;
  top: 38px;
  left: 15px;
  z-index: 3;
  background-color: white;
}
.add_proj_type_option_container {
  width: 214px;
  height: 180px;
  overflow: scroll;
  color: white;
  border-radius: 10px;
}

.add_proj_type_option {
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.25;
  text-indent: 16px;
  cursor: pointer;
  color: #3b3838;
  user-select: none;
  border-radius: 4px;
}
.add_history_search {
  width: 100%;
  height: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 45px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.25;
  text-indent: 16px;
  cursor: pointer;
  color: #3b3838;
  user-select: none;
}
.add_history_search:hover {
  background-color: #f2eeee;
}
.his_search_list_container {
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}
.add_proj_type_option:hover {
  background-color: #f2eeee;
}
.add_proj_type_list_line {
  height: 7px;
  border-bottom: 2px solid #e1dcdc;
  margin-bottom: 7px;
  user-select: none;
}
.add_history_search_list_line {
  height: 7px;
  border-bottom: 2px solid #e1dcdc;
  margin-bottom: 7px;
  user-select: none;
}
.add_proj_type_text {
  height: 45px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.25;
  text-indent: 16px;
  border: none;
  outline: none;
  color: #3b3838;
  user-select: none;
}
.add_proj_type_text::placeholder {
  color: #3b3838;
}
.add_proj_type_text:hover {
  background-color: #f2eeee;
}

.add_proj_type_text_plus {
  position: relative;
  width: 9.33px;
  height: 9.33px;
  background-color: transparent;
  border: 1px solid transparent;
  top: -23px;
}

.add_proj_type_text_plus::before,
.add_proj_type_text_plus::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #120405;
  top: 0px;
  left: 176.83px;
  -webkit-user-drag: none;
  cursor: pointer;
}

.add_proj_type_text_plus::before {
  transform: rotate(90deg);
}

.add_proj_type_text_plus::after {
  transform: rotate(0deg);
}
.add_search_project {
  height: 45px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.25;
  text-indent: 16px;
  border: none;
  outline: none;
  color: #3b3838;
  user-select: none;
}
.add_search_project::placeholder {
  color: #3b3838;
}
.add_search_project:hover {
  background-color: #f2eeee;
}
.add_proj_build {
  width: 280px;
  height: 42px;
  border-radius: 14px;
  background-color: #b82c30;
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 1.25px;
  text-align: center;
  position: relative;
  top: 166px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  user-select: none;
}

/* 新增專案的框框 終點 */

/* 點擊專案資訊開始 */
.proj_info {
  width: 344px;
  height: 500px;
  position: fixed;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.4);
  z-index: 6;
  left: calc((100vw - 344px + 234px) / 2);
  top: calc((100vh - 524px + 50px) / 2);
}

.proj_info_title {
  font-size: 20px;
  font-weight: 600;
  position: relative;
  top: 20px;
  text-align: center;
  user-select: none;
}

.proj_info_pic {
  width: 280px;
  height: 140px;
  border-radius: 14px;
  background-color: #f2eeee;
  position: relative;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  -webkit-user-drag: none;
}

.proj_info_pic_plus {
  position: relative;
  top: 40px;
  left: 110px;
  user-select: none;
  -webkit-user-drag: none;
}
.proj_info_name {
  width: 278px;
  height: 34px;
  border: 1px solid #c7c2c2;
  border-radius: 12px;
  font-size: 16px;
  letter-spacing: 1.25px;
  line-height: 38px;
  text-indent: 20px;
  position: relative;
  top: 108px;
  left: 50%;
  transform: translate(-50%);
}
.proj_info_enter {
  width: 280px;
  height: 42px;
  border-radius: 14px;
  background-color: #b82c30;
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 1.25px;
  text-align: center;
  position: relative;
  top: 166px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  user-select: none;
}

.proj_info_type {
  width: 278px;
  height: 34px;
  border: 1px solid #b8b8b8;
  border-radius: 12px;
  position: relative;
  top: 124px;
  left: 50%;
  transform: translate(-50%);
  font-size: 16px;
  letter-spacing: 1.25px;
  line-height: 36px;
  text-indent: 20px;
  color: rgba(0, 0, 0, 0.937);
  cursor: pointer;
  user-select: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../assets/dropdown_arrow/dropdown_arrow_right.svg) no-repeat
    center right;
}
.proj_info_type:hover {
  border-color: #7b7b7b;
  background: url(../assets/dropdown_arrow/dropdown_arrow_right_hover.svg)
    no-repeat center right;
}
/* 點擊專案資訊結束終點 */

/* 背景灰色 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(59, 56, 56, 0.5);
  z-index: 5;
}

/* 中間的部分 起點 */
.bg {
  zoom: 80%;
  width: calc(120vw - 220px);
  height: calc(125vh - 48px);
  /* width: calc(100vw - 260px);
  height: calc(100vh - 48px); */
  position: fixed;
  bottom: 0px;
  right: 12px;
  background-image: url(../assets/bricks_bg_small.svg);
  overflow-x: auto;
  overflow-y: hidden;
}

.middle {
  width: 94%;
  height: calc(120vh - 20.3px);
  /* height: 500px; */
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  top: 0px;
  left: 75px;
  align-items: center;
  padding-bottom: 20px;
}

::-webkit-scrollbar {
  display: none;
}
.cart {
  width: calc(100% - 50px);
  min-height: 218px;
  background-color: white;
  border-radius: 14px;
  border: 1px solid #e1dcdc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.uncategorized {
  margin-top: 60px;
  background-color: #f2eeee;
  display: inline-block;
}

.cart_title {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  height: 24px;
  letter-spacing: 0.5px;
  position: relative;
  top: 22px;
  left: 96px;
  /* display: inline-block; */
}
.cart_drag_icon {
  position: relative;
  -webkit-user-drag: none;
  user-select: none;
  top: 22px;
  left: 32px;
  display: inline-block;
}
.title_underline {
  width: 304px;
  border-bottom: 1px solid #c7c2c2;
  position: relative;
  top: 30px;
  left: 80px;
}

.box_container {
  width: 100%;
  height: auto;
  position: relative;
  top: 56px;
  left: 80px;
  overflow: hidden;
  margin-bottom: 80px;
}

.box_container .box {
  width: 295px;
  /* 希望box可以隨著container等比例縮放 */

  height: 44px;
  border: 1.5px solid #e1dcdc;
  border-radius: 13px;
  background-color: white;
  float: left;
  margin: 0 16px 13px 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 44px;
  font-weight: 400;
  letter-spacing: 1.25px;
  text-indent: 69.67px;
  user-select: none;
}
.box:hover {
  background-color: #e1dcdc;
  border-color: #c7c2c2;
}
.cart_title_input {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  position: relative;
  top: 22px;
  left: 96px;
  border: none;
  outline: none;
}
.new_type_highlight {
  border: 2px solid #c7c2c2;
}
.right_click_box_overview {
  width: 214px;
  height: 106px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 15px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  background-color: white;
  padding-top: 8px;
  padding-bottom: 8px;
  position: absolute;
}
.right_click_box_overview_option {
  width: 100%;
  height: 45px;
  font-size: 16px;
  line-height: 45px;
  letter-spacing: 1.25px;
  color: rgba(59, 56, 56, 1);
  font-weight: 500;
  text-indent: 16px;
  user-select: none;
  cursor: pointer;
}
.right_click_box_overview_option:hover {
  background-color: #f2eeee;
}
.delete_confirm {
  width: 412px;
  height: 372px;
  position: absolute;
  top: 20%;
  left: 520px;
  background-color: white;
  border: 1.5px solid #c7c2c2;
  box-shadow: 0px 0px 5px 1px rgba(65, 65, 65, 0.25);
  border-radius: 14px;
  z-index: 8;
}
.delete_confirm_first_text {
  width: 104px;
  height: 28px;
  position: relative;
  top: 28px;
  left: 50%;
  transform: translate(-50%);
  font-size: 26px;
  font-weight: 700;
  line-height: 28px;
  user-select: none;
}
.close_delete_confirm {
  position: relative;
  width: 12px;
  height: 12px;
  cursor: pointer;
  top: 25px;
  left: 375px;
}

.close_delete_confirm::before,
.close_delete_confirm::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.5px;
  height: 17px;
  background-color: black;
}

.close_delete_confirm::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close_delete_confirm::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.delete_confirm img {
  -webkit-user-drag: none;
  user-select: none;
  position: relative;
  top: 56px;
  left: 50%;
  transform: translate(-50%);
}
.delete_confirm_second_text {
  position: relative;
  color: #3b3838;
  font-weight: 400;
  font-size: 14px;
  height: 21px;
  line-height: 21px;
  letter-spacing: 0.25px;
  user-select: none;
  top: 83px;
  left: 50%;
  transform: translate(-50%);
  width: 100px;
}
.delete_confirm_third_text {
  position: relative;
  color: #3b3838;
  font-weight: 400;
  font-size: 14px;
  height: 21px;
  line-height: 21px;
  letter-spacing: 0.25px;
  user-select: none;
  top: 83px;
  left: 50%;
  transform: translate(-50%);
  width: 243px;
}
.delete_confirm_btn_container {
  width: 332px;
  height: 48px;
  position: relative;
  top: 108px;
  left: 50%;
  transform: translate(-50%);
}
.forever_delete_confirm_btn {
  width: 150px;
  height: 48px;
  border-radius: 14px;
  cursor: pointer;
  background-color: #b82c30;
  color: white;
  font-size: 18px;
  letter-spacing: 1.25px;
  font-weight: 500;
  line-height: 48px;
  border: none;
  float: right;
  user-select: none;
}
.forever_delete_confirm_btn_cancel {
  background-color: white;
  color: #120405;
  float: left !important;
}
/* 中間的部分 終點 */

/* 垃圾桶的部分 起點 */
.trash_page_middle {
  width: 98%;
  height: 85vh;
  border: 1px solid #e1dcdc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  background-color: white;
  margin-top: 40px;
}
.last_30_days {
  width: 100%;

  /* min-height: 222px; */
  margin-top: 70px;
  position: relative;
  /* left: 80px; */
  padding-bottom: 25px;
}
.last_time {
  position: relative;
  height: 44px;
  left: 100px;
  color: #3b3838;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 44px;
  user-select: none;
}
.time_subline_up {
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
  border-bottom: 1px solid #c7c2c2;
  position: relative;
}
.time_subline {
  left: 90px;
  width: 304px;
  height: 1px;
  border-bottom: 1px solid #c7c2c2;
  position: relative;
}
.trash_pic {
  -webkit-user-drag: none;
  user-select: none;
}
.recover {
  position: relative;
  top: 0px;
  right: 68px;
}
.forever_delete {
  position: relative;
  top: 0px;
  right: 0px;
}
.trash_box_container {
  width: 1280px;
  height: auto;
  position: relative;
  top: 52px;
  overflow: hidden;
  margin-bottom: 0px;
}
.trash_box input[type="checkbox"] {
  display: none;
}
.trash_box input[type="checkbox"] + label {
  width: 301px;
  height: 44px;
  border: 1.5px solid #e1dcdc;
  border-radius: 13px;
  background-color: white;
  float: left;
  margin: 0 16px 25px 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 44px;
  font-weight: 400;
  letter-spacing: 1.25px;
  text-indent: 69.67px;
  user-select: none;
}
.trash_box input[type="checkbox"]:hover + label {
  background-color: #f2eeee;
}
.trash_box input[type="checkbox"]:active + label {
  background-color: #f2eeee;
}
.trash_box input[type="checkbox"]:checked + label {
  background-color: #f2eeee;
}
.last_one_year {
  width: 1264px;
  min-height: 242px;
  position: relative;
  top: 50px;
}
.recovered {
  width: 399px;
  height: 141px;
  background-color: white;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.4);
  border-radius: 14px;
  position: absolute;
  top: 30vh;
  left: 529px;
  z-index: 9;
}
.recovered img {
  position: relative;
  top: 32px;
  left: 183.5px;
  -webkit-user-drag: none;
  user-select: none;
}
.recovered p {
  position: relative;
  top: 40px;
  left: 164px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25px;
  color: #3b3838;
  user-select: none;
  -webkit-user-drag: none;
}
.forever_delete_confirm {
  width: 412px;
  height: 372px;
  position: absolute;
  top: 20%;
  left: 520px;
  background-color: white;
  border: 1.5px solid #c7c2c2;
  box-shadow: 0px 0px 5px 1px rgba(65, 65, 65, 0.25);
  border-radius: 14px;
  z-index: 8;
}
.forever_delete_confirm_first_text {
  width: 156px;
  height: 28px;
  position: relative;
  top: 28px;
  left: 50%;
  transform: translate(-50%);
  font-size: 26px;
  font-weight: 700;
  line-height: 28px;
  user-select: none;
}
.close_forever_delete_confirm {
  position: relative;
  width: 12px;
  height: 12px;
  cursor: pointer;
  top: 25px;
  left: 375px;
}

.close_forever_delete_confirm::before,
.close_forever_delete_confirm::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.5px;
  height: 17px;
  background-color: black;
}

.close_forever_delete_confirm::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close_forever_delete_confirm::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.forever_delete_confirm img {
  -webkit-user-drag: none;
  user-select: none;
  position: relative;
  top: 56px;
  left: 50%;
  transform: translate(-50%);
}
.forever_delete_confirm_second_text {
  position: relative;
  color: #3b3838;
  font-weight: 400;
  font-size: 14px;
  height: 21px;
  line-height: 21px;
  letter-spacing: 0.25px;
  user-select: none;
  top: 83px;
  left: 50%;
  transform: translate(-50%);
  width: 243px;
}
.forever_delete_confirm_btn_container {
  width: 332px;
  height: 48px;
  position: relative;
  top: 108px;
  left: 50%;
  transform: translate(-50%);
}
.forever_delete_confirm_btn {
  width: 150px;
  height: 48px;
  border-radius: 14px;
  cursor: pointer;
  background-color: #b82c30;
  color: white;
  font-size: 18px;
  letter-spacing: 1.25px;
  font-weight: 500;
  line-height: 48px;
  border: none;
  float: right;
  user-select: none;
}
.forever_delete_confirm_btn_cancel {
  background-color: white;
  color: #120405;
  float: left !important;
}
.recover_trash_pic {
  position: absolute;
  /* margin-left: auto; */
  margin-top: 7px;
  left: 87%;
}
.forever_delete_trash_pic {
  position: absolute;
  /* margin-left: auto; */
  margin-top: 7px;
  left: 92%;
  /* margin-left: 1100px; */
}

router-link {
  color: black;
}
/* 垃圾桶的部分 終點 */
</style>
