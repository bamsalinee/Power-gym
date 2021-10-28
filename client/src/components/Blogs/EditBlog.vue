<template>
  <div>
    <section class="section" id="schedule">
        <div class="container">
            <div class="row">
               <div class="col-lg-6 offset-lg-3">
                     <div class="section-heading">
                        <h2>Edit <em>Gym</em></h2>
                        <img src="./image/weight-bar.png" alt="">
                        <p>You can edit text and new images here.</p>
                    </div>
                </div>
            </div>
           
        <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <!-- <p v-if="isInitial || isSuccess"/> -->
          <p v-if="isInitial">
            Drag your files(s) <br />
            here to begin or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
          <p v-if="isFailed">Upload Failed</p>
        </div>

        <div>
          <ul class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img
                style="margin-bottom: 5px"
                :src="BASE_URL + picture.name"
                alt="picture image"
              />
              <br>
              <button v-on:click.prevent="delFile(picture)" class="btn btn-danger">Delete</button>
              <button v-on:click.prevent="useThumbnail(picture.name)" class="btn btn-info">Create</button>

            </li>
          </ul>
          <!-- <div class="clearfix"></div> -->
        </div>
        </form>
        <br>

        <p>
          <transition name="fade"> 
          <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
            <img :src="BASE_URL+blog.thumbnail" alt="thumbnail">
          </div>
        </transition>
        </p>
        <br>

      <form v-on:submit.prevent="editBlog" >

          <div class="form-row">
            <div class="col">
              <label >Name gym :</label>
              <input type="text" class="form-control " placeholder="Enter your name gym" v-model="blog.namegym">
            </div>
            <div class="col">
              <label >Address :</label>
              <input type="text" class="form-control" placeholder="Enter your address" v-model="blog.address">
            </div>
          </div>
          <br>

          <label >About gym :</label>
            <vue-ckeditor
              v-model="blog.content"
              :config="config"
              @blur="onBlur($event)"
              @focus="onFocus($ecent)"
            />
          <small class="form-text text-muted">You can create a gym description.</small><br>

          <div class="form-row">
            <div class="col">
              <label >Price :</label>
              <input type="text" class="form-control" placeholder="x,xxx" v-model="blog.price">
            </div>
            <div class="col">
              <label >Gym equipment :</label>
              <input type="text" class="form-control" v-model="blog.player">
            </div>
          </div>
          <br>

          <div class="form-row">
            <div class="col">
              <label >Service :</label>
              <input type="text" class="form-control" v-model="blog.service">
            </div>
            <div class="col">
              <label >Opening-closing time :</label>
              <input type="text" class="form-control" v-model="blog.time">
            </div>
          </div>
          
          <br>
     
          <center>
            <p>
              <button type="submit" class="btn btn-warning">Save</button>
              <router-link :to="{ name: 'blogs' }" class="btn btn-secondary">Back</router-link>
            </p>
          </center>
      </form>
    </div>
  </section>
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
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
          BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      //uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],

      pictures: [],
      pictureIndex: 0,


      blog: {
        nreviwe: "",
        date: "",
        thumbnail: "null",
        pictues: "null", 
        content: "",
      },
      config: {
        height: 300,
      },
    };
  },
  methods: {
    async editBlog() {
      try {
        await BlogService.put(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },

    onBlur (editor) {
          console.log(editor);
       },
          onFocus (editor) {
            console.log(editor);
          },

 created () {
      this.config.toolbar = [
        {
          name: "document",
          items: [
            "Source",
            "-",
            "Save",
            "NewPage",
            "Preview",
            "Print",
            "-",
            "Templates"
          ]
        },
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "PasteFrromWord",
            "-",
            "Undo",
            "Redo"
          ]
        },
        {
          name: "editing",
          items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
          },
        {
        name: "forms",
        items: [
          "From",
          "Checkbox",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
    },
    "/",
    {
        name: "basicstyles",
        items: [
          "Bold",
          "Itatic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
    },
    {
      name: "paragaph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "Links", items: ["Link", "Unlink", "Anchor"] },
    {
      name:"insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontaRule",
        "Smiley",
        "PageBreak",
        "Iframe",
        "InsertPre"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"]},
    { name: "colors", items: ["TextColor", "BGColor"]},
    { name: "tools", items: ["Maximize", "ShowBlocks"]},
    { name: "about", items: ["About"]}

      ]
    },
    
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {

      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }

          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      this.save(formData);
    },  
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },

    async delFile (material){
      let result = confirm("คุณแน่ใจนะที่จะลบ?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }

        await UploadService.delete(dataJSON)

        for (var i=0; i<this.pictures.length; i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }
      }
    },

    useThumbnail (filename) {
      console.log(filename)
      this.blog.thumbnail = filename
    }
  },
  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },

  },

  components: {
    VueCkeditor
  },

  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;


    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
/* image display */
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
.thumbnail-pic img {
  width: 200px;
}

</style>
