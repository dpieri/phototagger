var TypeAhead = React.createClass({
  propTypes: {
    x1: React.PropTypes.number,
    y1: React.PropTypes.number,
    x2: React.PropTypes.number,
    y2: React.PropTypes.number,
    onSubmit: React.PropTypes.func,
  },

  getInitialState: function() {
    return {inputVal: null};
  },

  componentDidMount: function() {
    var self = this;
    $(React.findDOMNode(this.refs.typeahead)).typeahead({
      source: this.queryAutocomplete,
      items: 5,
      minLength: 2,
      autoSelect: false,
      afterSelect: function(item) {
        self.props.onSubmit(item);
      }
    }).focus();
  },

  queryAutocomplete: function(query, process) {
    $.ajax('/search_suggestions', {
      data: {
        term: query
      }
    })
    .fail(this.onQueryAutocompleteFail)
    .done(function(data, textStatus, jqXHR) {
      console.log(data);
      process(data);
    });
  },

  onQueryAutocompleteFail: function(jqXHR, textStatus, errorThrown) {
    // Fail silently for now
  },

  containerRight: function() {
    var diff = this.props.x2 - this.props.x1;
    return this.props.imageRef.getDOMNode().width - Math.max(diff, 250) - this.props.x1
  },

  onChange: function() {
    var inputVal = this.refs.typeahead.getDOMNode().value;
    this.setState({
      inputVal: inputVal
    })
  },

  onKeyPress: function(e) {
    if (e.nativeEvent.keyCode === 13) { // Enter
      this.props.onSubmit(this.state.inputVal);
    }
  },

  render: function() {
    var containerStyle = {
      top: this.props.y2 + "px",
      left: this.props.x1 + "px",
      right: this.containerRight() + "px"
    };

    var hintStyle = {
      display : this.state.inputVal ? 'block' : 'none',
    };

    return (
      <div className="popover bottom typeahead-holder" role="tooltip" style={containerStyle}>
        <div className="arrow"></div>
        <div className="popover-content">
          <input ref="typeahead"
              className="form-control input-lg"
              type="text"
              data-provide="typeahead"
              autoComplete="off"
              placeholder="Tag this section"
              value={this.state.inputVal}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              value={this.state.inputVal}
            />
          <span className="hint" style={hintStyle}>Enter to submit</span>
        </div>
      </div>
    );
  }
});
