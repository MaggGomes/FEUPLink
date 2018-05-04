const {
  ChannelMembers,
  Channel,
  Person,
} = require('../models');
const jwt = require('jsonwebtoken');
const Utils = require('../utils/Utils');

// aux functions

/**
 * Changes the admins of a channel.
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


/**
 * lists the channels at a given range.
 * @param {req} req - The request.
 * @param {req} res - The response.
 */
async function listChannelsInRange(req, res) {
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
};

/**
 * gets the total amount of channels.
 * @param {req} req - The request.
 * @param {req} res - The response.
 */
async function listChannelsCount(req, res) {
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
};


module.exports = {
  async set_channel_visibility(req, res) {
    const userData = jwt.verify(req.get('auth'), process.env.JWT_SECRET);
     // update association table
     (await ChannelMembers.update(
      {
        isVisible: req.body.isVisible,
      },
      {
        where: {
          ChannelId: req.body.ChannelId,
          PersonId: userData.id,
        },
      }
    ));

    res.status(201).send({
      res: `Visibility successfully updated`,
    });
  },
  async add_channel_admin(req, res) {
    manageChannelAdmin(req, res, true);
  },
  async remove_channel_admin(req, res) {
    manageChannelAdmin(req, res, false);
  },
  async list_channel_range(req, res) {
    listChannelsInRange(req, res);
  },
  async num_channels(req, res) {
    listChannelsCount(req, res);
  },
  // To-do list channel members
  async list_enrolled_channels(req, res) {
    try {
        let channels = (await ChannelMembers.findAll(
          {
              attributes: [],
              where: {
                PersonId: req.params.PersonId,
              },
              include: [{
                model: Channel,
                include: [
                  {
                    all: true,
                  },
                ],
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
  async num_enrolled_channels(req, res) {
    try {
      let channelsNumber = (await ChannelMembers.count({
        where: {
          PersonId: req.params.PersonId,
        },
      }));

        res.status(201).send({
          count: channelsNumber,
        });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async list_admin_channels(req, res) {
    try {
      const userData = jwt.verify(req.get('auth'), process.env.JWT_SECRET);
      let channels = [];

      if (userData.role === 'Super Admin') { // return all channels
        listChannelsInRange(req, res);
        return;
      } else {
        channels = (await ChannelMembers.findAll(
          {
              attributes: [],
              where: {
                PersonId: req.params.PersonId,
                isAdmin: true,
              },
              include: [{
                model: Channel,
                include: [
                  {
                    all: true,
                  },
                ],
              }],
              offset: req.params.from,
              limit: req.params.numInstances,
          },
        ));
        console.log('\n\ncalling: \n\n', Utils.removeJsonKeyInArray('Channel', channels));
      }

      res.status(201).send(channels);
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
  },
  async num_admin_channels(req, res) {
    try {
      const userData = jwt.verify(req.get('auth'), process.env.JWT_SECRET);
      let channelsNumber = 0;

      if (userData.role === 'Super Admin') { // return all channels
        listChannelsCount(req, res);
        return;
      } else {
        channelsNumber = (await ChannelMembers.count({
          where: {
            PersonId: req.params.PersonId,
            isAdmin: true,
          },
        }));
      }

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
