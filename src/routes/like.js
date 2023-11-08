"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/like:

// const { isAdmin } = require('../middlewares/permissions')
const like = require('../controllers/like')

// URL: /tokens

// router.use(isAdmin)

router.route('/')
    .get(like.list)
    .post(like.create)

router.route('/:id')
    .get(like.read)
    .put(like.update)
    .patch(like.update)
    .delete(like.delete)

/* ------------------------------------------------------- */
module.exports = router