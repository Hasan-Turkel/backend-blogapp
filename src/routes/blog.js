"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/blog:

const { isLogin } = require('../middlewares/permissions')
const blog = require('../controllers/blog')

// URL: /blogs


router.route('/')
    .get(blog.list)
    .post(isLogin,blog.create)

router.route('/:id')
    .get(isLogin, blog.read)
    .put(isLogin, blog.update)
    .patch(isLogin, blog.update)
    .delete(isLogin, blog.delete)


/* ------------------------------------------------------- */
module.exports = router