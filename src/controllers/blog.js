"use strict";

const Blog = require("../models/blog");
const User = require("../models/user");
const Category = require("../models/category");

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

    if (req.query.author) {
      req.query.author = req.user._id;
      let filters = { author: req.user.username };
      const data = await res.getModelList(Blog, filters);

      // FOR REACT PROJECT:
      res.status(200).send(data);
    } else {
      let filters = { status: "p" }
      const data = await res.getModelList(Blog, filters);

      // FOR REACT PROJECT:
      res.status(200).send(data);
    }
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

    req.body.author = req.user.username;

    const categoryData = await Category.findOne({
      _id: req.body.category,
    });

    req.body.category_name = categoryData.name;

    const data = await Blog.create(req.body);

    // FOR REACT PROJECT:
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */

    const blogView = await Blog.updateOne(
      { _id: req.params.id },
      { $inc: { post_views: +1 } }
    );

    const data = await Blog.findOne({ _id: req.params.id });

    // FOR REACT PROJECT:
    res.status(200).send(data);

    // res.status(200).send({
    //   error: false,
    //   data,
    // });
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
    const filters = req.user?.is_superadmin
      ? { _id: req.params.id }
      : { _id: req.params.id, author: req.user.username };
    const data = await Blog.updateOne(filters, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Blog.findOne(filters),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */

    const filters = req.user?.is_superadmin
      ? { _id: req.params.id }
      : { _id: req.params.id, author: req.user.username };
    const data = await Blog.deleteOne(filters);

    // console.log(filters);

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
