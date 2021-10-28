<template>
  <div>
        <!-- ***** Features Item Start ***** -->
    <section class="section" id="features">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="section-heading">
                        <h2>All <em>Gyms</em></h2>
                        <img src="./image/weight-bar.png" style="width:45;" alt="waves">
                        <p>A website for people who are health conscious and still worried about finding a gym or not knowing how to start exercising. Our website will be part of helping you.</p>
                        <br><button v-on:click="navigateTo('/blog/create')" class="btnNew">New Gym</button>
                    </div>
                </div>

                <div class="col-lg-6" v-for="blog in blogs" v-bind:key="blog.id">
                    <ul class="features-items">
                        <li class="feature-item">
                            <div class="left-icon">
                                <transition name="fade"> 
                                  <div v-if="blog.thumbnail != 'null'">
                                    <img :src="BASE_URL+blog.thumbnail" style="width:150px;">
                                  </div>
                                </transition>
                            </div>
                            <div class="right-content">
                                <h4>{{ blog.namegym }}</h4>
                                <p><b>เวลาเปิด-ปิด :</b> {{ blog.time }}</p>
                                <p class="textclose"><b>เกี่ยวกับ :</b>{{ blog.content }}</p>
                                <div class="morecolor" v-on:click="navigateTo('/blog/' + blog.id)">ดูเพิ่มเติม</div>
  
                            </div>
                        </li>
                       
                    </ul>
                </div>

            </div>
        </div>
    </section>
    <!-- ***** Features Item End ***** -->
    
    <!-- ***** Footer Start ***** -->
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
import BlogService from "@/services/BlogService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      blogs: [],
    };
  },
  async created() {
    this.blogs = (await BlogService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login",
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>
