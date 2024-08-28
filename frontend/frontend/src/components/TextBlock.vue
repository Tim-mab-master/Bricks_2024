<template>
  <!-- <transition name="move"> -->
  <div
    class="cart_container"
    @mouseenter.stop="showAddbtn = true"
    @mouseleave="showAddbtn = false"
  >
    <transition name="show">
      <el-button class="add_cartButton" @click="add_cart" v-show="showAddbtn"
        ><el-icon><Plus /></el-icon
      ></el-button>
    </transition>
    <transition name="move">
      <div class="additional-textarea">
        <div class="textarea-container">
          <resize-textarea
            class="textArea"
            placeholder="請輸入內容"
            v-model="textValue"
            :disabled="isCartDisabled"
            @keyup="handleKeyup"
          ></resize-textarea>
          <!-- 顯示鎖定、刪除文字區塊按鈕 -->
          <el-button class="edit_textButton" @click="show"
            ><el-icon><MoreFilled /></el-icon
          ></el-button>
        </div>
        <div class="split-line" style="width: 100%"></div>
        <div class="tags" :disabled="isCartDisabled">
          <el-tooltip :content="Tagclass" effect="light">
            <el-tag
              v-for="tag in visibleTags"
              :key="tag.Tag_id"
              class="tag"
              closable
              :disable-transitions="false"
              :disabled="isCartDisabled"
              @close="handleClose(tag)"
            >
              {{ tag.Tag_name }}
            </el-tag>
          </el-tooltip>

          <el-tag
            v-if="hiddenTagCount > 0"
            class="tag"
            @click="showHiddenTags"
            style="cursor: pointer"
          >
            +{{ hiddenTagCount }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="inputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-if="!inputVisible"
            class="button-new-tag ml-1 addTags"
            size="small"
            @click="showInput('事項')"
            :disabled="isCartDisabled"
            @locked="isLocked"
            >+ 事項</el-button
          >
          <el-button
            v-if="!inputVisible"
            class="button-new-tag ml-1 addTags"
            size="small"
            @click="showInput('組別')"
            :disabled="isCartDisabled"
            @locked="isLocked"
            >+ 組別</el-button
          >
        </div>
      </div>
    </transition>
    <div
      v-if="isShowed"
      id="rightClick"
      ref="rightClick"
      @click="unShow()"
      @blur="unshowEditing()"
    >
      <EditTextara @locked="isLocked" @delete="deleteCart" />
    </div>
    <div
      v-if="isUnlockShowed"
      id="rightClick"
      ref="rightClick"
      @click="show()"
      @blur="unshowEditing()"
    >
      <Unlock @unlocked="unlocked" />
    </div>
  </div>
  <!-- </transition> -->
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  computed,
  defineEmits,
  watch,
} from "vue";
import EditTextara from "./EditTextara.vue";
import Unlock from "./Unlock.vue";
import axios from "axios";
import store from "../store/store";
import debounce from "lodash/debounce";

const props = defineProps({
  isShowed: Boolean,
  isUnlockShowed: Boolean,
  showAddbtn: Boolean,
  content: String,
  tags: Array,
});

const emit = defineEmits(["add_cart", "deleteCart"]);

const textValue = ref(props.content);

const saveInput = debounce(async (value) => {
  try {
    await axios.post(
      "http://35.201.168.185:5000/edit_textBox",
      {
        textBox_id: blockNow.value.TextBox_id,
        textBox_content: textValue.value,
      },
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      }
    );
    console.log("Data saved:", textValue.value);
    store.commit("setSaveMessage", "文字方塊變動已儲存");
  } catch (error) {
    console.error("Error saving data:", error);
    store.commit("setSaveMessage", "文字方塊儲存失敗");
  } finally {
    // store.commit('setSaveMessage', "");
  }
  console.log(store.getters.getSaveMessage);
}, 500); // 500 毫秒延遲

// 處理 keyup 事件
const handleKeyup = (event) => {
  saveInput(textValue.value);
  // setTimeout(store.commit('setSaveMessage', ""), 1000)
};

const isUnlockShowed = ref(props.isUnlockShowed);
const textarea1 = ref("");
const inputVisible = ref(false);
const inputValue = ref("");
const tagArray = ref([]);
const blockNow = computed(() => store.getters.getBlockNow);

const dynamicTags = computed(() => props.tags);
const isShowed = ref(false);
const rightClickRef = ref(null);
const isCartDisabled = ref(false);
const hiddenTagCount = ref(0);
const visibleTags = ref([]);
const inputRef = ref(null);
const TagClass = ref("");

const showHiddenTags = () => {
  visibleTags.value = dynamicTags.value;
  hiddenTagCount.value = 0;
  window.removeEventListener("resize", calculateVisibleTags);
};

const calculateVisibleTags = () => {
  // nextTick(() => {
  const container = document.querySelector(".tags");
  if (!container) return;

  const containerWidth = container.clientWidth;
  const tagWidth = 75;
  const maxVisibleTags = Math.floor(containerWidth / tagWidth);

  if (dynamicTags.value) {
    console.log("dynamicTags:", dynamicTags.value);
    if (dynamicTags.value.length >= maxVisibleTags) {
      visibleTags.value = dynamicTags.value.slice(0, maxVisibleTags);
      hiddenTagCount.value =
        dynamicTags.value.length - visibleTags.value.length;
    } else {
      visibleTags.value = dynamicTags.value;
      hiddenTagCount.value = 0;
    }
  }
  console.log("visibleTag:", visibleTags.value);
  console.log("hiddenTag:", hiddenTagCount.value);
  // })
};

const handleClose = (tag) => {
  if (isCartDisabled.value == false) {
    // const index = dynamicTags.value.indexOf(tag);
    // if (index !== -1) {
    // dynamicTags.value.splice(index, 1);
    const deleteTag = {
      textBox_id: blockNow.value.TextBox_id,
      tag_id: tag.Tag_id.toString(),
    };
    const response = axios.post(
      "http://35.201.168.185:5000/delete_tag",
      deleteTag,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      }
    );
    console.log(response);
  }
  store.dispatch("fetchOneRecord");
  calculateVisibleTags();
  // }
};

const showInput = (tagClass) => {
  inputVisible.value = true;
  TagClass.value = tagClass;
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

const handleInputConfirm = async () => {
  if (inputValue.value) {
    // dynamicTags.value.push(inputValue.value);
    // console.log("blockNow：",blockNow.value);
    const newTag = {
      textBox_id: blockNow.value.TextBox_id,
      tag_name: inputValue.value,
      tag_class: TagClass.value,
    };
    const response = await axios.post(
      "http://35.201.168.185:5000/add_tag",
      newTag,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      }
    );
    console.log(response.message);
  }
  await store.dispatch("fetchOneRecord");
  inputVisible.value = false;
  inputValue.value = "";
  calculateVisibleTags();
  console.log(dynamicTags.value);
};

const show = () => {
  isShowed.value = !isShowed.value;
  isUnlockShowed.value = false;
  isCartDisabled.value = false;
};

const unShow = () => {
  isUnlockShowed.value = true;
  isShowed.value = false;
  isCartDisabled.value = true;
};

const isLocked = () => {
  isCartDisabled.value = true;
};

const unlocked = () => {
  isCartDisabled.value = false;
};

// 點擊其他位置，不顯示鎖定編輯以及刪除文字區塊
const unshowEditing = () => {
  alert("按下其他地方");
  isUnlockShowed = false;
  isShowed = false;
};

const handleClickOutside = (event) => {
  const rightClick = rightClickRef.value;
  if (rightClick && !rightClick.contains(event.target)) {
    unShow();
  }
};

const deleteCart = () => {
  emit("deleteCart");
};

const add_cart = () => {
  emit("add_cart");
};

onMounted(() => {
  calculateVisibleTags();
  if (props.tags) {
    tagArray.value = props.tags.map((element) => element.Tag_name);
  }
  window.addEventListener("resize", calculateVisibleTags);
  document.addEventListener("click", handleClickOutside);
  console.log("tags", visibleTags.value);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: opacity 0.2s;
}
.show-enter-from,
.show-leave-to {
  opacity: 0;
}

.cart_container {
  position: relative;
  display: flex;
}
.additional-textarea {
  position: relative;
  /* left:-30px; */
  border-radius: 4px;
  width: 890px;
  padding: 10px;
  border: 1px solid #ccc; /* 大框框的边框样式，你可以根据需要调整颜色和样式 */
  background-color: white;
}
.textarea-container {
  height: auto;
  display: flex;
  align-items: flex-start;
}

.textArea {
  min-height: 50px;
  font-size: 15px;
  width: 100%;
  border: 0px; /* 移除 textarea 的边框 */
  resize: none; /* 防止調整 textarea 的大小 */
  outline: none; /* 移除点击时的边框 */
}
#tag {
  font-size: 15px;
  width: 100%;
  border: 0px; /* 移除 textarea 的边框 */
  resize: none; /* 防止調整 textarea 的大小 */
  outline: none;
}
.split-line {
  border-top: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.add_cartButton {
  /* display: inline-block; */
  height: 40px;
  width: 50px;
  position: absolute;
  left: -65px;
  margin-right: 15px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.edit_textButton {
  height: 35px;
  width: 50px;
  margin-left: 0px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin: 6px 10px;
}
.tag {
  margin: 2px;
  margin-right: 4px;
  margin-bottom: 6px;
}
.ml-1 {
  width: 60px;
}
.button-new-tag {
  margin-top: 2px;
  margin-left: 1px;
  margin-right: 5px;
}

.editCPN {
  position: absolute;
  top: 20px;
  left: 970px;
}
#rightClick {
  position: relative;
  top: 0px;
  left: 10px;
  z-index: 10;
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
  .additional-textarea {
    width: 665px;
  }
  .textArea,
  #tag {
    font-size: 12px;
  }
  .cart_container {
    width: fit-content;
  }
}
</style>
