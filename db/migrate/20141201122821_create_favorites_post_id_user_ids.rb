class CreateFavoritesPostIdUserIds < ActiveRecord::Migration
  def change
    create_table :favorites_post_id_user_ids do |t|
      t.integer :post_id
      t.integer :user_id
      t.boolean :is_favorited

      t.timestamps
    end
  end
end
