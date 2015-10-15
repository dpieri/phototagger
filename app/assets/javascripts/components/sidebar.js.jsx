var Sidebar = React.createClass({

  render: function() {
    var tagsMarkup = _.map(this.props.userTags, function(tag, index){
      return (
        <li key={index}>
          <a href={"/tags/" + tag.id} >{tag.tag}</a>
        </li>
      );
    });
    return (
      <div className="col-sm-3 sidebar">

        <ul className="nav nav-sidebar">
          <li>
            <a href="/users/sign_out">Sign Out</a>
          </li>
        </ul>

        <ul className="nav nav-sidebar">
          {tagsMarkup}
        </ul>

      </div>
    );
  }
});
