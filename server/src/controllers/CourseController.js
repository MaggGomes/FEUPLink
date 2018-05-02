const {
  Course,
  Person,
  Student,
  Channel,
  Department,
} = require('../models');


module.exports = {
  async create(req, res) {
      try {
        let course = (await Course.findOrCreate({
          where: {
            name: req.body.name,
          },
          defaults: req.body,
        }))[0].dataValues;

        Course.findById(course.id).then((c) => {
          c.setDepartment(req.body.departmentId);
        });


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
          }
      ));

        Course.findById(courseId).then((c) => {
          c.setDepartment(req.body.departmentId);
        });

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
          order: [
            ['name', 'ASC'],
          ],
          include: [
            {
              model: Student,
              include: [{
                model: Person,
              }],
            },
            {
              model: Channel,
            },
            {
              model: Department,
            },
          ],
        }));


        res.status(201).send(courses);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async list_courses_range(req, res) {
    try {
      let courses = (await Course.findAll({
          attribute: ['id', 'name', 'academicDegree', 'acronym', 'description', 'website', 'creationDate', 'endDate'],
          order: [
            ['name', 'ASC'],
          ],
          include: [
            {
              model: Student,
              include: [{
                model: Person,
              }],
            },
            {
              model: Channel,
            },
            {
              model: Department,
            },
          ],
          offset: req.params.from,
          limit: req.params.numInstances,
        }));


        res.status(201).send(courses);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async num_courses(req, res) {
    try {
      let coursesNumber = (await Course.count());

        res.status(201).send({
          count: coursesNumber,
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
