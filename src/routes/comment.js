"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/comment:

const { isAdmin, isLogin } = require('../middlewares/permissions')
const comment = require('../controllers/comment')

// URL: /comments

// router.use(isAdmin)

router.route('/')
    .get(comment.list)
    .post(isLogin, comment.create)

router.route('/:id')
    .get(isAdmin, comment.read)
    .put(isAdmin, comment.update)
    .patch(isAdmin, comment.update)
    .delete(isAdmin, comment.delete)

/* ------------------------------------------------------- */
module.exports = router