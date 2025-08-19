const checkMillionDollarIdea = (req, res, next) => {
    let weeks = Number(req.body.numWeeks);
    let revenue = Number(req.body.weeklyRevenue);
    let totalRevenue = weeks * revenue
    if (totalRevenue && totalRevenue >= 1000000) {
        next()
    } else {
        res.status(400).send()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
