<template>
    <div id="global_tendances" class="container">
        <div id="tendances" class="d-flex flex-column border border-dark">
            <p class="m-0 h3" ><span class="badge badge-dark m-1">Messages Tendances </span></p>
            <div class="card mt-1"  v-for="(message) in tendancesMessage.message" :key="message.id">
                <img :src="message.attachment" class="card-img-top" alt="">
                <div class="card-body p-0 pt-1">
                    <p class="card-title h5 font-weight-bold">{{message.title}}</p>
                    <blockquote class="blockquote">
                        <p class="mb-0">{{message.content}}</p>
                        <footer class="blockquote-footer">
                            Ecrit par :
                            <cite title="Source Title">
                                <b-avatar v-if="!infobulleCreateur(message.UserId).photo"></b-avatar>
                                <b-avatar v-else :src="infobulleCreateur(message.UserId).photo"></b-avatar>
                                {{infobulleCreateur(message.UserId).userName}} 
                            </cite>
                        </footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-self-center pl-1 pr-1">
                        <div class="m-0">
                            <b-badge variant="dark" class="mb-2" v-if="!message.liked" @click="updateLike(message.id)">
                                <b-icon icon="hand-thumbs-up" font-scale="1.6"></b-icon>
                            </b-badge>
                            <b-badge variant="primary" class="mb-2" v-else @click="updateLike(message.id)">
                                <b-icon icon="hand-thumbs-up" font-scale="1.6"></b-icon>
                            </b-badge>
                            <span class="h5"> {{message.likes}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: 'tendancesMessage',
    data(){
        return {
            tendancesMessage: "",
            userId:""
        }
    },
    components: {
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged','listUser']),
        ...mapGetters({myState: 'getMyState'}),
    },
    methods:{
        // Met à jour la liste de tout les messages
        tendancesMessageUpdate() {
            let tokenInfo = JSON.parse(this.sessionStorage[0])
        console.log(tokenInfo.userId);
        let requestOption = {
                method :"GET",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenInfo.token}`,
                    "userId": tokenInfo.userId,
                    "order": "likes:DESC"
                }
        }
        fetch(this.urlApi.listAllMessage, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.tendancesMessage = data;
                this.userId = tokenInfo.userId;
                console.log(this.tendancesMessage.message);
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
        },

        //Update le like
        updateLike(messageId) {
            let tokenInfo = JSON.parse(this.sessionStorage[0])
        console.log(tokenInfo.userId);
        console.log(messageId);
        let requestOption = {
                method :"PUT",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenInfo.token}`,
                },
                body : JSON.stringify({
                    "userId":tokenInfo.userId,
                    "messageId":messageId
                })
            }
            fetch(this.urlApi.updateLike, requestOption)
            .then((reponse) => 
                reponse.json()
                .then((data) => {
                    console.log(data);
                    this.$parent.listMessageUpdate()
                    this.tendancesMessageUpdate();
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        },
        // affiche les infos du créateur du message
        infobulleCreateur(userId){
            function user(user){
                return user.id === userId
            }
            return this.listUser.user.find(user)
        }
    },
    mounted: function(){
        this.tendancesMessageUpdate()
    },
}
</script>

<style>

#global_tendances{
    max-width: 350px;
}
</style>