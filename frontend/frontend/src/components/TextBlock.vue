<template>

  <!-- <transition name="move"> -->
  <div class="cart_container" @mouseenter.stop="showAddbtn = true" @mouseleave="showAddbtn = false">
    <transition name="show">
      <el-button class="add_cartButton"  @click="add_cart" v-show="showAddbtn" ><el-icon><Plus /></el-icon></el-button>
  </transition>
    <transition name="move">
      <div class="additional-textarea">
        <div class="textarea-container" >
          <resize-textarea class="textArea" placeholder="請輸入內容" v-model="textValue" :disabled="isCartDisabled" ></resize-textarea>
          <el-button class="edit_textButton" @click="show"><el-icon><MoreFilled /></el-icon></el-button>
        </div>
        <div class="split-line" style="width: 100%;"></div>
        <div class="tags">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button
      v-if="!inputVisible"
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
        :disabled="isCartDisabled" @locked="isLocked">+ 事項</el-button>
      <el-button
      v-if="!inputVisible"
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
        :disabled="isCartDisabled" @locked="isLocked">+ 組別</el-button>
    </div>
    </div>
    </transition>
    <div v-if="isShowed" id="rightClick" ref = "rightClick" @click="unShow()" @blur="unShow"><EditTextara @locked="isLocked" @delete = "deleteCart"/></div>        
    <div v-if="isUnlockShowed" id="rightClick" ref = "rightClick" @click="unShow()" @blur="unShow"><Unlock @unlocked="unlocked"/></div>
    
    
  
  </div>
<!-- </transition> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import EditTextara from './EditTextara.vue';
import Unlock from './Unlock.vue';

const props = defineProps({
  isShowed: Boolean,
  isUnlockShowed: Boolean,
  showAddbtn: Boolean,
  content: String,
});

const emit = defineEmits(['add_cart']);

const textValue = computed(() => props.content);
const inputValue = ref("");
const dynamicTags = ref([]);
const inputVisible = ref(false);
const isShowed = ref(props.isShowed);
const rightClickRef = ref(null);
const isCartDisabled = ref(false);
const isUnlockShowed = ref(props.isUnlockShowed);

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const show = () => {
  if (!isCartDisabled.value) {
    isShowed.value = true;
  } else {
    isUnlockShowed.value = true;
  }
};

const unShow = () => {
  isUnlockShowed.value = false;
  isShowed.value = false;
};

const isLocked = () => {
  isCartDisabled.value = true;
};

const unlocked = () => {
  isCartDisabled.value = false;
};

const handleClickOutside = (event) => {
  const rightClick = rightClickRef.value;
  if (rightClick && !rightClick.contains(event.target)) {
    unShow(); // 确保调用没有参数
  }
};

const deleteCart = () =>{
  emit('deleteCart');
}

const add_cart = () => {
  emit('add_cart');
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.show-enter-active, .show-leave-active {
  transition: opacity 0.5s;
}
.show-enter-from, .show-leave-to {
  opacity: 0;
}

.cart_container{
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
#tag{
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

.add_cartButton{
  /* display: inline-block; */
  height: 40px;
  width: 50px;
  position: relative;
  /* left: -65px; */
  margin-right: 15px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.edit_textButton{
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
margin-right: 4px;
}
.ml-1 {
width: 60px;
}
.editCPN{
  position: absolute;
  top: 20px;
  left: 970px;
}
#rightClick{
  position: relative;
  top: 0px;
  left: 10px;
  z-index: 10;
}

@media screen and (min-width: 1024px) and (max-width: 1440px){
  .additional-textarea{
    width: 665px;
    
  }
  .textArea, #tag {
    font-size: 12px;
  }
  .cart_container{
    width: fit-content;
  }
}

</style>