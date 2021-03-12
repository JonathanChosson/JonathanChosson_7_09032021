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
  },
  methods:{
    
  },
  mounted: function(){
        if(this.sessionStorage.length > 0){
            this.$store.commit("update")
        }
        let tokenInfo = JSON.parse(this.sessionStorage[0])
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
  },

}

</script>
