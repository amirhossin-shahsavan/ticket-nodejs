const Message = require("./../model/Message");
const Ticket = require("./../model/Ticket");
const appErr = require("./../utils/errHandler");
const getMessages = async (req, res) => {
  try {
    const { text, createdAt } = await Ticket.findById(req.params.id);
    res.json({
      status: "success",
      data: { text, createdAt },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// const getallmessage = async (req, res) => {
//   try {
//     const { text, createdAt} = await Ticket.find();
//     res.json({
//       status: "success",
//       data: ticketCreated,
//     });
//   } catch (error) {
//     next(appErr(error.message));
//   }
// };

const createMessage = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    const newMessage = new Message(req.body);
    ticket.text.push(newMessage);
    await ticket.save();

    res.json({
      status: "success",
      data: newMessage,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// const updateTicket = async (req, res) => {
//   try {
//     const updatedTicket = await Ticket.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedTicket) {
//       return next(appErr("Ticket not found"));
//     } else {
//       res.json({
//         status: "success",
//         data: "you have successfully update ticket",
//       });
//     }
//   } catch (error) {
//     next(appErr(error.message));
//   }
// };

// const deleteTicket = async (req, res) => {
//   try {
//     const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
//     if (!deletedTicket) {
//       return next(appErr("Ticket not found"));
//     } else {
//       res.json({
//         status: "success",
//         data: "you have successfully delete ticket",
//       });
//     }
//   } catch (error) {
//     next(appErr(error.message));
//   }
// };

module.exports = {
  getMessages,
  createMessage,
};
