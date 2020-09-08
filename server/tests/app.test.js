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

  describe("/users", () => {
    test("GET 200: responds with an array of the user objects ", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body.users.length).toBe(3);
          res.body.users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                user_id: expect.any(Number),
                username: expect.any(String),
                url: expect.any(String),
              })
            );
          });
        });
    });
    test("POST 201: posts the new user with an unique id and status 201 ", () => {
      const newUser = {
        username: "JohnDoe",
        url:
          "https://www.hearingdogs.org.uk/globalassets/sponsor/vesper/sponsor-hearing-dog-puppy-vesper-1-600-x-377.jpg",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then((res) => {
          expect(res.body.user).toEqual(
            expect.objectContaining({
              user_id: expect.any(Number),
              username: "JohnDoe",
              url:
                "https://www.hearingdogs.org.uk/globalassets/sponsor/vesper/sponsor-hearing-dog-puppy-vesper-1-600-x-377.jpg",
            })
          );
        });
    });
  });

  describe("/users/:user_id", () => {
    test("GET 200: responds with the correct user object", () => {
      return request(app)
        .get("/api/users/2")
        .expect(200)
        .then((res) => {
          expect(res.body.users).toEqual(
            expect.objectContaining({
              user_id: 2,
              username: "SamStyles",
              url:
                "https://static.dezeen.com/uploads/2014/01/Manchester-Metropolitan-University-art-school-extension-with-wooden-stairs-and-bridges-by-Feilden-Clegg-Bradley-Studios_dezeen_ss_1.jpg",
            })
          );
        });
    });
    test("PATCH 200: updates the user avatar/url", () => {
      const patchForUser = {
        url: "https://i.ytimg.com/vi/Vp7nW2SP6H8/maxresdefault.jpg",
      };
      return request(app)
        .patch("/api/users/1")
        .send(patchForUser)
        .expect(200)
        .then((res) => {
          expect(res.body.user).toEqual({
            user_id: 1,
            username: "AlexRobu",
            url: "https://i.ytimg.com/vi/Vp7nW2SP6H8/maxresdefault.jpg",
          });
        });
    });
  });
});
