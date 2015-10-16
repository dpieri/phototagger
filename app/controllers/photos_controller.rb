class PhotosController < ApplicationController
  before_action :authenticate_user!

  def tag
    photo = fetch_random_photo # This is in ApplicationController
    url_from_flickr_photo(photo)
    @flickr_id = photo["id"]
    @farm = photo["farm"]
    @server = photo["server"]
    @secret = photo["secret"]
    get_tagged_photos

    respond_to do |format|
      format.json { render json: vars_as_json, status: :created }
      format.html { render :tag}
    end
  end

  private

  def vars_as_json
    {
      flickrId: @flickr_id,
      url: @photo_url,
      farm: @farm,
      server: @server,
      secret: @secret
    }
  end

end
