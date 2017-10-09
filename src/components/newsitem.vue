<template>
  <li>
    <h2> {{item.id}})  {{item.title}}</h2>
    <p class="il">{{ item.content }}</p>
    <button class="il" @click="deleteItem">X</button>
  </li>
</template>
<script>
export default {
  props: ['item'],
  methods: {
    deleteItem () {
      this.$emit('deleteitem', this.item.id)
    }
  }
}
</script>
<style scoped>
  li {
    list-style-type: none;
    text-align: center;
  }

  .il {
    display: inline-block;
  }
</style>
