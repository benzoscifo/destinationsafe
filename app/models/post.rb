class Post < ActiveRecord::Base
  attr_accessible :body, :latitude, :longitude, :title, :user_id
end
