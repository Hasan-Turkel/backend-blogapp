"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

auth:
router.use('users/auth', require('./auth'))

// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))
// comment:
router.use('/api/comments', require('./comment'))
// like:
router.use('/api/likes', require('./like'))
// category:
router.use('/api/categories', require('./category'))
// blog:
router.use('/api/blogs', require('./blog'))


// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router