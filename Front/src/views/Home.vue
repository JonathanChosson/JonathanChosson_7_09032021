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
import { mapGetters } from 'vuex'
import Header from '../components/Header.vue'
import ListMessage from '../components/listMessage'

export default {
  name: 'Home',
  data(){
        return {
          userList:""
        }
    },
  components: {
    Sign,
    Header,
    ListMessage
  },
  computed: {
        ...mapState(['sessionStorage','logged','urlApi']),
        ...mapGetters({myState: 'getMyState'}),
  },
  methods:{
    majListe(){
      console.log('MAJ LIST ');
      let tokenInfo = JSON.parse(window.sessionStorage[0])
      console.log(tokenInfo.userId);
      let requestOption = {
              method :"GET",
              mode: "cors",
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${tokenInfo.token}`,
                  "userId": tokenInfo.userId,
              }
      }
      fetch(this.urlApi.allProfil, requestOption)
      .then((reponse) => 
          reponse.json()
          .then((data) => {
              this.userList = data;
          })
      ).catch(erreur => console.log('erreur : ' + erreur));
    }
  },
  watch: {
    '$store.state.sessionStorage': function() {
      let tokenInfo = JSON.parse(this.$store.getters.getMyState[0])
      console.log(tokenInfo.userId);
      let requestOption = {
              method :"GET",
              mode: "cors",
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${tokenInfo.token}`,
                  "userId": tokenInfo.userId,
              }
      }
      fetch(this.urlApi.allProfil, requestOption)
      .then((reponse) => 
          reponse.json()
          .then((data) => {
              this.userList = data;
          })
      ).catch(erreur => console.log('erreur : ' + erreur));
      
    }
  },
  mounted: function(){
    if(window.sessionStorage.length > 0){
        this.$store.commit("update", JSON.parse(window.sessionStorage[0]))
    }
  },

}

</script>
