import { Router } from 'express';
import User from '../models/User.js';

module.exports = Router()
  .post('/api/users', async (req, res) => {
    try {
      const user = await User.insert(req.body);
      res.send(user);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  
  .get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.send(user);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  
  .put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.update(req.body);
      res.send(user);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  
  .delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.delete(req.params.id);
      res.send(user);
    }
    catch(err) {
      res.status(500).send(err);
    }
  });
