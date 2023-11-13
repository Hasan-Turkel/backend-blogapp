"use strict";

// Like Controller:

const Like = require("../models/like");
const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.ignore = true
        */

    const data = await res.getModelList(Like);

    // res.status(200).send({
    //     error: false,
    //     details: await res.getModelListDetails(Like),
    //     data
    // })

    // FOR REACT PROJECT:
    res.status(200).send(data);
  },

  create: async (req, res) => {
    /*
            #swagger.ignore = true
        */

    const data = await Like.create(req.body);

    const likes = await Like.find({ post_id: req.body.post_id });
      const blogLikeUpdate = await Blog.updateOne({ _id: req.params.post_id }, { likes_n: likes });
      const blogLikesCountUpdate = await Blog.updateOne({ _id: req.params.post_id }, { $inc: { likes: +1 } });

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.ignore = true
        */

    const data = await Like.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.ignore = true
        */

    const data = await Like.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    const likes = await Like.find({ post_id: req.body.post_id });
    const blogLikeUpdate = await Blog.updateOne({ _id: req.params.post_id }, { likes_n: likes });
     

    res.status(202).send({
      error: false,
      data,
      new: await Like.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.ignore = true
        */
    const like = await Like.findOne({ _id: req.params.id });

    const data = await Like.deleteOne({ _id: req.params.id });

    const likes = await Like.find({ post_id: like.post_id});
    const blogCommentUpdate = await Blog.updateOne({ _id: like.post_id}, {likes_n: likes });
    const blogCommentCountUpdate = await Blog.updateOne({ _id: like.post_id}, { $inc: { likes: -1 } })

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
  createOrDelete: async (req, res) => {
    /*
            #swagger.ignore = true
        */

    const like = await Like.findOne({
      post_id: req.params.id,
      user_id: req.user._id,
    });

    if (!like) {
      req.body.user_id = req.user._id;
      req.body.post_id = req.params.id;

      const data = await Like.create(req.body);

      const likes = await Like.find({ post_id: req.params.id });
      const blogLikeUpdate = await Blog.updateOne(
        { _id: req.params.id },
        { likes_n: likes }
      );
      const blogLikesCountUpdate = await Blog.updateOne(
        { _id: req.params.id },
        { $inc: { likes: +1 } }
      );

      res.status(201).send({
        error: false,
        data,
      });
    } else {

      const data = await Like.deleteOne({ post_id: req.params.id, user_id:req.user._id });

      const likes = await Like.find({ post_id: req.params.id});
      const blogCommentUpdate = await Blog.updateOne({ _id: req.params.id}, {likes_n: likes });
      const blogCommentCountUpdate = await Blog.updateOne({ _id: req.params.id }, { $inc: { likes: -1 } }
      );

      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data,
      });
    }
  },
};
