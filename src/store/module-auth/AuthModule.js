import {api} from "boot/axios";
import {Notify} from "quasar";
const url = 'auth';
const state = {
   mobilePanelAuthToken  : "",
   userDetail : {},

}
const mutations = {
  setToken(state,token) {
    state.mobilePanelAuthToken = token;
  },
  setUserDetail(state,userDetail) {
    state.userDetail = userDetail
  },

  clearToken(state) {
    state. mobilePanelAuthToken = '';
    state.userDetail = {};

  },


}
const actions = {
  login({commit,dispatch},payload) {
    let loginData = new FormData();
    loginData.append('email',payload.email);
    loginData.append('password',payload.password);

    return  api.post('auth-login',loginData).then(res => {
      // WHEN SUCCESSFULLY

      api.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token;
      commit('setToken',res.data.token);
      commit('setUserDetail',res.data.userDetail);

      localStorage.setItem('mobilePanelAuthToken',res.data.token);
      localStorage.setItem('userDetail',JSON.stringify(res.data.userDetail));
      localStorage.setItem('loginEmail',payload.email)


      Notify.create({
        color : 'positive',
        position : 'top-right',
        progress : true,
        timeout : 1000,
        message : 'Giriş Başarılı',
        icon : 'done'
      });

      this.$router.push(('/'))
      return true
    }).catch(er => {
      Notify.create({
        color : 'negative',
        position : 'center',
        progress : true,
        timeout : 9500,
        message : JSON.stringify(er.response.data.message),
        icon : 'error'
      })
    })
  },
  logOut({commit}) {
    commit('clearToken');
    localStorage.removeItem('mobilePanelAuthToken');
    localStorage.removeItem('userDetail');
    localStorage.removeItem('expirationDate');
    this.$router.replace('/module-auth/login').catch((er) => {
      console.log(er)});
  },
  setTimeoutTimer({dispatch},expiresIn) {
    setTimeout(() => {
      dispatch('logOut')
    },expiresIn)
  },

  initAuth({commit,dispatch}) {

    let token = localStorage.getItem('mobilePanelAuthToken');
    if (token)
    {
      commit('setToken',token);
      commit('setUserDetail',JSON.parse(localStorage.getItem('userDetail')))
      api.defaults.headers.common['Authorization'] = 'Bearer '+token;
      this.$router.go(1)

    } else {
      this.$router.push('/module-auth/login').catch((er) => {
        console.log(er)});
      return false
    }


    // let token = localStorage.getItem(' mobilePanelAuthToken');
    // if (token)
    // {
    //   let expirationDate = localStorage.getItem('expirationDate')
    //
    //   let time = new Date().getTime();
    //   if (time >= +expirationDate) {
    //     console.log('Token time expired, logouted,========|')
    //     dispatch('logOut')
    //   } else {
    //     commit('setToken',token);
    //     let timerSecond = +expirationDate - time;
    //     dispatch('setTimeoutTimer',timerSecond);
    //     console.log("Buradaa setTimoutTimer")
    //     this.$router.go(1)
    //     commit('setUserDetail',JSON.parse(localStorage.getItem('userDetail')))
    //     // this.$router.push('/').catch((er) => {
    //     //   console.log(er)})
    //   }
    // }else {
    //   this.$router.push('/module-auth/login').catch((er) => {
    //     console.log(er)});
    //   return false
    // }



  }
}

const getters = {

  userDetailGetter : (state) => {
    return state.userDetail
  },
}

export default {
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}
