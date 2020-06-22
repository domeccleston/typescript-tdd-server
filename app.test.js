const request = require("supertest");
const app = require("./app");
const db = require("./db");

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
      .then((response) => {
        expect(response.body.message).toBe(testPost.message);
      });
  });
});

describe("Test data fetching from the database", async () => {
    const testUserGet = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response)
})

// TODO user can get users from db



// TODO user can add a user to db
// TODO user can change a user's details in db
// TODO user can delete a user's details from db
