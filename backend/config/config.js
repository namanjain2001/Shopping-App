const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("Connection to DB successful");
}).catch((error) => {
    console.log(error);
});