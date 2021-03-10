import { schema } from 'normalizr';
// Define a users schema
const userSchema = new schema.Entity('users', {}, { idAttribute: 'id' });

// ratings schema
const ratingSchema = new schema.Entity('ratings', { createdBy: userSchema }, { idAttribute: 'id' });

const replySchema = new schema.Entity(
    'reply',
    {
        createdBy: userSchema
    },
    { idAttribute: 'id' }
);

// Define your comments schema
const commentSchema = new schema.Entity(
    'comments',
    {
        createdBy: userSchema,
        listComments: [replySchema]
    },
    { idAttribute: 'id' }
);

export { userSchema, commentSchema, ratingSchema, replySchema };
