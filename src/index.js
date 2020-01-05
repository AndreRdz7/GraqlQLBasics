import { GraphQLServer } from "graphql-yoga";

const users = [
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

const posts = [
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

// Type definitions
const typeDefs = `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      me: User!
      post: Post!
    }
    
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
    }
`;
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return post.title.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    me() {
      return {
        id: "123",
        name: "Andre",
        email: "andrerome@geekyducky.com",
        age: 22
      };
    },
    post() {
      return {
        id: "123",
        title: "Ola",
        body: "k ase",
        published: false
      };
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("Up and Running");
});
