const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/collections', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  path: String,
  coll: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

const collectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  path: String
});

const Collection = mongoose.model('Collection', collectionSchema);

const fs = require('fs')



function deleteFile(path) {
  let file = '../front-end/public' + path;
  fs.unlink(file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/collections', async (req, res) => {
  const collection = new Collection({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await collection.save();
    res.send(collection);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/collections', async (req, res) => {
  try {
    let collections = await Collection.find();
    res.send(collections);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a list of all of the items in the museum.
app.get('/api/collection/:id', async (req, res) => {
  try {
    let collection = await Collection.findOne({
      _id: req.params.id
    });
    res.send(collection);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/collections/:id', async (req, res) => {
  try {
    let collection = await Collection.findOne({
      _id: req.params.id
    });
    await Collection.deleteOne(collection);
    deleteFile(collection?.path);

    let items = await Item.find({
      coll: req.params.id
    });
    if (items.length > 0){
      await Item.deleteMany({
        coll: req.params.id
      });
      items.forEach(item => {
        deleteFile(item.path);
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/collections/:id', async (req, res) => {
  try {
    let collection = await Collection.findOne({
      _id: req.params.id
    });
    collection.title = req.body.title;
    collection.description = req.body.description;

    await collection.save();
    res.send(collection);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/items/:collection', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
    coll: req.params.collection
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items/:collection', async (req, res) => {
  try {
    let items = await Item.find({
      coll: req.params.collection
    });
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/item/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    await Item.deleteOne(item);
    deleteFile(item?.path);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;

    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
