class AddSlugToSongs < ActiveRecord::Migration[7.2]
  def change
    add_column :songs, :slug, :string
  end
end
