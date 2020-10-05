const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.is4kq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000

const ObjectId = require('mongodb').ObjectId;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventCollection = client.db("volunteerNetworkDB").collection("events");
    // console.log('Database connected successfully!!');

    // app.get('/', (req, res) => {
    //     res.send('Volunteer network server is ready', err)
    // })

    // read event
    app.get("/readAllEvents", (req, res) => {
        eventCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })


    // insert user registered events
    // app.post("/registeredEvent", (req, res) => {
    //     const selectedEvent = req.body;
    //     console.log(selectedEvent);
    //     res.send(req.body)
    // })


    // create single event from fakeData
    // app.post("/addEvent", (req, res) => {
    //     const event = req.body;
    //     eventCollection.insertOne(event[0])
    //         .then(result => {
    //             console.log(result.insertedCount);
    //             res.send(result.insertedCount)
    //         })
    // })


    // create bulk event from fakeData
    // app.post("/addEvents", (req, res) => {
    //     const event = req.body;
    //     eventCollection.insertMany(event)
    //         .then(result => {
    //             console.log(result.insertedCount);
    //             res.send(result.insertedCount)
    //         })
    // })



    // read single event
    // app.get("/readAllEvents/:_id", (req, res) => {
    //     eventCollection.find({ _id: ObjectId(req.params._id) })
    //         .toArray((err, documents) => {
    //             res.send(documents[0])
    //         })
    // })


});




app.listen(process.env.PORT || port)