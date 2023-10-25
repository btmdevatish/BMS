const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post_id:{type:mongoose.Schema.ObjectId},
    name:{type:String,require: true,unique:true},
    media:{type:String,require: true},
    slug:{type:String,require: true}
},{
    timestamps:true
})

module.exports = mongoose.model("Category",categorySchema)