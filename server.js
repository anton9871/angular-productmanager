const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/dist/public")); //MUST point the server to the Angular folder
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const path = require('path');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product_manager', { useNewUrlParser: true });

var ProductSchema = new mongoose.Schema({ 
    title: { type: String, required: true, minlength: 4 },
    img_url: { type: String, required: false },
    price: {type: Number, required: true}
})
const Product = mongoose.model('Product', ProductSchema);


// var CakeSchema = new mongoose.Schema({
//     baker_name: { type: String  , required: true },
//     img_url: {type: String, required: true },
//     comment: [CommentSchema] 
// })
// const Cake = mongoose.model('Cake', CakeSchema);


//create
app.post('/product', function (req, res){
    var productInstance = new Product ( req.body );
    console.log(req.body);
    productInstance.save(function (err){
        if (err) {
            console.log("Error adding document to DB.")
            res.json({error: err});
        } else {
            console.log("Success adding document to DB.")
            res.json({data: productInstance});
        }
    })
})

//Retrieve all
app.get('/products', function (req, res) {
    Product.find({}, function (err, data){
        if(err){
            console.log("Error retrieving all documents from DB.")
            res.json({error:err});
        } else {
            console.log("Success retrieving all documents from DB.")
            res.json({data: data});
        }
    })
})

//Retrieve specific id
app.get('/product/:id', function (req, res){
    Product.findById({_id: req.params.id}, function(err, data){
        if(err){
            console.log("Error retrieving specific document from DB.")
            res.json({error:err});
        } else {
            console.log('Success retrieving specific document from DB.');
            res.json({data: data});
        }
    })

})


//update
app.put('/product', function (req, res){
    console.log(req.body);
    Product.findByIdAndUpdate({_id:req.body._id}, {$set: {title: req.body.title, price: req.body.price, img_url: req.body.img_url}}, function(err, data){
        if(err){
            console.log("Error updating specific document in DB.");
            res.json({error: err});
        } else {
            console.log("Success updating specific document in DB.");
            res.json({data:data})
        }
    })
})

//delete
app.delete('/product/:id', function (req, res){
    Product.findOneAndDelete({_id:req.params.id}, function (err){
        if(err){
            res.json({error:err});
        } else {
            res.json({status: "Success deleting the object"});
        }
    })
})


//create a rating/comment and push it into the existing cake object
// app.post('/cake/rating/:id', function (req, res) {
//     var commentInstance = new Comment (req.body);
//     commentInstance.save(function (err){
//         if(err){
//             console.log("Error saving subinstance.");
//             res.json({error:err});
//         } else {
//             Cake.findOneAndUpdate({_id:req.params.id}, {$push: {comment:{comment_content: commentInstance.comment_content, rating:commentInstance.rating}}},function (err, data){
//                 if(err){
//                     res.json({error:err})
//                 } else {
//                     console.log('Success updating document with subinstance.');
//                     res.json({status:"Success updating cake with new comment"});
//                 }
        
//             })
//         }
//     })
// })


//if none of the routes match the ones in this file, use angular's routes
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
})


app.listen(8000, function () {
    console.log("listening on port 8000");
})