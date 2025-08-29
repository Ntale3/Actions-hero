const request = require("supertest");
const app = require("../src/app");

describe("web route tests", () => {
  it("GET /health -> ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });

  it("GET /api/v1/hello -> default greeting", async () => {
    const res = await request(app).get("/api/v1/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello, world!" });
  });

  it("GET /api/v1/hello?name=Ntale -> personalized greeting", async () => {
    const res = await request(app).get("/api/v1/hello").query({ name: "Ntale" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello, Ntale!" });
  });

  it("POST /api/v1/echo -> echoes payload", async () => {
    const payload = { a: 1, b: "two" };
    const res = await request(app).post("/api/v1/echo").send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ received: payload });
  });

  it("Items CRUD happy path", async () => {
    const create = await request(app).post("/api/v1/items").send({ name: "Book" });
    expect(create.statusCode).toBe(201);
    expect(create.body.item).toHaveProperty("id");
    const id = create.body.item.id;

    const list = await request(app).get("/api/v1/items");
    expect(list.statusCode).toBe(200);
    expect(list.body.items.length).toBeGreaterThanOrEqual(1);

    const getOne = await request(app).get(`/api/v1/items/${id}`);
    expect(getOne.statusCode).toBe(200);
    expect(getOne.body.item.name).toBe("Book");

    const del = await request(app).delete(`/api/v1/items/${id}`);
    expect(del.statusCode).toBe(204);
  });

  it("POST /api/v1/items validation -> 400", async () => {
    const res = await request(app).post("/api/v1/items").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

});
