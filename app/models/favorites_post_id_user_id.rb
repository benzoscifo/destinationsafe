class FavoritesPostIdUserId < ActiveRecord::Base
  attr_accessible :is_favorited, :post_id, :user_id

  belongs_to :post, polymorphic: true
  belongs_to :user, inverse_of: :favorites

  validates :user_id, uniqueness: {
    scope: [:favoritable_id, :favoritable_type],
    message: 'can only favorite an item once'
  }

  before_save :associate_user
end
