var ImageTagger = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    onTag: React.PropTypes.func,
    loading: React.PropTypes.bool,
    x1: React.PropTypes.string,
    y1: React.PropTypes.string,
    x2: React.PropTypes.string,
    y2: React.PropTypes.string,
    onImageAreaSelected: React.PropTypes.func,
  },

  componentDidMount: function() {
    this.attachImageAreaSelect();
  },

  componentDidUpdate: function() {
    if (!this.props.x2) {
      // If we no longer have an x2 prop, that means we have submitted the tag
      // In that case we want to get rid of the image area plugin and init a new one
      $(React.findDOMNode(this.refs.image)).imgAreaSelect({remove: true});
      this.attachImageAreaSelect();
    }
  },

  attachImageAreaSelect: function() {
    var self = this;
    $(React.findDOMNode(this.refs.image)).imgAreaSelect({
      handles: true,
      onSelectEnd: function(image, cords) {
        self.props.onImageAreaSelected({
          x1: cords.x1,
          y1: cords.y1,
          x2: cords.x2,
          y2: cords.y2,
          imageWidth: self.refs.image.getDOMNode().width,
          imageHeight: self.refs.image.getDOMNode().height,
        });
      }
    });
  },

  onTypeaheadSubmit: function(tag) {
    this.props.onTag(tag);
  },

  render: function() {
    var typeaheadMarkup;
    if (this.props.x2) {
      typeaheadMarkup = (
        <TypeAhead
          x1={this.props.x1}
          y1={this.props.y1}
          x2={this.props.x2}
          y2={this.props.y2}
          imageRef={this.refs.image}
          onSubmit={this.onTypeaheadSubmit}
        />
      );
    }

    var loadingMarkup;
    if (this.props.loading) {
      loadingMarkup = (
        <div className="loading-message">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    var holderClass = "image-holder" + (this.props.loading ? ' loading' : '');

    return (
      <div className={holderClass}>
        <img ref="image" className="img-responsive" src={this.props.url} />
        {typeaheadMarkup}
        {loadingMarkup}
      </div>
    );
  }
});
