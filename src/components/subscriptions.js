import React, { Component } from 'react';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {

      email: '',
      success: false,
      error: false

    }

  }

  saveSubscription = (email) => {

    const URL_EMAIL = 'http://localhost:3004/subcriptions';

    fetch(URL_EMAIL, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      // when send post data are sending JSON, need to convert
      body: JSON.stringify({email})

    }).then(res => res.json())
      .then(() => {

        this.setState({

          email: '',  // clear input field
          success: true

        })

      })

  }

  clearMessages = () => {

    setTimeout(function() {

      this.setState({

        error: false,
        success: false

      })
      // bind used here to clarify 'this' refers to Subscriptions class and not the 'this' of setTimeout function
    }.bind(this), 3000);

  }

  handleSubmit = (event) => {
    // stops page from reloading
    event.preventDefault();

    let email = this.state.email;
    let regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {

      this.saveSubscription(email)

    } else {

      this.setState({error: true})

    }

    this.clearMessages()

  }

  onChangeInput = (event) => {

    this.setState({

      email: event.target.value

    });

  }

  render() {

    return (

      <div className="subscribe_panel">
        <h3>Subscribe Here</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="youremail@email.com"
              value={this.state.email}
              onChange={this.onChangeInput}
            />
          <div className={this.state.error ? "error show" : "error"}>Check Your Email</div>
        <div className={this.state.success ? "success show" : "success"}>Thanks!</div>
          </form>
          <small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula consequat leo. In et lorem metus. Quisque mattis ligula a erat lacinia elementum. Cras volutpat libero neque, id condimentum quam mollis et.
          </small>
        </div>
      </div>

    )

  }

}

export default Subscriptions;
