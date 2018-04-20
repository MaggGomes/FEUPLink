const Joi = require('joi');
const jwt = require('jsonwebtoken');

/**
 * Represents a book.
 * @param {req} req - The request.
 * @return {object} - The token decoded, that consists in the person data
 */
function jwtSignedUser(req) {
    const userData = {
        token: req.get('auth'),
    };
    const schema = {
        token: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
    };

    const {error} = Joi.validate(userData, schema);

    if (error) {
        throw new Error('Invalid Token');
    } else {
        return jwt.verify(userData.token, process.env.JWT_SECRET);
    }
}

module.exports = {
    // manage access permisions
    super_admin(req, res, next) {
        try {
          const user = jwtSignedUser(req);
          if (user.role === 'Super Admin') {
            next();
          } else {
            res.status(403).send({error: 'Access Forbiden'});
          }
        } catch (error) {
          res.status(401).send({
            error: 'Invalid Token',
          });
        }
    },
    channel_admin(req, res, next) {
        try {
          const user = jwtSignedUser(req);
          if (user.role === 'Channel Admin') {
            next();
          } else {
            res.status(403).send({error: 'Access Forbiden'});
          }
        } catch (error) {
          res.status(401).send({
            error: 'Invalid Token',
          });
        }
    },
    authenticated(req, res, next) {
        try {
            jwtSignedUser(req);
            next();
        } catch (error) {
          res.status(401).send({
            error: 'Invalid Token',
          });
        }
    },
    // endpoints policies
    signup_student(req, res, next) {
        const schema = {
            name: Joi.string().required(),
            email: Joi.string().required(),
            hashedPassword: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
            birthDate: Joi.string().required(),
            gender: Joi.string().required(),
            country: Joi.string().required(),
            city: Joi.string().required(),
            course: Joi.string().required(),
            enrollmentDate: Joi.string().required(),
            graduationDate: Joi.string(),
            type: Joi.string().required(),
            mecNumber: Joi.string().required(),
            company: Joi.string(),
            companyType: Joi.string(),
            companyIndustry: Joi.string(),
            title: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string(),
            isCurrent: Joi.boolean(),
            workExperience: Joi.boolean().required(),
        };

        // eslint-disable-next-line
        const {error, value} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(400).send({
                        error: 'You must provide a name field',
                    });
                    break;
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address',
                    });
                    break;
                case 'hashedPassword':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        <br>
                        2. It must be at least 8 characters in length and not greater than 32 characters in length.`,
                    });
                    break;
                case 'birthDate':
                    res.status(400).send({
                        error: 'You must provide a birthDate field',
                    });
                    break;
                case 'gender':
                    res.status(400).send({
                        error: 'You must provide a gender field',
                    });
                    break;
                case 'country':
                    res.status(400).send({
                        error: 'You must provide a country field',
                    });
                    break;
                case 'city':
                    res.status(400).send({
                        error: 'You must provide a city field',
                    });
                    break;
                case 'course':
                    res.status(400).send({
                        error: 'You must provide a course field',
                    });
                    break;
                case 'enrollmentDate':
                    res.status(400).send({
                        error: 'You must provide a enrollmentDate field',
                    });
                    break;
                case 'mecNumber':
                    res.status(400).send({
                        error: 'You must provide a mecNumber field',
                    });
                    break;
                case 'workExperience':
                    res.status(400).send({
                        error: 'You must provide a workExperience field',
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information',
                    });
            }
        } else {
            next();
        }
    },
    signup_staff(req, res, next) {
        const schema = {
            name: Joi.string().required(),
            email: Joi.string().required(),
            hashedPassword: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
            birthDate: Joi.string().required(),
            gender: Joi.string().required(),
            country: Joi.string().required(),
            city: Joi.string().required(),
            dpName: Joi.string().required(),
            acronym: Joi.string().required(),
            workingLocation: Joi.string().required(),
            startDate: Joi.string(),
            endDate: Joi.string(),
            mecNumber: Joi.string().required(),
            company: Joi.string(),
            companyType: Joi.string(),
            companyIndustry: Joi.string(),
            title: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string(),
            isCurrent: Joi.boolean(),
            workExperience: Joi.boolean().required(),
        };

        // eslint-disable-next-line
        const {error, value} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(400).send({
                        error: 'You must provide a name field',
                    });
                    break;
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address',
                    });
                    break;
                case 'hashedPassword':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        <br>
                        2. It must be at least 8 characters in length and not greater than 32 characters in length.`,
                    });
                    break;
                case 'birthDate':
                    res.status(400).send({
                        error: 'You must provide a birthDate field',
                    });
                    break;
                case 'gender':
                    res.status(400).send({
                        error: 'You must provide a gender field',
                    });
                    break;
                case 'country':
                    res.status(400).send({
                        error: 'You must provide a country field',
                    });
                    break;
                case 'city':
                    res.status(400).send({
                        error: 'You must provide a city field',
                    });
                    break;
                case 'dpName':
                    res.status(400).send({
                        error: 'You must provide a dpName field',
                    });
                    break;
                case 'acronym':
                    res.status(400).send({
                        error: 'You must provide a acronym field',
                    });
                    break;
                case 'workingLocation':
                    res.status(400).send({
                        error: 'You must provide a workingLocation field',
                    });
                    break;
                case 'mecNumber':
                    res.status(400).send({
                        error: 'You must provide a mecNumber field',
                    });
                    break;
                case 'workExperience':
                    res.status(400).send({
                        error: 'You must provide a workExperience field',
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information',
                    });
            }
        } else {
            next();
        }
    },
    signup_linkedin(req, res, next) {
        const schema = {
            code: Joi.string().required(),
            state: Joi.string().required(),
            error: Joi.required(),
        };

        // eslint-disable-next-line
        const {error, value} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'code':
                    res.status(400).send({
                        error: 'You must provide your LinkedIn Authorization Code',
                    });
                    break;
                case 'state':
                    res.status(400).send({
                        error: `You must provide your LinkedIn state for validation purposes`,
                    });
                    break;
                case 'error':
                    res.status(400).send({
                        error: `You must provide a error field`,
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
    continue_signup_linkedin(req, res, next) {
        const schema = {
            personType: Joi.required(),
            course: Joi.required(),
            enrollmentDate: Joi.required(),
            graduationDate: Joi.required(),
            studenType: Joi.required(),
            dpName: Joi.required(),
            acronym: Joi.required(),
            workingLocation: Joi.required(),
            startDate: Joi.required(),
            endDate: Joi.required(),
            mecNumber: Joi.required(),
        };

        // eslint-disable-next-line
        const {error, value} = Joi.validate(req.body, schema);
        if (error) {
            switch (error.details[0].context.key) {
                case 'personType':
                    res.status(400).send({
                        error: 'You must provide a personType field',
                    });
                    break;
                case 'course':
                    res.status(400).send({
                        error: 'You must provide a course field',
                    });
                    break;
                case 'enrollmentDate':
                    res.status(400).send({
                        error: 'You must provide a enrollmentDate field',
                    });
                    break;
                case 'graduationDate':
                res.status(400).send({
                    error: 'You must provide a graduationDate field',
                });
                    break;
                case 'studenType':
                    res.status(400).send({
                        error: 'You must provide a studenType field',
                    });
                    break;
                case 'dpName':
                    res.status(400).send({
                        error: 'You must provide a dpName field',
                    });
                    break;
                case 'acronym':
                    res.status(400).send({
                        error: 'You must provide a acronym field',
                    });
                    break;
                case 'workingLocation':
                    res.status(400).send({
                        error: 'You must provide a workingLocation field',
                    });
                    break;
                case 'startDate':
                    res.status(400).send({
                        error: 'You must provide a startDate field',
                    });
                    break;
                case 'endDate':
                    res.status(400).send({
                        error: 'You must provide a endDate field',
                    });
                    break;
                case 'mecNumber':
                    res.status(400).send({
                        error: 'You must provide a mecNumber field',
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information',
                    });
            }
        } else {
            next();
        }
    },
    signin(req, res, next) {
        const schema = {
            email: Joi.string().required().email(),
            hashedPassword: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
        };

        // eslint-disable-next-line
        const {error, value} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address',
                    });
                    break;
                case 'hashedPassword':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        2. It must be at least 8 characters in length and not greater than 32 characters in length.`,
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information',
                    });
            }
        } else {
            next();
        }
    },
};
