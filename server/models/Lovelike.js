const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const lovelikeSchema = new Schema({
    userid:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    jepretid:{
      type:Schema.Types.ObjectId,
      ref:'Jepret'
    },
    status : Boolean
})

const Lovelike = mongoose.model('Lovelike', lovelikeSchema)

module.exports = Lovelike;
