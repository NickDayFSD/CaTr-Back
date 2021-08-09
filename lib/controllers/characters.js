import { Router } from 'express';
import Character from '../models/Character.js';

module.exports = Router()
  .post('/api/characters', async (req, res) => {
    try {
      const character = await Character.insert(req.body);
      res.send(character);
    }
    catch (err) {
      res.status(500).send(err);
    }
  })
  
  .get('/api/characters/:id', async (req, res) => {
    try {
      const character = await Character.findById(req.params.id);
      res.send(character);
    }
    catch (err) {
      res.status(500).send(err);
    }
  })
  
  .put('/api/characters/:id', async (req, res) => {
    try {
      const character = await Character.update(req.body);
      res.send(character);
    }
    catch (err) {
      res.status(500).send(err);
    }
  })
  
  .delete('/api/characters/:id', async (req, res) => {
    try {
      const character = await Character.delete(req.params.id);
      res.send(character);
    }
    catch (err) {
      res.status(500).send(err);
    }
  })
  
  .get('/api/characters', async (req, res) => {
    try {
      const character = await Character.findAll();
      res.send(character);
    }
    catch (err) {
      res.status(500).send(err);
    }
  });
