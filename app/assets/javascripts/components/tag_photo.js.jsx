var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <TypeAhead />
        <img src={this.props.url} />
      </div>
    );
  }
});
