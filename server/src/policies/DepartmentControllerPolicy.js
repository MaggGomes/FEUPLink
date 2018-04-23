const Joi = require('joi');


module.exports = {
    // manage access permisions
    create(req, res, next) {
      const schema = {
        name: Joi.string().required(),
        acronym: Joi.string().required(),
      };

      const {error} = Joi.validate(req.body, schema);

      if (error) {
          switch (error.details[0].context.key) {
              case 'name':
                  res.status(400).send({
                      error: 'You must provide a name field',
                  });
                  break;
              case 'acronym':
                  res.status(400).send({
                      error: `You must provide an acronym field`,
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
            departmentId: Joi.number().required(),
            name: Joi.string(),
            acronym: Joi.string(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'departmentId':
                res.status(400).send({
                    error: 'You must provide a departmentId field, and it should be an integer',
                });
                break;
                case 'name':
                    res.status(400).send({
                        error: 'name must be a string',
                    });
                    break;
                case 'acronym':
                    res.status(400).send({
                        error: 'acronym must be a string',
                    });
                    break;
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
            departmentId: Joi.number().required(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'departmentId':
                res.status(400).send({
                    error: 'You must provide a departmentId field, and it should be an integer',
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
