import React, {Component, Fragment} from "react";
import axios from "axios";;

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox"
      ? target.checked
      : target.value;

    this.setState({[name]: value});
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        // console.log(response.data); {   account: { username: "Farid" },   token:
        // "Ii0HYfXTN7L2SMoL",   _id: "5b4ceb668c2a9a001440b2fb" };

        if (response.data && response.data.token) {
          this
            .props
            .setUser({token: response.data.token, username: response.data.account.username, _id: response.data._id});

          this
            .props
            .history
            .push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}/>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}/>
          <button type="submit">Valider</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
