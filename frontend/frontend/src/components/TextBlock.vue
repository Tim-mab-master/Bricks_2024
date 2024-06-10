<template>
    
  <div class="cart_container" >
    <el-button class="add_cartButton"  @click="add_cart"><el-icon><Plus /></el-icon></el-button>
    <div class="additional-textarea">
        <div class="textarea-container">
          <resize-textarea class="textArea" placeholder="請輸入內容" v-model="textValue" :disabled="isCartDisabled" ></resize-textarea>
          <el-button class="edit_textButton" @click="show"><el-icon><MoreFilled /></el-icon></el-button>
        </div>
        <div class="split-line" style="width: 100%;"></div>
        <div class="tags">
      <el-tag
        v-for="(tag, index) in visibleTags"
        :key="index"
        class="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-tag v-if="hiddenTagCount > 0" class="tag"
        @click="showHiddenTags"  style="cursor: pointer;">
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
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
        :disabled="isCartDisabled"
        @locked="isLocked">+ 事項</el-button>
      <el-button
      v-if="!inputVisible"
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
        :disabled="isCartDisabled" 
        @locked="isLocked">+ 組別</el-button>
    </div>
    </div>
  </div>

  <div v-if="isShowed" id="rightClick" ref = "rightClick" @click="unShow()"><EditTextara @locked="isLocked"/></div>        
  <div v-if="isUnlockShowed" id="rightClick" ref = "rightClick" @click="unShow()"><Unlock @unlocked="unLocked"/></div>        

</template>

<script>
import { ref, onMounted, mounted, onUnmounted,nextTick } from 'vue';
import EditTextara from './EditTextara.vue';
import Unlock from './Unlock.vue';
export default {
components: {
  EditTextara,
  Unlock,
},
props: {
  isShowed: Boolean,
  isUnlockShowed: Boolean,
},
setup(props, { emit }) {
  const textarea1 = ref("");
  const inputVisible = ref(false);
  const inputValue = ref("");
  const dynamicTags = ref(['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8', 'Tag9', 'Tag10']);
  const isShowed= ref(false);
  const rightClickRef = ref(null);
  const isCartDisabled = ref(false);
  const isUnlockShowed = ref(false);
  const hiddenTagCount = ref(0);
  const visibleTags = ref([]);
  const inputRef = ref(null); 
  const showHiddenTags = () => {
    visibleTags.value = dynamicTags.value;//顯示所有
    hiddenTagCount.value = 0; 
    //移除resize監聽器
    window.removeEventListener('resize', calculateVisibleTags);
    };
  
  const calculateVisibleTags = () => {
      nextTick(() => { //確保在 DOM 更新完成後執行回調函數。這樣可以確保容器的寬度已正確計算。
        const container = document.querySelector('.tags');
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const tagWidth =75; // 假設每個標籤的寬度是80px，包括邊距
        const maxVisibleTags = Math.floor(containerWidth / tagWidth); //最多可以容納幾個tag
        console.log(maxVisibleTags)
        
        if (dynamicTags.value.length >= maxVisibleTags) {// >11 maxVisibleTags =11
          visibleTags.value = dynamicTags.value.slice(0, maxVisibleTags );
          console.log("contaner",visibleTags.value);
          hiddenTagCount.value = dynamicTags.value.length - visibleTags.value.length;
        } else {
          visibleTags.value = dynamicTags.value;
          hiddenTagCount.value = 0;
        }
      });
    };

    const handleClose = (tag) => {//關掉tag時
      const index = dynamicTags.value.indexOf(tag);
      if (index !== -1) {
        dynamicTags.value.splice(index, 1);
      }
      calculateVisibleTags();
    };

    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.focus();
        }
      });
    };
    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = '';
      calculateVisibleTags();
    };
    

  const edit_textArea = () => {

  };
  const show = () => {
    if (isCartDisabled) {
      console.log(isCartDisabled.value);
      isShowed.value = true;
    } else {
      isUnlockShowed.value = true;
    }
};

  const unShow = () => {
    isUnlockShowed.value = false;
    isShowed.value = false;
  };
  const isLocked = () =>{
    isCartDisabled.value = true;
  }
  const unlocked = () =>{
    isCartDisabled.value = false;
  };
  const handleClickOutside = (event) => {
  const rightClick = rightClickRef.value;
  if (rightClick && !rightClick.contains(event.target)) {
    unShow(index); // 或者使用具體的索引值
  }
};


  const add_cart = () => {
    
    // const uniqueId = Date.now().toString();
    // cartContainers.value.push({
    //   id: uniqueId,
    //   textValue: '',  
    //   dynamicTags: [],
    //   inputValue: '',
    //   inputVisible: false,
    //   isShowed: false,
    // });
    emit('add_cart');
  };
  onMounted(() => {
      calculateVisibleTags();
      window.addEventListener('resize', calculateVisibleTags);
  });
  

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  return {
    textarea1,
    edit_textArea,
    show,
    unShow,
    isShowed,
    rightClickRef,
    add_cart,
    isUnlockShowed,
    isLocked,
    unlocked,
    dynamicTags,
      inputVisible,
      inputValue,
      inputRef,
      isCartDisabled,
      hiddenTagCount,
      showHiddenTags,
      visibleTags,
      calculateVisibleTags,
      handleClose,
      showInput,
      handleInputConfirm,
  };
},
};
</script>

<style scoped>
  .cart_container{
      position: relative;
      display: flex;
  }
  .additional-textarea {
  border-radius: 4px;
  width: 890px;
  padding: 10px;
  border: 1px solid #ccc; /* 大框框的边框样式，你可以根据需要调整颜色和样式 */
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
  height: 40px;
  width: 50px;
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
  margin: 2px;
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
  position: absolute;
  top: 50px;
  left: 920px;
  z-index: 10;
}

</style>