"use strict"

const { mongoose } = require('../configs/dbConnection')

// Like Model:

const LikeSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      
    }, 
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
   
    }, 

    

}, { collection: 'likes', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
TokenSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Like', LikeSchema)