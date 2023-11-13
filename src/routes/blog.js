"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/blog:

// const { isLogin } = require('../middlewares/permissions')
const blog = require('../controllers/blog')

// URL: /blogs

// router.use(isLogin)

router.route('/')
    .get(blog.list)
    .post(blog.create)

router.route('/:id')
    .get(blog.read)
    .put(blog.update)
    .patch(blog.update)
    .delete(blog.delete)


/* ------------------------------------------------------- */
module.exports = router