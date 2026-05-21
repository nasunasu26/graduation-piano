class AddComposerToSongs < ActiveRecord::Migration[7.2]
  def change
    add_column :songs, :composer, :string
  end
end
