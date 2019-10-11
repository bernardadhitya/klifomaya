<template>
    <v-container>
        <v-layout row>
            <v-flex sm3>
                <v-card>
                    <v-container text-xs-center>
                        <v-layout column>
                            <v-flex sm12 align-content-space-around>
                                <img src="@/assets/logo_klifo_kosong.png" style="max-height: 80px">
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex sm12>
                                <h3>{{ profile.name }}</h3>
                            </v-flex>
                            <v-flex sm12>
                                <h5>{{ profile.role }}</h5>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-list>
                        <v-list-group
                            v-for="item in items"
                            v-model="item.active"
                            :key="item.title"
                            :prepend-icon="item.action"
                            no-action
                        >
                            <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile
                            v-for="subItem in item.items"
                            :key="subItem.title"
                            router
                            :to = "subItem.link"
                            >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>{{ subItem.action }}</v-icon>
                            </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                        </v-list>
                </v-card>
            </v-flex>
            
            <v-flex sm9>
                <v-card>
                    <router-view></router-view>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            action: 'people',
            title: 'Students',
            items: [
              { title: 'Create Student', link: '/admin/create-student' },
              { title: 'View Students', link: '/admin/view-students' }
            ]
          },
          {
            action: 'event',
            title: 'Attendance',
            active: true,
            items: [
              { title: 'Collect Attendance', link: '/admin/attendance' },
              { title: 'View Attendance', link: '/admin/attendance'},
            ]
          },
          {
            action: 'list_alt',
            title: 'Exam',
            items: [
              { title: 'View Score', link: '/admin/exam' }
            ]
          },
          
        ]
      }
    },
    computed: {
        profile(){
            return this.$store.getters.profile
        }
    }
  }
</script>