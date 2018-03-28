<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar col-md-12">
          <ul class="list-group">
            <li class="list-group-item" data-toggle="modal" data-target="#addquestion">Add photo</li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="col-md-6 offset-md-3" v-for="(n,i) in listgram" :key="i">
          <div class="card col-md-12" style="margin-bottom:20px;">
            <img class="card-img-top" :src="n.image" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">{{n.caption}}</p>
              <button type="button" class="btn btn-outline-warning">update</button>
              <button type="button" class="btn btn-outline-danger">update</button>
              <span class="border border-danger" style="float:right;">love</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="modal fade" id="addquestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="photo">photo</label>
              <input type="file" class="form-control" id="image">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Your caption</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="caption" placeholder="Enter Your caption"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addgram">upload gram</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      caption: '',
      listgram: []
    }
  },
  created: function () {
    this.showgram()
  },
  methods: {
    addgram () {
      const fileInput = document.querySelector( '#image' );
      const formData = new FormData();
        formData.append( 'picture', fileInput.files[0]);
        formData.append( 'caption', this.caption);
        axios.post(`http://localhost:3000/jepretgram/`,formData,{headers:{token:localStorage.getItem('token')}})
          .then(response =>{
            console.log(response);
            this.showgram()
          })
          .catch(err => {
            console.log(err)
          })
    },
    showgram () {
      axios.get('http://localhost:3000/showgram/').then(response => {
        this.listgram = response.data

      })
      .catch (err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin-top: 20px;
  }
</style>
