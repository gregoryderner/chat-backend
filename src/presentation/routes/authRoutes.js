const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/storePublicKey', AuthController.storePublicKey);
router.get('/publicKey/:userId', AuthController.getPublicKey); // New endpoint

module.exports = router;