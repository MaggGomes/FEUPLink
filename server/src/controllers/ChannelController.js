const {
  ChannelMembers,
  Channel,
  Person,
} = require('../models');
const jwt = require('jsonwebtoken');

// aux functions

/**
 * Represents a book.
 * @param {req} req - The request.
 * @param {req} res - The response.
 * @param {req} isAdmin - Boolean wich tells if the user will become an admin or not.
 */
async function manageChannelAdmin(req, res, isAdmin) {
  try {
    // update association table
    (await ChannelMembers.update(
      {
        isAdmin: isAdmin,
      },
      {
        where: {
          ChannelId: req.body.ChannelId,
          PersonId: req.body.PersonId,
        },
      }
    ));

    // update person role
    const userData = jwt.verify(req.get('auth'), process.env.JWT_SECRET);
    if (userData.role !== 'Super Admin') {
      let nChannelsAdmin = (await ChannelMembers.count(
        {
          where: {
            PersonId: req.body.PersonId,
            isAdmin: true,
          },
        }
      ));
      // if the user is not an admin of any channel update is permissions role to 'User'
      let newRole = (nChannelsAdmin > 0) ? 'Channel Admin' : 'User';

      (await Person.update(
        {
          role: newRole,
        },
        {
          where: {
            id: req.body.PersonId,
          },
        }
      ));
    }

    res.status(201).send({
      res: `Channel Admin ${isAdmin ? 'added': 'removed'} successfully`,
    });
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
};


module.exports = {
  async add_channel_admin(req, res) {
    manageChannelAdmin(req, res, true);
  },
  async remove_channel_admin(req, res) {
    manageChannelAdmin(req, res, false);
  },
  // To-do list channel members
  async list_enrolled_channels(req, res) {
    try {
        let channels = (await ChannelMembers.findAll(
          {
              where: {
                PersonId: req.params.PersonId,
              },
              include: [{
                all: true,
              }],
              offset: req.params.from,
              limit: req.params.numInstances,
          },
        ));

        res.status(201).send(channels);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async list_admin_channels(req, res) {
    try {
      let channels = (await ChannelMembers.findAll(
        {
            where: {
              PersonId: req.params.PersonId,
              isAdmin: true,
            },
            include: [{
              all: true,
            }],
            offset: req.params.from,
            limit: req.params.numInstances,
        },
      ));

      res.status(201).send(channels);
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
  },
  async list_channel_range(req, res) {
    try {
      let channels = (await Channel.findAll({
          order: [
            ['name', 'ASC'],
          ],
          include: [{
            all: true,
          }],
          offset: req.params.from,
          limit: req.params.numInstances,
        }));

        res.status(201).send(channels);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async num_channels(req, res) {
    try {
      let channelsNumber = (await Channel.count());

        res.status(201).send({
          count: channelsNumber,
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
