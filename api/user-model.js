const shortid = require("shortid");

let users = [
  {
    id: shortid.generate(),
    name: "Matt Bokovitz",
    bio: "Chasing my dreams in Pennsylvania",
  },
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not the Wife of Tarzan. Another Jane",
  },
  { id: shortid.generate(), name: "Rocky Balboa", bio: "The Boxing Legend" },
];

module.exports = {
  findAll() {
    // SELECT * FROM users;
    return Promise.resolve(users);
  }, // findAll().then().catch()

  findById(id) {
    //SELECT * FROM users WHERE id = 1;
    const user = users.find((u) => u.id === id);
    return Promise.resolve(user);
  },

  create({ name, bio }) {
    const newUser = { id: shortid.generate(), name, bio };
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  update(id, changes) {
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    const updatedUser = { ...changes, id };
    users = users.map((u) => (u.id === id ? updatedUser : u));
    return Promise.resolve(updatedUser);
  },

  delete(id) {
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    users = users.filter((u) => u.id !== id);
    return Promise.resolve(user);
  },
};
