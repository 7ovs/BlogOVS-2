<template>
  <div>
    <div class="create-news-form" >
      <label for="title">Title</label>
      <input type="text" name="title" id="post-title" v-model="newPost.title"><br>
      <label for="content">Content</label>
      <textarea name="content" id="post-content" cols="30" rows="10" v-model="newPost.content"></textarea><br>
      <button @click="addPost">Add Post</button>
    </div>
    <newslist :items="posts" @deleteitem="deleteItem"></newslist>
  </div>
  
</template>

<script>
import newslist from './NewsList'
import _ from 'lodash'
export default {
  name: 'NewsRoot',
  data () {
    return {
      newPost: {
        title: 'New Title',
        content: 'Hello Lorem etc.'
      },
      idCounter: 0,
      posts: []
    }
  },
  // created () {
  //   debugger
  //   this.$on('deleteitem', this.deleteItem)
  // },
  methods: {
    addPost () {
      this.posts.push({
        ...this.newPost,
        id: ++this.idCounter,
        created_at: Date.now()
      })
    },
    deleteItem (id) {
      console.log(`deletefromroot ${id}`)
      // debugger
      _.remove(this.posts, (post) => { return post.id === id })
      this.posts = _.clone(this.posts)
      console.log(this.posts)
    }
  },
  components: {
    'newslist': newslist
  }
}
</script>
