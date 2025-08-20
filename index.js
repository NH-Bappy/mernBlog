const { app } = require('./src/app');
const { connectDB } = require("./src/database/db")
const port = process.env.PORT;










connectDB().then(() => {
    app.listen(port || 5000, () => {
        console.log(`server running on http://localhost:${port}`);
    });
}).catch((err)=> {
    console.log("error from index.js / database connection error",err)
})


















