const {
  Channel,
} = require('../models');


module.exports = {
  // add channel admin
  // remove channel admin
  //
  async list_channel_range(req, res) {
    try {
      let channels = (await Channel.findAll({
          attribute: ['id', 'name', 'description'],
          order: [
            ['name', 'ASC'],
          ],
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
