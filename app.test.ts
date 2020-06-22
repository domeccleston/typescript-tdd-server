const request = require("supertest");
const app = require("./app");
const db = require("./db");
import { Person, Product } from "./types";

describe("Test the root path", () => {
  test("Should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("App can receive POST requests", () => {
    const testPost = { message: "POST test" };
    return request(app)
      .post("/api/post")
      .send(testPost)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response: any) => {
        expect(response.body.message).toBe(testPost.message);
      });
  });
});

// TODO user can get users from db

describe("Test data fetching from the database", async () => {
  it("responds with an array of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toHaveLength(0);
  });
});

// TODO user can add a user to db

describe("Test ability to add a user to db", () => {
  it("responds with a 200 after sending a dummy user", (done) => {
    const testUser = { first_name: "Fernando", last_name: "Testarossa" };
    request(app)
      .post("/api/users/")
      .send(testUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);
        done();
      });
  });
});

// TODO user can change a user's details in db

describe("Test changing a user's details", () => {
  it("responds with a 200 to a PUT request", (done) => {
    request(app)
      .put("/api/users/1")
      .send({ first_name: "testname" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);
        done();
      });
  });
});

// TODO user can delete a user's details from db

describe("Test deleting a user from db", () => {
  it("responds with a 200 to a DELETE request", (done) => {
    request(app)
      .delete("/api/users/1")
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);
        done();
      });
  });
});
