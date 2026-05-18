const Class = require('../models/class.model');

async function getClassList() {
    return await Class.find({});
}

module.exports = { getClassList };