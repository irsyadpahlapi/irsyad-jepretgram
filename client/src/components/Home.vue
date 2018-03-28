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
              <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#updatecaption" @click="updcaption(n)">update</button>
              <button type="button" class="btn btn-outline-danger" @click="deletegram(n._id)">hapus</button>
              <span class="love" style="float:right;" v-if="n.userid != iduser" @click="lovelike(n._id,true)"></span>
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

    <div class="modal fade" id="updatecaption" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">update caption</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <img :src="imgupdate" alt="" style="width:100px; height:100px;">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Your caption</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="updatecaption" placeholder="Enter Your caption"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='goupdate'>update caption</button>
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
      listgram: [],
      idupdatecaption: '',
      imgupdate: '',
      updatecaption: '',
      iduser: localStorage.getItem('iduser')
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
        console.log(response);
        let arrlove = []
        for (let i = 0 ; i < response.data.item.length; i++){
          for (let j = 0 ; j < response.data.love.length; j++){
            if(response.data.item[i]._id === response.data.love[j].jepretid){
              arrlove.push(
                {_id:response.data.item[i]._id,
                  image:response.data.item[i].image,
                  userid:response.data.item[i].userid,
                  caption:response.data.item[i].caption,
                  status:response.data.love[j].status
                })
            }
          }
        }
        console.log(arrlove);
        this.listgram = response.data.item

      })
      .catch (err => {
        console.log(err)
      })
    },
    updcaption (data) {
      console.log(data);
      this.idupdatecaption = data._id
      this.updatecaption = data.caption
      this.imgupdate = data.image
    },
    goupdate () {
      axios.put(`http://localhost:3000/updategram/${this.idupdatecaption}`,
      {
        caption:this.updatecaption
      }).then(response => {
        this.showgram()
      })
    },
    deletegram (id) {
      axios.delete(`http://localhost:3000/deletegram/${id}`).then(response => {
        this.showgram()
      })
    },
    lovelike (id,status) {
      axios.post(`http://localhost:3000/lovelike/`,
      {
        jepretid:id,
        userid:this.iduser,
        status:status
      }).then(response => {
        console.log(response);
        this.showgram()
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
  .love{
    width:20px;
    height:20px;
    border: 3px solid red;
    cursor: pointer;
  }
  .love:hover{
    box-shadow:  1px 2px #888888;
  }
</style>
