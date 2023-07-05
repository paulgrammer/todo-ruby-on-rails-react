class AddDiscardedToProjectsAndItems < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :discarded, :boolean, default: false
    add_column :items, :discarded, :boolean, default: false
  end
end
