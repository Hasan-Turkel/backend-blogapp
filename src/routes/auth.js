"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const auth = require('../controllers/auth')

// URL: /auth

router.post('/login', auth.login) // SimpleToken
router.get('/logout', auth.logout) // SimpleToken Logout
router.post('/logout', auth.logout) // SimpleToken Logout

/* ------------------------------------------------------- */
module.exports = router