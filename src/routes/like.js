"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/like:

const { isAdmin, isLogin } = require('../middlewares/permissions')
const like = require('../controllers/like')

// URL: /tokens

router.use(isLogin)

router.route('/')
    .get(isAdmin, like.list)
    .post(isAdmin, like.create)

router.route('/:id')
    .post(like.createOrDelete)
    .get(isAdmin, like.read)
    .put(isAdmin, like.update)
    .patch(isAdmin, like.update)
    .delete(isAdmin, like.delete)

/* ------------------------------------------------------- */
module.exports = router