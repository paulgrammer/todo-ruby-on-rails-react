# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    sequence(:title) { |n| "Project #{n}" }

    trait :with_items do
      after(:create) do |project|
        create_list(:item, 3, project: project)
      end
    end
  end
end
