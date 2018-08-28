import React, { Component } from "react";
import User from '../../presentation/User';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
  }

  getUsersFromApi = () => {
    
    fetch('https://reqres.in/api/users?page=1&per_page=10')
    .then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        
          let { data } = res.data;
          if(data.length > 0){
            // @existingUsersArr holds the users id already present in state
            let existingUsersArr = this.state.users.map( (user) => {
                return user.id
            });
      
            // @newUsersList holds user ids which are not already present in state
            let newUsersList = data.filter( (user) => {
              return (!existingUsersArr.includes(user.id))
            });

            // @updatedUsers holds unique users and no duplicates
            let updatedUsers = [...this.state.users, ...newUsersList];
            
            // updating users list in state after filtering duplicate
            this.setState({
                users: updatedUsers
            })
          }
        
    }))
    .catch( error => console.error(error));
  }

  componentDidMount(){
      // Call method to fetch users list and change state data
      this.getUsersFromApi(); 
  }

  deleteUserHandler = (e, id) => {
    e.preventDefault();
    let usersList = [...this.state.users];
    // @updatedUsersList holds the users list after filtering deleted user
    let updatedUsersList = usersList.filter( (user) => {
        return user.id !== id;
    });

    // updating state after deleting user
    this.setState({
        users: updatedUsersList
    })
  }

  render() {
    let usersList = null;
    if(this.state.users.length > 0){
      usersList = this.state.users.map( (user) => {
          return <User 
                    key={user.id} 
                    userId={user.id}
                    firstName={user.first_name} 
                    lastName={user.last_name}
                    profileAvatar={user.avatar}
                    deleteUser={(e, id) => this.deleteUserHandler(e, id)} /> 
      });
    }

    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        <div className="users-list-box">
          <div className="inner-user-box">
            <ul className="users-box">
              { /* When there will be no users then message will be displayed "No users found!". This situation would arise when we delete all users by clicking delete. */}
              {this.state.users.length > 0 ? usersList : <div className="no-user-msg">No users found!</div>}
            </ul>
          </div>
        </div>    
      </div>
    );
  }
}
export default Users;