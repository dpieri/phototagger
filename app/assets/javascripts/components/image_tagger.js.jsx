var ImageTagger = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    onTag: React.PropTypes.func,
    loading: React.PropTypes.bool,
  },

  getInitialState: function() {
    return {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
    };
  },

  componentDidMount: function() {
    this.attachImageAreaSelect();
  },

  componentWillReceiveProps: function() {
    this.attachImageAreaSelect();
  },

  attachImageAreaSelect: function() {
    var self = this;
    $(React.findDOMNode(this.refs.image)).imgAreaSelect({
      handles: true,
      onSelectEnd: function(image, cords) {
        self.setState({
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
    var cords = this.state;
    this.props.onTag(tag, cords);
  },

  render: function() {
    var typeaheadMarkup;
    if (this.state.x2) {
      typeaheadMarkup = (
        <TypeAhead
          x1={this.state.x1}
          y1={this.state.y1}
          x2={this.state.x2}
          y2={this.state.y2}
          imageRef={this.refs.image}
          onSubmit={this.onTypeaheadSubmit}
        />
      );
    }

    var loadingMarkup;
    if (this.props.loading) {
      loadingMarkup = (
        <div className="loading-message">Loading...</div>
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
