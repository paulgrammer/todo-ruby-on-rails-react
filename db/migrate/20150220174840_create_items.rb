# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :description
      t.references :project, index: true
      t.boolean :done, default: false

      t.timestamps
    end
  end
end
