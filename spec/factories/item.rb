# frozen_string_literal: true

FactoryBot.define do
  factory :item do
    sequence(:description) { |n| "Item #{n}" }
    association :project
    done { false }
    discarded { false }
  end
end
