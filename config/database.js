const mongoose = require("mongoose");
const devConnectionString = "mongodb://localhost/users";
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL || devConnectionString, { useNewUrlParser: true });

// database connection event
db.on("connected", function(){
    console.log(`Connected to to: ${process.env.DATABASE_URL} at ${db.host}:${db.port}`);
});

module.exports = mongoose;