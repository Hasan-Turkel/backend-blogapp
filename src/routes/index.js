"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

auth:
router.use('/auth', require('./auth'))
// call user.create for /account/register:
// const { create: userCreate } = require('../controllers/user')
// router.post('/account/register', userCreate)

// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))
// comment:
router.use('/comments', require('./comment'))
// like:
router.use('/likes', require('./like'))
// category:
router.use('/categorys', require('./category'))
// blog:
router.use('/blogs', require('./blog'))


// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router