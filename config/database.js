import mongoose from "mongoose";


//This will connect to the cloud MongoDB and create a test database.
mongoose.connect(
  //  "mongodb+srv://ca2:cesar240585@cluster0-rgr3r.mongodb.net/test?retryWrites=true&w=majority",


  "mongodb+srv://test:ccttestuser@cluster0-rgr3r.mongodb.net/test?retryWrites=true&w=majority",
    { 
      useNewUrlParser: true
    }
  );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'You are not connected, there is an error:'));
db.once('open', function() {
  // we're connected!
  console.log("Congrats, you are connected to MongoDB database")
});

module.exports = db;