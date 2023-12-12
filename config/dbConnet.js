const mongoose = require('mongoose');

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('db connected successfully.');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

dbConnect()