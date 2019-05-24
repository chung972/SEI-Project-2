const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
// the above line is what we SHOULD use. configure DATABASE_URL in the .env file;
const devConnectionString = "mongodb://localhost/users";
// TODO: remember to change the GOOGLE_CALLBACK url once you're deployed on heroku!
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL || devConnectionString, { useNewUrlParser: true });

db.on("connected", function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
// we will use our machine as the database for now, but make sure
// that you delete lines 7-11 once you're deployed online and 
// un-comment lines 2 and 18-20


// database connection event
// mongoose.connection.on('connected', function () {
//     console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
// });

module.exports = mongoose;