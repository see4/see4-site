<template>
    <div>
        <p class="temphead"></p>
        <div v-if="profile">
            
            <h1 class="temp">Welcome {{profile.displayName}}</h1>
        </div>
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
.temp {
  margin-top: 100px;
}

.temphead {
  width: 100%;
  height: 100px;
  background-color: #212529;
}
</style>
