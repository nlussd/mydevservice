module.exports = function(app, db) {

    var ObjectID = require('mongodb').ObjectID;

    app.get('/notes/', (req, res) => {
      db.collection("notes").find({}).toArray(function(err, result) {
        if (err) throw err;
        const resJson = JSON.stringify(result);
        res.send(resJson);
        // res.send(result);
      });
    });


    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });
      });

      app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Note ' + id + ' deleted!');
          } 
        });
      });

      app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { field1: req.body.field1, field2: req.body.field2 };
        db.collection('notes').update(details, note, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
      });

    const collection = 
    app.post('/notes', (req, res) => {
      const note = { field1: req.body.field1, field2: req.body.field2 };
      db.collection('notes').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  };