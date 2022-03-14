const { Thought, User } = require('../models'); 
const userController = {
    // ======================= friends routes =======================
     addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId }}, 
            { runValidators: true }
        )
        .then(friendData => {
            if(!friendData) {
                res.status(404).json({ message: 'User not found'});
                return;
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { runValidators: true }
        )
        .then(friendData => {
            if(!friendData) {
                res.status(404).json({ message: 'User not found'});
                return;
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId }}, 
            { runValidators: true }
        )
        .then(friendData => {
            if(!friendData) {
                res.status(404).json({ message: 'User not found'});
                return;
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { runValidators: true }
        )
        .then(friendData => {
            if(!friendData) {
                res.status(404).json({ message: 'User not found'});
                return;
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
    },
    // ======================= user routes =======================
    getAllUsers(req,res) {
        User.find({}) 
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    },
    getUserById({ params }, res) { 
        User.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(data => {
                if(!data) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                };
                res.json(data);
            })
            .catch(err => res.status(400).json(err))
    },
    createUser({ body }, res) { 
        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err))
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(data => {
                if(!data) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) { 
        User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true } 
        )
            .then(data => {
                if(!data) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
};

module.exports = userController;