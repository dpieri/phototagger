var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    flickrId: React.PropTypes.string,
    userTags: React.PropTypes.array,
    farm: React.PropTypes.string,
    server: React.PropTypes.string,
    secret: React.PropTypes.string,
  },

  getInitialState: function() {
    return {errorMessage: null};
  },

  onTag: function(tag, cords) {
    $.ajax('/tags', {
      method: 'POST',
      data: {
        photo: {
          flickr_id: this.props.flickrId,
          farm: this.props.farm,
          server: this.props.server,
          secret: this.props.secret,
        },
        tag: {
          tag: tag,
          x1: cords.x1,
          y1: cords.y1,
          x2: cords.x2,
          y2: cords.y2,
          image_width: cords.imageWidth,
          image_height: cords.imageHeight,
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

    if (this.state.savedTag) {
      aboveImageMarkup = (
        <a className="btn btn-success" onClick={this.refresh}>
          Saved! Tag another.
        </a>
      );
    } else {
      aboveImageMarkup = (
        <span>Image Taggr</span>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar userTags={this.props.userTags}/>
          <div className="col-sm-9 col-sm-offset-3 tagger-holder">
            {errorMarkup}
            <div className="above-image">
              {aboveImageMarkup}
            </div>
            <ImageTagger url={this.props.url} onTag={this.onTag} />
          </div>
        </div>
      </div>
    );
  }
});
