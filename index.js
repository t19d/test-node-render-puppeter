const express = require('express');
const generatePdf = require('./generatePdf');
const app = express();

const PORT = process.env.PORT || 4321;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/test', async (req, res) => {
    const pdf = await generatePdf.generatePdf(res);
});