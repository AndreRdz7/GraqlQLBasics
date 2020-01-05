import { GraphQLServer } from "graphql-yoga";

// Type definitions
const typeDefs = `
    type Query{
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;
// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Andre";
    },
    age() {
      return 27;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.6;
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
