import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './Reaction.js';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Schema.Types.Date,
    username: string,
    reactions: [typeof reactionSchema],
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: Date) => {
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
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
