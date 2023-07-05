# frozen_string_literal: true

require 'rails_helper'

describe Item do
  subject(:item) { described_class.new(description: 'Great Item', project: project) }

  let(:project) { create(:project, title: 'Great Project') }

  describe '#project_title' do
    it 'returns the project title' do
      expect(item.project_title).to eq 'Great Project'
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:description) }

    it do
      is_expected.to validate_uniqueness_of(:description) # rubocop:disable RSpec/ImplicitSubject
        .scoped_to(:project_id)
        .with_message(/unique within a project/)
    end
  end
end
