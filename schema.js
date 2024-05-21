
import mongoose from "mongoose";
const db= mongoose
const dbURL='mongodb://localhost:27017/Library'  //Replace the connection string with your own connection string
const {Schema, model}=mongoose

db.connect(dbURL)
.then(
    console.log('connected')
)
.catch(err=>{
    console.log(err)
})

const bookSchema= new Schema({
    title:{
        type:String,
        required :true
    },
    author:{
        type:String,
        required: true
    },
    discription:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true,
        default:'./resources/Uploads/books.png'
    },
    available:{
        type:Boolean,
        required: true,
        default:true
    }
})

const borrowerSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    bookBorrowed:{
        type: String,
        required:true
    },
    issueDate:{
        type:String,
        required:true
    },
    ID:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    }
    
})

const Borrower=model('Borrower',borrowerSchema)

const Book =model('Book',bookSchema)

export {Book,Borrower}
