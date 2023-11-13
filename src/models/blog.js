"use strict"

const { mongoose } = require('../configs/dbConnection')

// Blog Model:

const BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
     
    },
    content: {
        type: String,
        required: true,
     
    },

    image: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    author: {
        type: String,
        required: true,
       
    },
    
    status: {
        type: String,
        trim: true,
        required: true,
        enum: ['p', 'd']
    },

    comments: [],

    category_name:{
        type: String,
        required: true,
    },

    likes: { 
        type: Number,
        default:0
      
    },
    post_views: { 
        type: Number,
        default:0
    },
 
    comment_count: { 
        type: Number,
        default:0
        
    },

    likes_n: [],


}, { collection: 'blogs', timestamps: true })

/* ------------------------------------------------------- */



/* ------------------------------------------------------- */
// FOR REACT PROJECT:
BlogSchema.pre('init', function (data) {

    data.id = data._id
    data.publish_date = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Blog', BlogSchema)

