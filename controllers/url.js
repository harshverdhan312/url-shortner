const shorted = require("shortid")
const url = require("../models/url")


async function handleGenerateShortUrl(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).send("URL cannot be empty")
    const shortID = shorted()
    await url.create({
        shortId: shortID,
        redirectURL:req.body.url,
        visitHistory:[],
    });

    return res.json({id: shortID})
}



module.exports = {handleGenerateShortUrl}