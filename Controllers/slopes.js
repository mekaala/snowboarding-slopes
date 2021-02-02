const express = require('express')
const Slope = require('../models/slopes.js')
const slopeRouter = express.Router()

// ===============
// GET SLOPE INDEX
// ===============

slopeRouter.get('/', (req, res) => {
    Slope.find().then(slopes => {
        res.json(slopes)
    })
})

// ================
// GET SINGLE SLOPE
// ================

slopeRouter.get('/:slopeId', (req, res) => {
    Slope.findById(req.params.slopeId).then(slope => {
        res.json(slope)
    })
})

// ================
// CREATE NEW SLOPE
// ================

slopeRouter.post('/', (req, res) => {
    Slope.create(req.body).then(() => {
        res.status(200).end();
    })
})

// ==========
// EDIT SLOPE
// ==========

slopeRouter.put('/:slopeId', (req, res) => {
    Slope.findByIdAndUpdate(req.params.slopeId, req.body).then(() => {
        res.status(200).end();
    })
})

// ============
// DELETE SLOPE
// ============

slopeRouter.delete('/:slopeId', (req, res) => {
    Slope.findByIdAndRemove(req.params.slopeId).then(() => {
        Slope.find({name: req.params.name}).then(() => {
            res.status(200).end();
        });
    });
});

module.exports = {
    slopeRouter
}
