<template>
    <!-- <div class="all"> -->
      <side-bar class="sideBar"></side-bar>
      <nav-bar-main class="navBar"></nav-bar-main>
    
      <div class="navAndCont"  id="new" >
        <div class="tag">
          <!-- 標籤 -->
          <tag-place @show="showInfo"/>
        </div>
           
        
          <div :class="meetingClass" v-if="showedInfo">
          
          <meeting @submit = "submit" @recordInfo = "setInfo"></meeting>
          <div class="textBlock">
            <text-block v-for="block in blocks" :key="block.id" @add_cart="add_block" :showAddBtn = "showAddBtn" @deleteCart = "deleteCart" :content="block.textBox_content" />
          </div> 
          
        </div>
        <div class="result" v-else>    
          <div class="toolBar">
            <ordering/>
            <sort/>
          </div>
            <document-with-info v-for="item in 10" :key="item"/>
      </div>
      
      </div>
    
</template>


<script setup>
import { computed, ref } from "vue";
// import axios from "axios";
import SideBar from "../components/SideBar.vue";
import NavBarMain from '../components/NavBarMain.vue';
import meeting from '../components/meeting.vue';
import TextBlock from "@/components/TextBlock.vue";
import TagPlace from '../components/TagPlace.vue';
import { useRouter } from "vue-router";
import Ordering from '../components/SharonBricks/Ordering.vue';
import sort from '../components/SharonBricks/Sort.vue';
import DocumentWithInfo from "@/components/KerwinBricks/DCMwithDate.vue";
import axios from 'axios';
import { onMounted } from "vue";
import { useStore } from "vuex";
  
    const meetingClass = ref("meeting");
    const recordInfo = ref({});
    const activeOption = ref(null);  
    const isShowed = ref(false); 
    const router = useRouter();
    const currentActive = ref("1-1");
    const showedInfo = ref(true);
    const quantity = ref(1);
    const recordID = ref("");
    const showAddBtn = ref(false);
    const store = useStore();
    const blocks = computed(() => store.getters["records/getCurrTextBoxes"]);
    
    const setInfo = (value) =>{
      recordInfo.value = value;
    }

    const submit = () =>{
      console.log("recordInfo："+recordInfo);
      // const body = {
      //   "project_id": 86,
      //   "record_name": recordInfo.value.data.formName,
      //   "record_date": recordInfo.value.data.date,
      //   "record_department": "後端",
      //   "record_attendances": 4,
      //   "record_host_name": "劉宸宇",
      //   "record_place": recordInfo.value.data.place
      // }
      // const response = axios.post("http://34.81.219.139:5000/add_record", body);
      // console.log(response.message);
      // store.dispatch("records/fetchAllRecords");
    }

    const deleteCart = async () =>{
      try{
        const response = await fetch('http://34.81.219.139:5000/delete_textBox',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            textBox_id: "16",
          }),
          credentials: 'include',
        });
        console.log(response.data.message);
      }catch(error) {
        console.log("刪除失敗");
      }

      if(quantity > 1){
        quantity --;
      }
    }

    const showInfo = (value) =>{
      showedInfo.value = value;
    };
    const add_block = () =>{
      const block = {
        "id": store.state.records.currTextBoxes[state.currTextBoxes.length - 1]+1,
        "record_id": "3",
        "textBox_content": "",
        "textBox_update_time": new Date(),s
      }
      store.commit("records/addBlock",block);
      
    }

    const showBtn = () =>{
      showAddBtn.value = true;
    }


</script>

<style scoped>

  .navBar{
    position: relative;
    top: 0;
    left: 200px;
    right: 0;
    /* grid-area: navBar; */
 }
 .sideBar{
    /* grid-area: sideBar; */
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
 }
 .navAndCont{
  background-color: #F2F3F5;
  /* display: flex; */
  position: fixed;
  overflow-y: scroll;
  
  left: 200px;
  top: 48px;
  height: 100vh;
  width: calc(100vw - 200px);
 }
 .info{
  position: relative;
 }
 .textBlock{
  position: relative;
  top:8px;
  /* left: -65px; */
  display: grid;
  grid-row-gap: 8px;
  padding-bottom: 10px;
  /* gap: 8px; */
  background-color: #F2F3F5;
 }
 /* .textBlock :hover{
  left: -63px;
 } */

 .meeting{
  position: absolute;
  display: inline-block;
  top: 20px;
  margin-bottom: 20px;
  left:10%;
  width: calc(100vw - 200px);
  /* background-color: #F2F3F5; */
  /* width:200px;  */
  /* right:0; */
  /* width: auto; */
  padding-bottom: 10px;
  background-color: none;
 }

 .showingClass{
  position: absolute;
  top: 20px;
  /* right: 430px; */
  left: 66px;
 }

 .result{
    position: absolute;
    display:grid;
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
    row-gap: 8px;
    top: 20px;
    /* margin-top: 128px; */
    /* width: 572px; */
    left:46px;
 }

 /* .backtop{
    position: fixed;
 } */

 #backtop{
    background-color: var(--el-bg-color-overlay);
    box-shadow: var(--el-box-shadow-lighter);
    text-align: center;
    color: #C91F2F;
    padding: 9px 16px;
    justify-content: left;
    top: fixed(70px);
 }

 .icon{
    font-size: 14px;
 }

 .toolBar{
    display:flex;
    gap: 12px;
    top: 68px;
    margin-bottom: 12px;
    justify-content: right;
    text-align: right;
    /* width: 1fr; */
 }
.tag{
  position: absolute;
  /* margin-left: 100px; */
  right: 32px;
  /* top: 68px; */
  z-index: 5;

}


 @media screen and (min-width: 1024px) and (max-width: 1440px){
  .tag{
    right: 32px;
    top: 20px;
  }
  .textBlock{
    width: 665px;
  }
  

 }

</style>
