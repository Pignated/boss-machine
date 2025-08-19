const express = require('express');
const db = require('../db.js')

const minionRouter = express.Router();
minionRouter.param("minionId", (req, res, next, id) => {
    let minion = db.getFromDatabaseById("minions", id)
    if (minion) {
        req.minion = minion;
        req.minionId = id;
        next()
    } else {
        res.status(404).send("No minion with that ID number exists")
    }
})
minionRouter.param("workId", (req, res, next, id) => {
    let work = db.getFromDatabaseById("work", id);
    if (work) {
        req.work = work;
        req.workId = id;
        if (work.minionId == req.minionId){
            next()
        } else {
            res.status(400).send("Work id does not exist under this minion")
        }
    } else {
        res.status(404).send();
    }
})
minionRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase("minions"))
})
minionRouter.post("/", (req, res, next) => {
    db.addToDatabase("minions", req.body)
    res.status(201).send(req.body)
})
minionRouter.get("/:minionId", (req,res, next) => {
    res.send(req.minion)
})
minionRouter.put("/:minionId", (req, res, next) => {
    db.updateInstanceInDatabase("minions", req.body)
    res.status(201).send(req.body)
})
minionRouter.delete("/:minionId", (req, res, next) => {
    db.deleteFromDatabasebyId("minions",req.minionId)
    res.status(204).send(`Minion with id ${req.minionId} was deleted`)
})
minionRouter.get("/:minionId/work", (req, res, next) => {
    let work =db.getAllFromDatabase("work")
    let minionWork = work.filter((work) => work.minionId === req.minionId)
    res.send(minionWork)
})
minionRouter.post("/:minionId/work", (req, res, next) => {
    db.addToDatabase("work",req.body);
    res.status(201).send(req.body)
})
minionRouter.put("/:minionId/work/:workId", (req, res, next) => {
    db.updateInstanceInDatabase("work", req.body);
    res.status(201).send(req.body)
})
minionRouter.delete("/:minionId/work/:workId", (req, res, next) => {
    db.deleteFromDatabasebyId("work",req.workId);
    res.status(204).send()
})
module.exports = minionRouter