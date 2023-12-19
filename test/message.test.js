const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = require("chai").expect;
const request = require("supertest");
const app = require("./../server");
// global.Token = "";

// describe("Register Test", () => {
//   it("Register User", async () => {
//     const res = await request(app).post("/api/v1/user/register").send({
//       firstname: global.dotenv.TEST_FIRSTNAME,
//       lastname: global.dotenv.TEST_LASTNAME,
//       email: global.dotenv.TEST_EMAIL,
//       password: global.dotenv.TEST_PASSWORD,
//     });
//     const data = res.body;
//     expect(res.status).to.equal(200);
//     expect(data.data).to.have.property(
//       "firstname",
//       global.dotenv.TEST_FIRSTNAME
//     );
//     expect(data.data).to.have.property("lastname", global.dotenv.TEST_LASTNAME);
//     expect(data.data).to.have.property("email", global.dotenv.TEST_EMAIL);
//   });
// });

// describe("Login Test", () => {
//   it("Login With Username And Password", async () => {
//     const res = await request(app).post("/api/v1/user/login").send({
//       email: global.dotenv.TEST_EMAIL,
//       password: global.dotenv.TEST_PASSWORD,
//     });
//     const data = res.body;
//     global.Token = data.data.token;
//     expect(res.status).to.equal(200);
//     expect(data.data).to.have.property(
//       "firstname",
//       global.dotenv.TEST_FIRSTNAME
//     );
//     expect(data.data).to.have.property(
//       "lastname",
//       global.dotenv.TEST_FIRSTNAME
//     );
//     expect(data.data).to.have.property("email", global.dotenv.TEST_EMAIL);
//   });
// });

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
