var ShowPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    userTags: React.PropTypes.array,
    currentRoute: React.PropTypes.string,
    tag: React.PropTypes.object
  },

  render: function() {
    return (
      <div className="container-fluid">
        <Sidebar userTags={this.props.userTags} currentRoute={this.props.currentRoute}/>
        <div className="col-sm-9 col-sm-offset-3 tagger-holder">
          <ImageShower url={this.props.url} tag={this.props.tag} />
        </div>
      </div>
    );
  }
});
