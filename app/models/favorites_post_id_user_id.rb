class FavoritesPostIdUserId < ActiveRecord::Base
  attr_accessible :is_favorited, :post_id, :user_id

  belongs_to :Post
  belongs_to :User
end
