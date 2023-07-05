# frozen_string_literal: true

class Item < ActiveRecord::Base
  belongs_to :project

  validates :description,
            presence: true,
            uniqueness: { scope: :project_id,
                          message: 'should be unique within a project' }

  scope :complete, -> { where(done: true) }
  scope :incomplete, -> { where(done: false) }
  default_scope { where(discarded: false) }

  def project_title
    project.title
  end
end
