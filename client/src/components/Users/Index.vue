<template>
 <div>
      <section class="section" id="trainers">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="section-heading">
                        <h2>All <em>Users</em></h2>
                            <img src="./img/people.png" style="width:50px;" alt="">
                            <h5>number of users {{ users.length }}</h5>
                        <p>Create your login password here.</p><br>

                        <p> <button v-on:click="navigateTo('/user/create/')" class="btn btn-success" style="color:white;">New user</button></p>
                    </div>
                </div>
            </div>
            <div class="row">   
                <div class="col-lg-4" v-for="user in users" v-bind:key="user.id">
                    <div class="trainer-item">
                        <div class="image-thumb">
                            <!-- <img src="assets/images/first-trainer.jpg" alt=""> -->
                        </div>
                        <div class="down-content">
                          <!--   <span>Strength Trainer</span> -->
                            <h4><b>Name :</b> {{ user.name }} - {{ user.lastname }}</h4>
                            <p><b>Email :</b> {{ user.email }}</p>
                            <p class="show"><b>Password :</b> {{ user.password}}</p>
                            <ul class="social-icons">
                                <li><a ><i class="fa fa-facebook"></i></a></li>
                                <li><a ><i class="fa fa-twitter"></i></a></li>
                                <li><a ><i class="fa fa-instagram"></i></a></li>
                                <li><a ><i class="fab fa-line"></i></a></li>
                            </ul><br>
                            <center>
                            <ul class="social-icons">
                                <li><b-button v-on:click="navigateTo('/user/'+ user.id)" variant="primary">ดูข้อมูล</b-button></li>
                                <li><b-button v-on:click="navigateTo('/user/edit/'+ user.id)" variant="secondary">แก้ไข</b-button></li>
                                <li> <b-button v-on:click="deleteUser(user)" variant="danger">ลบข้อมูล</b-button></li>
                            </ul>
                            </center>
                        </div>
                    </div>
                </div>
              
                
            </div>
        </div>
    </section><br>
    <center>
        <button v-on:click.prevent="logout" class="btn btn-warning">Logout</button>
    </center>
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

import UsersService from '@/services/UserService'

    export default {
        data () {
            return {
                users : []
            }
        },
       async created (){
         try {
           this.users = (await UsersService.index()).data
       }catch(error){
           console.log(error);
       }
        },
        methods: {
            navigateTo (route){
                this.$router.push(route)
        },
        async deleteUser(user) {
            let result = confirm("Want To Delete?")
               if(result) {
                   try {
                    await UsersService.delete(user)
                    this.refreshData()
            } catch (error){
            console.log(error)
          }
        }
         },
         async refreshData() {
             this.users = (await UsersService.index()).data
         },
        logout () {
          this.$store.dispatch('setToken', null)
          this.$store.dispatch('setUser', null)

          this.$router.push({
            name: 'login'
          })
        },
    }
}


</script>
<style scoped>
.show {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>
