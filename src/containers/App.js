import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox.js';
import { robots } from '../robots';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField } from '../actions'
import ErrorBoundaries from '../components/ErrorBoundary';

const mapStateToProps = state => { //what piece of state do I need to listen to and send it down as props
  return {
    searchField: state.searchField
  }
}
const mapDispatchToProps = (dispatch) => { //what props I should listen to that are actions that need to get dispatched
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: []
    }
  }

  componentDidMount() {
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => {this.setState({ robots: users })});
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    if (!robots.length) {
      return <h1>Loading...</h1>
    } else {
      return(
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundaries>
            <CardList robots={filteredRobots}/>
          </ErrorBoundaries>
        </Scroll>
      </div>
    );
  }
}}
  

export default connect(mapStateToProps, mapDispatchToProps)(App);

