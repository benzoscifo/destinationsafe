class Comment < ActiveRecord::Base
  attr_accessible :body, :image, :post_id, :user_id, :post, :user

  belongs_to :post
  belongs_to :user
end
