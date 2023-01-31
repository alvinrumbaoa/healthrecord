const mongoose = require("mongoose");

mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection established to database"))
    .catch(err => console.log("Error connecting to database", err))
	mongoose.set('strictQuery', true);