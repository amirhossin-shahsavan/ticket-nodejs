const { default: mongoose } = require("mongoose");
const Ticket = require("./../model/Ticket");
const Message = require("./../model/Message");
const { appErr, AppErr } = require("./../utils/errHandler");
const User = require("../model/User");
const fs = require("fs");
const path = require("path");
const Type = require("../model/Type");
var ObjectId = require("mongodb").ObjectId;

const getTicket = async (req, res, next) => {
  try {
    const ticketFound = await Ticket.findOne({
      _id: req.params.id,
      status: "open",
    });

    const messageFound = await Message.find({
      ticketid: req.params.id,
    });

    if (!ticketFound) {
      return res.status(404).json(appErr("not found", 404));
    }
    if (
      ticketFound.user.toString() != req.userAuth.toString() &&
      req.user.permission == "user"
    ) {
      return res.status(401).json(appErr("you dont have access", 401));
    }

    res.json({
      status: "success",
      data: { messageFound, ticketFound },
    });
  } catch (error) {
    appErr(error.message);
  }
};
const getallTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({
      user: req.userAuth,
      status: "open",
    }).populate("text");

    if (!tickets) {
      return res.status(401).json(appErr("you dont have access", 401));
    }

    res.json(tickets);
  } catch (error) {
    appErr(error.message);
  }
};

const createTicket = async (req, res, next) => {
  const { title, description, categoryid } = req.body;
  try {
    if (req.user.permission != "user") {
      return res.status(401).json(appErr("you dont have access", 401));
    }

    const ticketCreated = await Ticket.create({
      title,
      description,
      user: req.userAuth,
      category_Id: categoryid,
    });

    console.log(
      `ticketCreated.user.toString()... ${ticketCreated.user.toString()}`
    );

    try {
      global.UsersSocket[ticketCreated.user.toString()].emit(
        "newticket",
        JSON.stringify(ticketCreated)
      );
    } catch {
      appErr("new msg error ...");
    }

    res.json({
      status: "success",
      data: ticketCreated,
    });
  } catch (error) {
    next(AppErr(error.message));
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const updated = await Ticket.updateOne(
      {
        _id: new ObjectId(req.params.id),
        user: req.userAuth,
        status: "open",
      },
      req.body
    );

    const ticketFound = await Ticket.findOne({
      _id: req.params.id,
      status: "open",
    });

    if (!ticketFound) {
      return res.status(404).json(appErr("not found", 404));
    }

    if (!updated) {
      return res.status(401).json(appErr("you dont have access"), 401);
    } else {
      res.json({
        status: "success",
        data: "you have successfully update ticket",
      });
    }
  } catch (error) {
    appErr(error.message);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    if (req.user.permission == "support") {
      return res.status(402).json(appErr("not permission", 402));
    }

    const ticketFound = await Ticket.findOne({
      _id: req.params.id,
      status: "open",
    });

    if (!ticketFound) {
      return res.status(404).json(appErr("not found", 404));
    }

    if (
      (req.user.permission == "user" &&
        ticketFound.user.toString() == req.user._id.toString()) ||
      req.user.permission == "admin"
    ) {
      await Ticket.updateOne(
        { _id: req.params.id, status: "open" },
        { $set: { status: "closed" } }
      );

      res.json({
        status: "success",
        data: "you have successfully delete ticket",
      });
    } else {
      return res.status(402).json(appErr("not permission", 402));
    }
  } catch (error) {
    appErr(error.message);
  }
};

const uploadfile = async (req, res, next) => {
  try {
    const ticketFound = await Ticket.findOne({
      _id: req.params.id,
      status: "open",
    });
    if (!ticketFound) {
      return res.status(404).json(appErr("not found", 404));
    }

    const ticketAuthFound = await Ticket.findOne({
      _id: req.params.id,
      user: req.userAuth,
      status: "open",
    });

    if (!ticketAuthFound) {
      return res.status(401).json(appErr("dont have access", 401));
    }

    const newMsg = await new Message({
      ticketid: new ObjectId(req.params.id),
      text: "image sent",
      type: "image",
      user: req.userAuth,
    }).save();

    await Ticket.updateOne(
      { _id: new ObjectId(req.params.id), status: "open" },
      { text: newMsg._id }
    );

    const buffer = Buffer.from(req.files.image.data);

    const filePath = path.join(
      __dirname,
      "./../files",
      "upload",
      newMsg._id.toString() + ".png"
    );

    fs.writeFileSync(filePath, buffer);

    res.json({
      status: "success",
      data: "File uploaded and attached to ticket!",
    });
  } catch (error) {
    appErr(error.message);
  }
};

const getFile = async (req, res, next) => {
  try {
    const msgid = new ObjectId(req.params.id);
    const msgFind = await Message.findOne({ user: req.userAuth, _id: msgid });

    const flileFound = await Message.findOne({ _id: msgid });
    if (!flileFound) {
      return res.status(404).json(appErr("not found", 404));
    }
    if (!msgFind) {
      return res.status(401).json(appErr("you dont have access", 401));
    }
    const address = path.join(
      __dirname,
      "../files/upload/",
      req.params.id + ".png"
    );
    res.sendFile(address);
  } catch (error) {
    appErr(error.message);
  }
};

const createCategore = async (req, res, next) => {
  const { category, department, priority } = req.body;
  try {
    const Category = await Type.create({
      category,
      department,
      priority,
    });

    res.json({
      status: "success",
      data: Category,
    });
  } catch (error) {
    appErr(error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const findCategory = await Type.find({});

    res.json({
      status: "success",
      data: findCategory,
    });
  } catch (error) {
    appErr(error.message);
  }
};

module.exports = {
  getTicket,
  getallTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  uploadfile,
  getFile,
  createCategore,
  getCategory,
};
