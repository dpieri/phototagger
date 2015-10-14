var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string
  },

  componentDidMount: function() {
    $(React.findDOMNode(this.refs.image)).imgAreaSelect({
      handles: true,
      onSelectEnd: function() {
        console.log('select end');
        console.log(arguments);
      }
    });
  },

  render: function() {
    return (
      <div>
        <TypeAhead />
        <img ref="image" src={this.props.url} />
      </div>
    );
  }
});
