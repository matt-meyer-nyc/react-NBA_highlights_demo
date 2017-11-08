import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

const URL_TEAMSLIST = 'http://localhost:3004/teams';

const fadeAnimation = {

  transitionName: "fade",
  transitionAppear: true,
  transitionAppearTimeout:500,
  transitionEnter: true,
  transitionEnterTimeout: 500,
  transitionLeave: true,
  transitionLeaveTimeout: 500

}

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {

      teams: [],
      filtered: [],
      user_input: ''

    }

  }

  componentDidMount() {

    fetch(URL_TEAMSLIST, {

      method: 'GET'

    }).then(res => res.json())
      .then(json => {

        this.setState({

          teams: json,
          filtered: json

        })

      });

  }

  searchTeam = (event) => {

    const user_input = event.target.value;

    if (user_input !== '') {

      const filteredList = this.state.teams.filter((item) => {

        return item.name.toLowerCase().indexOf(user_input.toLowerCase()) > -1;

      });

      this.setState({

        filtered: filteredList,
        user_input // > this is condensed from user_input: user_input

      })

    } else {

      this.setState({

        filtered: this.state.teams,
        user_input  // > this is condensed from user_input: user_input

      });

    }

  }

  renderList = ({filtered}) => {

    return filtered.map((item) => {

      return (

        <Link to={`/team/${item.name}`} key={item.id} className="team_item">
          <img alt={item.name} src={`/images/teams/${item.logo}`} />
        </Link>

      )

    });

  }

  render() {

    return (

      <div className="teams_component">
        <div className="teams_input">
          <input
            value={this.state.user_input}
            type="text"
            placeholder="Search for Your Team"
            onChange={event => this.searchTeam(event)}
          />
        </div>
        <div className="teams_container">
          <CSSTransitionGroup {...fadeAnimation}>
            {this.renderList(this.state)}
          </CSSTransitionGroup>
        </div>
      </div>

    );

  }

}

export default Teams;
