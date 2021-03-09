<template>
    <div class="container">
        <div id="connection" class="border rounded border-info bg-info container mt-1 pb-1">
            <p class="text-white">
                Se connecter
            </p>
            <b-form @submit.prevent="connexion">
                <b-form-group
                    id="input-group-1"
                    label-for="input-1"
                >
                <b-form-input
                    id="input-1"
                    type="email"
                    placeholder="Entrer e-mail"
                    v-model="loginMail"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-2"
                    label-for="input-2"
                >
                <b-form-input
                    id="input-2"
                    type="password"
                    placeholder="Entrer password"
                    v-model="loginPassword"
                    required
                ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Connexion</b-button>
            </b-form>
        </div>
        <p>{{session}}</p>
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
        }
    },
    components: {
    },
    computed: {
        ...mapState(['sessionStorage','urlApi']),
        session : function(){
            if(this.sessionStorage.length === 0 ){
                return "0"
            }else{
                let activeSession = JSON.parse(this.sessionStorage[0])
                return activeSession.userId
            }
            
        }
    },
    methods : {
        connexion(){
            let requestOption = {
                method :"POST",
                mode: "cors",
                headers: { 
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    "email": this.loginMail,
                    "password":this.loginPassword
                })
            }
            fetch(this.urlApi.connexion, requestOption)
            .then((reponse) => 
                reponse.json()
                .then((data) => {
                    console.log(data);
                    this.$store.commit("connexion", data);
                })
            ).catch(erreur => console.log('erreur : ' + erreur));
        }
    }

    }
</script>