const Joi = require('joi');


module.exports = {
    // manage access permisions
    create(req, res, next) {
      const schema = {
        name: Joi.string().required(),
        academicDegree: Joi.string().required(),
        acronym: Joi.string().required(),
        description: Joi.string().allow(null).allow(''),
        website: Joi.string().allow(null).allow(''),
        creationDate: Joi.date().required(),
        endDate: Joi.date().allow(null),
        departmentId: Joi.number().required(),
      };

      const {error} = Joi.validate(req.body, schema);

      if (error) {
          switch (error.details[0].context.key) {
              case 'name':
                  res.status(400).send({
                      error: 'You must provide a name field',
                  });
                  break;
              case 'academicDegree':
                  res.status(400).send({
                      error: `You must provide a academicDegree field`,
                  });
                  break;
              case 'acronym':
                  res.status(400).send({
                      error: `You must provide an acronym field`,
                  });
                  break;
              case 'description':
                res.status(400).send({
                    error: `You must provide a description field`,
                });
                break;
              case 'website':
                res.status(400).send({
                    error: `you must provide a valid website`,
                });
                break;
              case 'creationDate':
                res.status(400).send({
                    error: `You must provide a creationDate field`,
                });
                break;
              case 'endDate':
                res.status(400).send({
                    error: `endDate must be a date in a string format`,
                });
                break;
              case 'departmentId':
                res.status(400).send({
                    error: `You must provide a departmentId`,
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
            courseId: Joi.number().required(),
            name: Joi.string(),
            academicDegree: Joi.string(),
            acronym: Joi.string(),
            description: Joi.string().allow(null).allow(''),
            website: Joi.string().allow(null).allow(''),
            creationDate: Joi.date(),
            endDate: Joi.date().allow(null),
            departmentId: Joi.number(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'courseId':
                res.status(400).send({
                    error: 'You must provide a courseId field, and it should be an integer',
                });
                break;
                case 'name':
                    res.status(400).send({
                        error: 'name must be a string',
                    });
                    break;
                case 'academicDegree':
                    res.status(400).send({
                        error: 'academicDegree must be a string',
                    });
                    break;
                case 'acronym':
                    res.status(400).send({
                        error: 'acronym must be a string',
                    });
                    break;
                case 'description':
                res.status(400).send({
                    error: 'description must be a string',
                });
                break;
                case 'website':
                res.status(400).send({
                    error: 'website must be a string',
                });
                break;
                case 'creationDate':
                res.status(400).send({
                    error: 'creationDate must be a date in a string format',
                });
                break;
            case 'endDate':
                res.status(400).send({
                    error: 'endDate must be a date in a string format',
                });
                break;
            case 'departmentId':
                res.status(400).send({
                    error: `departmentId must be a number`,
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
            courseId: Joi.number().required(),
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'courseId':
                res.status(400).send({
                    error: 'You must provide a courseId field, and it should be an integer',
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
