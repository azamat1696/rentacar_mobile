import { api } from "boot/axios.js"
import {LocalStorage} from "quasar";
const prefixUrl = 'reservation-uploads';

const state = {
  carReservations : []
}

const mutations = {

  SET_ITEM(state,item) {
    state.carReservations.push(item)
  },
  SET_ITEMS(state,items) {
    state.carReservations = items
  },
  SET_REPLACE(state,item) {
    state.carReservations.forEach(function(el, i) {
      if (+el.id === +item.id)
        state.carReservations[i] = item;
    });
  },
  SET_REMOVE(state,id) {
    for (let i = 0; i < state.carReservations.length; i++)
    {
      if (state.carReservations[i].id === id)
      {
        state.carReservations.splice(i,1);
        break;
      }
    }
  }
}
const actions = {

  create({commit},payload) {
    return  api.post(prefixUrl,payload).then(res => {
      commit('SET_ITEM',res.data);
      return true
    }).catch(er => {
      console.log(er)
    })
  },
 async update({commit},payload){
    return await api.post(prefixUrl,payload).then(res => {
      commit('SET_REPLACE',res.data);
      return true
    }).catch(er => {
      console.log(er)
    })
  },
  get({commit}){
    api.get('current-reservations').then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er =>{
      console.log(er)
    })
  },
  destroy({commit}, id) {
    api.delete(prefixUrl +"/"+id).then(res => {
      commit('SET_REMOVE',id);
    }).catch(er => {
      console.log(er)
    })
  },
  destroyImage({commit}, payload) {
    return   api.post('image-remove',payload).then(res => {
      commit('SET_REPLACE',res.data);
    }).catch(er => {
      console.log(er)
    })
  }

}

const getters = {

  carReservationsGetter : (state) => {
    return state.carReservations
  },
  getRecord : (state) => (id) => {
    return state.carReservations.find(e => +e.id === +id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
