const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (req, res, next) => {

  User.getUserByUsername(req.body.username, (err, user, next) => {
    if (user) {
      return res.json({ success: false, msg: 'Usuário já cadastrado' });
    }
    else {
      User.getUserByEmail(req.body.email, (err, email, next) => {
        if (email) {
          return res.json({ success: false, msg: 'Email já cadastrado' });
        }
        else {
          let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
          });
          User.addUser(newUser, (err, user) => {
            if (err)
              return res.json({ success: false, msg: 'Falha ao cadastrar usuário' });
            else
              return res.json({ success: true, msg: 'Cadastrado com sucesso. Conexão permitida' });
          });
        }
      });
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err)
      throw err;
    if (!user)
      return res.json({ success: false, msg: 'Usuário não encontrado' });

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err)
        throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Senha inválida' });
      }
    });
  });
});

// User Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;