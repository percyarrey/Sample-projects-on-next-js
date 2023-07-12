const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const reqdata  = req.body;

        fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) throw err;
            const json = JSON.parse(data);

            const newData = {
                "id": uuidv4(),
                "text":reqdata,
            };
            json.push(newData);
            res.status(200).json(json);

        fs.writeFile('./data/todos.json', JSON.stringify(json), (err) => {
            if (err) throw err;
        });
        });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}