<template>
    <div id="formCreate" class="container">
        <b-form class=" border p-2 border-dark">
            <p class="m-0 h4" ><span class="badge badge-dark m-1">Envoyer un message </span></p>
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
            ></b-form-textarea>
            </b-form-group>
            <b-button v-if="validation" type="submit" variant="success" @click.prevent="creerNouveauMessage()">Creer message</b-button>
            <b-button v-else type="submit" variant="secondary" >Creer message</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CreateMessage',
    data(){
        return {
            fileCreate: null,
            creerTitle:"",
            creerAttachment:"",
            creerContent:"",
        }
    },
    components: {
    },
    computed: {
        ...mapState(['sessionStorage','urlApi','logged']),
        // Validation de champs 
        validation() {
        return this.creerTitle.length > 4
        },
    },
    methods: {
        //Creer le message
        creerNouveauMessage() {
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
                        this.$parent.listMessageUpdate();
                        this.creerTitle = ""
                        // this.creerAttachment=""
                        this.creerContent=""
                        this.fileCreate = null;
                    })
                ).catch(erreur => console.log('erreur : ' + erreur));
        }
    }
}
</script>

<style>

#formCreate{
    max-width: 250px;
}
</style>