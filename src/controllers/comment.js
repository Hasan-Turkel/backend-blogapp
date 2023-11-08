"use strict"

// Comment Controller:

const Comment = require('../models/comment')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await res.getModelList(Comment)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Comment),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Comment.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Comment.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Comment.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Comment.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Comment.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}