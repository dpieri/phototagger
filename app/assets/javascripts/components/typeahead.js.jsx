var TypeAhead = React.createClass({
  propTypes: {
    x1: React.PropTypes.number,
    y1: React.PropTypes.number,
    x2: React.PropTypes.number,
    y2: React.PropTypes.number,
  },

  componentDidMount: function() {
    $(React.findDOMNode(this.refs.typeahead)).typeahead({
      source: commonWords,
      items: 5,
      autoSelect: false,
      updater: function(item) {
        console.log('updated');
        // I think this is where we submit the item
        return item;
      },
      afterSelect: function(item) {
        console.log('after select');
        return item;
      }
    })
  },

  render: function() {
    var containerStyle = {
      top: this.props.y2 + "px",
      left: this.props.x1 + "px"
    }
    return (
      <div style={containerStyle} className="typeahead-holder" >
        <input ref="typeahead" type="text" data-provide="typeahead" autoComplete="off" />
      </div>
    );
  }
});
