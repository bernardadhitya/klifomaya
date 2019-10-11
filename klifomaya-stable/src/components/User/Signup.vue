<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm4 offset-sm4>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm4 offset-sm4>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout column>
                                <v-flex>
                                    <img src="http://scdc.binus.ac.id/klifonara/wp-content/uploads/sites/51/2016/03/logo-baru-klifo.png" alt="Klifonara" style="height: auto; width 100%; max-width: 100px">
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex>
                                    <form @submit.prevent="onSignUp">
                                        <v-layout row>
                                            <v-flex xs12>
                                                <v-text-field
                                                name="name"
                                                label="Name"
                                                id="name"
                                                v-model="name"
                                                required></v-text-field>
                                            </v-flex>
                                        </v-layout>
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
                                                    :rules="[rules.required, rules.min]"
                                                    :type="show1 ? 'text' : 'password'"
                                                    name="password"
                                                    label="Password"
                                                    counter
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
                                                <v-menu
                                                :close-on-content-click="false"
                                                v-model="menu2"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                max-width="290px"
                                                min-width="290px"
                                                >
                                                <!--
                                                    NOTE! The date picker doesn't work, either fix it, or remove it from the project
                                                -->
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="dob"
                                                    label="Date (read only text field)"
                                                    hint="MM/DD/YYYY format"
                                                    persistent-hint
                                                    prepend-icon="event"
                                                    readonly
                                                ></v-text-field>
                                                <v-date-picker v-model="dob" no-title @input="menu2 = false"></v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-flex xs12>
                                                <v-text-field
                                                name="major"
                                                label="Major"
                                                id="major"
                                                v-model="major"
                                                required></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-flex xs12>
                                                <v-text-field
                                                name="phone"
                                                label="Phone"
                                                id="phone"
                                                v-model="phone"
                                                required></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs12>
                                                <v-btn type="submit" :disabled="loading" :loading="loading" color="yellow" style="width: 100%">
                                                    Sign Up
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
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        show1: false,
        menu2: false,
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match')
        },


        name: '',
        email: '',
        password: '',
        major: '',
        dob: null,
        time: new Date(),
        phone: ''
    }),
    computed: {
        user(){
            return this.$store.getters.user
        },
        error(){
            return this.$store.getters.error
        },
        loading(){
            return this.$store.getters.loading
        },
        submittableDateTime(){
            const date = new Date(this.date)
            if (typeof this.time === 'string'){
                const hours = this.time.match(/^(\d+)/)[1]
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
            console.log(date)
            return date
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
        onSignUp(){
            //Vuex
            this.$store.dispatch('signUserUp', 
            {email: this.email, 
            password: this.password,
            name: this.name,
            major: this.major,
            dob: this.submittableDateTime,
            phone: this.phone})
        },
        onDismissed(){
            this.$store.dispatch('clearError')
        }
    }
}
</script>
