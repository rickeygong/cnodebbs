import Vue from "vue";
import Router from "vue-router";
import Article from "../components/Article.vue";
import PostList from "../components/PostList.vue";
import UserInfo from "../components/UserInfo.vue";
import SlideBar from "../components/SlideBar.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "root",
      path: "/",
      components: {
        // main --> app.vue中的router-view中
        main: PostList
      }
    },
    {
      name: "post_content",
      path: "/topic/:id&author=:name",
      components: {
        main: Article,
        // 进入帖子详情的时候侧边栏也跟着一起显示
        slidebar: SlideBar
      }
    },
    {
      name: "user_info",
      path: "/userinfo/:name",
      components: {
        main: UserInfo
      }
    }
  ]
});
