// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './components/filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker,
  VAlert,
  VProgressCircular,
  VDialog,
  VDivider,
  VMenu,
  VDataTable,
  transitions
} from 'vuetify'

import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VAlert,
    VProgressCircular,
    VDialog,
    VDivider,
    VMenu,
    VDataTable,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyDzj646UkruKrDeczbxbB6fQiiXtpEmqZY",
      authDomain: "klifomaya.firebaseapp.com",
      databaseURL: "https://klifomaya.firebaseio.com",
      projectId: "klifomaya",
      storageBucket: "gs://klifomaya.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const curr = {
          id: firebase.auth().currentUser.uid
        }
        this.$store.dispatch('autoSignIn', curr)
        this.$store.dispatch('loadMeetups')
        this.$store.dispatch('loadProfile')
      }
    })
    
  }
})
