import express, { urlencoded } from 'express'
import {Book,Borrower} from './schema.js'
import multer from 'multer';
import methodOverride from 'method-override';
import fs from 'fs'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/resources/Uploads')
      },
    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname)
    }

})
const app = express()
const upload= multer({storage:storage})

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('../public/views/main page.ejs')
})

app.get('/books',async(req,res)=>{
    Book.find()
    .then((books)=>{
        res.render('../public/views/books.ejs',{books})
    })

})

app.get('/borrowers',(req,res)=>{
  Borrower.find()
  .then((borrowers)=>{
    res.render('../public/views/borrowers.ejs',{borrowers})
  })
})

app.post('/addBook',upload.single('bImg'),async(req,res)=>{
    const filepath =('.'+(req.file.destination)+'/'+(req.file.filename)).replace("../public/", "")
    const book = new Book({
        title: req.body.bTitle,
        author:req.body.bAuth,
        discription: req.body.bDisc,
        imagePath: filepath,
        available:true
    })
    await book.save()
    res.send(`
    <script>
      alert('Book added successfully');
      window.location.href = '/books';
    </script>
  `)
})

app.post('/issueBook',async(req,res)=>{
    const borrower = new Borrower({
      name:req.body.borrowerName,
      bookBorrowed:req.body.bookName,
      issueDate: Date(),
      ID:req.body.borrowerId,
      contact:req.body.borrowerContact
    })
    await borrower.save()
    await Book.findOneAndUpdate({title:req.body.bookName},{available:false})
    res.send(`
    <script>
      alert('Book has been issued!');
      window.location.href = '/books';
    </script>
  `)
})

app.patch('/checkin/:bname', async(req,res)=>{
    await Book.findOneAndUpdate({title:req.params.bname},{available:true})
    await Borrower.findOneAndDelete({bookBorrowed:req.params.bname})
    res.send(`
    <script>
      alert('Book has been checked in!');
      window.location.href = '/books';
    </script>
  `)
})


app.delete('/removeBook/:id',async(req,res)=>{
  const bookId= req.params.id
  const book = await(Book.findById(bookId))
  const filepath= book.imagePath
  await Book.findByIdAndDelete(bookId)
  await fs.unlink(('./public/'+filepath),(err)=>{
    if(err){
      console.log(err)
    }
  })
  res.send(`
  <script>
    alert('Book has been removed from the library!');
    window.location.href = '/books';
  </script>
`)
})

app.listen(3000,()=>{
    console.log('server running')
})