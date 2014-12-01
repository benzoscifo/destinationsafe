class Comment < ActiveRecord::Base
  attr_accessible :body, :image, :post_id, :user_id
end
