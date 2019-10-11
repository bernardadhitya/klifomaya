import { store } from "../store";

export default (to, from, next) => {
    /**/
    if (store.getters.user == '' || store.getters.user == null || store.getters.user == undefined) {
        next('/signin')
    }
    else{
        next()
    }
}