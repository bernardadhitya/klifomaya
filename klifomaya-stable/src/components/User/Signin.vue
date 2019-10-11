<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm10 offset-sm1>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm10 offset-sm1>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout column>
                                <v-flex>
                                    <img src="@/assets/KLIFONARA.png" alt="Klifonara" style="height: auto; width 100%; max-width: 100px">
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex>
                                    <v-container>
                                        <v-layout row>
                                            <v-flex xs12 sm8>
                                                <!--560 x 315-->
                                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/HWWtp-lZM8Y?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media"></iframe>
                                            </v-flex>
                                            <v-flex xs12 sm4>
                                                <v-container>
                                                    <v-layout column>
                                                        <v-flex>
                                                            <img src="@/assets/klifomaya.png" alt="" style="max-width: 250px; width: 100%">
                                                        </v-flex>
                                                        <v-flex>
                                                            <form @submit.prevent="onSignIn">
                                                                <v-layout row>
                                                                    <v-flex xs12>
                                                                        <v-text-field
                                                                        name="email"
                                                                        label="Mail"
                                                                        id="email"
                                                                        v-model="email"
                                                                        type="email"
                                                                        required></v-text-field>
                                                                    </v-flex>
                                                                </v-layout>
                                                                <v-layout row>
                                                                    <v-flex xs12>
                                                                        <v-text-field
                                                                            v-model="password"
                                                                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                                                            :rules="[rules.required]"
                                                                            :type="show1 ? 'text' : 'password'"
                                                                            name="password"
                                                                            label="Password"
                                                                            @click:append="show1 = !show1"
                                                                        ></v-text-field>
                                                                    </v-flex>
                                                                </v-layout>
                                                                <!--<v-layout row>
                                                                    <v-flex xs12>
                                                                        <v-text-field
                                                                        name="password"
                                                                        label="Password"
                                                                        id="password"
                                                                        v-model="password"
                                                                        type="password"
                                                                        required></v-text-field>
                                                                    </v-flex>
                                                                </v-layout>-->
                                                                <v-layout>
                                                                    <v-flex xs12>
                                                                        <v-btn type="submit" :disabled="loading" :loading="loading" color="yellow" style="width: 100%">
                                                                            Sign In
                                                                            <span slot="loader" class="custom-loader">
                                                                                <v-icon light>cached</v-icon>
                                                                            </span>
                                                                        </v-btn>
                                                                    </v-flex>
                                                                </v-layout>
                                                            </form>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: '',
            show1: false,
            rules: {
                required: value => !!value || 'Required.',
                //min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            }
        }
    },
    computed: {
        user(){
            return this.$store.getters.user
        },
        error(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    watch: {
        user(value){
            /**/
            if (value !== null && value !== undefined && value !== ''){
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignIn(){
            //Vuex
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        },
        onDismissed(){
            this.$store.dispatch('clearError')
        }
    }
}
</script>
