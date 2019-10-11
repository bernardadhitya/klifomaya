l<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm4 md4>
                <!--<div style="width: 100px; height: 100px; border: 5px solid cyan">
                </div>-->
            </v-flex>
            <v-flex xs12 sm8 md8>
                <v-container fluid>
                    <v-layout column wrap>
                        <v-flex>
                            <h1>{{profile.name}}</h1>
                            <h3>{{profile.major}}</h3>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex offset-sm3>
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm4 md4 v-for="meetup in meetups"
                :key="meetup.id"
                v-bind="{ [`grid-list-sm4`]: true }">
                <v-card
                class="mb-4"
                height="330px">
                    <v-container fluid>
                        <v-layout column fill-height>
                            <v-flex>
                                <img
                                :src="meetup.imageUrl"
                                height="150px"
                                width="100%"
                                contain
                                style="object-fill: cover"
                                >
                            </v-flex>

                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                    <h2>{{ meetup.title }}</h2>
                                    <div>{{ meetup.date | date }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <!--
                            <v-flex align-end justify-end row fill-height>
                                <v-card-actions>
                                    <div style="position: absolute; right: 10px">
                                        <v-btn :to="'/meetups/' + meetup.id" fab flat>
                                            <v-icon light>edit</v-icon>
                                        </v-btn>
                                        <v-btn :to="'/meetups/' + meetup.id" fab flat>
                                            <v-icon light>clear</v-icon>
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-flex>
                            -->
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-btn
            color="yellow"
            fab
            fixed
            bottom
            right
            @click="dialog = !dialog"
            large
        >
            <v-icon>add</v-icon>
        </v-btn>

        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                <span class="headline">Upload Image</span>
                </v-card-title>
                <v-card-text>
                <!-- Create Form -->
                <v-container fluid>
                    <v-layout row>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <form @submit.prevent="onCreateMeetup">
                                <v-layout row>
                                    <v-flex xs12 sm6>
                                        <v-text-field
                                            name="title"
                                            label="Title"
                                            id="title"
                                            v-model="title"
                                            required
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12 sm6>
                                        <v-text-field
                                            name="imageUrl"
                                            label="Image URL"
                                            id="image_url"
                                            style="display: none"
                                            v-model="imageUrl"
                                            required
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12 sm6>
                                        <img :src="imageUrl" height="200">
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12 sm6>
                                        <v-btn raised @click="onPickFile">Upload Image</v-btn>
                                        <input 
                                        type="file" 
                                        style="display: none" 
                                        ref="fileInput" 
                                        accept="image/*"
                                        @change="onFilePicked">
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-card-actions>
                                        <v-spacer sm8></v-spacer>
                                            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" 
                                            flat 
                                            @click.native="dialog = false" 
                                            :disabled="!formIsValid"
                                            v-on:click="onSubmitFile"
                                            type="submit"
                                            >Save</v-btn>
                                    </v-card-actions>
                                </v-layout>
                            </form>
                        </v-flex>
                    </v-layout>
                </v-container>

                <!-- Create Form -->
                </v-card-text>
                
            </v-card>
            </v-dialog>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,

        title: '',
        imageUrl: '',
        image: null,
        date: new Date(),
        time: new Date(),

    }),
    computed: {
        profile(){
            return this.$store.getters.profile
        },

        meetups(){
            return this.$store.getters.loadedMeetups
        },

        formIsValid(){
            return this.title !== '' && 
            this.image != null
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
    methods: {
        onCreateMeetup(){
            if (!this.formIsValid){
                return
            }
            if (!this.image){
                return
            }
            const meetupData = {
                title: this.title,
                image: this.image,
                date: this.submittableDateTime
            }
            console.log("New Data is Pushed!")
            console.log(meetupData)
            console.log(this.$store.getters.loadedMeetups)
            this.$store.dispatch('createMeetup', meetupData)
        },
        onPickFile(){
            this.$refs.fileInput.click()
        },
        onFilePicked(event){
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0){
                return alert('Please add a valid file!')
            } 
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
        onSubmitFile(){
            this.$refs.submitFile.click()
        }
    }
}
</script>
