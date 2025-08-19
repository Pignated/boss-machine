const express = require("express");
const db = require("../db.js")

const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase("meetings"))
})
meetingsRouter.post("/", (req, res, next) => {
    let meeting = db.createMeeting()
    db.addToDatabase("meetings", meeting);
    res.status(201).send(meeting);
})
meetingsRouter.delete("/", (req, res, next) => {

    db.deleteAllFromDatabase("meetings");
    res.status(204).send();
})

module.exports = meetingsRouter