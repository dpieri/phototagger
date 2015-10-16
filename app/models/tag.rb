class Tag < ActiveRecord::Base

  validates_presence_of :x1, :y1, :x2, :y2, :user, :photo

  belongs_to :user
  belongs_to :photo

  # for json rendering
  def as_json(options={})
    super().merge(:photo => photo.as_json)
  end
end
