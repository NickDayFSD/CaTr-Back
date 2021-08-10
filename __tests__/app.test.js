import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Character from '../lib/models/Character.js';
import User from '../lib/models/User.js';

describe('User routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a new user in our database', async () => {
    const firstUser = {
      id: '1',
      email: 'dude@dude.com',
      playerName: 'Marcus',
      passwordHash: 'candyBars'
    };

    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'dude@dude.com',
        playerName: 'Marcus',
        passwordHash: 'candyBars'
      });

    expect(res.body).toEqual(firstUser);
  });
});

describe('Character routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  const firstUser = {
    id: '1',
    email: 'dude@dude.com',
    playerName: 'Marcus',
    passwordHash: 'candyBars'
  };

  it('creates a new character in our database', async () => {
    const char1 = {
      id: '1',
      characterName: 'Q-bro',
      playerId: firstUser.id,
      level: 4,
      description: 'I know everything and I\'m afraid of getting ouchies',
      backstory: 'I did things once, and I shall do things again!'
    };

    const user = await request(app)
      .post('/api/users')
      .send({
        email: 'dude@dude.com',
        playerName: 'Marcus',
        passwordHash: 'candyBars'
      });

    const res = await request(app)
      .post('/api/characters')
      .send({
        characterName: 'Q-bro',
        playerId: user.body.id,
        level: 4,
        description: 'I know everything and I\'m afraid of getting ouchies',
        backstory: 'I did things once, and I shall do things again!'
      });

    expect(res.body).toEqual(char1);
  });

  it('finds all characters in our database', async () => {
    const char2 = {
      characterName: 'A-bro',
      level: 4,
      description: 'I wear plate and take things too far',
      backstory: 'I got in trouble for taking things too far'
    };
    
    await request(app)
      .post('/api/characters')
      .send(char2);


    const res = await request(app)
      .get('/api/characters');
    
    expect(res.body).toEqual([
      {
        'backstory': 'I did things once, and I shall do things again!',
        'characterName': 'Q-bro',
        'description': 'I know everything and I\'m afraid of getting ouchies',
        'id': '1',
        'level': 4,
        'playerId': '1',
      },
      {
        'backstory': 'I got in trouble for taking things too far',
        'characterName': 'A-bro',
        'description': 'I wear plate and take things too far',
        'id': '2',
        'level': 4,
        'playerId': null,
      }
    ]);
  });

  it('gets a specific character', async () => {
    const res = await request(app)
      .get('/api/characters/2');

    expect(res.body).toEqual({
      'backstory': 'I got in trouble for taking things too far',
      'characterName': 'A-bro',
      'description': 'I wear plate and take things too far',
      'id': '2',
      'level': 4,
      'playerId': null,
    });
  });

  it('updates a character', async () => {
    const Qbro = await Character.findById(1);

    Qbro.level = 5;

    const res = await request(app)
      .put('/api/characters/1')
      .send(Qbro);

    expect(res.body).toEqual(Qbro);
  });

  it('deletes a character', async () => {
    const Abro = await Character.findById(2);

    const res = await request(app)
      .delete(`/api/characters/${Abro.id}`);

    expect(res.body).toEqual(Abro);
  });
});
