const request = require("supertest");
const app = require("../app");
const knex = require("../connection");

describe("app", () => {
  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(() => {
    return knex.destroy();
  });

  test("ALL: 404 - non existent path", () => {});
});
