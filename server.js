const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const db = {
  users: [
    {
      id: '1',
      name: 'John',
      email: 'john@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '2',
      name: 'Jane',
      email: 'jane@email.com',
      password: 'brownies',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(db.users);
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json('successful login');
  }
  res.status(400).json('error logging in');
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db.users.push({
    id: 3,
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.json(db.users[db.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.status(200).json({ msg: `new entries are: ${user.entries}` });
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
