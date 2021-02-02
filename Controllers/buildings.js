const express = require('express')
const Building = require('../Models/buildings.js')
const buildingRouter = express.Router()

// ==================
// GET BUILDING INDEX
// ==================

buildingRouter.get('/', (req, res) => {
    Building.find().then(resorts => {
        res.json(resorts)
    })
})

// =================
// GET SINGLE RESORT
// =================

buildingRouter.get('/:buildingId', (req, res) => {
    Building.findById(req.params.buildingId).then(resort => {
        res.json(resort)
    })
})

// =================
// CREATE NEW RESORT
// =================

buildingRouter.post('/', (req, res) => {
    Building.create(req.body).then(() => {
        res.status(200).end();
    })
})

// ===========
// EDIT RESORT
// ===========

buildingRouter.put('/:buildingId', (req, res) => {
    Building.findByIdAndUpdate(req.params.buildingId, req.body).then(() => {
        res.status(200).end();
    })
})

// =============
// DELETE RESORT
// =============

buildingRouter.delete('/:buildingId', (req, res) => {
    Building.findByIdAndRemove(req.params.buildingId).then(() => {
        Building.find({name: req.params.name}).then(() => {
            res.status(200).end();
        });
    });
});

module.exports = {
    buildingRouter
}