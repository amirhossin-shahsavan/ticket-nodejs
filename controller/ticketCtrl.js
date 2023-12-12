const Ticket = require("./../model/Ticket");

const getTicket = async (req, res) => {
  try {
    const tickets = await Ticket.findById(req.params.id);
    res.json(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getallTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save();
    res.status(201).send(savedTicket);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedTicket) {
      res.send(updatedTicket);
    } else {
      res.status(404).send("Ticket not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (deletedTicket) {
      res.status(204).send();
    } else {
      res.status(404).send("Ticket not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTicket,
  getallTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
