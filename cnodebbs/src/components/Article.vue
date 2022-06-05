<template>
  <div class="article">
    <div
      class="loading"
      v-if="isloading"
    >
      <img
        src="../assets/loading.gif"
        alt=""
      >
    </div>

    <div v-else>
      <div class="topic_header">

        <div class="topic_title">
          {{ post.title }}
        </div>
        <ul>
          <li>发布于：{{ post.create_at | formatDate }}</li>
          <li>作者：{{ post.author.loginname }}</li>
          <li>{{ post.reply_count }}次浏览</li>
          <li>来自{{ post | tabFormatter }}</li>
        </ul>
      </div>
      <div
        class="topic_content"
        v-html="post.content"
      ></div>
      <div id="reply">
        <div class="topbar">{{ post.replies.length }} 回复</div>
        <!-- 回复的列表 -->
        <div
          class="replySec"
          v-for="(reply, index) in post.replies"
        >
          <div class="replyUp">
            <!-- 头像 -->
            <router-link :to="{
              name: 'user_info', params: {
                name: reply.author.loginname
              }
            }">
              <img
                :src="reply.author.avatar_url"
                alt=""
              >
            </router-link>

            <router-link :to="{
              name: 'user_info', params: {
                name: reply.author.loginname
              }
            }">
              <!-- 用户名称 -->
              <span>{{ reply.author.loginname }}</span>
            </router-link>
            <!-- 楼层 -->
            <span>
              {{ index + 1 }}楼
            </span>
            <span v-if="reply.ups.length > 0">
              ☝ {{ reply.ups.length }}
            </span>
            <span v-else></span>
          </div>
          <!-- 回复内容 -->
          <p v-html="reply.content"></p>
        </div>
      </div>
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
      post: {}//代表当前文章页的所有内容
    }
  },
  methods: {
    getArtcleData() {
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          if (res.data.success == true) {
            this.isloading = false;
            this.post = res.data.data;
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getArtcleData();
  },
  //检测路由变化
  watch: {
    '$route'(to, from) {
      this.getArtcleData()
    }
  }
}
</script>

<style>
@import url('../assets/markdown-github.css');

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}

#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}

.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}

.markdown-text img {
  width: 92% !important;
}
</style>
