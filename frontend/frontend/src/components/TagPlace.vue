<template>
    <div trigger="click" class="tagsPlace" @click="showTags">
        <span class="el-dropdown-link">
          <span class="hidden">標籤</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
      </div>
      <tag-search-area v-show="tagShowed" class="tagInside" @showBlock="showInfo"></tag-search-area>
    
</template>

<script>
import TagSearchArea from '../components/KerwinBricks/TagSearchArea.vue';
import { ref, computed } from "vue";
import store from "../store/store.js";
export default {
    components:{
        TagSearchArea,
    },
    setup(props,{emit}){
        const tagShowed = ref(false);
        const showTags = () =>{
            // console.log(recordID);
            tagShowed.value = !tagShowed.value;
            // 
            
        }
        const showInfo = (value) =>{
          emit('show', value);

        }
        return{
            showTags,
            tagShowed,
            showInfo,

        };
    }

}
</script>

<style scoped>
.tagsPlace{
  display: inline-block;
  /* left: 97rem; */
  width:65px;
  height: 20px;
  /* top: 68px; */
  border-radius: var(--radius-button-large-radius, 4px);
  border: 1px solid var(--base-color-border-el-border-color, #DCDFE6);
  background: #FFF;
  padding: 4px 16px;
}

.tagInside{
  position: relative;
  /* left: 1280px; */
  top: 20px;
  z-index: 5;
  width: 372px;
  
}

.tagMenu{
  width: 372px;
}

.el-dropdown-link{
  display: flex;
  gap: 8px;
  cursor: pointer;
  color: #C91F2F;
}


@media screen and (min-width: 1024px) and (max-width: 1440px){
  
  .tagInside{
    font-size: 8px;
  }
  .tagMenu, .tagInside{
    width: 200px;
  }
}
</style>