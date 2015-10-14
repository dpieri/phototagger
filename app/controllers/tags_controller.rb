class TagsController < ApplicationController
  before_action :authenticate_user!

  def create
    @tag = current_user.tags.build(tag_params)
    puts "TAG"
    puts @tag
    puts @tag.class
    photo = Photo.first_or_create!(flickr_id: params[:flickr_id])
    @tag.photo = photo

    respond_to do |format|
      if @tag.save
        format.json { render json: @tag, status: :created }
      else
        format.json { render json: @tag.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:x1, :y1, :x2, :y2, :tag)
  end

end
