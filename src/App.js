import React, { Component } from "react"; // 16.0.0
import ApolloClient from "apollo-client-preset"; // 1.0.1
import { graphql, ApolloProvider } from "react-apollo"; // 2.0.0
import { BatchHttpLink } from "apollo-link-batch-http"; // 1.0.0
import gql from "graphql-tag"; // 2.5.0

const client = new ApolloClient({
  link: new BatchHttpLink({
    uri: "https://api.graph.cool/simple/v1/cj96xwateatkv01264g1xith2"
  }),
  queryDeduplication: true
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <GreetUser id="cj96ydmq34cqj0104r5ddv66a" />
          <GreetUser id="cj96ydmq34cqj0104r5ddv66a" />
        </div>
      </ApolloProvider>
    );
  }
}

class Greeter extends Component {
  render() {
    return (
      <div>
        {this.props.data.loading
          ? "Loading..."
          : `Hi ${this.props.data.People && this.props.data.People.login}!`}
      </div>
    );
  }
}

const query = gql`
  query People($id: ID!) {
    People(id: $id) {
      id
      login
    }
  }
`;

const GreetUser = graphql(query, {
  options: props => ({
    fetchPolicy: "cache-and-network",
    variables: { id: props.id }
  })
})(Greeter);

export default App;
