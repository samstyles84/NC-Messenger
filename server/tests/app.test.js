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
    test("DELETE 204: deletes the user information for the given id and checks if id was deleted ", () => {
      return request(app)
        .delete("/api/users/1")
        .expect(204)
        .then(() => {
          return request(app)
            .get("/api/users")
            .then((res) => {
              expect(res.body.users.every((user) => user.user_id !== 1)).toBe(
                true
              );
            });
        });
    });
  });
  describe("/api errors", () => {
    test("ALL: 404 - non existent path", () => {
      return request(app)
        .get("/not-a-route")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Path not found! :-(");
        });
    });
    // test("INVALID METHODS: 405 error", () => {
    //   const invalidMethods = ["put", "post", "patch", "delete"];
    //   const endPoint = "/api";

    //   const promises = invalidMethods.map((method) => {
    //     return request(app)
    //       [method](endPoint)
    //       .expect(405)
    //       .then(({ body: { msg } }) => {
    //         expect(msg).toBe("method not allowed!!!");
    //       });
    //   });
    //   return Promise.all(promises);
    // });
  });
  describe("/users errors", () => {
    test("POST: 400 - Bad Request status code when `POST` request does not include all the required keys", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "butter_bridge",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request to db!!!");
        });
    });
    test("INVALID METHODS: 405 error", () => {
      const invalidMethods = ["put", "patch", "delete"];
      const endPoint = "/api/users/";
      const promises = invalidMethods.map((method) => {
        return request(app)
          [method](endPoint)
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("method not allowed!!!");
          });
      });
      return Promise.all(promises);
    });
  });
  describe("/users/:user_id errors", () => {
    test("GET: 404 - user_id doesn't exist in the database", () => {
      const apiString = `/api/users/999`;
      return request(app)
        .get(apiString)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("user id not found");
        });
    });
    test("GET: 400 - Badly formed user_id", () => {
      const apiString = `/api/users/sam`;
      return request(app)
        .get(apiString)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request to db!!!");
        });
    });
    test("INVALID METHODS: 405 error", () => {
      const invalidMethods = ["put", "post"];
      const endPoint = "/api/users/1";
      const promises = invalidMethods.map((method) => {
        return request(app)
          [method](endPoint)
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("method not allowed!!!");
          });
      });
      return Promise.all(promises);
    });
    test("PATCH: 404 - User doesn't exist in the database", () => {
      const apiString = `/api/users/999`;
      return request(app)
        .patch("/api/users/999")
        .send({
          username: "Corned Beef 2",
          url: "Store cupboard",
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("user id not found");
        });
    });
    test("PATCH: 400 - Badly formed user_id", () => {
      const apiString = `/api/users/sam`;
      return request(app)
        .patch("/api/users/sam")
        .send({
          username: "Corned Beef 2",
          url: "Store cupboard",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request to db!!!");
        });
    });
    test("DELETE: 400 - Badly formed user_id", () => {
      const apiString = `/api/users/sam`;
      return request(app)
        .delete("/api/users/sam")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request to db!!!");
        });
    });
    test("DELETE: 404 - User doesn't exist in the database", () => {
      const apiString = `/api/users/999`;
      return request(app)
        .delete("/api/users/999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("user id not found");
        });
    });
  });
  // describe("/api/ - get all the available endpoints", () => {
  //   test("returns a json object with the available methods", () => {
  //     return request(app)
  //       .get("/api")
  //       .expect(200)
  //       .then((result) => {
  //         expect(result.body).toEqual(expect.any(Object));
  //       });
  //   });
  //   test("returns a json object with the available methods", () => {
  //     return request(app)
  //       .get("/api/")
  //       .expect(200)
  //       .then((result) => {
  //         console.log(result.body, "result.body");
  //         expect(result.body).toEqual(expect.any(Object));
  //       });
  //   });
  // });
});
