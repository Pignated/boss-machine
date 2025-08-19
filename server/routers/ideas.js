const express = require('express');
const db = require('../db.js');
const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');

const ideaRouter = express.Router();
ideaRouter.param("ideaId",(req,res,next,id) => {
    let idea = db.getFromDatabaseById("ideas",id)
    if(idea) {
        req.idea=idea;
        req.ideaId = id;
        next()
    } else {
        res.status(404).send("No idea with that ID number exists")
    }
})
ideaRouter.get("/",(req,res,next) => {
    res.send(db.getAllFromDatabase("ideas"))
})

ideaRouter.post("/",checkMillionDollarIdea,(req,res,next) => {
    db.addToDatabase("ideas",req.body);
    res.status(201).send(req.body);
})
ideaRouter.get("/:ideaId", (req,res,next) => {
    res.send(req.idea);
})
ideaRouter.put("/:ideaId", (req, res, next) => {
    db.updateInstanceInDatabase("ideas", req.body);
    res.status(201).send(req.body);
})
ideaRouter.delete("/:ideaId", (req, res, next) => {
    db.deleteFromDatabasebyId("ideas", req.ideaId)
    res.status(204).send(`Idea with id ${req.ideaId} was deleted`)
})

module.exports = ideaRouter