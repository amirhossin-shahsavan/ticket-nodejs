const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = require("chai").expect;
const request = require("supertest");
const app = require("./../server");
global.Token = "";

describe("Login Test", () => {
  it("Login With Username And Password", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: global.dotenv.TEST_EMAIL,
      password: global.dotenv.TEST_PASSWORD,
    });
    const data = res.body;
    global.Token = data.data.token;
    expect(res.status).to.equal(200);
    expect(data.data).to.have.property(
      "firstname",
      global.dotenv.TEST_FIRSTNAME
    );
    expect(data.data).to.have.property(
      "lastname",
      global.dotenv.TEST_FIRSTNAME
    );
    expect(data.data).to.have.property("email", global.dotenv.TEST_EMAIL);
  });
});

describe("Create Ticket", () => {
  it("Creating Ticket", async () => {
    const send = {
      title: global.dotenv.TEST_TITLE,
      description: global.dotenv.TEST_DESCRIPTION,
      categoryid: global.dotenv.TEST_CATEGORYID,
    };
    const res = await request(app)
      .post("/api/v1/ticket")
      .send(send)
      .set({
        Authorization: "Bearer " + global.Token,
        Accept: "application/json",
      });
    const data = res.body;
    expect(res.status).to.equal(200);
    expect(data.data).to.have.property("title", global.dotenv.TEST_TITLE);
    expect(data.data).to.have.property(
      "description",
      global.dotenv.TEST_DESCRIPTION
    );
    expect(data.data).to.have.property(
      "category_Id",
      global.dotenv.TEST_CATEGORYID
    );
  });
});

describe("PUT Message /:id", () => {
  it("should update the existing message and return 200", async () => {
    const user = new User({
      name: "lola",
      email: "lola@gmail.com",
      country: "spain",
    });
    await user.save();

    const res = await request(app)
      .put("/api/users/" + global.TicketID)
      .send({
        name: "juan",
        email: "juan@gmail.com",
        country: "spain",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name", "juan");
    expect(res.body).to.have.property("email", "juan@gmail.com");
    expect(res.body).to.have.property("country", "spain");
  });
});

describe("DELETE /:id", () => {
  it("should delete requested id and return response 200", async () => {
    
    const res = await request(app).delete("/api/users/" + global.TicketID);
    expect(res.status).to.be.equal(200);
  });
});
