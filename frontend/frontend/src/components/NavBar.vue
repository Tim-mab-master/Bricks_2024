<template>
    <div id="navBar">
        <div id="breadCrum">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item id="first" >個人首頁</el-breadcrumb-item>
            <el-breadcrumb-item id="now" :color="normal">專案總覽</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="toolBar">
            <div id="icons">
                <search-bar v-if="showBar" id="searchPlace"></search-bar>
                <button @click="search()" v-else><a src="#"><el-icon class="icon"><search/></el-icon></a></button>
                <button><el-icon class="icon"><lock/></el-icon></button>
                <!-- <button><el-icon class="icon"><bell/></el-icon></button> --> 
                <notification-menu class="icon"></notification-menu>
            </div>
            <user-info id="userInfo"></user-info>
            <el-icon><language/></el-icon>
            <!-- <img src="@/assets/language.svg" id="languageIcon"> -->
        </div>
    </div>
</template>


<script>
import { ref } from "vue";
import NotificationMenu from './NotificationMenu.vue';
import UserInfo from './UserInfo.vue';
import SearchBar from './SearchBar.vue';
export default {
    components: {
        UserInfo,
        NotificationMenu,
        SearchBar,
    },
    setup() {
        const normal = ref("#303133");
        const showBar = ref(false);
        const search = () => {
            showBar.value = true;
        }
        return {
            normal,
            showBar,
            search,
        };
    },
}
</script>


<style scoped>
    #navBar{
        z-index: 5;
        position: fixed;
        /* left: 200px;  */
        /* top: 0;  */
        display: flex;
        width: auto;
        height: 48px;
        padding: 0px 16px;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        border-bottom: 1px solid #E4E7ED;
        background: #FFF;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
    }

    #breadCrumb{
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        padding: 12px 0 12px 16px;
        font-size: 14px;
    }
    #breadCrumb #first{
        color: #909399;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 171.429% */
    }

    #breadCrumb #now{
        color: #303133;
    }

    #toolBar{
        display: flex;
        position: absolute;
        right: 0;
        gap:16px;
    }
    #icons{
        display: flex;
    }

    #icons button{
        border: none;
        background: none;
        cursor: pointer;
    }
    #icons .icon{
        display: flex;
        padding: 0px 12px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        cursor: pointer;
    }

    .el-dropdown-link{
        cursor: pointer;
    }

    #languageIcon{
        display: block;
        padding: 16px 12px;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        /* margin-right: 16px; */
    }

    #searchPlace{
        position: relative;
        height: 24px;
        min-height: 24px;
        max-height: 40px;
        padding: 10px 6px;
        align-items: center;
        gap: 8px;
        align-self: stretch;
    }

    @media screen and (min-width: 1024px) and (max-width: 1440px){
        /* #breadCrum, #toolBar{
            transform: scale(0.75);
        } */
    }

</style>