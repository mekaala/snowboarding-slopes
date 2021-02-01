const express = require('express')
const Mountain = require('../models/mountains.js')
const mountainRouter = express.Router()

// =====================
// GET MOUNTAIN INDEX
// =====================

mountainRouter.get('/', (req, res) => {
    Mountani.find().then(mountains => {
        res.json(mountans)
    })
})

// ======================
// GET SINGLE ENVIRONMENT
// ======================

mountainRouter.get('/:mountainId', (req, res) => {
    Mountain.findById(req.params.mountainId).then(mountain => {
        res.json(mountain)
    })
})

// ======================
// CREATE NEW ENVIRONMENT
// ======================

mountainRouter.post('/', (req, res) => {
    Mountain.create(req.body).then(() => {
        res.status(200).end();
    })
})

// ================
// EDIT ENVIRONMENT
// ================

mountainRouter.put('/:mountainId', (req, res) => {
    Mountain.findByIdAndUpdate(req.params.mountainId, req.body).then(() => {
        res.status(200).end();
    })
})

// ==================
// DELETE ENVIRONMENT
// ==================

mountainRouter.delete('/:mountainId', (req, res) => {
    Mountain.findByIdAndRemove(req.params.mountainId).then(() => {
        Mountain.find({name: req.params.name}).then(() => {
            res.status(200).end();
        });
    });
});

module.exports = {
  mountainRouter
}
