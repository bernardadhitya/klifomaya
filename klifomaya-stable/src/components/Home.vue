<template>
    <v-container>
        <v-layout row align-center>
            <v-flex xs12 md5 offset-sm1>
                <v-container fill-height>
                    <v-layout column>
                        <h3>About Us</h3>
                        <h1>KLIFONARA</h1>
                        <p>KLIFONARA ( Klub Seni Fotografi Bina Nusantara ) merupakan unit kegiatan mahasiswa resmi yang berbasis bidang seni fotografi di Binus University.</p>

                        <p>Organisasi yang resmi berdiri pada 10 Juni 1998 ini, terbentuk atas dasar kesamaan cinta anggotanya terhadap fotografi, serta bersatu tanpa adanya perbedaan golongan, etnik dan agama, serta bersifat kekeluargaan.</p>

                        <p> bersatu, berbagi dan belajar bersama, untuk mengembangkan pemikiran, wawasan serta kemampuan seputar fotografi, demi kemajuan seluruh anggota. Karena KLIFONARA adalah satu dan kami ada karena kami bersama.</p>
                        
                        <v-btn color="yellow" href="http://scdc.binus.ac.id/klifonara">Visit Our Site</v-btn>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex md7 offset-sm1 fill-height hidden-sm-and-down>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/HWWtp-lZM8Y?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row align-center justify-center hidden-sm-and-down>
            <v-flex xs1>
                <img src="@/assets/KLIFONARA.png" alt="Klifonara" style="height: auto; width 100%; max-width: 100px">
            </v-flex>
            <v-flex xs1>
                <img src="@/assets/logoBINUS.png" alt="Binus" style="height: auto; width 100%; max-width: 100px">
            </v-flex>
            <v-flex xs1>
                <img src="@/assets/FPSI-logo.png" alt="FPSI" style="height: auto; width 100%; max-width: 80px; margin: 20px">
            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            profile(){
                return this.$store.getters.profile
            },
            meetups(){
                return this.$store.getters.featuredMeetups
            },
            loading(){
                return this.$store.getters.loading
            }
        },
        methods: {
            onLoadMeetup(id){
                this.$router.push('/meetups/' + id)
            }
        }
    }
</script>

<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
    }
</style>

