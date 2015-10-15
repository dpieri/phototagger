var ImageShower = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
  },

  render: function() {
    return (
      <div className="image-holder">
        <img ref="image" src={this.props.url} />
      </div>
    );
  }
});
