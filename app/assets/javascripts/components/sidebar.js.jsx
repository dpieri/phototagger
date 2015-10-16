var Sidebar = React.createClass({

  render: function() {
    var self = this;
    window.testMe = this.props.userTags;
    if (this.props.userTags.length > 0) {
      var tagsMarkup = _.map(this.props.userTags, function(tag, index){
        var href = '/tags/' + tag.id;
        var activeClass = self.props.currentRoute === href ? 'active' : '';
        var imageUrl = 'https://farm' + tag.photo.farm + '.staticflickr.com/' + tag.photo.server + '/' + tag.photo.flickr_id + '_' + tag.photo.secret + '_s.jpg';
        return (
          <li key={index} className={activeClass}>
            <a href={href} >
              <img src={imageUrl} width="50" height="50" />
              {tag.tag}
            </a>
          </li>
        );
      });
    } else {
      var tagsMarkup = (
        <li className="no-link none-yet">None Yet</li>
      );
    }

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
          <li className="no-link divider">
            My Tagged Photos
          </li>
          {tagsMarkup}
        </ul>

      </div>
    );
  }
});
