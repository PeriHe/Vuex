<template>
  <div>
    <div :key="item.id" v-for="item in shopList">
      <button @click="add(item.id)">+</button>
      <span>{{item.count}}</span>
      <button @click="des(item.id)">-</button>
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    add(id) { //通过id找到这一项给它加1
      this.$store.commit('updateCountById', {
        id,
        flag:1
      })
    },
    des(id) {
      this.$store.commit('updateCountById', {
        id,
        flag:-1
      })
    }
  },
  computed: {
    shopList() { 
      return this.$store.state.shopList
    }
  }
}
</script>

