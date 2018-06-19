var noteModel = require('../models/noteModel.js');

module.exports = {

    list: function (req, res, next) {
      noteModel.find()
        .then( listNote => {
          res.status(200).json({message: 'New note created¡', listNote})
          //res.render('index', {notes: listNote, title: "Lista de notas"})
        })
        .reject(err => res.status(500).json(err));
    },

    listLike: function (req, res, next) {
      noteModel.find({ "like": true})
        .then( listNote => {
          res.render('index', {notes: listNote, title: "Lista de notas favoritas"})
        })
        .reject(err => res.status(500).json(err));
    },

    show: function (req, res, next) {
      const note = req.params.id
      noteModel.findById(note)
        .then( oneNote =>
          res.render('details', {note: oneNote}))
        .reject(err =>
          res.status(500).json({
            message: 'Error when getting note.'
          }))
        .reject( err =>
          res.status(404).json({
            message: 'No such note'
          }));
    },

    create: function (req, res, next) {
      console.log(req.body)
      const note = new noteModel({
        title  : req.body.title,
			  note   : req.body.note,
			  like   : req.body.like,
      });

      note.save()
        .then (note =>
          {res.status(201).json({message: 'New note created¡', note});
        })
        .catch(err =>
          {res.status(500).json({err:err, message: 'Cannot create note'});
        });
    },

    update: (req, res, next) => {
      const note = req.params.id
      noteModel.findById(note)
        .then( response => {
          if (response.like == true){
            response.like = false
            console.log(response)
          }else{
            response.like = true
          }
          response.save()
            .then (note =>
              {res.status(201).json({message: 'New note created¡', note});
            })
            .catch(err =>
              {res.status(500).json({err:err, message: 'Cannot create note'});
            });
        })
        .catch( err => next(err))
      }
}