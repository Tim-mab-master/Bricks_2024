<template>
    <div>
        <side-bar class="side"></side-bar>
        <div class="navAndCont" id="cards">
            <nav-bar-all class="navBar"></nav-bar-all>
            <div class="cards">
            <meeting-cards v-for="item in name" :key="item.id" :recordName = "item.name" :tags="item.tags[index]" @click="handleCardClick(item.id)" :record_id = "item.id"></meeting-cards>
            </div>
            <router-view></router-view>
        </div>
    </div>
    
</template>

<script>
import NavBarAll from '../components/NavBarAll.vue';
import SideBar from '../components/SideBar.vue';
import MeetingCards from '../components/MeetingCards.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'RecordCard',
    components: {
        SideBar,
        NavBarAll,
        MeetingCards,
    },
    setup(props, { emit }) {
        const router = useRouter();
        const name = ref([]);
        const recordName = ref("會議記錄");
        const projectID = ref("94"); // 之後要放動態ID
        const tags = ref([]);
        const currentActive = ref("1-1");
        const currentID = ref(0);

        onMounted(() => {
            axios.get("http://35.194.196.179:5000/get_record_index", { params: { project_id: 94 } })
                .then(res => {
                    res.data.record.forEach(item => {
                        currentID.value += 1;
                        name.value.push({
                            id: currentID.value,
                            name: item.record_name,
                            tags: item.tags
                        });
                        console.log(name.value);
                    });
                })
                .catch((error) => {
                    console.error("Error:", error.message); // 更详细的错误信息
                });
        });

        const handleCardClick = (cardId) => {
            // 根据卡片点击情况进行路由导航
            router.push(`/all/cards/meetingRecord/${cardId}`);
        };

        return {
            currentActive,
            name,
            projectID,
            recordName,
            tags,
            handleCardClick,
        };
    },
}
</script>


<style scoped>

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

 .cards{
  display: grid;
  grid-column-gap:16px;
  grid-row-gap:20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 28px 10vw 28px 28px;

  position: absolute;
  top: 48px;
  /* border: 1px; */
 }
 .navAndCont{
  background-color: #DCDFE6;
  position: absolute;
  left: 200px;
  width:auto;
  top: 0;
  right: 0;
 }

</style>