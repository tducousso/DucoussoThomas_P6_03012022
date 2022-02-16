//On importe ce dont nous avons besoin.

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const checkPassword = require("../middleware/check-password")
const checkEmail = require("../middleware/check-email")

//On créer nos routes post.

router.post('/signup', checkEmail, checkPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

/*********************************************************************************/
//On exporte note router.

module.exports = router;