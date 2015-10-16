var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    flickrId: React.PropTypes.string,
    userTags: React.PropTypes.array,
    farm: React.PropTypes.string,
    server: React.PropTypes.string,
    secret: React.PropTypes.string,
    currentRoute: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      errorMessage: null,
      loading: false,
    };
  },

  submitTag: function(tag, cords) {
    this.setState({loading: true});
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
    }).done(this.onSubmitTag).fail(this.onFailure);
  },

  onSubmitTag: function(data, textStatus, jqXHR) {
    this.setProps({
      userTags: data
    });
    this.setState({
      savedTag: true,
      loading: false,
    });
  },

  onFailure: function( jqXHR, textStatus, errorThrown) {
    this.setState({
      errorMessage: errorThrown,
      loading: false,
    });
  },

  fetchNewPhoto: function() {
    this.setState({loading: true});
    $.ajax( '/' ).done(this.onFetchNewPhoto).fail(this.onFailure);
  },

  onFetchNewPhoto: function(data, textStatus, jqXHR) {
    this.setProps(data);
    this.setState({
      savedTag: false,
      loading: false,
    });
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
        <a className="btn btn-success" onClick={this.fetchNewPhoto}>
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
          <Sidebar userTags={this.props.userTags} currentRoute={this.props.currentRoute}/>
          <div className="col-sm-9 col-sm-offset-3 tagger-holder">
            {errorMarkup}
            <div className="above-image">
              {aboveImageMarkup}
            </div>
            <ImageTagger url={this.props.url} onTag={this.submitTag} loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
});
