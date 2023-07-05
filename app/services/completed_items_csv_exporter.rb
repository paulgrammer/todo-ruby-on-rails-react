require 'csv'

class CompletedItemsCsvExporter
  def initialize(items: Item.complete, io_out: $stdout)
    @items = items
    @io_out = io_out
    @header = ['Project Title', 'Item Description', 'Date Added', 'Date Completed']
  end

  def data
    csv_data = CSV.generate do |csv|
      csv << header

      generate_csv csv
    end

    csv_data
  end

  def export!
    CSV(io_out) do |csv|
      csv << header

      generate_csv csv
    end
  end

  private

  attr_reader :items, :io_out, :header

  def generate_csv csv
    items.each do |item|
      csv << [item.project_title, item.description, item.created_at.to_date, item.updated_at.to_date]
    end
  end
end
