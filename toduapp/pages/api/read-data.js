const fs = require('fs');

export default function handler(req, res) {
  if (req.method === 'POST') {
    fs.readFile('./data/todos.json',  (err,data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(JSON.parse(data));
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}