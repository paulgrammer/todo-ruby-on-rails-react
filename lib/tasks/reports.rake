# frozen_string_literal: true

namespace :todo do
  namespace :reports do
    desc 'Generate a CSV report of completed Items'
    task csv: :environment do
      CompletedItemsCsvExporter.new.export!
    end
  end

  desc 'Output all projects and their todo items'
  task items: :environment do
    ProjectItemsList.list
  end
end
