const models = require('../models');
const moment = require('moment');
const TODAY_START = moment().format('YYYY-MM-DD 00:00');
const NOW = moment().format('YYYY-MM-DD 23:59');
const { Menu } = models;
const { CanceledSubscriber } = models;
const op = require('sequelize').Op;

module.exports.create_menu = async (req, res) => {
  const { day, item } = req.body;
  try {
    const menu = await Menu.create({
      day,
      item,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      message: 'Menu Created!',
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }else {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};

module.exports.get_menu = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.status(200).json({ menus });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }else {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};

module.exports.cancel_menu = async (req, res) => {
  try {

    let todayOldRecord = await CanceledSubscriber.findOne({
      where: {
        createdAt: {
          [op.between]: [
            TODAY_START,
            NOW,
          ]
        },
        UserId : req.user
      }
      });
    if (todayOldRecord){
      return  res.status(402).json({ message: "You already canceled today meal!" });
    }else {
      const menu = await CanceledSubscriber.create({
        UserId : req.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({ message: "Today Meal Canceled!" });
    }
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }else {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};
