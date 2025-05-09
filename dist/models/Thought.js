import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
            return createdAt.toLocaleDateString();
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
