class TagsController < ApplicationController
  before_action :authenticate_user!

  def create
    tag = current_user.tags.build(tag: params[:tag][:tag])
    tag.assign_attributes(coordinate_params)
    photo = Photo.first_or_create!(flickr_id: params[:flickr_id])
    photo.update!(photo_params)
    tag.photo = photo

    respond_to do |format|
      if tag.save
        get_tagged_photos
        format.json { render json: @user_tags, status: :created }
      else
        format.json { render json: tag.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @tag = Tag.find(params[:id])
    photo = flickr_photo_from_id(@tag.photo.flickr_id) # This is in ApplicationController
    url_from_flickr_photo(photo)
    get_tagged_photos
  end

  private

  def tag_params
    params.require(:tag).permit(:x1, :y1, :x2, :y2, :tag)
  end

  def coordinate_params
    width = params[:tag][:image_width].to_f
    height = params[:tag][:image_height].to_f
    thing = {
      x1: params[:tag][:x1].to_f / width,
      y1: params[:tag][:y1].to_f / height,
      x2: params[:tag][:x2].to_f / width,
      y2: params[:tag][:y2].to_f / height
    }
  end

  def photo_params
    params.require(:photo).permit(:flickr_id, :farm, :server, :secret)
  end

end
