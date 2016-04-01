var express = require('express');
var router = express.Router();
 
var AuthController = require('../controllers/AuthController.js');
var RoomController = require("../controllers/RoomController.js");
var MatchController = require("../controllers/MatchController.js");
var LocationController = require("../controllers/LocationController.js");
var UserController = require("../controllers/UserController.js");
var ChatController = require("../controllers/ChatController.js");

/*
 * Routes that can be accessed by any one
 */
router.post('/login', AuthController.authenticate);
router.post('/users', UserController.create);
router.get('/login/facebook', AuthController.fbAuthenticate);

/*
 * Routes that can be accessed only by autheticated users
 */

 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/users/', UserController.getAll);
router.get('/api/v1/users/:id', UserController.getById);
router.post('/api/v1/users/update/:id', UserController.update);
router.get('/api/v1/users/:id/circle', UserController.getCircleInfo);
router.delete('/api/v1/users/:id', UserController.delete);

router.get('/api/v1/locations/', LocationController.getAll);
router.get('/api/v1/locations/:id', LocationController.getById);
router.post('/api/v1/locations/', LocationController.create);
router.post('/api/v1/locations/:id', LocationController.update);
router.delete('/api/v1/locations/:id', LocationController.delete);
router.get('/api/v1/locations/search/radius', LocationController.getInRadius);

router.post('/api/v1/locations/:id/menu/', LocationController.addMenuItems);
router.delete('/api/v1/locations/:id/menu/', LocationController.deleteMenuItems);

router.get('/api/v1/matches/', MatchController.getAll);
router.get('/api/v1/matches/:id', MatchController.getById);
router.post('/api/v1/matches/:userId1/offers/:userId2', MatchController.update);
router.delete('/api/v1/matches/:id', MatchController.delete);

router.get('/api/v1/rooms/locations/:id', RoomController.getByLocationId);
router.get('/api/v1/rooms/', RoomController.getAll);
router.get('/api/v1/rooms/:id', RoomController.getById);
router.post('/api/v1/rooms/', RoomController.create);
router.post('/api/v1/rooms/:id', RoomController.update);
router.delete('/api/v1/rooms/:id', RoomController.delete);

router.post('/api/v1/rooms/members/:userId', RoomController.addMemberToRoomByLocation);
router.post('/api/v1/rooms/:id/members/:userId', RoomController.addMemberToRoom);
router.delete('/api/v1/rooms/:id/members/:userId', RoomController.removeMemberFromRoom);

router.get('/api/v1/chats/:id/messages/:chatee', ChatController.getUnreadChatMessages);
router.get('/api/v1/chats/search', ChatController.getLatestChats);
router.post('/api/v1/chats/:id/messages/:chatee/isRead', ChatController.setRead);

module.exports = router;