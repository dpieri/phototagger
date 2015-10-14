class PhotosController < ApplicationController

  def tag
    fetch_random_photo
  end

  private

  def fetch_random_photo
    flickr = Flickr.new(ENV['FLICKR_KEY'])
    photo = flickr.photos.first

    # For some reason this Flickr gem does not give you photo.farm,
    # but it is accessable if you serialize the object
    # Also for some reason, photo.to_json returns a JSON string
    photo_json = JSON.parse(photo.to_json)

    @photo_url = "https://farm#{photo_json["farm"]}.staticflickr.com/#{photo_json["server"]}/#{photo_json["id"]}_#{photo_json["secret"]}_c.jpg"
  end

end
