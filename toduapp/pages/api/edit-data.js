const fs = require('fs');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const reqdata  = req.body;

        fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) throw err;
            var json = JSON.parse(data);
            var json = JSON.parse(data);
            json = json.map(l=>{
              if(l.id===reqdata.id){
                l.text=reqdata.data
                return l 
              }else{
                  return l
              }
            })
            res.status(200).json(json)
        fs.writeFile('./data/todos.json', JSON.stringify(json), (err) => {
            if (err) throw err;
        });
        });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}