import { GraphQLServer } from "graphql-yoga";

// Type definitions
const typeDefs = `
    type Query{
        hello: String!
    }
`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Query Test";
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
