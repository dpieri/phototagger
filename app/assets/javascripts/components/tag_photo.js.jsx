var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="container">
        <ImageTagger url={this.props.url} />
      </div>
    );
  }
});
