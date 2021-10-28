<template>
  <div>
  <!-- ***** Testimonials Starts ***** -->
  <div class="bgcolor">
    <section class="section" id="trainers">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="section-heading">
                        <h2>Show <em>Detail gym {{ blog.id }}</em></h2>
                        <img src="assets/images/line-dec.png" alt="">
                        <p>You can view the details of the gym you are interested in. More from here</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="trainer-item">
                      <div class="show">
                        <div class="image-thumb">
                            <img src="assets/images/first-trainer.jpg" alt="">
                        </div>
                        <div class="down-content">
                         <!--  <transition name="fade"> 
                            <div v-if="blog.thumbnail != 'null'">
                              <img :src="BASE_URL+blog.thumbnail" >
                            </div>
                          </transition> -->
                          <br>
                            <h4>{{ blog.namegym }}</h4><!-- ชื่อ -->
                            <p class="addgym">{{ blog.address }}</p><!-- ที่อยู่ -->
                            <p><b>ราคา :</b> {{ blog.price }}</p><!-- ราคา -->
                            <p><b>เครื่องเล่น :</b> {{ blog.player }}</p>
                            <p><b>บริการ :</b> {{ blog.service }}</p>
                            <p><b>เวลาเปิด-ปิด :</b> {{ blog.time }}</p>
                            <p><b>เกี่ยวกับ : </b>{{ blog.content }}</p>
                            <br>
                            <ul class="social-icons">
                                <li >
                                  <button v-on:click="navigateTo('/blog/edit/'+ blog.id)" style="color:white;" class="btn btn-warning">
                                    <i class="fa fa-pencil-square-o"></i>
                                  </button>
                                </li>
                                <li >
                                  <router-link :to="{ name: 'blogs' }"  style="color:white;" class="btn btn-info">
                                    <i class="fa fa-home" aria-hidden="true"></i>
                                     
                                  </router-link>
                                </li>
                                <li>
                                  <button v-on:click="deleteBlog(blog)" class="btn btn-danger">
                                    <i class="fa fa-trash" ></i>
                                  </button>
                                </li>
                            </ul>
                        </div>
                      </div>
                    </div>
                </div>
            
            </div>
        </div>
    </section>
    
  </div>
    <!-- ***** Testimonials Ends ***** -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; 2020 Training Studio
                    
                    - Designed by <a rel="nofollow" href="https://templatemo.com" class="tm-text-link" target="_parent">TemplateMo</a></p>
                    
                    <!-- You shall support us a little via PayPal to info@templatemo.com -->
                    
                </div>
            </div>
        </div>
    </footer>
  
  </div>
</template>

<script>
import BlogService from "@/services/BlogService";

export default {
  data() {
    return {
       BASE_URL: "http://localhost:8081/assets/uploads/",
      blog: null,
    };
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        
        try {
           this.$router.push({
          name: "blogs",
          });
          await BlogService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
<style scoped>
.addgym{
  font-size: 13px;
  font-weight: 500;
  color: #ed563b;
  display: inline-block;
  /* margin-top: 25px; */
  /* margin-bottom: 10px; */
}

</style>
