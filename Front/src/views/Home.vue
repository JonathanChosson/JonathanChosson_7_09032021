<template>
  <div>
    <Header></Header>
    <Sign></Sign>
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
    Headerputed: {
        ...mapState(['sessionStorage']),
  }
}

</script>
