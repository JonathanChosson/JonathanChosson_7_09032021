<template>
    <!-- div connexion -->
    <div class="container" >
        <div id="connection" class="border rounded border-info bg-info container mt-1 pb-1">
            <p class="text-white">
                Se connecter
            </p>
            <b-form @submit.prevent="connexion">
                <b-form-group
                    id="input-group-1"
                    label-for="loginMail"
                >
                <b-form-input
                    id="loginMail"
                    type="email"
                    placeholder="Entrer e-mail"
                    v-model="loginMail"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-2"
                    label-for="loginPassword"
                >
                <b-form-input
                    id="loginPassword"
                    type="password"
                    placeholder="Entrer mot de passe"
                    v-model="loginPassword"
                    required
                ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Connexion</b-button>
            </b-form>
        </div>
        <!-- div inscription -->
        <div id="inscription" class="border rounded border-info bg-secondary container mt-1 pb-1">
            <p class="text-white">
                S'inscrire
            </p>
            <b-form @submit.prevent="inscription">
                <b-form-group
                    id="input-group-3"
                    label-for="signMail"
                >
                <b-form-input
                    id="signMail"
                    type="email"
                    placeholder="Entrer e-mail"
                    v-model="signMail"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-4"
                    label-for="signPseudo"
                >
                <b-form-input
                    id="signPseudo"
                    type="text"
                    placeholder="Entrer pseudo"
                    v-model="signPseudo"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-5"
                    label-for="signPassword"
                >
                <b-form-input
                    id="signPassword"
                    type="password"
                    placeholder="Entrer mot de passe"
                    v-model="signPassword"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-6"
                    label-for="verifSignPassword"
                >
                <b-form-input
                    id="verifSignPassword"
                    type="password"
                    placeholder="Verifier mot de passe"
                    v-model="verifSignPassword"
                    required
                ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Inscription</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    // import state from '../store/index'

    export default {
    name: 'Sign',
    data(){
        return {
            loginMail :'',
            loginPassword:'',
            signMail:'',
            signPseudo:'',
            signPassword:'',
            verifSignPassword:''
        }
    },
    components: {
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
    },
    methods : {
        makeToast(body = null) {
        this.$bvToast.toast(`${body || 'Erreur'}`, {
            title: `Erreur`,
            variant: 'danger',
            solid: true
        })
        },
        connexion(mail, password){
            let mailEnvoi ="";
            let passwordEnvoi ="";
            if(this.loginMail == '' & this.loginPassword == '' ){
                mailEnvoi = mail
                passwordEnvoi = password
            }else{
                mailEnvoi = this.loginMail
                passwordEnvoi = this.loginPassword
            }
            let requestOption = {
                method :"POST",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    "email":mailEnvoi,
                    "password":passwordEnvoi
                })
            }
            fetch(this.urlApi.connexion, requestOption)
            .then((reponse) => 
                reponse.json()
                .then((data) => {
                    console.log(data.userId);
                    if(!data.userId){
                        console.log(data);
                        this.makeToast('Mauvais e-mail et/ou mot de passe')
                    }else{
                        this.$store.commit("connexion", data);
                    }
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        },

        inscription(){
            let requestOption = {
                method :"POST",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    "email": this.signMail,
                    "userName": this.signPseudo,
                    "password": this.signPassword,
                    "bio":""
                })
            }
            fetch(this.urlApi.enregistrement, requestOption)
            .then((reponse) => 
                reponse.json()
                .then((data) => {
                    console.log(data);
                    this.connexion(this.signMail, this.signPassword)
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        }
    }
    }
</script>