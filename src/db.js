let users = [
  {
    id: "1",
    name: "Andre",
    email: "hola@hola.com",
    age: 22
  },
  {
    id: "2",
    name: "Pato",
    email: "hola@hola.com",
    age: 22
  }
];

let posts = [
  {
    id: "1",
    title: "JS",
    body: "some body once told me...",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "C++",
    body: "some body once told me...",
    published: true,
    author: "2"
  }
];

let comments = [
  {
    id: "102",
    text: "This is a comment",
    author: "2",
    post: "1"
  },
  {
    id: "103",
    text: "This is a comment too",
    author: "1",
    post: "2"
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
