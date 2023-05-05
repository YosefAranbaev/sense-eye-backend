const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        orgName: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    { collection: 'users' }
);

const User = model('User', userSchema);

module.exports = User;
