const mongoose=require("mongoose");

//creata a Author schema
const AuthorSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

//Author Model
const AuthorModel=mongoose.model(AuthorSchema);

module.exports=AuthorModel;