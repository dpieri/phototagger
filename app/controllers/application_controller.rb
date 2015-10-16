class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def fetch_random_photo
    # flickr = Flickr.new(ENV['FLICKR_KEY'])
    # flickr.photos.first
    [
      {"int_id" => 1, "id"=>"21574628744", "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "owner"=>"124225895@N04", "secret"=>"2c8ef41b5c", "server"=>"5726", "farm"=>"6", "title"=>"", "ispublic"=>"1", "isfriend"=>"0", "isfamily"=>"0", "client"=>{"host"=>"https://api.flickr.com", "api"=>"/services/rest", "verify_ssl"=>true, "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "shared_secret"=>nil, "auth_token"=>nil, "ca_file"=>nil}},
      {"int_id" => 2, "id"=>"21574653474", "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "owner"=>"105837177@N06", "secret"=>"ca4e72fce7", "server"=>"5733", "farm"=>"6", "title"=>"IMAG7742", "ispublic"=>"1", "isfriend"=>"0", "isfamily"=>"0", "client"=>{"host"=>"https://api.flickr.com", "api"=>"/services/rest", "verify_ssl"=>true, "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "shared_secret"=>nil, "auth_token"=>nil, "ca_file"=>nil}},
      {"int_id" => 3, "id"=>"21574661824", "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "owner"=>"128847917@N03", "secret"=>"bb69a5e99b", "server"=>"658", "farm"=>"1", "title"=>"upload", "ispublic"=>"1", "isfriend"=>"0", "isfamily"=>"0", "client"=>{"host"=>"https://api.flickr.com", "api"=>"/services/rest", "verify_ssl"=>true, "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "shared_secret"=>nil, "auth_token"=>nil, "ca_file"=>nil}},
    ].sample
  end

  def flickr_photo_from_id(flickr_id)
    # Flickr::Photo.new(flickr_id, ENV['FLICKR_KEY'])
    [
      {"int_id" => 1, "id"=>"21574628744", "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "owner"=>"124225895@N04", "secret"=>"2c8ef41b5c", "server"=>"5726", "farm"=>"6", "title"=>"", "ispublic"=>"1", "isfriend"=>"0", "isfamily"=>"0", "client"=>{"host"=>"https://api.flickr.com", "api"=>"/services/rest", "verify_ssl"=>true, "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "shared_secret"=>nil, "auth_token"=>nil, "ca_file"=>nil}},
      {"int_id" => 2, "id"=>"21574653474", "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "owner"=>"105837177@N06", "secret"=>"ca4e72fce7", "server"=>"5733", "farm"=>"6", "title"=>"IMAG7742", "ispublic"=>"1", "isfriend"=>"0", "isfamily"=>"0", "client"=>{"host"=>"https://api.flickr.com", "api"=>"/services/rest", "verify_ssl"=>true, "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "shared_secret"=>nil, "auth_token"=>nil, "ca_file"=>nil}},
      {"int_id" => 3, "id"=>"21574661824", "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "owner"=>"128847917@N03", "secret"=>"bb69a5e99b", "server"=>"658", "farm"=>"1", "title"=>"upload", "ispublic"=>"1", "isfriend"=>"0", "isfamily"=>"0", "client"=>{"host"=>"https://api.flickr.com", "api"=>"/services/rest", "verify_ssl"=>true, "api_key"=>"c3bdeb542a02405e7e1ca4788fa4f136", "shared_secret"=>nil, "auth_token"=>nil, "ca_file"=>nil}},
    ].sample
  end

  def url_from_flickr_photo(photo)
    # For some reason this Flickr gem does not give you photo.farm,
    # but it is accessable if you serialize the object
    # photo_json = photo.as_json

    photo_json = photo
    # @photo_url = "https://farm#{photo_json["farm"]}.staticflickr.com/#{photo_json["server"]}/#{photo_json["id"]}_#{photo_json["secret"]}_c.jpg"
    @photo_url = "/assets/#{photo_json['int_id']}.jpg"
  end

  def get_tagged_photos
    @user_tags = current_user.tags.order(created_at: :desc).as_json
  end
end
