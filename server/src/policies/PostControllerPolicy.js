const Joi = require('joi');

module.exports = {
    // manage access permisions
    create(req, res, next) {
        const schema = {
            title: Joi.string().required(),
            description: Joi.string().required(),
            text: Joi.string().required(),
            date: Joi.string(),
            link: Joi.string(),
            numViews: Joi.number().integer().min(0),
            type: Joi.string().required(),
            tags: Joi.array().items(Joi.string()),
            PersonId: Joi.number().integer().required(),
            channels: Joi.array().items(Joi.number().integer()).required(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'title':
                    res.status(401).send({
                        error: 'You must provide a title field',
                    });
                    break;
                case 'description':
                    res.status(402).send({
                        error: `You must provide a description field`,
                    });
                    break;
                case 'date':
                    res.status(403).send({
                        error: `You must provide a valid date field`,
                    });
                    break;
                case 'link':
                    res.status(404).send({
                        error: `You must provide a valid link field`,
                    });
                    break;
                case 'numViews':
                    res.status(405).send({
                        error: `You must provide a valid number of views field`,
                    });
                    break;
                case 'type':
                    res.status(406).send({
                        error: `You must provide a type field`,
                    });
                    break;
                case 'tags':
                    res.status(407).send({
                        error: `You must provide a valid tags field`,
                    });
                    break;
                case 'PersonId':
                    res.status(408).send({
                        error: `You must provide a valid PersonId field`,
                    });
                    break;
                case 'channels':
                    res.status(408).send({
                        error: `You must provide a valid channels field`,
                    });
                    break;
                case 'text':
                    res.status(409).send({
                        error: `You must provide a valid text field`,
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Bad request',
                    });
            }
        } else {
            next();
        }
    },
    update(req, res, next) {
        const schema = {
            postId: Joi.number().required(),
            title: Joi.string(),
            text: Joi.string(),
            description: Joi.string(),
            date: Joi.string(),
            link: Joi.string(),
            numViews: Joi.number(),
            type: Joi.string(),
            tags: Joi.array().items(Joi.string()),
            PersonId: Joi.number(),
            channels: Joi.array().items(Joi.number().integer()),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'postId':
                    res.status(401).send({
                        error: 'You must provide a postId field, and it should be an integer',
                    });
                    break;
                case 'title':
                    res.status(402).send({
                        error: 'You must provide a title field',
                    });
                    break;
                case 'description':
                    res.status(403).send({
                        error: `You must provide a description field`,
                    });
                    break;
                case 'date':
                    res.status(404).send({
                        error: `You must provide a valid date field`,
                    });
                    break;
                case 'link':
                    res.status(405).send({
                        error: `You must provide a valid link field`,
                    });
                    break;
                case 'numViews':
                    res.status(406).send({
                        error: `You must provide a valid number of views field`,
                    });
                    break;
                case 'type':
                    res.status(407).send({
                        error: `You must provide a type field`,
                    });
                    break;
                case 'tags':
                    res.status(408).send({
                        error: `You must provide a valid tags field`,
                    });
                    break;
                case 'PersonId':
                    res.status(409).send({
                        error: `You must provide a valid PersonId field`,
                    });
                    break;
                case 'text':
                    res.status(410).send({
                        error: `You must provide a valid text field`,
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Bad request',
                    });
            }
        } else {
            next();
        }
    },
    hasId(req, res, next) {
        const schema = {
            postId: Joi.number().required(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'postId':
                    res.status(400).send({
                        error: 'You must provide a postId field, and it should be an integer',
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Bad request',
                    });
            }
        } else {
            next();
        }
    },
};
