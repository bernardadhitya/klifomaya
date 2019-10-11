<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3>{{ meetup.title }}</h3>
                    </v-card-title>
                    <v-card-media
                        :src="meetup.imageUrl"
                        height="130px"
                        contain
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text"> {{ meetup.date | date }} </div>
                        <div>
                            In esse adipisicing qui exercitation tempor adipisicing. Aliqua minim qui elit laborum pariatur ipsum sint ipsum non excepteur nisi. Enim non laborum fugiat esse incididunt nulla. Ad tempor esse ipsum nostrud ut esse commodo ea cillum excepteur occaecat dolore. Officia sint cupidatat cupidatat ea enim magna deserunt sunt minim amet. Culpa eiusmod esse ut aute nulla cupidatat occaecat ut in aliquip Lorem nisi tempor. Ipsum nostrud nulla eiusmod adipisicing amet dolor aute Lorem.
                        </div>
                    </v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-action>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed:{
        meetup(){
            return this.$store.getters.loadedMeetup(this.id)
        }
    }
}
</script>
