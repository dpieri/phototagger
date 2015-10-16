var ImageShower = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    tag: React.PropTypes.object,
  },

  render: function() {
    var tag = this.props.tag;
    var tagAreaStyle = {
      top: tag.y1 * 100 + '%',
      right: (1-tag.x2) * 100 + '%',
      bottom: (1-tag.y2) * 100 + '%',
      left: tag.x1 * 100 + '%',
    };

    return (
      <div className="image-holder">
        <img ref="image" src={this.props.url} />
        <div className="tag-area" style={tagAreaStyle}>
          {this.props.tag.tag}
        </div>
      </div>
    );
  }
});
