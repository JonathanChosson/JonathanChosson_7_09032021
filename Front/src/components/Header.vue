<template>
<div class="sticky-top">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#"><img src="../assets/images/Groupomania_Logos/icon-left-font-monochrome-white.png" alt="Groupomania" class="header_img" /></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="d-flex">
                <b-nav-item class="align-self-center"> <router-link to="/" class="text-white">Accueil</router-link></b-nav-item>
                <b-nav-item class="align-self-center"><router-link to="/about" class="text-white">About</router-link></b-nav-item>
                <b-nav-item v-b-modal="'modif-user-modal'" class="align-self-center">
                    <b-avatar v-if="!userInfo.user.photo"></b-avatar>
                    <b-avatar v-else :src="userInfo.user.photo"></b-avatar>
                    <p class="text-white"  > {{userInfo.user.userName}}</p>
                </b-nav-item>
                <b-nav-item class="align-self-center" @click="deconnexion()"><p class="text-white">Deconnexion</p></b-nav-item>
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
                        <!-- <b-form-input
                            id="photo"
                            type="text"
                            :placeholder =  userInfo.user.photo
                            v-model="modifPhoto"
                        ></b-form-input> -->
                        <b-avatar v-if="!userInfo.user.photo"></b-avatar>
                        <b-avatar v-else :src="userInfo.user.photo"></b-avatar>
                        <b-form-file id="file" v-model="file1" class="mt-3" type="file" plain></b-form-file>
                        <div class="mt-3">Fichier Choisi: {{ file1 ? file1.name : '' }}</div>
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
            console.log(requestOption);
                fetch(this.urlApi.updateProfil, requestOption)
                .then((reponse) => 
                    reponse.json()
                    .then((data) => {
                        console.log(data);
                        this.getUser();
                        this.modifUserName = "";
                        // this.modifPhoto=""
                        this.modifBio="";
                        this.$bvModal.hide(`modif-user-modal`);
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        },
        getUser(){
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
        fetch(this.urlApi.profil, requestOption)
        .then((reponse) => 
            reponse.json()
            .then((data) => {
                this.userInfo = data;
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