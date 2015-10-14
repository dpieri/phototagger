var TypeAhead = React.createClass({
  propTypes: {
    url: React.PropTypes.string
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
    return (
      <div>
        <input ref="typeahead" type="text" data-provide="typeahead" autoComplete="off" />
      </div>
    );
  }
});
