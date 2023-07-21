/*const React = require('react')
class Show extends React.Component {
  render() {
    const fruit = this.props.Fruit
    return (
      <div>
        <h1> Fruits Show Page </h1>
        {' '}
        The {fruit.name} is {fruit.color}.
        {' '}
        {fruit.readyToEat ? ' Its is ready to eat' : ' It is not ready to eat... Cant touch this'}
        {' '}
        <nav>
          <a href="/fruits/">Return to Index</a>
        </nav>
      </div>
    );
  }
}
module.exports = Show;*/

const React = require("react");

class Show extends React.Component {
  render() {
    return (
      <div>
        <h1>Fruits show page</h1>
        The {this.props.fruit.name} is {this.props.fruit.color}
        {this.props.fruit.readyToEat
          ? ` It is ready to eat`
          : ` It is not ready to eat`}
        <nav>
          <a href='/fruits/'>Return to index</a>
        </nav>
      </div>
    );
  }
}
module.exports = Show;