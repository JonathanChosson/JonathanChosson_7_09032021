<template>
    <div class="container">
        <p>Liste des messages</p>
        {{listMessage.message[0]}}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'listMessage',
    data(){
        return {
            listMessage: "",
        }
    },
    components: {
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
    },
    mounted: function(){
        let tokenInfo = JSON.parse(this.sessionStorage[0])
        console.log(tokenInfo.userId);
        console.log();

        let requestOption = {
                method :"GET",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenInfo.token}`,
                    "userId": tokenInfo.userId,
                }
        }
        fetch(this.urlApi.listAllMessage, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.listMessage = data;
                console.log(this.listMessage.message);
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
    }
}
</script>