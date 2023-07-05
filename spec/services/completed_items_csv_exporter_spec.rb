# frozen_string_literal: true

require 'spec_helper'

describe CompletedItemsCsvExporter do
  subject(:exporter) { described_class.new(io_out: io_out) }

  let(:io_out) { StringIO.new }
  let(:csv_lines) { io_out.string.split("\n") }

  let!(:project1) do
    create(:project).tap do |proj|
      create(:item, project: proj, done: true)
      create(:item, project: proj, done: true)
    end
  end
  let!(:project2) do
    create(:project).tap do |proj|
      create(:item, project: proj, done: true)
      create(:item, project: proj)
    end
  end

  before do
    Timecop.freeze('1994-09-16')
  end

  describe '#export!' do
    before do
      exporter.export!
    end

    it 'writes header' do
      expect(csv_lines.first).to eq 'Project Title,Item Description,Date Added,Date Completed'
    end

    it 'writes rows' do
      expect(csv_lines.drop(1)).to eq [
        "#{project1.title},#{project1.items[0].description},#{project1.items[0].created_at.to_date},1994-09-16",
        "#{project1.title},#{project1.items[1].description},#{project1.items[0].created_at.to_date},1994-09-16",
        "#{project2.title},#{project2.items[0].description},#{project1.items[0].created_at.to_date},1994-09-16"
      ]
    end
  end
end
