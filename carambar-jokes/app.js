const express = require('express');
const { Joke } = require('./database').default;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ajouter une blague
app.post('/blagues', async (req, res) => {
  try {
    const joke = await Joke.create({ content: req.body.content });
    res.status(201).json(joke);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// consulter toutes les blagues
app.get('/blagues', async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// consulter une blague spécifique (grace de l'id)
app.get('/blagues/:id', async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json({ error: "La blague n'a pas été trouvée" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 
// consulter une blague aléatoire
app.get('/blagues/random', async (req, res) => {
  try {
    const Joke = await Joke.findAll({ order: sequelize.random() });     // <-- récupere toutes les blagues
    const randomIndex = Math.floor(Math.random() * jokes.length);      // <-- génère un index aléatoire
    const randomJoke = jokes[randomIndex];                            // <-- sélectionne un id aléatoire
    res.json(randomJoke);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
