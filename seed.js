import mongoose from "mongoose";
import { Book } from "./schema.js";
const db= mongoose
const dbURL='mongodb://localhost:27017/Library' //Replace the connection string with your own connection string

db.connect(dbURL)
.then(
    console.log('connected')
)
.catch(err=>{
    console.log(err)
})

const test1= new Book({
    title:'Mein Kamph',
    author:'Hitler',
    discription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.",
})

const test2= new Book({
    title:'Dune',
    author:'Frank Hubert',
    discription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.'

})

const test3= new Book({
    title:'Vinland Saga',
    author:'Makoto Yukimura',
    discription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.'
})

test1.save()
test2.save()
test3.save()