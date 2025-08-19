const express = require('express');

const db = require('./db.js')
const apiRouter = express.Router();
const minionRouter = require("./routers/minions.js");
const ideaRouter = require("./routers/ideas.js");
const meetingsRouter = require('./routers/meetings.js');
apiRouter.use("/minions", minionRouter);
apiRouter.use("/ideas", ideaRouter);
apiRouter.use("/meetings", meetingsRouter);
module.exports = apiRouter;
