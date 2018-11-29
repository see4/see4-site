<template>
     <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">See4</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#portfolio">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#services">Packages</a>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link js-scroll-trigger" href="#portfolio">Why Us?</a>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">About</a>
            </li> -->
            <li class="nav-item" v-if="!isLoggedIn">
              <a class="nav-link js-scroll-trigger" href="#team">Locations</a>
            </li>
            <!-- <li class="nav-item" v-if="!isLoggedIn" >
              <a class="nav-link js-scroll-trigger mod"  @click="showLogin">Login</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <a class="nav-link js-scroll-trigger mod"  @click="showRegister">Sign up</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link js-scroll-trigger mod"  @click="gotoAdmin">Admin</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link js-scroll-trigger mod"  @click="gotoProfile">Profile</a>
            </li> -->
            <!-- <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link js-scroll-trigger mod"  @click="logout">Logout</a>
            </li> -->
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <b-modal ref="loginModal" hide-footer title="Login">
          <div>
            <b-form @submit.prevent="login" @reset.prevent="resetLogin">
              <b-form-group label="Email:">
                <b-form-input type="email" v-model="loginForm.email" required placeholder="Enter your email"></b-form-input>
              </b-form-group>
              <b-form-group label="Password:">
                <b-form-input type="password" v-model="loginForm.password" required placeholder="Enter your password"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button> &nbsp;
                <b-button type="reset" variant="danger">Reset</b-button>
              </b-form-group>
            </b-form>
          </div>

        </b-modal>
      </div>
      <div>
        <b-modal ref="registerModal" hide-footer title="Sign Up">
          <div>
            <b-form @submit.prevent="register" @reset.prevent="resetRegister" :class="{'error': hasErrors}" >
              <b-form-group label="First Name:">
                <b-form-input type="text" v-model="registerForm.first_name" required placeholder="Enter your first name"></b-form-input>
              </b-form-group>
              <b-form-group label="Last Name:">
                <b-form-input type="text" v-model="registerForm.last_name" required placeholder="Enter your last name"></b-form-input>
              </b-form-group>
              <b-form-group label="Email:">
                <b-form-input type="email" v-model="registerForm.email" required placeholder="Enter your email"></b-form-input>
              </b-form-group>
              <b-form-group label="Password:">
                <b-form-input type="password" v-model="registerForm.password" required placeholder="Enter your password"></b-form-input>
              </b-form-group>
              <b-form-group>
                <div class="error" v-if="hasErrors">
                  <p v-for="(error, index) in errors" :key="index">{{error}}</p>
                </div>
              </b-form-group>
              <b-form-group>
                <b-button type="submit" variant="primary">Sign up</b-button> &nbsp;
                <b-button type="reset" variant="danger">Reset</b-button>
              </b-form-group>
            </b-form>
          </div>
        </b-modal>
      </div>
    </nav>
</template>
<script>
import firebase from 'firebase';
import firestore from '@/firebase/firestore';
    export default {
      data(){
        return{
          loginForm:{
            email: '',
            password: ''
          },
          registerForm:{
            first_name: '',
            last_name: '',
            email: '',
            password: ''
          },
          isLoggedIn: null,
          errors:[],
        }
      },
      computed:{
        hasErrors(){
          return this.errors.length > 0;
        },
        // isLoggedIn(){
        //   if(firebase.auth().currentUser){
        //     return true;
        //   }
        //   return false;
        // }
      },
      created(){
        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            this.isLoggedIn = user;
          }else{
            this.isLoggedIn = null;
          }
        });
      },
      methods:{
        gotoProfile(){
          this.$router.push({name: 'Profile', params:{id: this.$store.getters.currentUser.uid}});
        },
        gotoAdmin(){
          this.$router.push({name: 'Admin'});
        },
        showLogin(){
          this.$refs.loginModal.show();
        },
        showRegister(){
          this.$refs.registerModal.show();
        },
        login(){
          firebase.auth().signInWithEmailAndPassword(this.loginForm.email.trim(), this.loginForm.password.trim()).then((cred)=>{
            console.log(cred.user);
            //this.isLoggedIn = true;
            this.$store.dispatch('setUser', cred.user);
            this.$router.push({name: 'Home'})
          }).catch((error)=>{
            console.log(error);
          });
          this.resetLogin();
        },
        resetLogin(){
          this.loginForm.emai = '';
          this.loginForm.password = '';
          this.$refs.loginModal.hide();
        },
        register(){
          this.errors = []
          if(this.isRegisterFormValid()){
            console.log(this.registerForm);
            firebase.auth().createUserWithEmailAndPassword(this.registerForm.email.trim(), this.registerForm.password.trim()).then((cred)=>{
              
              firestore.collection('users').doc(cred.user.uid).set({
                first_name: this.registerForm.first_name.trim(),
                last_name: this.registerForm.last_name.trim(),
                email: this.registerForm.email.trim(),
                role: 'user'
              }).then(()=>{
                //this.isLoggedIn = true;
                console.log('User successfully created!!!');
              }).catch((err)=>{
                console.log(err);
                this.errors.push(err.message)
              });
              cred.user.updateProfile({
                displayName: `${this.registerForm.first_name.trim()} ${this.registerForm.last_name.trim()}`
              }).then(()=>{
                console.log(cred);
                this.$store.dispatch('setUser', cred.user);
                this.$router.push({name: 'Home'});
                console.log('User Info updated successfully');
                this.$swal('Great Job!!!', 'You have successfully registered', 'success');
                this.resetRegister();
              }).catch(error=>{
                this.errors.push(error.message);
              });
                
            }).catch((err)=>{
              this.errors.push(err.message);
            });
            
          }
        },
        resetRegister(){
          this.registerForm.first_name = '';
          this.registerForm.last_name = '';
          this.registerForm.email = '';
          this.registerForm.password = '';
          this.$refs.registerModal.hide();
        },
        logout(){
          firebase.auth().signOut().then(()=>{
            this.$router.push({name: 'Welcome'});
          }).catch((error)=>{
            console.log(error)
          });
        },
        registerIsEmpty(){
          if(this.registerForm.first_name.length==0 || this.registerForm.last_name.length == 0
          || this.registerForm.email.length == 0 || this.registerForm.password.length == 0){
            return true;
          }
          return false;
        },
        loginIsEmpty(){
          if( this.loginForm.email.length == 0 || this.loginForm.password.length == 0){
            return true;
          }
          return false;
        },
        isRegisterFormValid(){
          if(this.registerIsEmpty()){
            this.errors.push('Please fill all empty fields');
            return false;
          }
          return true;
        }

      }
    }
</script>
<style scoped>
  .mod{
    cursor: pointer;
  }
</style>

