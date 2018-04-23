const {
  Course,
} = require('../models');


module.exports = {
  async create(req, res) {
      try {
        (await Course.findOrCreate({
          where: {
            name: req.body.name,
          },
          defaults: req.body,
        }));

          // setDepartment

          res.status(201).send({
            res: 'Course successfully created',
          });
      } catch (err) {
        res.status(400).send({
          error: err,
        });
      }
  },
  async update(req, res) {
    try {
      const courseId = req.body.courseId;
      delete req.body.courseId;

      (await Course.update(
          req.body,
          {
            where: {
              id: courseId,
          },
        }));

        res.status(201).send({
          res: 'Successfully updated the course information',
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async delete(req, res) {
    try {
      (await Course.destroy({
          where: {
            id: req.body.courseId,
          },
        }));


        res.status(201).send({
          res: 'Course successfully deleted',
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async list_all(req, res) {
    try {
      let courses = (await Course.findAll({
          attribute: ['id', 'name', 'academicDegree', 'acronym', 'description', 'website', 'creationDate', 'endDate'],
          include: [{
            all: true,
          }],
          order: [
            ['id', 'DESC'],
          ],
        }));


        res.status(201).send(courses);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
