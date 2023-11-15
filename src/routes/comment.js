"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/comment:

const { isAdmin, isLogin } = require('../middlewares/permissions')
const comment = require('../controllers/comment')

// URL: /comments


router.route('/')
    .get(isAdmin, comment.list)
    
router.route('/:id')
    .post(isLogin, comment.create)
    .get(isAdmin, comment.read)
    .put(isAdmin, comment.update)
    .patch(isAdmin, comment.update)
    .delete(isAdmin, comment.delete)

/* ------------------------------------------------------- */
module.exports = router