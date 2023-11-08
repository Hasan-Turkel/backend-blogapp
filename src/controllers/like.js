"use strict"

// Like Controller:

const Like = require('../models/like')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await res.getModelList(Like)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Like),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Like.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Like.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Like.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Like.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Like.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}