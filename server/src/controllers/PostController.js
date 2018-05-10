const {
    Post,
} = require('../models');


module.exports = {
    async create(req, res) {
        try {
            (await Post.findOrCreate({
                where: {
                    title: req.body.title,
                },
                defaults: req.body,
            }));

            res.status(200).send({
                res: 'Post successfully created',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async update(req, res) {
        try {
            const postId = req.body.postId;
            delete req.body.postId;

            (await Post.update(
                req.body,
                {
                    where: {
                        id: postId,
                    },
                }));

            res.status(200).send({
                res: 'Successfully updated the post information',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async delete(req, res) {
        try {
            (await Post.destroy({
                where: {
                    id: req.body.postId,
                },
            }));


            res.status(200).send({
                res: 'Post successfully deleted',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async list_all(req, res) {
        try {
            let posts= (await Post.findAll({
                attribute: ['id', 'title', 'description', 'date', 'link', 'numViews', 'type', 'tags'],
                include: [{
                    all: true,
                }],
                order: [
                    ['id', 'DESC'],
                ],
            }));


            res.status(200).send(posts);
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async list_by_type(req, res) {
        try {
            let posts = (await Post.findAll({
                where: {
                    type: req.params.type,
                },

                attribute: ['id', 'title', 'description', 'date', 'link', 'numViews', 'type', 'tags'],
                include: [{
                    all: true,
                }],
                order: [
                    ['id', 'DESC'],
                ],
            }));


            res.status(200).send(posts);
        } catch (err) {
            res.status(401).send({
                error: 'no results found',
            });
        }
    },
};
