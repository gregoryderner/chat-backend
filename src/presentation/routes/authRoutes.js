const express = require('express');
const requestLogger = require('../middlewares/requestLogger');

const createAuthRoutes = (authController) => {
  const router = express.Router();

  router.use(requestLogger);

  // Rota para registrar um novo usuário
  router.post('/register', authController.register.bind(authController));

  // Rota para login de usuário
  router.post('/login', authController.login.bind(authController));

  // Rota para armazenar a chave pública de um usuário
  router.post('/storePublicKey', authController.storePublicKey.bind(authController));

  // Rota para obter a chave pública de um usuário pelo ID
  router.get('/publicKey/:userId', authController.getPublicKey.bind(authController));

  return router;
};

module.exports = createAuthRoutes;
