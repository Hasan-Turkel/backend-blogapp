"use strict"


const Blog = require('../models/blog')


module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */


        const data = await res.getModelList(Blog, filters)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Blog),
        //     data
        // })

        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Create Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "first_name": "test",
                    "last_name": "test",
                }
            }
        */


        const data = await Blog.create(req.body)

        // FOR REACT PROJECT:
        res.status(201).send({
            error: false,
            data
          
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */


        const data = await Blog.findOne(filters)

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "first_name": "test",
                    "last_name": "test",
                }
            }
        */

        const data = await Blog.updateOne(filters, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Blog.findOne(filters)
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */


        const data = await Blog.deleteOne()

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}