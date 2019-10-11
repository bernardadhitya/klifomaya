<template>
    <div>
        <h1>{{profile.name}}</h1>
        <h1>{{profile.major}}</h1>
        <h1>{{profile.email}}</h1>
        <h1>{{profile.phone}}</h1>
        <h1>{{profile.role}}</h1>
    </div>
</template>

<script>
export default {
    computed: {
        profile(){
            return this.$store.getters.profile
        }
    }
}
</script>
