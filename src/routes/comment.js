"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/comment:

// const { isAdmin } = require('../middlewares/permissions')
const comment = require('../controllers/comment')

// URL: /comments

// router.use(isAdmin)

router.route('/')
    .get(comment.list)
    .post(comment.create)

router.route('/:id')
    .get(comment.read)
    .put(comment.update)
    .patch(comment.update)
    .delete(comment.delete)

/* ------------------------------------------------------- */
module.exports = router