class FavoritesPostIdUserId < ActiveRecord::Base
  attr_accessible :is_favorited, :post_id, :user_id
end
