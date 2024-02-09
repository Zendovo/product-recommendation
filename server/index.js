const express = require('express');
const openaiRoutes = require('./routes/openai');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ROUTES
app.use('/openai', openaiRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
