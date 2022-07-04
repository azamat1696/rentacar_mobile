<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>

          <q-img src="public/icons/index.png" width="160px"/>
        </q-toolbar-title>

            <q-btn-dropdown
              flat
              class="q-pa-none"
              icon="account_circle"
              size="lg"
            >
              <q-list>
                <q-item clickable v-close-popup dense active class="bg-grey-2">
                  <q-item-section>
                    <q-item-label class="text-center"> {{ userDetail.name+ ' '+ userDetail.surname }} </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup dense @click="this.$store.dispatch('AuthModule/logOut')">
                  <q-item-section>
                    <q-item-label class="text-center"><q-icon name="logout" size="xs" />  Logout </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>


      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'



export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
    return {
    }
  },
  computed: {
    userDetail(){
      return this.$store.getters['AuthModule/userDetailGetter']
    }
  }
})
</script>
