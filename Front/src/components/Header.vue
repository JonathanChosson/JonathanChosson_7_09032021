<template>
<div class="sticky-top">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#"><img src="../assets/images/Groupomania_Logos/icon-left-font-monochrome-white.png" alt="Groupomania" class="header_img" /></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="d-flex align-items-center">
                <b-nav-item>
                    <b-avatar variant="secondary" icon="house-fill" ></b-avatar><br />
                    <router-link to="/" class="text-white">Accueil</router-link>
                </b-nav-item>
                <b-nav-item v-if="logged" v-b-modal="'modif-user-modal'">
                    <b-avatar v-if="!userInfo.user.photo"></b-avatar>
                    <b-avatar v-else :src="userInfo.user.photo"></b-avatar>
                    <p class="text-white m-0"  > {{userInfo.user.userName}}</p>
                </b-nav-item>
                <b-nav-item v-if="logged" @click="deconnexion()">
                    <b-avatar variant="warning" icon="power" ></b-avatar>
                    <p class="text-white m-0">Deconnexion</p>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <!-- modification modal -->
    <Modal :modalId='"modif-user-modal"' modalTitle="Modification de mon compte">
                <template v-slot:bodyModal>
                    <b-form id="form">
                        <b-form-group
                            label-for="userName"
                        >Mon Pseudo
                        <b-form-input
                            id="userName"
                            type="text"
                            :placeholder = userInfo.user.userName
                            v-model="modifUserName"
                        ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-for="photo"
                        >Ma Photo actuelle : 
                        <b-avatar v-if="!userInfo.user.photo"></b-avatar>
                        <b-avatar v-else :src="userInfo.user.photo"></b-avatar>
                        <b-form-file id="file" v-model="file1" class="mt-3" type="file" plain></b-form-file>
                        <div class="mt-3">Fichier Choisi : {{ file1 ? file1.name : '' }}</div>
                        </b-form-group>
                        <b-form-group
                            label-for="bio"
                        >Ma Bio
                        <b-form-textarea
                            id="bio"
                            type="text"
                            :placeholder = userInfo.user.bio
                            rows="3"
                            max-rows="6"
                            v-model="modifBio"
                        ></b-form-textarea>
                        </b-form-group>
                    </b-form>
                    <b-button type="submit" variant="danger" v-b-toggle="'collapse-1'"  class="mb-2">Suprimer mon compte</b-button>
                    <b-collapse id="collapse-1">
                                <b-card>
                                    Confirmer la suppresion ? <b-button variant="danger" @click="supprProfil(userInfo.user.id)" > Confirmer !</b-button>
                                </b-card>
                    </b-collapse>
                </template>
                <template v-slot:button>
                    <b-button type="submit" variant="success" @click="updateProfil()">Modifier</b-button>
                </template>
            </Modal>
</div>

</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import Modal from './Modal'

export default {
    name: 'Header',
    data(){
        return {
            userInfo: {
                user:{
                    userName :"",
                    photo:"",
                }
            },
            modifUserName:"",
            modifBio:"",
            // modifPhoto:"",
            file1: null,
        }
    },
    components:{
        Modal
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
        ...mapGetters({myState: 'getMyState'}),
    },
    methods:{
        //Update le Profil
        updateProfil() {
            let tokenInfo = JSON.parse(this.sessionStorage[0]);
            let userSend = this.modifUserName ? this.modifUserName : this.userInfo.user.userName;
            let bioSend = this.modifBio ? this.modifBio : this.userInfo.user.bio;
            // let photoSend = this.modifPhoto ? this.modifPhoto : this.userInfo.user.photo;
            let sendInfo = 
            JSON.stringify({
                        "userId":tokenInfo.userId,
                        "userName": userSend,
                        "photo": this.userInfo.user.photo,
                        "bio": bioSend 
            });
            const formData = new FormData();
            formData.append('file', this.file1);
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
                fetch(this.urlApi.updateProfil, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then(() => {
                        this.$parent.majListe();
                        this.getUser();
                        this.modifUserName = "";
                        // this.modifPhoto=""
                        this.modifBio="";
                        this.file1= null;
                        this.$bvModal.hide(`modif-user-modal`);
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },
        //Supression du profil 
        supprProfil(userId) {
            let tokenInfo = JSON.parse(this.sessionStorage[0]);
            let requestOption = {
                    method :"DELETE",
                    mode: "cors",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                    },
                    body : JSON.stringify({
                        "userId":userId
                    })
                }
                fetch(this.urlApi.supprProfil, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then(() => {
                        this.deconnexion();
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },
        //Avoir les infos de l'User connecté 
        getUser(){
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
        fetch(this.urlApi.profil, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.userInfo = data;
                    this.$store.commit('isAdmin', data.user.isAdmin)
            })
        ).catch(erreur => console.log('erreur : ' + erreur));
        },
        // Deconnexion
        deconnexion(){
            this.$store.commit("deconnexion")
        }
    },
    watch: {
        '$store.state.sessionStorage': function() {
            let tokenInfo = JSON.parse(this.$store.getters.getMyState[0])
            let requestOption = {
                    method :"GET",
                    mode: "cors",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenInfo.token}`,
                        "userId": tokenInfo.userId,
                    }
            }
            fetch(this.urlApi.profil, requestOption)
            .then((reponse) => 
                reponse.json()
                .then((data) => {
                    this.userInfo = data;
                    this.$store.commit('isAdmin', data.user.isAdmin)
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        }
    }
}
</script>
<style>
.header_img{
    max-width: 150px;
}
</style>