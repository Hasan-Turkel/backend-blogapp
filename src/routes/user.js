"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const { isLogin, isAdmin } = require('../middlewares/permissions')
const user = require('../controllers/user')

// URL: /users

router.use(isLogin)

router.route('/')
    .get(isAdmin, user.list)
    .post(isAdmin, user.create)

router.route('/:id')
    .get(isAdmin, user.read)
    .put(isAdmin, user.update)
    .patch(isAdmin, user.update)
    .delete(isAdmin, user.delete)

/* ------------------------------------------------------- */
module.exports = router