<template>
  <div>
    <Header></Header>
    <Sign v-if="!logged"></Sign>
    <ListMessage v-else></ListMessage>
  </div>
</template>

<script>
// @ is an alias to /src
import Sign from '../components/sign.vue'
import { mapState } from 'vuex'
import Header from '../components/Header.vue'
import ListMessage from '../components/listMessage'

export default {
  name: 'Home',
  components: {
    Sign,
    Header,
    ListMessage
  },
  computed: {
        ...mapState(['sessionStorage','logged']),
  },
  mounted: function(){
        if(this.sessionStorage.length > 0){
            this.$store.commit("update")
        }
  }
}

</script>
