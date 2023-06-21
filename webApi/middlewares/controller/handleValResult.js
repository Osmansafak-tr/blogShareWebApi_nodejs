const { validationResult } = require("express-validator");

module.exports = (req,res,next) => {
    const valResult = validationResult(req);
    if(!valResult.isEmpty())
        return res.status(500).json(valResult.array());
    return next();
}