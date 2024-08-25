<template>
    <div id="all">
        <side-bar @update="activeChange" class="sideBar"/>
        <user-info :user_name="user_name" />
        <router-view></router-view>
    </div>
  
</template>

<script>
import { ref } from 'vue';
import SideBar from '../components/SideBar.vue';
import { useRouter } from 'vue-router';
import axios from "axios";
import UserInfo from '../components/UserInfo.vue';

export default {
  components: { SideBar, UserInfo },
    setup(){
        const router = useRouter();
        const activeOption = ref('0');
        const user_name = ref('');

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
        const fetchUserInfo = () => {
            const show_info = "http://35.201.168.185:5000/show_info";
            axios
            .post(show_info, null, {
                headers: { authorization: JSON.parse(localStorage.getItem("auth")) },
            })
            .then((res) => {
                if (res.data.status === "success"){
                    user_name.value = res.data.user_info.user_name;
                    console.log("_name", user_name.value);
                }
            });
        }

        fetchUserInfo();
        return{
            activeOption,
            activeChange,
            user_name,
        }
    },
    mounted(){
        const show_info = "http://35.201.168.185:5000/show_info";
        axios
        .post(show_info, null,{
            headers: { authorization: JSON.parse(localStorage.getItem("auth")) },
        })
        .then((res) => {
            if (res.data.status === "success"){
                this.user_name = res.data.user_info.user_name;
                console.log("user_name",this.user_name)
            }
        })
    }

}
</script> 

<style scoped>
#all {
  /* transform-origin: top left;
        transform: scale(0.75); 
   zoom:75%; */
}
.sideBar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
}
</style>
