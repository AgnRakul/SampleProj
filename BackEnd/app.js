const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const app = express();
const port = 1998;
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


app.get('/', (req, res) => {
    res.send("The Request Page Not Found")
})
app.get('/insert', (req, res) => {

    let name = req.query.name
    let MyInsertData = {
        'Name': name
    }

    async function createListing(client, newListing, response) {
        const result = await client
            .db("Text")
            .collection("Box")
            .insertOne(newListing); // MongoDB Function

        if (result.acknowledged === true) {
            res.send(
                "<script>alert('Your Data Inserted ');</script>"
            );   // window.location.href = page redircetor
        } else {
            console.log("Data Not Inserted");
            response.json({ status: false });
        }
    }

    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);

        try {
            await client.connect();
            const pen = await createListing(client, MyInsertData, res);
        } catch (e) {
            console.log("test");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

})


app.listen(process.env.PORT || port);




