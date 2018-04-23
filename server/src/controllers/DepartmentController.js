const {
  Department,
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

          // setCouses

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

        // updateCouses
        // find and set courses

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
          include: [{
            all: true,
          }],
          order: [
            ['id', 'DESC'],
          ],
        }));


        res.status(201).send(departments);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
