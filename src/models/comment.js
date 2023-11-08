"use strict"

const { mongoose } = require('../configs/dbConnection')

// Comment Model:

const CommentSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }, 

    content: {
        type: String,
        required: true,
    }, 

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },

}, { collection: 'comments', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
CommentSchema.pre('init', function(data) {
    data.id = data._id
    data.time_stamp = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Comment', CommentSchema)