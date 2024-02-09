const express = require('express');
var cors = require('cors');
const openaiRoutes = require('./routes/openai');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ROUTES
app.use('/openai', openaiRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
