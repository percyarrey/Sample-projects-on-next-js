const fs = require('fs');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const reqdata  = req.body;

        fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) throw err;
            var json = JSON.parse(data);
            const filteredData =json.filter(item=> item.id !==reqdata)
            res.status(200).json(filteredData);

        fs.writeFile('./data/todos.json', JSON.stringify(filteredData), (err) => {
            if (err) throw err;
        });
        });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}