<template>
    <div id="global" class="d-flex justify-content-center">
        <CreateMessage class="d-none d-lg-block "></CreateMessage>
        <div id="listingMessage" class="container d-flex flex-column">
            <!-- <p v-for="(message) in listMessage.message" :key="message.id">{{message}}</p> -->
            <p class="m-0 h3" v-b-modal="'creationModal'"><span class="badge badge-secondary m-1">Ajouter un message <b-icon icon="pencil-square"></b-icon></span></p>
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
                            :state="validation"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation">
                            Vous devez ecrire un titre
                        </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                            label-for="attachment"
                        >Photo (jpg, png, gif)
                        <!-- <b-form-input
                            id="attachment"
                            type="text"
                            v-model="creerAttachment"
                        ></b-form-input> -->
                            <b-form-file id="file" v-model="fileCreate" class="mt-3" type="file" plain></b-form-file>
                            <div class="mt-3">Fichier Choisi : {{ fileCreate ? fileCreate.name : '' }}</div>
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
                            required
                        ></b-form-textarea>
                        </b-form-group>
                    </b-form>
                </template>
                <template v-slot:button>
                    <b-button v-if="validation" type="submit" variant="success" @click="creerMessage()">Creer message</b-button>
                    <b-button v-else type="submit" variant="secondary" >Creer message</b-button>
                </template>
            </Modal>
            <p class="m-0 h3" ><span class="badge badge-dark m-1">Dernier Messages </span></p>
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
                            <b-badge variant="danger" class="mb-2 ml-2" v-if="message.UserId == userId" v-b-toggle="'collapse-'+message.id">
                                <b-icon icon="trash" font-scale="1.6"></b-icon>
                            </b-badge>
                            <b-collapse :id='"collapse-"+message.id'>
                                    <b-card>
                                        Confirmer la suppresion ? <b-button variant="danger" @click="supprMessage(message.id)"> Confirmer !</b-button>
                                    </b-card>
                            </b-collapse>
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
                            >Photo Actuelle<br/>
                            <!-- <b-form-input
                                id="attachment"
                                type="text"
                                :placeholder = message.attachment
                                v-model="modifAttachment"
                            ></b-form-input> -->
                            <img :src="message.attachment" class="card-img-top modif_img" alt="">
                            <b-form-file id="file" v-model="fileModif" class="mt-3" type="file" plain></b-form-file>
                            <div class="mt-3">Fichier Choisi : {{ fileModif ? fileModif.name : '' }}</div>
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
            <div class="m-3">
                <b-spinner id="spinner" class="d-none ml-auto"></b-spinner>
            </div>
        </div>
        <Tendances class="d-none d-md-block "></Tendances>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from './Modal'
import Tendances from './Tendances'
import CreateMessage from './CreateMessage'

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
            creerContent:"",
            fileCreate: null,
            fileModif : null,
            limit:3,
            offset:0,
            finTableau: false
        }
    },
    components: {
        Modal,
        Tendances,
        CreateMessage
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
        // Validation de champs 
        validation() {
        return this.creerTitle.length > 4
        },
    },
    methods:{
        scroll(){
            window.onscroll = () => {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            let spinner = document.getElementById('spinner')
            if (bottomOfWindow) {
                if(this.finTableau === false){
                    spinner.classList.remove('d-none');
                console.log('Bas de page');
                setTimeout( 
                    this.chargerPlus
                , 1000);
                }
            }
        }
        },
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
        fetch(`${this.urlApi.listAllMessage}?limit=${this.limit}`, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.listMessage = data;
                this.userId = tokenInfo.userId;
                this.offset = +this.limit;
                this.finTableau = false
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
        },

        chargerPlus() {
            let tokenInfo = JSON.parse(this.sessionStorage[0])
        let requestOption = {
                method :"GET",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenInfo.token}`,
                    "userId": tokenInfo.userId,
                }
        }
        fetch(`${this.urlApi.listAllMessage}?limit=${this.limit}&offset=${this.offset}`, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                if(data.message.length > 0){
                    let newMessage;
                    for(newMessage in data.message){
                        if(this.listMessage.message.some(message => message.id === data.message[newMessage].id)){
                            this.finTableau = false
                        } else{
                            this.listMessage.message.push(data.message[newMessage]);
                        }
                    }
                    this.userId = tokenInfo.userId;
                    this.offset = this.listMessage.message.length;
                    let spinner = document.getElementById('spinner');
                    spinner.classList.add('d-none');
                }
                else{
                    this.finTableau = true
                    let spinner = document.getElementById('spinner');
                    spinner.classList.add('d-none');
                }
                
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
            let sendInfo = 
            JSON.stringify({
                        "userId":tokenInfo.userId,
                        "messageId":messageId,
                        "title": this.modifTitle,
                        "attachment": "",
                        "content": this.modifContent
                    });
            const formData = new FormData();
            formData.append('file', this.fileModif);
            formData.append('info', sendInfo)

            let requestOption = {
                    method :"PUT",
                    mode: "cors",
                    headers: { 
                        // "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                        "userId": tokenInfo.userId,
                    },
                    body : formData
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
                        this.fileModif= null;
                        this.$bvModal.hide(`my-modal(${messageId})`)
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },

        //Creer le message
        creerMessage() {
            let tokenInfo = JSON.parse(this.sessionStorage[0]);
            let sendInfo = 
            JSON.stringify({
                        "userId":tokenInfo.userId,
                        "title": this.creerTitle,
                        "photo":"",
                        "content": this.creerContent
            });
            const formData = new FormData();
            formData.append('file', this.fileCreate);
            formData.append('info', sendInfo)

            let requestOption = {
                    method :"POST",
                    mode: "cors",
                    headers: { 
                        // "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                        "userId": tokenInfo.userId,
                    },
                    body : formData
                }
                fetch(this.urlApi.createMessage, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then((data) => {
                        console.log(data);
                        this.listMessageUpdate();
                        this.creerTitle = ""
                        // this.creerAttachment=""
                        this.creerContent=""
                        this.fileCreate = null;
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
                    .then(() => {
                        this.listMessageUpdate();
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
        this.listMessageUpdate()
        this.scroll()
    },
    watch: {
        
    }
}
</script>

<style>
.modif_img{
    max-width: 150px;
}

#listingMessage{
    max-width: 510px;
    border: 1px solid black;
}
</style>