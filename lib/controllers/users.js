import { Router } from 'express';
import User from '../models/User.js';

export default Router()
  .post('/api/users', async (req, res) => {
    try {
      const user = await User.insert(req.body);
      res.set('Access-Control-Allow-Origin', '*');
      res.send(user);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.set('Access-Control-Allow-Origin', '*');
      res.send(user);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.update(req.body);
      res.set('Access-Control-Allow-Origin', '*');
      res.send(user);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.delete(req.params.id);
      res.set('Access-Control-Allow-Origin', '*');
      res.send(user);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
