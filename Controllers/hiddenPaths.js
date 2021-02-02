const express = require('express')
const HiddenPath = require('../models/hiddenPaths.js')
const hiddenPathRouter = express.Router()

// =====================
// GET HIDDEN PATH INDEX
// =====================

hiddenPathRouter.get('/', (req, res) => {
    HiddenPath.find().then(hiddenPaths => {
        res.json(hiddenPaths)
    })
})

// ======================
// GET SINGLE HIDDEN PATH
// ======================

hiddenPathRouter.get('/:hiddenPathId', (req, res) => {
    HiddenPath.findById(req.params.hiddenPathId).then(hiddenPath => {
        res.json(hiddenPath)
    })
})

// ======================
// CREATE NEW HIDDEN PATH
// ======================

hiddenPathRouter.post('/', (req, res) => {
    HiddenPath.create(req.body).then(() => {
        res.status(200).end();
    })
})

// ================
// EDIT HIDDEN PATH
// ================

hiddenPathRouter.put('/:hiddenPathId', (req, res) => {
    HiddenPath.findByIdAndUpdate(req.params.hiddenPathId, req.body).then(() => {
        res.status(200).end();
    })
})

// ==================
// DELETE HIDDEN PATH
// ==================

hiddenPathRouter.delete('/:hiddenPathId', (req, res) => {
    HiddenPath.findByIdAndRemove(req.params.hiddenPathId).then(() => {
        HiddenPath.find({name: req.params.name}).then(() => {
            res.status(200).end();
        });
    });
});

module.exports = {
    hiddenPathRouter
}