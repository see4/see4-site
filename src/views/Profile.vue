<template>
    <div v-if="profile">
        <h1>Welcome {{profile.displayName}}</h1>
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    data(){
        return{
            profile: null
        }
    },
    created(){
        // firebase.auth().onAuthStateChanged((user)=>{
        //     console.log(user);
        //     if(user){
        //         this.profile = user;
        //     }else{
        //         this.profile = null;
        //     }
        // })
        this.profile = this.$store.getters.currentUser;
    }
    
}
</script>
<style>

</style>
