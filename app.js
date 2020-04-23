const express = require('express');
const bodyParser = require("body-parser");
const app = express();
// parses json data sent to us by the user 
app.use(bodyParser.json());
const path = require('path');
const Joi = require('joi');


const db = require("./db");
const collection = "tobuy";


// schema used for data validation for our tobuy document
const schema = Joi.object().keys({
    tobuy : Joi.string().required()
});


// serve static html file to user
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});


// read
app.get('/getTobuy',(req,res)=>{
    // get all Tobuy documents within our tobuy collection
    // send back to user as json
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});

// update
app.put('/:id',(req,res)=>{
    // Primary Key of Tobuy Document we wish to update
    const tobuyID = req.params.id;
    // Document used to update
    const userInput = req.body;
    // Find Document By ID and Update
    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(tobuyID)},{$set : {tobuy : userInput.tobuy}},{returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else{
            //check result later
            console.log(result);
            res.json(result);
        }      
    });
});

//create
app.post('/',(req,res,next)=>{
    const userInput = req.body;
    // Document to be inserted
    // Validate document
    // If document is invalid pass to error middleware
    // else insert document within tobuy collection
    Joi.validate(userInput,schema,(err,result)=>{
        if(err){
            const error = new Error("You need to type something...");
            error.status = 400;
            next(error);
        }
        else{

            db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("You need to type something...");
                    error.status = 400;
                    next(error);
                    
                }
                else
                    res.json({result : result, document : result.ops[0],msg : "Stuff inserted, great choice!!!",error : null});
                });
            }
        })    
    });
    
//delete
app.delete('/:id',(req,res)=>{
    // Primary Key of Tobuy Document
    const tobuyID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(tobuyID)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});

// Middleware for handling Error
// Sends Error Response Back to User
app.use((err,req,res,next)=>{
    res.status(err.status).json({
        error : {
            message : err.message
        }
    });
})

db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});



