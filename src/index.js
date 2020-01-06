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

const comments = [
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

// Type definitions
const typeDefs = `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!
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

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
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
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
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
