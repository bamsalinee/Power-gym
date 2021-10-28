<template>
  <div>
     <section class="section" id="trainers">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="section-heading">
                        <h2>Edit <em>Users {{ user.id }}</em></h2>
                            <img src="./img/people.png" style="width:50px;" alt="">
                          
                        <p>You can check about you</p><br>

                    </div>
                </div>
            </div>
            <div class="row">   
                <div class="col-lg-12">
                    <div class="trainer-item">
                        <div class="image-thumb">
                            <!-- <img src="assets/images/first-trainer.jpg" alt=""> -->
                        </div>
                        <div class="down-content">
                            <form v-on:submit.prevent = "editUser">
                              <div class="form-group">
                                <label >Name :</label>
                                <input type="texr" class="form-control" placeholder="Enter name" v-model = "user.name" maxlength="20" >
                                <small class="form-text text-muted">You can use the same name and email address.</small>
                              </div>
                              <div class="form-group">
                                <label >Lastname :</label>
                                <input type="texr" class="form-control" placeholder="Enter lastname" v-model = "user.lastname" maxlength="20">
                              </div>
                             <div class="row">
                                <div class="col">
                                  <label >Email : :</label>
                                  <input type="text" class="form-control" placeholder="Email" v-model = "user.email">
                                </div>
                                <div class="col">
                                  <label >Password :</label>
                                  <input type="text" class="form-control" placeholder="Password" v-model = "user.password" >
                                </div>
                              </div><br>

                               <hr>
                              <div>
                                <div><b>Name </b>: {{user.name}}</div>
                                <div><b>Lastname </b>: {{user.lastname}}</div>
                                <div><b>Email </b>: {{user.email}}</div>
                                <div><b>Password </b>: {{user.password}}</div>
                              </div>

                              
                            <br><center>  
                            <ul class="social-icons">
                              <li><button type="submit" class="btn btn-success">Save</button></li>
                              <li><router-link :to="{ name: 'users' }" class="btn btn-secondary">Back</router-link></li>
                                
                            </ul>
                            </center>
                            </form>

                        </div>
                    </div>
                </div>
              
                
            </div>
        </div>
    </section><br>
 
    <!-- ***** Testimonials Ends ***** -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; 2020 Training Studio - Designed by <a rel="nofollow" href="https://templatemo.com" class="tm-text-link" target="_parent">TemplateMo</a></p>

                    <!-- You shall support us a little via PayPal to info@templatemo.com -->

                </div>
            </div>
        </div>
    </footer>

  </div>
</template>
<script>
import UserService from '@/services/UserService'

export default {
  data (){
    return {
      user: {
        name: '',
        lastname:'',
        email:'',
        password:'',
        status:'active'
      }
    }
  },
  methods: {
    async editUser (){
      try{
        await UserService.put(this.user)
        this.$router.push({
          name: 'users'
        })
      }catch(error){
        console.log(error)
      }
    }
  },async created() {
    try {
      let userId = this.$route.params.userId
      this.user = (await UserService.show(userId)).data
    }catch(error){
      console.log(error)
    }
  },
}

</script>
<style scoped>

</style>
