<template>
    <div class="view">
    <!-- <side-bar class="sideBar"/> -->
    <div class="navAndCont" >

      <!-- <nav-bar-main class="navBar"></nav-bar-main> -->
      
      <div class="result">    
            
                <el-backtop visibility-height="0" class="backtop">
                <div id="backtop">
                    <el-icon class="icon"><upload/></el-icon>
                </div>
                </el-backtop>
                <div class="toolBar">
                <ordering/>
                <sort/>
            </div>
                <!-- <document-with-info v-for="block in getResult" :key="block.TextBox_id" :textValue="block.textBox_content" :Tags="block.Tag"></document-with-info> -->
                <div v-for="block in getResult" :key="block.TextBox_id">{{ block.textBox_content }}</div>
            </div>
      
      
    
    </div>
    </div>
  
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import TagSearchArea from '../components/KerwinBricks/TagSearchArea.vue';
import NavBarMain from '../components/NavBarMain.vue';
import SideBar from '../components/SideBar.vue';
import DCMwithDate from '@/components/KerwinBricks/DCMwithDate.vue';
import Sort from '../components/SharonBricks/Sort.vue';
// import Ordering from '../components/SharonBricks/Ordering.vue';
import Ordering from '@/components/SharonBricks/Ordering.vue';
import store from '../store/store.js';

    const getResult = computed(() => store.getters.getTagSearchResult);

    const tagShowed = ref(false);
    const meetingClass = ref("meeting");

    const showTags = () =>{
        tagShowed.value = !tagShowed.value;
        if(tagShowed.value === true){
            meetingClass.value = "showingClass";
        }
        else{
            meetingClass.value = "meeting";
        }
    };

    
        
</script>

<style scoped>
.view{
    position: relative;
}
.navBar{
    position: absolute;
    top: 0;
    left: 200px;
    right: 0;
    /* grid-area: navBar; */
 }
 .sideBar{
    /* grid-area: sideBar; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
 }
 .navAndCont{
    background: #F2F3F5;
  position: absolute;
  left: 200px;
  width:auto;
  top: 0;
  right: 0;
 }

 .tagsPlace{
  position: fixed;
  right: 32px;
  top: 68px;
  border-radius: var(--radius-button-large-radius, 4px);
  border: 1px solid var(--base-color-border-el-border-color, #DCDFE6);
  background: #FFF;
  padding: 4px 16px;
 }

 .el-dropdown-link{
  display: flex;
  gap: 8px;
  cursor: pointer;
 }

 .el-dropdown-link{
  color: #C91F2F;
 }

 .tagInside{
  position: fixed;
  right: 32px;
  top: 114px;
  z-index: 10;
 }

 .tagMenu{
  width: 372px;
 }


 .result{
    position: absolute;
    display:grid;
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
    row-gap: 8px;
    top: 68px;
    /* margin-top: 128px; */
    /* width: 572px; */
    left:46px;
 }

 .backtop{
    
 }

 #backtop{
    background-color: var(--el-bg-color-overlay);
    box-shadow: var(--el-box-shadow-lighter);
    text-align: center;
    color: #C91F2F;
    padding: 9px 16px;
    justify-content: left;
    position: fixed;
    left: 255px;
    top: 70px;
 }

 .icon{
    font-size: 14px;
 }

 .toolBar{
    display:flex;
    gap: 12px;
    /* position: absolute; */
    top: 68px;
    /* right:0; */
    margin-bottom: 12px;
    justify-content: right;
    text-align: right;
    width: 1fr;
    /* background: #F2F3F5; */
    /* left: 46px; */
    /* right: 700px; */
 }

 /* .all{
    position: absolute;
    display: flex;
    /* gap: 14px; */
    /* top: 68px;
    left: 46px;
    width: 100%;
 } */ 

</style>