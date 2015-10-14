var TypeAhead = React.createClass({
  propTypes: {
    x1: React.PropTypes.number,
    y1: React.PropTypes.number,
    x2: React.PropTypes.number,
    y2: React.PropTypes.number,
    inputVal: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
  },

  getInitialState: function() {
    return {inputVal: null};
  },

  componentDidMount: function() {
    var self = this;
    $(React.findDOMNode(this.refs.typeahead)).typeahead({
      source: commonWords,
      items: 5,
      autoSelect: false,
      afterSelect: function(item) {
        self.props.onSubmit(item);
      }
    })
  },

  onChange: function() {
    console.log('onChange');
  },

  render: function() {
    var containerStyle = {
      top: this.props.y2 + "px",
      left: this.props.x1 + "px"
    }
    return (
      <div style={containerStyle} className="typeahead-holder" >
        <input ref="typeahead"
            type="text"
            data-provide="typeahead"
            autoComplete="off"
            value={this.state.inputVal}
            onChange={this.onChange}
          />
      </div>
    );
  }
});
