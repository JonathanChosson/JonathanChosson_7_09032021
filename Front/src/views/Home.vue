<template>
  <div>
    <Header></Header>
    <Sign v-if="!logged"></Sign>
  </div>
</template>

<script>
// @ is an alias to /src
import Sign from '../components/sign.vue'
import { mapState } from 'vuex'
import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Sign,
    Header
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
