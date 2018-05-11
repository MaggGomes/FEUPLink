const {
    Post,
    Channel,
    Person,
} = require('../models');
const jwt = require('jsonwebtoken');

/**
 * Returns posts
 * @param {req} req - The request
 * @param {res} res - The response
 */
async function listPosts(req, res) {
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

        res.status(201).send(posts);
    } catch (err) {
        res.status(400).send({
            error: err,
        });
    }
};

/**
 * Returns posts by type
 * @param {req} req - The request
 * @param {res} res - The response
 */
async function listPostsType(req, res) {
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
};

module.exports = {
    async create(req, res) {
        try {
            let post = (await Post.findOrCreate({
                where: {
                    title: req.body.title,
                },
                defaults: req.body,
            }))[0].dataValues;

            Post.findById(post.id).then((p) => {
                p.addChannels(req.body.channels);
            });

            res.status(200).send({
                res: 'Post successfully created',
            });
        } catch (err) {
            console.log(err);
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

           if (req.body.channels.length > 0) {
                Post.findById(postId).then((p) => {
                    p.setChannels(req.body.channels);
                });
            }

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
        listPosts(req, res);
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
    async list_enrolled_channels_posts(req, res) {
        try {
            const userData = jwt.verify(req.get('auth'), process.env.JWT_SECRET);
            let posts = [];

            if (userData.role === 'Super Admin') { // return all posts
                listPosts(req, res);
                return;
            } else {
                posts = (await Post.findAll(
                    {
                        attributes: ['id', 'title', 'description', 'date', 'link', 'numViews', 'type', 'tags'],
                        include: [{
                            model: Channel,
                            where: {
                            },
                            include: [{
                                model: Person,
                                where: {
                                    id: req.params.PersonId,
                                },
                            }],
                        }],
                        order: [
                            ['id', 'DESC'],
                        ],
                    },
                ));
            }

            res.status(201).send(posts);
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async list_enrolled_channels_posts_by_type(req, res) {
        try {
            const userData = jwt.verify(req.get('auth'), process.env.JWT_SECRET);
            let posts = [];

            console.log('\n\n\n\n'+userData.name+'\n\n\n\n');
            console.log('\n\n\n\n'+userData.role+'\n\n\n\n');


            if (userData.role === 'Super Admin') { // return all posts
                listPostsType(req, res);
                return;
            } else {
                posts = (await Post.findAll(
                    {
                        attributes: ['id', 'title', 'description', 'date', 'link', 'numViews', 'type', 'tags'],
                        where: {
                            type: req.params.type,
                        },
                        include: [{
                            model: Channel,
                            where: {

                            },
                            include: [{
                                model: Person,
                                where: {
                                    id: req.params.PersonId,
                                },
                            }],
                        }],
                        order: [
                            ['id', 'DESC'],
                        ],
                    },
                ));
            }

            res.status(201).send(posts);
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },

};
