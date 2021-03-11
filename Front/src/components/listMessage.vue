<template>
    <div class="container d-flex flex-column">
        <!-- <p v-for="(message) in listMessage.message" :key="message.id">{{message}}</p> -->
        <span class="badge badge-secondary m-1">Ajouter un message</span>
        <div class="card mt-1"  v-for="(message) in listMessage.message" :key="message.id">
            <img :src="message.attachment" class="card-img-top" alt="">
            <div class="card-body p-0 pt-1">
                <h5 class="card-title">{{message.title}}</h5>
                <p class="card-text text-center">{{message.content}}</p>
                <p>Ecris par : {{message.createdBy}}</p>
                <div class="d-flex justify-content-between align-self-center pl-1 pr-1">
                    <p class="m-0">
                        <b-icon icon="hand-thumbs-up" variant="dark" class="border border-dark rounded-circle p-1 bg-secondary" font-scale="1.6" v-if="!message.liked" @click="updateLike(message.id)"></b-icon>
                        <b-icon icon="hand-thumbs-up" variant="dark" class="border border-dark rounded-circle p-1 bg-primary" font-scale="1.6"  v-else @click="updateLike(message.id)"></b-icon> 
                        <span> {{message.likes}}</span>
                    </p>
                    <p class="m-0">
                        <b-icon icon="pencil-fill" variant="primary" v-if="message.UserId == userId" @click="updateLike(message.id)"></b-icon>
                    </p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'listMessage',
    data(){
        return {
            listMessage: "",
            userId:"",
        }
    },
    components: {
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
    },
    methods:{
        listMessageUpdate() {
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
        fetch(this.urlApi.listAllMessage, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.listMessage = data;
                console.log(this.listMessage.message);
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
        },
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
                    this.listMessageUpdate();
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        
        }
    },
    mounted: function(){
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
        fetch(this.urlApi.listAllMessage, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.listMessage = data;
                this.userId = tokenInfo.userId;
                console.log(this.listMessage.message);
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
    },
    watch: {
        
    }
}
</script>