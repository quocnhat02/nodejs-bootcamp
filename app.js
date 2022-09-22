const express = require('express');

const app = express();

let { people } = require('./data');

// status assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({
    success: true,
    data: people,
  });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }
  return res.status(201).json({ success: true, person: name });
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  return res.status(401).send('Please provide credentials');
});

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(id, name);
  res.send('Hello World');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
