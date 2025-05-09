import { Schema, Types, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    createdAt: Schema.Types.Date,
    username: string,
    reactionBody: string,
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId(),
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
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);


export default reactionSchema;
