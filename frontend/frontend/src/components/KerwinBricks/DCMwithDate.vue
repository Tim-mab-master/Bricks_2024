<template>

  <div class="cart_container">
          <div class="additional-textarea">
            <div class="info">
            <h3 class="name">會議記錄</h3>
            <h4 class="date">{{ dateInfo +" "+timeInfo}}</h4>
            <!-- <h4 class="time">15:00~16:00</h4> -->
          </div>
          <div class="split-line" style="width: 100%;"></div>
          <div class="textarea-container">
            <resize-textarea class="textArea" placeholder="請輸入內容" v-model="text" @keyup="handleKeyup"></resize-textarea>
            <!-- :maxHeight="150" -->
            <button class="edit_textButton" type="button" @click="edit_textArea"><el-icon><MoreFilled /></el-icon></button>
          </div>
          <!-- <div class="split-line" style="width: 100%;"></div> -->
          <div class="tags">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag.Tag_id"
              size="large"
              type="danger"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
            <span class="tag">{{ tag.Tag_name }}</span>
            </el-tag>
            <!-- <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="large"
              type="danger"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            /> -->
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
      </div>
</template>
<script setup>
import { nextTick, ref, onMounted } from "vue";
import { ElInput } from "element-plus";
import store from '@/store/store.js';
import debounce from 'lodash/debounce';
import axios from "axios";

    const props = defineProps({
        textValue: String,
        Tags: Array,
        date: String,
        blockID: Number,
    });
    const text = ref(props.textValue);
    const formatTime = (date) =>{
      const dateInput = new Date(date);
      const year = dateInput.getFullYear();
      const month = String(dateInput.getMonth() + 1).padStart(2, '0');
      const day = String(dateInput.getDate()).padStart(2, '0');
      
      return `${year}/${month}/${day}`;
    }
    const getHour = (date) =>{
      const input = new Date(date);
      const hours = input.getHours().toString().padStart(2, '0');
      const minutes = input.getMinutes().toString().padStart(2, '0');
      const seconds = input.getSeconds().toString().padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`
    }
    const dateInfo = ref(formatTime(props.date));
    const timeInfo = ref(getHour(props.date));

    // const handleCommand = (command) => {
    //   inputVisible.value = true;
    // };

    //tags
    const inputValue = ref("");
    const dynamicTags = ref(props.Tags[0]);
    const inputVisible = ref(false);
    const TagClass = ref("");
    const inputRef = ref(null);
    // const InputRef = ref < InstanceType < typeof ElInput >> new ElInput();
    const handleClose = (tag) => {
      store.dispatch('deleteTag',{
        blockID: props.blockID,
        tagID: tag.Tag_id,
      })
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
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
        await store.dispatch('addTag', {
          blockID: props.blockID, 
          inputValue: inputValue.value, 
          tagClass: TagClass.value
        })
        dynamicTags.value.push({Tag_name: inputValue.value});
      }
      // await store.dispatch('fetchOneRecord');
      inputVisible.value = false;
      inputValue.value = "";
      // calculateVisibleTags();
      console.log(dynamicTags.value);
      
    };

    const saveInput = debounce(async (value) => {
      try {
        await axios.post('http://35.201.168.185:5000/edit_textBox', { 
          "textBox_id":props.blockID,
          "textBox_content": text.value
         },{
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
          });
        console.log('Data saved:', value);
        store.commit('setSaveMessage', "文字方塊變動已儲存");
      } catch (error) {
        console.error('Error saving data:', error);
        store.commit('setSaveMessage', "文字方塊儲存失敗");
      } finally {
        // store.commit('setSaveMessage', "");
      }
      console.log(store.getters.getSaveMessage);
    }, 500); // 500 毫秒延遲

    // 處理 keyup 事件
    const handleKeyup = (event) => {
      saveInput(text.value);
      // setTimeout(store.commit('setSaveMessage', ""), 1000)
    };

</script>

<style scoped>
.cart_container {
  display: flex;
  align-items: flex-start;
  width: 890px;
  position: relative;
}
.add_cartButton {
  height: 40px;
  width: 8%;
  margin-top: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.cart_container .additional-textarea {
  width: 100%;
  position: relative;
  /* left: 2%; */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: var(--base-color-text-el-text-color-primary, #303133);
/* CN regular/body1-Regular */
}
.info {
  display: flex;
  height: 36px;
  position: relative;
}
.name {
  margin-left: 11px;
  margin-top: 8px;
  font-weight: 500;
  position: absolute;
  font-size: 14px;
  color: #606266;
  font-family: PingFang TC;
}
.date {
  display: flex;
  position: absolute;
  right: 16px;
  /* bottom: 12px;  */
  /* margin-right: 16px; */
  margin-top: 5px;
  font-weight: 500;
  color: #606266;
  
  font-size: 14px;
  color: var(--base-color-text-el-text-color-regular, #606266);
/* CN regular/body1-Regular */
/* font-family: PingFang TC; */
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 24px;
}
.textarea-container {
  position: relative;
  /* height: ; */
}
.el-input {
  font-size: 14px;
  border: none;
}
.textarea-container .edit_textButton {
  height: 32px;
  width: 45px;
  right: 12px;
  top: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 16px;
  border: 1px #DCDFE6 solid;
  gap: 4px;
  align-content: center;
  position: relative;
  bottom: -10px;
  left:-10px;
  width:878px;
}
.tag {
  /* margin-right: 4px; */
  width: 68px;
  height: 24px;
  padding: 1px 10px;
}
::v-deep(.el-button.el-button--small.button-new-tag.ml-1.addTags){
  width: 68px;
  height: 24px;
  padding: 1px 10px;
}
.ml-1 {
  width: 68px;
  height: 24px;
  padding: 1px 10px;
}

/* .cart_container{
  position: relative;
  display: flex;
} */
  .additional-textarea {
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; /* 大框框的边框样式，你可以根据需要调整颜色和样式 */
  }
  .textarea-container {
    height: auto;
    display: flex;
    align-items: flex-start;
  }
  
  .textArea {
    display: block;
    position: relative;
  
    min-height: 50px;
    font-size: 15px;
    width: 90%;
    border: 0px; /* 移除 textarea 的边框 */
    resize: none; /* 防止調整 textarea 的大小 */
    outline: none; /* 移除点击时的边框 */
    /* border-bottom: 1px #DCDFE6 solid;
    border-top: 1px solid #DCDFE6 ; */

    color: var(--Base-Color-Text---el-text-color-regular, #606266);
    /* CN regular/body1-Regular */
    font-family: PingFang TC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
  }
  .split-line {
    border-top: 1px solid #ccc; 
    margin-top: 10px;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    .cart_container{
      width: 680px;
    }
    .tags{
      width:98%;
    }
  }
</style>
