import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import "./App.css";

// const userQuery = gql`
//   {
//     users {
//       id
//       firstName
//       lastName
//     }
//   }
// `;

const userByIdQuery = gql`
  query usersById($id: Int!) {
    usersById(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

const NameList = ({ id }) => {
  console.log(id);
  return (
    id && (
      <Query query={userByIdQuery} variables={{ id: Number(id) }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const users = [data.usersById];

          return (
            <div>
              {users.map(i => (
                <div className="col-12" key={i.id}>
                  {i.firstName} {i.lastName}
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    )
  );
};

class App extends PureComponent {
  state = {
    id: null
  };

  fetchUserById = async () => {
    const res = await this.props.client
      .query({
        query: userByIdQuery,
        variables: {
          id: 1
        }
      })
      .catch(e => console.warn(e));
    console.log(res);
  };

  render() {
    return (
      <div className="App container">
        <label className="">Thing</label>
        <input
          type="text"
          onChange={e =>
            this.setState({
              id: e.target.value
            })
          }
        />
        <NameList id={this.state.id} />
      </div>
    );
  }
}

export default App;
