const User = require('../models/User')
const Jepret = require('../models/Jepret')
const Lovelike = require('../models/Lovelike')
const jwt  = require('jsonwebtoken')

module.exports = {
  register: (req,res) => {
    User.create({
      name  : req.body.name,
      email  : req.body.email,
      password : req.body.password
    },(err,data) => {
      res.status(200).json({
        message : 'new account created succes',
        data : data
      })
    })
  },
  signin: (req,res) => {
    User.findOne({
      email:req.body.email,
      password:req.body.password
    })
    .then(data => {
      if (data) {
        let token = jwt.sign({userId : data._id, name : data.name, email : data.email}, process.env.SECRET)
        res.status(200).json({
          message : 'login succes',
          token : token,
          idname : data._id
        })
      }else{
        res.status(500).json({
          message: 'login failed'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })
  },
  checkjwt : (req,res) => {
    let token=req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    res.status(200).json({
      message : 'jwt succes',
      data : decoded
    })
  },
  jepretgram : (req,res) => {
    let token=req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    let foto= req.file.path.split('/').pop()
    let picture = `http://localhost:3000/images/${foto}`
    let jepret= new Jepret()
     jepret.userid=decoded.userId
     jepret.image=picture
     jepret.caption=req.body.caption
     jepret.save().then(data=>{
       res.status(200).send(data)
     }).catch(error=>{
       res.status(500).send(error)
     })
  },
  showgram : (req,res) => {
    Jepret.find().then((item) => {
      Lovelike.find().then(love => {
        res.status(200).send({item,love})
      })
    })
  },
  updategram : (req,res) => {
    Jepret.updateOne(
      {
      _id:req.params.id
      },
    {$set:
      {
        caption:req.body.caption
      }
    }).then(data => {
      res.status(200).send(data)
    })
  },
  deletegram : (req,res) => {
    Jepret.deleteOne(
      {
        _id: req.params.id
      })
      .then(data => {
        res.status(200).json(data)
      })
  },
  lovelike (req,res) {
    Lovelike.findOne({userid:req.body.userid,jepretid:req.body.jepretid}).exec().then(response => {
      if(response){
        Lovelike.updateOne(
          {
          userid:req.body.userid,
          jepretid:req.body.jepretid
          },
        {$set:
          {
            status:req.body.status
          }
        }).then(data => {
          res.status(200).send(data)
        })
      }else{
        let lovelike= new Lovelike()
         lovelike.userid=req.body.userid
         lovelike.jepretid=req.body.jepretid
         lovelike.status=req.body.status
         lovelike.save().then(data=>{
           res.status(200).send(data)
         }).catch(error=>{
           res.status(500).send(error)
         })
      }
    })
  }
}
