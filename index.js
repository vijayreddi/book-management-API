const express=require("express");

//Database
const database=require("./database");
// Initialisation
const booky=express();

booky.use(express.json());

/* 
Route              /
Description        Get all Books
Access             PUBLIC
Parameter          None
Methods            GET
*/

//For All Books
booky.get("/",(req,res)=>{
    return res.json({books:database.books});
});

/* 
Route              /is
Description        Get Specific Book Based On ISBN
Access             PUBLIC
Parameter          ISBN
Methods            GET
*/

//For Specific Book Based On ISBN
booky.get("/is/:ISBN",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.ISBN);

    if(getSpecificBook.length===0){
        return res.json({error:`No Book Found for the ISBN of ${req.params.ISBN}`});
    }
    else{
        return res.json({Book:getSpecificBook})
    }
});

/* 
Route              /c
Description        Get Specific Book Based On Category
Access             PUBLIC
Parameter          Category
Methods            GET
*/
booky.get("/c/:Category",(req,res)=>{
   const getSpecificBook=database.books.filter((book)=> book.category.includes(req.params.Category));
   if(getSpecificBook.length===0){
       return res.json({error:`No Book Found for the category of ${req.params.Category}`})
   }
   else{
       return res.json({Book:getSpecificBook});
   }
});

/* 
Route              /l
Description        Get Specific Book Based On Language
Access             PUBLIC
Parameter          Language
Methods            GET
*/
booky.get("/l/:Language",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.language===req.params.Language);
    if(getSpecificBook.length===0){
        return res.json({error:`No Book found for the Language of ${req.params.Language} `})
    }
    else{
        return res.json({Book:getSpecificBook});
    }
});

/* 
Route              /author
Description        Get all Author
Access             PUBLIC
Parameter          None
Methods            GET
*/

booky.get("/author",(req,res)=>{
    return res.json({Author:database.author})
});

/* 
Route              /author/name
Description        Get Specific Author based id
Access             PUBLIC
Parameter          name
Methods            GET
*/
booky.get("/author/:name",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=>author.name===req.params.name);
    if(getSpecificAuthor.length===0)
    {
        return res.json({error:`No Author Found for the Id of ${req.params.name}`});
    }
    else{
        return res.json({Author:getSpecificAuthor});
    }
})

/* 
Route              /author/books
Description        Get Specific Author based on Books
Access             PUBLIC
Parameter          ISBN
Methods            GET
*/

booky.get("/author/book/:ISBN",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.ISBN));

    if(getSpecificAuthor.length===0){
        return res.json({error:`No Author Found for the ISBN of ${req.params.ISBN}`});
    }
    else{
        return res.json({Author:getSpecificAuthor})
    }
});

/* 
Route              /publication
Description        Get All Publications
Access             PUBLIC
Parameter          None
Methods            GET
*/

booky.get("/publication",(req,res)=>{
    return res.json({Publications:database.publication});
})

/* 
Route              /publication
Description        Get Specific publications based On Name
Access             PUBLIC
Parameter          name
Methods            GET
*/

booky.get("/publication/:name",(req,res)=>{
    const getSpecificPublication=database.publication.filter((publication)=>publication.name===req.params.name);
    if(getSpecificPublication.length===0){
        return res.json({error:`No publication found with the name of ${req.params.name}`});
    }
    else{
        return res.json({Publications:getSpecificPublication});
    }
});

/* 
Route              /publication/isbn
Description        Get Specific publications based On Books
Access             PUBLIC
Parameter          ISBN
Methods            GET
*/
booky.get("/publication/isbn/:ISBN",(req,res)=>{
    const getSpecificPublication=database.publication.filter((publication)=>publication.books.includes(req.params.ISBN));

    if(getSpecificPublication.length===0){
        return res.json({error:`No publication Found for the ISBN of ${req.params.ISBN}`});
    }
    else{
        return res.json({publication:getSpecificPublication})
    }
});

/* 
Route              /book/add
Description        Adding a new Book
Access             PUBLIC
Parameter          None
Methods            POST
*/

booky.post("/book/add",(req,res)=>{
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({Books:database.books})
});

/* 
Route              /author/add
Description        Adding a new Author
Access             PUBLIC
Parameter          None
Methods            POST
*/
booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
    database.author.push(newAuthor);
    return res.json({Author:database.author});
});

/* 
Route              /publication/add
Description        Adding a new publication
Access             PUBLIC
Parameter          None
Methods            POST
*/
booky.post("/publication/add",(req,res)=>{
    const {newPublication}=req.body;
    database.publication.push(newPublication);
    return res.json({Publication:database.publication});
});

/* 
Route              /book/update/title
Description        Updating Book title based on ISBN
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/
booky.put("/book/update/title/:ISBN",(req,res)=>{
database.books.forEach((book)=>{
    if(book.ISBN===req.params.ISBN){
       book.title=req.body.newBookTitle;
       return;
    }
});
return res.json({books:database.books});
});

/* 
Route              /book/update/author
Description        Updating/add new author for Book
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/

booky.put("/book/update/author/:ISBN/:authorId",(req,res)=>{
   //Updating Book Database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.ISBN){
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    //Update Author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            return author.books.push(req.params.ISBN);
        }
    });
    return res.json({Books:database.books,author:database.author})
});

/* 
Route              /author/update/name
Description        Updating author name based on id
Access             PUBLIC
Parameter          Id
Methods            PUT
*/

booky.put("/author/update/name/:id",(req,res)=>{
    database.author.forEach((author)=>{
        if(author.id===req.params.id){
           author.name=req.body.newAuthorName;
           return;
        }
    });
    return res.json({Author:database.author});
    });

/* 
Route              /publication/update/name
Description        Updating publication name based on id
Access             PUBLIC
Parameter          Id
Methods            PUT
*/
booky.put("/publication/update/name/:id",(req,res)=>{
    database.publication.forEach((publication)=>{
        if(publication.id===req.params.id){
            publication.name=req.body.newPublicationName;
           return;
        }
    });
    return res.json({publication:database.publication});
    });

/* 
Route              /publication/update/book
Description        Updating/add new book to a publication
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/

booky.put("/publication/update/book/:ISBN",(req,res)=>{
     //Updating the publication database
     database.publication.forEach((publication)=>{
      if(publication.id===req.body.pubId){
         return publication.books.push(req.params.ISBN);
      }
     });
    //Updating the book database
     database.books.forEach((book)=>{
         if(book.ISBN===req.params.ISBN){
             book.publication=req.body.pubId;
             return;
         }
     })
     return res.json({Books:database.books,Publications:database.publication,message:"Successfully updated Database"})
});










booky.listen(3000,()=>console.log("Server is Running successfully"));
