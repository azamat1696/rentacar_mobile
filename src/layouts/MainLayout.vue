<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar>
        <q-toolbar-title>

          <q-img src="./../assets/icons/index.png" width="160px"/>
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
                    <q-item-label class="text-center"><q-icon name="logout" size="xs" />  Çıkış yap </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
<!--        <q-select-->
<!--          v-model="locale"-->
<!--          :options="localeOptions"-->
<!--          dense-->
<!--          borderless-->
<!--          emit-value-->
<!--          map-options-->
<!--          options-dense-->
<!--          style="min-width: 150px"-->
<!--        />-->

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'de-GR', label: 'German' }
      ]
    }
  },
  computed: {
    userDetail(){
      return this.$store.getters['AuthModule/userDetailGetter']
    }
  },

})
</script>
