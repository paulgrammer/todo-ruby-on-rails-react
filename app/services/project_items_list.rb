# frozen_string_literal: true

class ProjectItemsList
  def self.list
    projects = Project.includes(:items)
    output = []
    projects.each do |project|
      output << "> #{project.title}"

      project.items.each do |item|
        completion_status = item.done ? 'X' : ' '
        output << "> - [#{completion_status}] #{item.description}"
      end
    end

    $stdout.puts output.join("\n")
  end
end

