<template>
  <v-app>
    <!-- SideNav is used to view a navigation panel when screen size is smaller-->
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        router
        :to = "item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <!-- Use toolbar if the screen size is bigger -->

    <v-toolbar color="yellow">
      <v-toolbar-side-icon @click.native.stop ="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-if="userIsAuthenticated">
        <router-link to="/" tag="span" style="cursor: pointer">
          <img src="@/assets/klifomaya_black.png" alt="KLIFOMAYA" style="height: 30px">
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title v-if="!userIsAuthenticated">
        <router-link to="/signin" tag="span" style="cursor: pointer">
          <img src="@/assets/klifomaya_black.png" alt="KLIFOMAYA" style="height: 30px">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat 
        v-for="item in menuItems" 
        :key="item.title"
        router
        :to = "item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout" onClick="window.location.reload();">
          <router-link to="/signin" tag="span" style="cursor: pointer">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
          </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <!-- Main view routes according to the recently accessed page -->

    <main>
        <router-view></router-view>
    </main>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      backgroundImage: 'https://www.wallpaperflare.com/static/924/748/875/lantern-bokeh-night-lights-wallpaper.jpg',
    }
  },
  computed: {
    menuItems(){
      let menuItems = [
        {icon: 'face', title: 'Sign Up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'}
      ]
      //Menu items adjusts according to the user's role
      if(this.userIsAuthenticated){
        if(this.userIsAdmin){
          //Menu item if user is 'admin'
          menuItems = [
            //{icon: 'inbox', title: 'Uploads', link: '/meetups'},
            {icon: 'person', title: 'Class Manager', link: '/admin'},
          ]
        }
        else{
          //Menu item if user is 'member'
          menuItems = [
            {icon: 'inbox', title: 'Uploads', link: '/meetups'},
          ]
        }
      }
      return menuItems
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined && this.$store.getters.user !== ''
    },
    userIsAdmin(){
      return this.$store.getters.role == 'admin'
    }
  },
  methods: {
    onLogout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>


