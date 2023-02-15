import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Item } from './model/itemModel';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.set('strictQuery', true);
mongoose
  .connect(
      'mongodb://gireesh:gireesh123@167.235.135.56:31120/task',
  )
  .then(() => {
    console.log('successfully connected to items collection')
  })
  .catch((e) => console.log(e))

app.post('/api/v1/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    const result = await item.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get('/api/v1/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).send({message:'Item not found'});
      return;
    }
    res.status(200).send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.put('/api/v1/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).send({message:'Item not found'});
      return;
    }
    Object.assign(item, req.body);
    const result = await item.save();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.delete('/api/v1/items/:id', async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id });
    res.status(204).send({message:'Item Deleted Successfully',result});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get('/api/v1/items', async (req, res) => {
    try {
      const result = await Item.find();
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

app.listen(3000, () => {
  console.log('Server started ❤️ on port 3000');
});


module.exports = app;