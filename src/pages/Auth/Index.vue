<template>
  <div class="fullscreen flex flex-center bgGray" style="background: #e0dede"  >
    <q-card class="my-card authLoginCard  ">
      <q-card-section>
        <div class="text-h5 text-center q-mt-sm text-weight-bolder">
          Lütfen Giriş Yapınız
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="loginFormOnSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            type="email"
            v-model="authLogin.email"
            label="E-posta"
            required
          />
          <q-input v-model="authLogin.password" filled :type="isPwd ? 'password' : 'text'"  label="Şifreniz" required>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="text-right">
            <q-btn icon="login" label="Giriş Yap" type="submit"  color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Loading } from 'quasar'
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'
export default {
  name: "Index",
  data(){
    const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })
    return {
      isPwd : ref(true),
      authLogin : ref({
        email : '',
        password : '',
        remember: ['line']
      }),
      showLoading () {
        Loading.show({
          message: 'İşlem Gerçekleşiyor Lütfen Bekleyiniz...'
        })

      },

      closeLoading() {
        Loading.hide()
        timer = void 0
      },

    }
  },
  methods : {
    loginFormOnSubmit() {
      this.showLoading()
      this.$store.dispatch('AuthModule/login',this.authLogin).then( () => {
        this.closeLoading()
      })

    }
  },
  beforeCreate() {
    this.$store.dispatch('AuthModule/logOut')
  },
  created() {
    this.authLogin.email = (localStorage.getItem('loginEmail')) ?  localStorage.getItem('loginEmail') : ''
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px){
  /* For general iPad layouts */
  .authLoginCard {
    width: 90%!important;
  }
}
@media only screen and (min-width: 768px) {
  .authLoginCard {
    width:  550px!important;
  }
}
</style>
