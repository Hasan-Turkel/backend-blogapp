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
    .post(like.create)

router.route('/:id')
    .get(isAdmin, like.read)
    .put(isAdmin, like.update)
    .patch(isAdmin, like.update)
    .delete(like.delete)

/* ------------------------------------------------------- */
module.exports = router