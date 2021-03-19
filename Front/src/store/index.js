import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionStorage : "",
    urlApi:
    {
      "connexion" : "http://localhost:3000/api/auth/login",
      "enregistrement" : "http://localhost:3000/api/auth/signup",
      "listAllMessage" : "http://localhost:3000/api/messages/listMessage",
      "updateLike": "http://localhost:3000/api/messages/likeUpdate",
      "updateMessage": "http://localhost:3000/api/messages/update",
      "createMessage": "http://localhost:3000/api/messages/createMessage",
      "supprMessage": "http://localhost:3000/api/messages/delete",
      "allProfil": "http://localhost:3000/api/auth/allProfil",
      "profil":"http://localhost:3000/api/auth/profil",
      "updateProfil": "http://localhost:3000/api/auth/updateProfil",
      "supprProfil": "http://localhost:3000/api/auth/delete",
    },
    logged: false,
    listUser:"",
    isAdmin:""
  },
  mutations: {
    connexion(state, data){
      state.logged = true;
      state.sessionStorage = window.sessionStorage
      state.sessionStorage.setItem(0, JSON.stringify(data));
    },
    update(state, data){
      state.logged = true;
      state.sessionStorage = window.sessionStorage
      state.sessionStorage.setItem(0, JSON.stringify(data));
    },
    deconnexion(state){
      state.logged = false;
      sessionStorage.clear();
      location.reload();
    },
    userList(state, data){
      state.listUser = data
    },
    isAdmin(state, data){
      state.isAdmin = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters : {
    getMyState: state => state.sessionStorage
  }
})


//"http://localhost:3000/api/auth/login"