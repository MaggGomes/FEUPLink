const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {
    ChannelMembers,
  } = require('../models');

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
    // verifies either a channel_admin of the specified channel or a super_admin
    channel_admin(req, res, next) {
        console.log(req.body);
        try {
          const user = jwtSignedUser(req);

          if (user.role === 'Super Admin') {
            next();
          } else if (user.role === 'Channel Admin') {
            let channels = [];

            if (req.body.hasOwnProperty('channels')) {
                channels = req.body.channels;
            } else if (req.body.hasOwnProperty('ChannelId')) {
                channels = [req.body.ChannelId];
            }

            for (let i = 0; i < channels.length; i++) {
                ChannelMembers.findOne(
                {
                    where: {
                        ChannelId: channels[i],
                        PersonId: user.id,
                    },
                },
                ).then((channelInfo) => {
                    // is not an admin of the current channel
                    if (channelInfo !== null && !channelInfo.dataValues.isAdmin) {
                        res.status(403).send({error: 'Access Forbiden'});
                        return;
                    }
                });
            }
            // is an admin of all the channels
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
            birthDate_visibility: Joi.boolean().required(),
            gender: Joi.string().required(),
            gender_visibility: Joi.boolean().required(),
            country: Joi.string().required(),
            country_visibility: Joi.boolean().required(),
            city: Joi.string().required(),
            city_visibility: Joi.boolean().required(),
            courseId: Joi.number().required(),
            enrollmentDate: Joi.string().required(),
            graduationDate: Joi.string(),
            type: Joi.string().required(),
            type_visibility: Joi.boolean().required(),
            mecNumber: Joi.string().required(),
            mecNumber_visibility: Joi.boolean().required(),
            company: Joi.string(),
            companyType: Joi.string(),
            companyIndustry: Joi.string(),
            title: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string(),
            isCurrent: Joi.boolean(),
            workExperience: Joi.boolean(),
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
                case 'courseId':
                    res.status(400).send({
                        error: 'You must provide a courseId field',
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
            birthDate_visibility: Joi.boolean().required(),
            gender: Joi.string().required(),
            gender_visibility: Joi.boolean().required(),
            country: Joi.string().required(),
            country_visibility: Joi.boolean().required(),
            city: Joi.string().required(),
            city_visibility: Joi.boolean().required(),
            departmentId: Joi.number().required(),
            workingLocation: Joi.string().required(),
            workingLocation_visibility: Joi.boolean().required(),
            startDate: Joi.string(),
            startDate_visibility: Joi.boolean().required(),
            endDate: Joi.string(),
            endDate_visibility: Joi.boolean().required(),
            mecNumber: Joi.string().required(),
            mecNumber_visibility: Joi.boolean().required(),
            company: Joi.string(),
            companyType: Joi.string(),
            companyIndustry: Joi.string(),
            title: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string(),
            isCurrent: Joi.boolean(),
            workExperience: Joi.boolean(),
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
                case 'departmentId':
                    res.status(400).send({
                        error: 'You must provide a departmentId field',
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
            courseId: Joi.required(),
            enrollmentDate: Joi.required(),
            graduationDate: Joi.required(),
            studenType: Joi.required(),
            departmentId: Joi.required(),
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
                case 'courseId':
                    res.status(400).send({
                        error: 'You must provide a courseId field',
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
                case 'departmentId':
                    res.status(400).send({
                        error: 'You must provide a departmentId field',
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
    signup_facebook(req, res, next) {
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
                        error: 'You must provide your Facebook Authorization Code',
                    });
                    break;
                case 'state':
                    res.status(400).send({
                        error: `You must provide your Facebook state for validation purposes`,
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
    continue_signup_facebook(req, res, next) {
        const schema = {
            personType: Joi.required(),
            courseId: Joi.required(),
            enrollmentDate: Joi.required(),
            graduationDate: Joi.required(),
            studenType: Joi.required(),
            departmentId: Joi.required(),
            workingLocation: Joi.required(),
            startDate: Joi.required(),
            endDate: Joi.required(),
            mecNumber: Joi.required(),
            company: Joi.required(),
            companyType: Joi.required(),
            companyIndustry: Joi.required(),
            title: Joi.required(),
            isCurrent: Joi.required(),
            workExperience: Joi.required(),
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
                case 'courseId':
                    res.status(400).send({
                        error: 'You must provide a courseId field',
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
                case 'departmentId':
                    res.status(400).send({
                        error: 'You must provide a departmentId field',
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
                case 'workingLocation':
                    res.status(400).send({
                        error: 'You must provide a workingLocation field',
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
