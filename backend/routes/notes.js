const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();


//Route 1: get all the notes using : get "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const note = await Note.find({ user: req.user.id });

        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.state(500).send("some error occured");
    }

})


//Route 2: add a notes using : get "/api/notes/addnotes" login required
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 1 })


], async (req, res) => {

    try {


        const { title, description, tag } = req.body;

        // if there are errors , return bad request and the errors

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });


        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()





        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.state(500).send("some error occured");
    }
})


//Route 3: update notes using : get "/api/notes/updaten " login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {


        const { title, description, tag } = req.body;

        //Create a newNote object

        const newNote = {};

        if (title) {
            newNote.title = title
        };

        if (description) {
            newNote.description = description
        };
        if (tag) {
            newNote.tag = tag
        };

        //Find the note to be updated and update it

        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send("not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.state(500).send("some error occured");
    }

})







//Route 3: delete notes using : get "/api/notes/delete " login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {


       

        //Find the note to be updated and deleted it

        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send("not found")
        }


        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.state(500).send("some error occured");
    }

})







module.exports = router