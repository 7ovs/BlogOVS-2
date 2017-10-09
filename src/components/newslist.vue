<template>
  <ul>
    <newsitem v-for="item in items" v-bind:item="item" v-bind:key="item.id" v-on:deleteitem="deleteItem"></newsitem>
  </ul>
</template>
<script>
import newsitem from './NewsItem'
export default {
  name: 'NewsList',
  props: ['items'],
  components: {
    'newsitem': newsitem
  },
  methods: {
    deleteItem (id) {
      console.log(`delete ${id}`)
      this.$emit('deleteitem', id)
    }
  }
}
</script>
<style scoped>
  ul {
    list-style-type: none;
  }
</style>

