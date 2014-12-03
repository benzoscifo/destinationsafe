class Comment < ActiveRecord::Base
  attr_accessible :body, :image, :post_id, :user_id

  belongs_to :Post
  belongs_to :User
end
