var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    flickrId: React.PropTypes.string,
  },

  getInitialState: function() {
    return {errorMessage: null};
  },

  onTag: function(tag, cords) {
    $.ajax('/tags', {
      method: 'POST',
      data: {
        flickr_id: this.props.flickrId,
        tag: {
          tag: tag,
          x1: cords.x1,
          y1: cords.y1,
          x2: cords.x2,
          y2: cords.y2,
        }
      }
    }).done(this.onSuccess).fail(this.onFailure);
  },

  onSuccess: function(data, textStatus, jqXHR) {
    this.setState({
      savedTag: true
    });
  },

  onFailure: function( jqXHR, textStatus, errorThrown) {
    this.setState({
      errorMessage: errorThrown
    });
  },

  refresh: function() {
    window.location.reload();
  },

  render: function() {
    var errorMarkup = null;
    if (this.state.errorMessage) {
      errorMarkup = (
        <div className="alert alert-danger">
          Oops, it looks like we had trouble saving that tag: {this.state.errorMessage}
        </div>
      );
    }

    var nextButtonMarkup = null;
    if (this.state.savedTag) {
      nextButtonMarkup = (
        <a className="btn btn-block btn-success" onClick={this.refresh}>
          Saved! Tag another.
        </a>
      );
    }

    return (
      <div className="container">
        {errorMarkup}
        {nextButtonMarkup}
        <ImageTagger url={this.props.url} onTag={this.onTag} />
      </div>
    );
  }
});
