# frozen_string_literal: true

require 'spec_helper'

describe 'Projects', type: :request do
  let!(:old_project) { create(:project, :with_items, title: 'Project A') }

  describe 'index' do
    before do
      get api_projects_path
    end

    it 'lists all projects' do
      expect(response.body).to include 'Project A'
    end
  end

  describe 'create' do
    before do
      post api_projects_path(form_params)
    end

    context 'when params are valid' do
      let(:form_params) { { project: { title: 'Great Project' } } }

      it 'creates the new project' do
        expect(Project.where(title: 'Great Project')).to exist
      end

      it 'shows a success message' do
        expect(JSON.parse(response.body)["message"]).to eq 'Project was successfully created.'
      end
    end

    context 'when project name is missing' do
      let(:form_params) { { project: { title: nil } } }

      it 'does not create the new project' do
        expect(Project.count).to eq 1
      end

      it 'shows an error message' do
        expect(JSON.parse(response.body)["message"]).to eq "Title can't be blank"
      end
    end
  end

  describe 'update' do
    before do
      patch api_project_path({ id: old_project.id }.merge(form_params))
    end

    context 'when the params are valid' do
      let(:form_params) { { project: { title: 'Project M' } } }

      it 'updates the Project' do
        expect(old_project.reload.title).to eq 'Project M'
      end

      it 'shows a success message' do
        expect(JSON.parse(response.body)["message"]).to eq 'Project was successfully updated.'
      end
    end

    context 'when the project title is missing' do
      let(:form_params) { { project: { title: '' } } }

      it 'does not update the Project' do
        expect(old_project.reload.title).to eq 'Project A'
      end

      it 'shows an error message' do
        expect(JSON.parse(response.body)["message"]).to eq "Title can't be blank"
      end
    end
  end

  describe 'destroy' do
    before do
      delete api_project_path(id: old_project.id)
    end

    it 'destroys the Project' do
      expect(Project.where(id: old_project.id)).not_to exist
    end

    it 'shows a success message' do
      expect(JSON.parse(response.body)["message"]).to eq 'Project was successfully destroyed.'
    end
  end

  describe 'clear' do
    before do
      old_project.items.first.update!(done: true)

      delete clear_api_project_path(id: old_project.id)
    end

    it 'destroys completed items' do
      expect(old_project.items.count).to eq 2
    end

    it 'shows a success message' do
      expect(JSON.parse(response.body)["message"]).to eq 'Completed items were successfully cleared.'
    end
  end
end
