const Joi = require('joi');


module.exports = {
    // is channel admin
    //
    hasId(req, res, next) {
        const schema = {
            channelId: Joi.number().required(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'channelId':
                res.status(400).send({
                    error: 'You must provide a channelId field, and it should be an integer',
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
