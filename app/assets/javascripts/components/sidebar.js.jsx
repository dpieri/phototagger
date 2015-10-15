var Sidebar = React.createClass({

  render: function() {
    var self = this;
    var tagsMarkup = _.map(this.props.userTags, function(tag, index){
      var href = '/tags/' + tag.id
      var activeClass = self.props.currentRoute === href ? 'active' : ''
      return (
        <li key={index} className={activeClass}>
          <a href={href} >{tag.tag}</a>
        </li>
      );
    });

    return (
      <div className="col-sm-3 sidebar">

        <ul className="nav nav-sidebar">
          <li className={this.props.currentRoute === '/users/sign_out' ? 'active' : ''}>
            <a href="/users/sign_out">Sign Out</a>
          </li>
          <li className={this.props.currentRoute === '/' ? 'active' : ''}>
            <a href="/">Tag Photos</a>
          </li>
        </ul>

        <ul className="nav nav-sidebar tagged-photos">
          <li className="divider">
            My Tagged Photos
          </li>
          {tagsMarkup}
        </ul>

      </div>
    );
  }
});
