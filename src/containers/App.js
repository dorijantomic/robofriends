import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
import { setSearchField, requestRobots } from "../actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { robots, isPending, error } = state.requestRobots;
  return {
    searchField: state.searchRobots.searchField,
    robots,
    error,
    isPending,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (e) => dispatch(setSearchField(e.target.value)),
  onRequestRobots: () => dispatch(requestRobots()),
});
class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }
  render() {
    const { searchField, onSearchChange, robots } = this.props;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
