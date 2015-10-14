var TagPhoto = React.createClass({
  propTypes: {
    url: React.PropTypes.string
  },

  componentDidMount: function() {
    $('#testMe').typeahead({
      source: commonWords,
      items: 5,
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
    var testSource = ["Apple", "Bannana", "Pizza"];
    return (
      <div>
        <input type="text" data-provide="typeahead" id="testMe" autoComplete="off" /> <br/>
        <img src={this.props.url} />
      </div>
    );
  }
});
