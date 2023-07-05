# frozen_string_literal: true

class Project < ActiveRecord::Base
  has_many :items, dependent: :destroy

  validates :title, presence: true, uniqueness: { case_sensitive: false }

  default_scope { where(discarded: false) }

  after_update :update_items

  private

  def update_items
    if discarded_changed?
      items.update_all(discarded: discarded)
    end
  end
end
