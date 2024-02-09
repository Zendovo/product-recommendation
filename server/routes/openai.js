const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI();

router.get('/', async (req, res) => {
    const prompt = `beautiful icon for the category of ${req.query.idea.slice(0, 80)}. outline, clip art, subtle gradients, no text, one object`;
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'dall-e-2',
            prompt,
            n: 1,
            size: '256x256',
        }),
    });

    const json = await response.json();

    console.log(json);
    res.json({ json: json.data });
});

router.get('/products', async (req, res) => {
    const prompt = `recommend 3 products from the real world that fit the given product idea: ${req.query.idea.slice(0, 80)}`;
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant designed to output JSON.',
            },
            { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo-0125',
        response_format: { type: 'json_object' },
    });
    try {
        const data = completion.choices[0].message.content;
        res.json({ data: JSON.parse(data) });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return res.json({ error: 'Could not process your request! :(' });
    }
});

module.exports = router;
