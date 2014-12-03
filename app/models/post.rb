class Post < ActiveRecord::Base
  attr_accessible :body, :latitude, :longitude, :title, :user_id

  has_many :Comments
  has_many :Favorites
  belongs_to :User
end
