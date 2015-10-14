var ImageTagger = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    onTag: React.PropTypes.func,
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
    var self = this;
    $(React.findDOMNode(this.refs.image)).imgAreaSelect({
      handles: true,
      onSelectEnd: function(image, cords) {
        self.setState({
          x1: cords.x1,
          y1: cords.y1,
          x2: cords.x2,
          y2: cords.y2,
        });
      }
    });
  },

  onTypeaheadSubmit: function(tag) {
    var cords = {
      x1: this.state.x1,
      y1: this.state.y1,
      x2: this.state.x2,
      y2: this.state.y2,
    };
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
          onSubmit={this.onTypeaheadSubmit}
        />
      );
    }

    return (
      <div className="image-holder">
        <img ref="image" src={this.props.url} />
        {typeaheadMarkup}
      </div>
    );
  }
});
