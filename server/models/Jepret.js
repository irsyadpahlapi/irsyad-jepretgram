const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const jepretSchema = new Schema({
    userid:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    image: String,
    caption : String
})

const Jepret = mongoose.model('Jepret', jepretSchema)

module.exports = Jepret;
