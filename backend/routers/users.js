const express = require('express');
const router  = express.Router()
const userController = require('../controllers/userController.js');
const topUsers = router.route('/users').get(userController.topUsers);
const topLatestPosts = router.route('/posts').get(userController.topLatestPosts)
module.exports = router;