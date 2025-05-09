import { Thought } from '../models/index.js';
/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Thought based on id /thought/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const student = await Thought.findById(thoughtId);
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({
                message: 'Volunteer not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
* POST Thought /thoughts
* @param object username
* @returns a single Thought object
*/
export const createThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({
            thoughtText,
            username
        });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE Thought based on id /thoughts/:id
* @param string id
* @returns string
*/
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({
                message: 'No thought with that ID'
            });
        }
        else {
            res.json({ message: 'Thought deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
