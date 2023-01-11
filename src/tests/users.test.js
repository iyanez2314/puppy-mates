const request = require("supertest");
const app = require("../index");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
