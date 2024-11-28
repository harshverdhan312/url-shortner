const express = require('express');
const app = express();
const {connectToMongoDB} = require("./connect")
const urlRoute = require('./routes/url');
const URL = require("./models/url")
const req = require("express/lib/request");
const port = process.env.PORT || 3000;


app.use(express.json())


connectToMongoDB("mongodb://localhost:27017/url-shortner")
    .then(()=>console.log("mongodb connected"))
    .catch(err => console.log(err));


app.use("/url",urlRoute)

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: { visitHistory: { timestamp: Date.now() } }
            },
            { new: true } 
        );

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})