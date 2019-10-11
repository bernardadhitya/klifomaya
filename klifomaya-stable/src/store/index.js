import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
    LoadedMeetups: [],
    user: '', /**/
    profile: null,
    loading: false,
    error: null,
    role: 'member'
    },
    mutations: {
        setLoadedMeetups(state, payload){
            state.LoadedMeetups = payload
            console.log('Loaded Meetups: ' + state.LoadedMeetups)
        },
        createMeetup(state, payload){
            state.LoadedMeetups.push(payload)
        },
        setUser (state, payload){
            state.user = payload
            console.log('New User ID (state): ' + state.user.id)
        },
        setProfile (state, payload){
            state.profile = payload
        },
        setRole (state, payload){
            state.role = payload
        },
        setLoading(state, payload){
            state.loading = payload
        },
        setError(state, payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        }
    },
    actions:{
        loadMeetups({commit}){
            commit('setLoading', true)
            // *** access the folder of the current user id ***
            //firebase.database().ref('meetups').once('value')
            firebase.database().ref(store.getters.user.id + '/uploads').once('value')
            .then(
                (data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj){
                        // ** Add an 'if' statement to not add 'Profile' into 'LoadedMeetups' **
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        })
                    }
                    console.log('Readed Meetups: ' + meetups)
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                    commit('setLoading', true)
                }
            )
        },
        loadProfile({commit}){
            // *** access the folder of the current user id ***
            //firebase.database().ref('meetups').once('value')
            firebase.database().ref(store.getters.user.id + '/profile').once('value')
            .then(
                (data) => {
                    const obj = data.val()
                    // ** Add an 'if' statement to not add 'Profile' into 'LoadedMeetups' **
                    const profile = {
                        name: obj.name,
                        dob: obj.dob,
                        phone: obj.phone,
                        email: obj.email,
                        major: obj.major,
                        role: obj.role
                    }
                    console.log('Name: ' + profile.name)
                    console.log('DOB: ' + profile.dob)
                    console.log('Phone: ' + profile.phone)
                    console.log('Email: ' + profile.email)
                    console.log('Major: ' + profile.major)
                    console.log('Role: ' + profile.role)
                    commit('setProfile', profile)
                    commit('setRole', profile.role)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
        },
        createMeetup({commit, getters}, payload){
            commit('setLoading', true)
            let meetup = {
                title: payload.title,
                date: payload.date.toISOString(),
                creatorId: getters.user.id,
                imageUrl: ""
            }
            let newImageUrl
            let key

            // LIST OF THING TO-DO
            // 1. Push the 'meetup'
            // 2. Get the certain data to update
            // 3. Update the 'imageUrl' metadata
            // 4. Commit, to add the new 'meetup' to the array
            
            // *** Try to redirect the push to current user id ***
            //firebase.database().ref('meetups').push(meetup)
            firebase.database().ref(store.getters.user.id + '/uploads').push(meetup)
            .then((data)=>{
                key = data.key
                return key
            })
            .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                // *** Try to upload the file into the given folder based on current user id ***
                //return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
                return firebase.storage().ref(store.getters.user.id + '/uploads/' + filename + '.' + ext).put(payload.image)
            })
            .then(fileData => {
                let imagePath = fileData.metadata.fullPath
                console.log('Image Path: ' + imagePath)
                return firebase.storage().ref().child(imagePath).getDownloadURL()
                .then(url => {
                    newImageUrl = url
                    console.log('Key: ' + key)
                    console.log('newImageUrl: ' + newImageUrl)
                    console.log('File available at', url)
                    return firebase.database().ref(store.getters.user.id + '/uploads').child(key).update({imageUrl: newImageUrl})
                })
            })
            .then(() => {
                commit('createMeetup', {
                    ...meetup,
                    id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })
            commit('setLoading', false)
            
        },
        signUserUp({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: firebase.auth().currentUser.uid,
                    }
                    console.log(newUser.id)
                    commit('setUser', newUser)
                    return newUser.id
                }
            )
            .then(
                key => {
                    //firebase.database().ref().push(key)
                    console.log('New account is pushed into database')
                    firebase.database().ref(key).child('profile').set({
                        dob: payload.dob,
                        email: payload.email,
                        major: payload.major,
                        name: payload.name,
                        phone: payload.phone,
                        role: 'member'
                    })
                    console.log('Profiles has been updated')
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
            )
        },
        signUserIn({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: firebase.auth().currentUser.uid,
                    }
                    //console.log(firebase.auth().currentUser.uid)
                    console.log('New User ID (action): ' + newUser.id)
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
        },
        autoSignIn({commit}, payload){
            commit('setUser', {id: payload.id, registeredMeetups: []})
            console.log('User is setted to -> ' + store.getters.user.id)
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', '')
        },
        clearError({commit}){
            commit('clearError')
        }
    },
    getters:{
        loadedMeetups (state){
            return state.LoadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state, getters){
            return getters.loadedMeetups.slice(0,5)
        },
        loadedMeetup (state){
            return (meetupId) => {
                return state.LoadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        loadedMeetupsID (state){
            return state.LoadedMeetups.length + 1
        },
        user (state){
            return state.user
        },
        profile (state){
            return state.profile
        },
        error(state){
            return state.error
        },
        loading(state){
            return state.loading
        },
        role(state){
            return state.role
        }
    }
})