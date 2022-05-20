let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config(); 
let port = 4755;
const mongoLiveUrl = "mongodb+srv://Sagarbehera:Sagar456@cluster0.96hmj.mongodb.net/ZomatoData?retryWrites=true&w=majority";
const mongoUrl = "mongodb://localhost:27017";
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("Let's Express")
})

MongoClient.connect(mongoUrl, (err, client) => {
    if(err) console.log(`Error While Connecting`);
    db = client.db('ZomatoData');
    app.listen(port,() => {
        console.log(`server is running on port ${port}`)
    })
})

app.get('/zomatocity', (req,res) => {
    let query = {};
    let id = req.query.id;
    console.log(`id is ${id}`);
    db.collection('zomatoCity').find(query).toArray((err,result) => {
       if(err) throw err;
       res.send(result);
 })
})
app.get('/zomatoDetails', (req,res) => {
    let query = {};
    let stateId = Number(req.query.state_id);
    let mealId = Number(req.query.mealtype_id);
    let restaurantId = Number(req.query.restaurant_id);
    if(stateId){
        query = {state_id:stateId};
    }else if(mealId){
        query = {'mealTypes.mealtype_id':mealId};
    }else if(restaurantId){
        query = {restaurant_id:restaurantId}
    }
    db.collection('zomatoDetails').find(query).toArray((err,result) => {
       if(err) throw err;
       res.send(result);
 })
})

app.get('/zomatodetails2', (req,res) => {
    let query = {};
    let stateId = Number(req.query.state_id);
    let mealId = Number(req.query.mealtype_id);
    let restaurantId = Number(req.query.restaurant_id);
    if(stateId){
        query = {state_id:stateId};
    }else if(mealId){
        query = {'mealTypes.mealtype_id':mealId};
    }else if(restaurantId){
        query = {restaurant_id:restaurantId}
    }
    db.collection('zomatodetails2').find(query).toArray((err,result) => {
       if(err) throw err;
       res.send(result);
 })
})

app.get('/zomatoresaurantsmenu', (req,res) => {
    let query = {};
    let stateId = Number(req.query.state_id);
    if(stateId){
        query = {state_id:stateId};
    }
    db.collection('zomatoresaurantsmenu').find(query).toArray((err,result) => {
       if(err) throw err;
       res.send(result);
 })
})

app.get('/zomatofood', (req,res) => {
    let query = {};
    let mealId = Number(req.query.mealtype_id);
    if(mealId){
        query = {mealtype_id:mealId};
    }
    db.collection('zomatofood').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/zomatoresaurants', (req,res) => {
    let query = {};
    let stateId =  Number(req.query.state_id);
    let mealTypeId = Number(req.query.mealtype_id);
    if(stateId){
        query ={state_id:stateId}
    }
    if(mealTypeId){
        query = {mealtype_id:mealTypeId}
    }
    db.collection('zomatoresaurants').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})


// bank update

app.put('/bankUpdate/:id', (req,res) => {
    let oId = mongo.ObjectId(req.params.id);
    db.collection('orders').updateOne(
        {_id:oId},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bankName
            }},(err,result) => {
            if(err) throw err;
           res.send(`status updated to ${req.body.status}`)
        })
})


app.post('/placeOrder', (req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('orderPlaced')
    })
})



    