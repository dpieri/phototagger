class Tag < ActiveRecord::Base

  validates_presence_of :x1, :y1, :x2, :y2, :user, :photo

  belongs_to :user
  belongs_to :photo
end
