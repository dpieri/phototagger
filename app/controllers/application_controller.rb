class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def fetch_random_photo
    flickr = Flickr.new(ENV['FLICKR_KEY'])
    flickr.photos.first
  end

  def url_from_flickr_photo(photo)
    # For some reason this Flickr gem does not give you photo.farm,
    # but it is accessable if you serialize the object
    photo_json = photo.as_json

    @photo_url = "https://farm#{photo_json["farm"]}.staticflickr.com/#{photo_json["server"]}/#{photo_json["id"]}_#{photo_json["secret"]}_c.jpg"
  end

  def url_from_saved_photo(photo)
    @photo_url = "https://farm#{photo.farm}.staticflickr.com/#{photo.server}/#{photo.flickr_id}_#{photo.secret}_c.jpg"
  end

  def get_tagged_photos
    @user_tags = current_user.tags.order(created_at: :desc).as_json
  end
end
