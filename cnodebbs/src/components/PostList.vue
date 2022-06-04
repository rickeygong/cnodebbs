<template>
  <div class="PostList">
    <!-- loading gif -->
    <div
      class="loading"
      v-if="isloading"
    >
      <img
        src="../assets/loading.gif"
        alt=""
      >
    </div>
    <!-- 帖子列表 -->
    <div class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <!-- 每一行的帖子 开始 -->
        <li v-for="post in posts">
          <!-- 头像 -->
          <img
            :src="post.author.avatar_url"
            alt=""
          >
          <!-- 回复量和浏览量 -->
          <span class="allcount">
            <span class="reply_count">{{ post.reply_count }}</span>
            /{{ post.visit_count }}
          </span>
          <!-- 帖子的分类（精华、置顶、问答） -->
          <span :class="[
          {
            post_good: (post.googd == true),
            put_top: (post.top == true),
            topiclist_tab: (post.googd != true && post.top != true)

          }]">
            {{ post | tabFormatter }}
            <!-- <span>
              {{ post | tabFormatter }}
            </span> -->
          </span>
          <!-- 标题 -->
          <span>{{ post.title }}</span>
          <!-- 最后回复时间 -->
          <span class="last_reply">{{ post.last_reply_at | formatDate }}</span>

        </li>
        <!-- 每一行的帖子 结束 -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  components: {

  },
  data() {
    return {
      isloading: false,
      posts: [],//列表数据
    }
  },
  methods: {
    getData() {
      this.$http.get('https://cnodejs.org/api/v1/topics',
        {
          params: {
            page: 1,
            limit: 20
          }
        })
        .then(res => {
          this.isloading = false;//加载成功之前显示加载动画
          this.posts = res.data.data
        })
        .catch(function (err) { console.log(err) })
    }
  },
  beforeMount() {
    this.isloading = true;//加载成功之前显示加载动画
    this.getData();//在页面加载之前获取数据
  }
}
</script>

<style scoped>
.PostList {
  background-color: #e1e1e1;
}

.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
  ;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  /* 强制不换行 */
  white-space: nowrap;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
