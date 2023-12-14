const { createMessage } = require("./../controller/messageCtrl");
const Ticket = require("./../model/Ticket");
const User = require("./../model/User");
const Message = require("./../model/Message");
const ObjectId = require("mongodb").ObjectId;
const appErr = require("./appErr"); // Assuming appErr is a function that creates error objects.
const { loginUser } = require("./../controller/userCtrl");
const { createTicket } = require("./../controller/ticketCtrl");

jest.mock("./../model/Ticket");
jest.mock("./../model/User");
jest.mock("./../model/Message");
jest.mock("mongodb", () => ({
  ObjectId: jest.fn().mockImplementation((id) => id), // Simplified mock for ObjectId.
}));

function login() {
  const req = {
    body: {
      email: global.dotenv.TEST_EMAIL,
      password: TEST_PASSWORD,
    },
  };
  const token = loginUser(req).token;
  return token;
}

function createTicketTest(token) {
  const req = {
    body: {
      title: global.dotenv.TEST_TITLE,
      description: TEST_DESCRIPTION,
    },
    headers: token,
  };
  const id = loginUser(req).data._id;
  return id;
}

describe("createMessage", () => {
  const token = login();
  const ticketId = createTicketTest(token);
  const req = {
    params: { id: ticketId },
    body: { text: "TEST message text" },
    userAuth: token,
  };
  let res;
  let next;

  beforeEach(() => {
    res = { json: jest.fn() };
    next = jest.fn();
  });

  it("should create a message when ticket is found and user has access", async () => {
    const ticket = { _id: "ticketId", user: "userId" };
    const user = { _id: "userId", isAdmin: false };
    const message = {
      _id: "messageId",
      text: "message text",
      ticketid: "ticketId",
      user: "userId",
      isAdmin: false,
    };

    Ticket.findOne
      .mockResolvedValueOnce(ticket) // Mock for ticket check with user access
      .mockResolvedValueOnce(ticket); // Mock for ticket existence check
    User.findById.mockResolvedValue(user);
    Message.prototype.save.mockResolvedValue(message);

    await createMessage(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: message,
    });
  });

  it("should return a 404 error when ticket is not found", async () => {
    Ticket.findOne.mockResolvedValueOnce(null); // Mock for ticket existence check

    await createMessage(req, res, next);

    expect(next).toHaveBeenCalledWith(appErr("not found", 404));
  });

  it("should return a 401 error when user does not have access", async () => {
    Ticket.findOne
      .mockResolvedValueOnce(null) // Mock for ticket check with user access
      .mockResolvedValueOnce({ _id: "ticketId" }); // Mock for ticket existence check

    await createMessage(req, res, next);

    expect(next).toHaveBeenCalledWith(appErr("you dont have access", 401));
  });

  it("should call next with an error if an exception is thrown", async () => {
    const error = new Error("Some error");
    Ticket.findOne.mockRejectedValue(error);

    await createMessage(req, res, next);

    expect(next).toHaveBeenCalledWith(appErr(error.message));
  });
});
