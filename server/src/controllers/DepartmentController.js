const {
  Department,
  Person,
  Staff,
  Course,
} = require('../models');


module.exports = {
  async create(req, res) {
      try {
        (await Department.findOrCreate({
          where: {
            name: req.body.name,
          },
          defaults: req.body,
        }));

          res.status(201).send({
            res: 'Department successfully created',
          });
      } catch (err) {
        res.status(400).send({
          error: err,
        });
      }
  },
  async update(req, res) {
    try {
      const departmentId = req.body.departmentId;
      delete req.body.departmentId;

      (await Department.update(
          req.body,
          {
            where: {
              id: departmentId,
          },
        }));

        res.status(201).send({
          res: 'Successfully updated the department information',
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async delete(req, res) {
    try {
      (await Department.destroy({
          where: {
            id: req.body.departmentId,
          },
        }));


        res.status(201).send({
          res: 'Department successfully deleted',
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async list_all(req, res) {
    try {
      let departments = (await Department.findAll({
          attribute: ['id', 'name', 'acronym'],
          order: [
            ['name', 'ASC'],
          ],
          include: [
            {
              model: Staff,
              include: [{
                model: Person,
              }],
            },
            {
              model: Course,
            },
          ],
        }));


        res.status(201).send(departments);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async list_departments_range(req, res) {
    try {
      let departments = (await Department.findAll({
          attribute: ['id', 'name', 'acronym'],
          order: [
            ['name', 'ASC'],
          ],
          include: [
            {
              model: Staff,
              include: [{
                model: Person,
              }],
            },
            {
              model: Course,
            },
          ],
          offset: req.params.from,
          limit: req.params.numInstances,
        }));

        res.status(201).send(departments);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async num_departments(req, res) {
    try {
      let departmentsNumber = (await Department.count());

        res.status(201).send({
          count: departmentsNumber,
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
