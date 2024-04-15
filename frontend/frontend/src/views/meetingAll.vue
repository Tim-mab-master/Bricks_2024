<template>
    <div id="all">
        <side-bar @update="activeChange" class="sideBar"/>
        <router-view></router-view>
        <!-- <router-view name="meetingRecord"></router-view> -->
    </div>
  
</template>

<script>
import { ref } from 'vue';
import SideBar from '../components/SideBar.vue';
import { useRouter } from 'vue-router';
export default {
  components: { SideBar },
    setup(){
        const router = useRouter();
        const activeOption = ref('0');
        const activeChange = (index) =>{
            activeOption.value = index;
            console.log(activeOption.value);
            if(activeOption.value === '1-1'){
                router.push('/all/cards');
            }
            else if(activeOption.value === '1-2'){
                router.push('/all/trashBox');
            }
        }
        return{
            activeOption,
            activeChange,

        }
    }

}
</script>

<style scoped>
    #all{
        zoom:75%;
    }
    .sideBar{
        position: absolute;
        left: 0;
        top: 0;
        height: 100vh;
    }

</style>