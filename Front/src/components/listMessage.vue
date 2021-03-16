<template>
    <div class="container d-flex flex-column">
        <!-- <p v-for="(message) in listMessage.message" :key="message.id">{{message}}</p> -->
        <h3 class="m-0" v-b-modal="'creationModal'"><span class="badge badge-secondary m-1">Ajouter un message <b-icon icon="pencil-square"></b-icon></span></h3>
        <!-- modale de création -->
        <Modal modalId='creationModal' modalTitle="Création d'un message">
            <template v-slot:bodyModal>
                <b-form >
                    <b-form-group
                        label-for="title"
                    >Titre
                    <b-form-input
                        id="title"
                        type="text"
                        v-model="creerTitle"
                    ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label-for="attachment"
                    >Medias
                    <b-form-input
                        id="attachment"
                        type="text"
                        v-model="creerAttachment"
                    ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label-for="content"
                    >Message
                    <b-form-textarea
                        id="content"
                        type="text"
                        rows="3"
                        max-rows="6"
                        v-model="creerContent"
                    ></b-form-textarea>
                    </b-form-group>
                </b-form>
            </template>
            <template v-slot:button>
                <b-button type="submit" variant="success" @click="creerMessage()">Creer message</b-button>
            </template>
        </Modal>
        <div class="card mt-1"  v-for="(message) in listMessage.message" :key="message.id">
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
                    <div class="m-0">
                        <b-badge variant="info" class="mb-2" v-if="message.UserId == userId" v-b-modal="'my-modal('+(message.id)+')'">
                            <b-icon icon="pencil-fill" font-scale="1.6"></b-icon>
                        </b-badge>
                        <b-badge variant="danger" class="mb-2 ml-2" v-if="message.UserId == userId" @click="supprMessage(message.id)">
                            <b-icon icon="trash" font-scale="1.6"></b-icon>
                        </b-badge>
                    </div>
                </div>
            </div>
            <!-- modale de modification -->
            <Modal :modalId='"my-modal("+message.id+")"' modalTitle="Modification du message">
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
            modifContent:"",
            creerTitle:"",
            creerAttachment:"",
            creerContent:""
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
            let tokenInfo = JSON.parse(this.sessionStorage[0]);
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
                        this.modifTitle = ""
                        this.modifAttachment=""
                        this.modifContent=""
                        this.$bvModal.hide(`my-modal(${messageId})`)
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },

        //Creer le message
        creerMessage() {
            let tokenInfo = JSON.parse(this.sessionStorage[0]);
            let requestOption = {
                    method :"POST",
                    mode: "cors",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                    },
                    body : JSON.stringify({
                        "userId":tokenInfo.userId,
                        "title": this.creerTitle,
                        "attachment": this.creerAttachment,
                        "content": this.creerContent
                    })
                }
                fetch(this.urlApi.createMessage, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then((data) => {
                        console.log(data);
                        this.listMessageUpdate();
                        this.creerTitle = ""
                        this.creerAttachment=""
                        this.creerContent=""
                        this.$bvModal.hide(`creationModal`)
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },

        //Supprime le message
        supprMessage(messageId) {
            let tokenInfo = JSON.parse(this.sessionStorage[0]);
            let requestOption = {
                    method :"DELETE",
                    mode: "cors",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                    },
                    body : JSON.stringify({
                        "userId":tokenInfo.userId,
                        "messageId":messageId,
                    })
                }
                fetch(this.urlApi.supprMessage, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then((data) => {
                        console.log(data);
                        this.listMessageUpdate();
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },
        //affiche les infos du créateur du message
        infobulleCreateur(userId){
            function user(user){
                return user.id === userId
            }
            return this.$parent.userList.user.find(user)
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
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
    },
    watch: {
        
    }
}
</script>