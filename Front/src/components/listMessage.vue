<template>
    <div class="container d-flex flex-column">
        <!-- <p v-for="(message) in listMessage.message" :key="message.id">{{message}}</p> -->
        <h3 class="m-0"><span class="badge badge-secondary m-1">Ajouter un message <b-icon icon="pencil-square"></b-icon></span></h3>
        <div class="card mt-1"  v-for="(message) in listMessage.message" :key="message.id">
            <img :src="message.attachment" class="card-img-top" alt="">
            <div class="card-body p-0 pt-1">
                <h5 class="card-title">{{message.title}}</h5>
                <p class="card-text text-center">{{message.content}}</p>
                <p class="h6">Ecris par : {{message.createdBy}}</p>
                <div class="d-flex justify-content-between align-self-center pl-1 pr-1">
                    <p class="m-0">
                        <b-icon icon="hand-thumbs-up" variant="dark" class="border rounded-circle p-1 bg-secondary" font-scale="1.6" v-if="!message.liked" @click="updateLike(message.id)"></b-icon>
                        <b-icon icon="hand-thumbs-up" variant="dark" class="border rounded-circle p-1 bg-primary" font-scale="1.6"  v-else @click="updateLike(message.id)"></b-icon> 
                        <span> {{message.likes}}</span>
                    </p>
                    <p class="m-0">
                        <b-icon icon="pencil-fill" variant="primary" v-if="message.UserId == userId" v-b-modal="'my-modal'+'('+(message.id)+')'"></b-icon>
                    </p>
                </div>
            </div>
            <!-- modale de modification -->
            <Modal :modalId='message.id' modalTitle="Modification du message">
                <template v-slot:bodyModal>
                    <b-form >
                        <b-form-group
                            label-for="title"
                        >Titre
                        <b-form-input
                            id="title"
                            type="text"
                            :placeholder = message.title
                            v-model="modifTitle"
                        ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-for="attachment"
                        >Medias
                        <b-form-input
                            id="attachment"
                            type="text"
                            :placeholder = message.attachment
                            v-model="modifAttachment"
                        ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-for="content"
                        >Message
                        <b-form-textarea
                            id="content"
                            type="text"
                            :placeholder = message.content
                            rows="3"
                            max-rows="6"
                            v-model="modifContent"
                        ></b-form-textarea>
                        </b-form-group>
                    </b-form>
                </template>
                <template v-slot:button>
                    <b-button type="submit" variant="success" @click="updateMessage(message.id)">Modifier</b-button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from './Modal'

export default {
    name: 'listMessage',
    data(){
        return {
            listMessage: "",
            userId:"",
            modifTitle:"",
            modifAttachment:"",
            modifContent:""
        }
    },
    components: {
        Modal
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
    },
    methods:{
        // Met à jour la liste de tout les messages
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
                    this.listMessageUpdate();
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        },
        //Update le message
        updateMessage(messageId) {
            let tokenInfo = JSON.parse(this.sessionStorage[0])
            let requestOption = {
                    method :"PUT",
                    mode: "cors",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                    },
                    body : JSON.stringify({
                        "userId":tokenInfo.userId,
                        "messageId":messageId,
                        "title": this.modifTitle,
                        "attachment": this.modifAttachment,
                        "content": this.modifContent
                    })
                }
                fetch(this.urlApi.updateMessage, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then((data) => {
                        console.log(data);
                        this.listMessageUpdate();
                        // document.location.reload();
                        this.$bvModal.hide(`my-modal(${messageId})`)
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },
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