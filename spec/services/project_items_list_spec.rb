# frozen_string_literal: true

require 'rails_helper'

describe ProjectItemsList do
    let!(:project1) { create(:project, title: 'Project 1') }
    let!(:project2) { create(:project, title: 'Project 2') }
    let!(:item1) { create(:item, project: project1, description: 'Item 1', done: true) }
    let!(:item2) { create(:item, project: project1, description: 'Item 2', done: false) }
    let!(:item3) { create(:item, project: project2, description: 'Item 3', done: true) }

    it 'prints the list of projects and their items' do
        expected_output = <<~OUTPUT.strip
        > Project 1
        > - [X] Item 1
        > - [ ] Item 2
        > Project 2
        > - [X] Item 3
        OUTPUT

        expect { ProjectItemsList.list }.to output(expected_output + "\n").to_stdout
    end
end
