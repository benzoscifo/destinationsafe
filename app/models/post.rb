class Post < ActiveRecord::Base
  attr_accessible :body, :latitude, :longitude, :title, :user_id

  geocoded_by :title
  after_validation :geocode
  # after_validation :geocode, :if => :address_changed?
  has_many :comments, :dependent => :destroy
  has_many :favorites, as: :favoritable
  belongs_to :User
end
