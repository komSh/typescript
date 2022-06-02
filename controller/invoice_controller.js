const models = require('../models');
const e = require('express')

const UploadInvoice = models.Invoice;

module.exports.upload_invoice = async (req, res) => {
  const userId = req.user;
  const { paymentId, img } = req.body;
  try {
    const invoice = await UploadInvoice.create({
      paymentId,
      UserId: userId,
      image: 'img',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      message: 'Invoice Uploaded!',
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

module.exports.change_invoice_status = async (req, res) => {
  const { id ,status } = req.body;
  try {
    const invoice = await UploadInvoice.update(
    { status: status },
        { where: { id: id } }
    )
    res.status(200).json({
      message: 'Invoice Updated!',
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

module.exports.get_all_invoices = async (req, res) => {
  try {
    const invoices = await UploadInvoice.findAll();
    res.status(200).json({ invoices });
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

module.exports.get_user_invoices = async (req, res) => {
  try {
    const invoices = await UploadInvoice.findAll({
      where: {
        UserId: req.user,
      },
    });
    res.status(200).json({ invoices });
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
