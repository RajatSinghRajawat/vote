
const express = require('express');
const { addparticipants, getParticipant, deleteparticipants, updateparticipants } = require('../controllers/participant.controllar');
const userRouter = express.Router();

/**
 * /api/v1/admin/participants : POST
 */
userRouter.post('/',addparticipants);
/**
 * /api/v1/admin/get/participants : GET
 */
userRouter.get('/',getParticipant);
userRouter.put('/update/:id',updateparticipants);
userRouter.delete('/:id',deleteparticipants);


module.exports = userRouter;