var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <img src={this.props.url} />
      </div>
    );
  }
});
