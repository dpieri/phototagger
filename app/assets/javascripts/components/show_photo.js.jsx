var ShowPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    userTags: React.PropTypes.array,
  },

  render: function() {
    return (
      <div className="container-fluid">
        <Sidebar userTags={this.props.userTags}/>
        <div className="col-sm-9">
          <ImageShower url={this.props.url} />
        </div>
      </div>
    );
  }
});
