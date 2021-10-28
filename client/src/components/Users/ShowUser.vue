<template>
  <div>
    <section class="section" id="trainers">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="section-heading">
                        <h2>Show <em>Users {{ user.id }}</em></h2>
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
                            <!-- <span>{{ user.id }}</span> -->
                            <div><b>Id :</b> {{ user.id }}</div>
                            <div><b>Name :</b> {{ user.name }} - {{ user.lastname }}</div>
                            <div><b>Email : </b>{{ user.email }}</div>
                           <!--  <div>password : {{ user.password }}</div> 
                           <h4><b>Name :</b> {{ user.name }} - {{ user.lastname }}</h4>
                            <p><b>Email :</b> {{ user.email }}</p> -->
                            <p class="show"><b>Password :</b> {{ user.password}}</p>
                            <ul class="social-icons">
                                <li><a ><i class="fa fa-facebook"></i></a></li>
                                <li><a ><i class="fa fa-twitter"></i></a></li>
                                <li><a ><i class="fa fa-instagram"></i></a></li>
                                <li><a ><i class="fab fa-line"></i></a></li>
                            </ul><br>
                            <center>
                            <ul class="social-icons">
                              
                                <li><b-button v-on:click="navigateTo('/user/edit/'+ user.id)" class="btn btn-info">Edit</b-button></li>
                                <li><p><b-button v-on:click="navigateTo('/users')"  variant="secondary">Back</b-button></p></li>
                            </ul>
                            </center>
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
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UserService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>
