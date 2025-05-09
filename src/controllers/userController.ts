import { Request, Response } from 'express';
import { User } from '../models/index.js';

/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /users/:id
 * @param string id
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST User /users
 * @param object user
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
/**
 * DELETE User based on id /users/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


/**
 * PUT User based on id /users/:id
 * @param string id
 * @param object user
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await
            User.findOneAndUpdate(
                { _id: userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );  
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}



/**
 * POST Assignment based on /users/:userId/assignments
 * @param string id
 * @param object assignment
 * @returns object user 
*/

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { 
                $push: {
                    friends: req.params.friendId
                }
            },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Assignment based on /users/:userId/assignments
 * @param string assignmentId
 * @param string userId
 * @returns object user 
*/

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { 
                $pull: {
                    friends: req.params.friendId
                }
            },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

