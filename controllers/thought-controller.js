const { Thought, User } = require('../models');

const thoughtController = {
    // ======================= reaction routes =======================
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(reactionData => {
                if(!reactionData) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(reactionData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(reactionData => res.json(reactionData))
        .catch(err => res.status(400).json(err));
    },
    // ======================= thought routes =======================
    getAllThoughts(req, res) {
        Thought.find({})
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v') 
            .then(data => {
                console.log(data);
                if(!data) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(data => {
                if(!data) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }) 
            .then(data => {
                if(!data) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body,
            { new: true, runValidators: true}
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

module.exports = thoughtController;