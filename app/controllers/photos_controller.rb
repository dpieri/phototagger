class PhotosController < ApplicationController
  before_action :authenticate_user!

  def tag
    photo = fetch_random_photo # This is in ApplicationController
    url_from_flickr_photo(photo)
    @flickr_id = photo.id
    get_tagged_photos
  end

end
