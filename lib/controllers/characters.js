import { Router } from 'express';
import Character from '../models/Character.js';

export default Router()
  .post('/api/characters', async (req, res) => {
    try {
      const character = await Character.insert(req.body);
      res.send(character);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/characters/:id', async (req, res) => {
    try {
      const character = await Character.findById(req.params.id);
      res.send(character);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .put('/api/characters/:id', async (req, res) => {
    try {
      const character = await Character.update(req.params.id, req.body);
      res.send(character);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .delete('/api/characters/:id', async (req, res) => {
    try {
      const character = await Character.delete(req.params.id);
      res.send(character);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/characters', async (req, res) => {
    try {
      const character = await Character.findAll();
      res.send(character);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
