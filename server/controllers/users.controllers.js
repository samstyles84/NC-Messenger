const { fetchUsers, patchUser, postUser } = require("../models/users.models");

const sendUsers = (req, res, next) => {
  const { user_id } = req.params;
  fetchUsers(user_id)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const addUser = (req, res, next) => {
  const { username, url } = req.body;

  postUser(username, url)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { username, url } = req.body;
  const { user_id } = req.params;

  patchUser(username, url, user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

// const removeIngredient = (req, res, next) => {
//   const { ingredient_id } = req.params;

//   deleteIngredient(ingredient_id)
//     .then((deletedIngredients) => {
//       if (deletedIngredients) {
//         res.sendStatus(204);
//       } else {
//       }
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

module.exports = { sendUsers, addUser, updateUser };
