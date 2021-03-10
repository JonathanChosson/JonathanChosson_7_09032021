import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionStorage : window.sessionStorage,
    urlApi:
    {
      "connexion" : "http://localhost:3000/api/auth/login",
      "enregistrement" : "http://localhost:3000/api/auth/signup",
      "listAllMessage" : "http://localhost:3000/api/messages/listMessage"
    },
    logged: false
  },
  mutations: {
    connexion(state, data){
      state.logged = true;
      state.sessionStorage.setItem(0, JSON.stringify(data));
    },
    update(state){
      state.logged = true;
    }
  },
  actions: {
  },
  modules: {
  },
})


//"http://localhost:3000/api/auth/login"