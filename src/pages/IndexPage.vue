<template>
  <q-page class="" style="display: flex; flex-direction: column; justify-content: space-between">
    <div class="row q-pa-sm">
      <div class="col-xs-6">
        <div class="q-card--bordered q-ma-xs" style="border-radius: 10px" >
          <q-img src="./../assets/icons/reservations.png" height="150px" width="150px">
            <div class="absolute-top-left text-subtitle1 text-center bg-transparent">
              <q-btn icon="add" rounded dense color="primary" :to="{ name: 'ReservationPage' }"></q-btn>
            </div>
            <div class="absolute-bottom text-subtitle1 text-center bg-transparent">
              <div class="text-subtitle2 text-grey-9">Reservasyonlar</div>
            </div>
          </q-img>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="q-card--bordered q-ma-xs" style="border-radius: 10px">
          <q-img src="./../assets/icons/settings.svg" height="150px" width="150px">
            <div class="absolute-top-left text-subtitle1 text-center bg-transparent">
              <q-btn icon="add" disable rounded dense color="primary"></q-btn>
            </div>
            <div class="absolute-bottom text-subtitle1 text-center bg-transparent">
              <div class="text-subtitle2 text-grey-9">Hasar Kaydı </div>
            </div>
          </q-img>
        </div>

      </div>

    </div>
    <div class="row flex-center q-mb-lg">
      <q-btn icon="sync" color="primary" class="q-pa-ms" no-caps @click="this.$store.dispatch('ReservationModule/get')"> Yenile </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'IndexPage',
  setup(){

    return {

    }
  }
})
</script>
