const Ticket = require("./../model/Ticket");
const appErr = require("./../utils/errHandler");
const getTicket = async (req, res) => {
  try {
    const tickets = await Ticket.findById(req.params.id);
    res.json(tickets);
  } catch (error) {
    next(appErr(error.message));
  }
};
const getallTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    next(appErr(error.message));
  }
};

const createTicket = async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticketCreated = await Ticket.create({
      title,
      description,
    }).save();

    res.json({
      status: "success",
      data: ticketCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTicket) {
      return next(appErr("Ticket not found"));
    } else {
      res.json({
        status: "success",
        data: "you have successfully update ticket",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return next(appErr("Ticket not found"));
    } else {
      res.json({
        status: "success",
        data: "you have successfully delete ticket",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  getTicket,
  getallTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};


