# frozen_string_literal: true

require 'spec_helper'

describe 'Items', type: :request do
  let(:project) { create(:project) }

  describe 'create' do
    before do
      post api_project_items_path({ project_id: project.id }.merge(form_params))
    end

    context 'when params are valid' do
      let(:form_params) { { item: { description: 'Great Item', done: true } } }

      it 'creates the new item' do
        expect(project.items.where(description: 'Great Item')).to exist
      end

      it 'shows a success message' do
        expect(JSON.parse(response.body)["message"]).to eq 'Item was successfully created.'
      end
    end

    context 'when description is missing' do
      let(:form_params) { { item: { done: true } } }

      it 'does not create the new item' do
        expect(project.items.count).to eq 0
      end

      it 'shows an error message' do
        expect(JSON.parse(response.body)["message"]).to eq "Description can't be blank"
      end
    end
  end

  describe 'update' do
    let(:item) { project.items.create!(description: 'Item 1') }

    before do
      patch api_project_item_path({ project_id: project.id, id: item.id }.merge(form_params))
    end

    context 'when the params are valid' do
      let(:form_params) { { item: { description: 'Item 1a', done: true } } }

      it 'updates the Item' do
        expect(project.items.map(&:attributes)).to match [
          hash_including('description' => 'Item 1a', 'done' => true)
        ]
      end

      it 'shows a success message' do
        expect(JSON.parse(response.body)["message"]).to eq 'Item was successfully updated.'
      end
    end

    context 'when the description is missing' do
      let(:form_params) { { item: { description: nil, done: true } } }

      it 'does not update the Item' do
        expect(project.items.map(&:attributes)).to match [
          hash_including('description' => 'Item 1', 'done' => false)
        ]
      end

      it 'shows a success message' do
        expect(JSON.parse(response.body)["message"]).to eq "Description can't be blank"
      end
    end
  end
end
