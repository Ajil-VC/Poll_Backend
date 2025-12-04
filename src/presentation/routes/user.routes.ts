

import express from 'express';

import { authControllerDepandancy, messageDepandancy, pollControllerDepandancy } from './dependancy/user.dependancy';
import { authenticateAdmin } from '../middleware/admin.middleware';
import { authenticateUser } from '../middleware/user.middleware';

const userRouter = express.Router();




userRouter.use(express.urlencoded({ extended: true }));

userRouter.get('/authenticate-user', authenticateUser, authControllerDepandancy.authenticateUser);

userRouter.post('/login', authControllerDepandancy.login);
userRouter.post('/signup', authControllerDepandancy.signup);

userRouter.route('/poll')
    .post(authenticateAdmin, pollControllerDepandancy.createPoll)
    .get(authenticateAdmin, pollControllerDepandancy.getPolls)
    .put(authenticateAdmin, pollControllerDepandancy.giveVote);

userRouter.get('/poll/:id', pollControllerDepandancy.getPollWithId);

userRouter.get('/message', messageDepandancy.getMessages);


export default userRouter;