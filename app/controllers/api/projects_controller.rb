# frozen_string_literal: true

class Api::ProjectsController < ApplicationController
  before_action :set_project, except: %i[index create projects_report]
  rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique

  def index
    @projects = Project.all
    render json: @projects
  end

  def show
    render json: {
      id: @project.id,
      title: @project.title,
      items: @project.items.select(:id, :description, :done)
    }
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      render json: { message: 'Project was successfully created.', data: @project }, status: :created
    else
      render json: { message: @project.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: { message: 'Project was successfully updated.', data: @project }, status: :ok
    else
      render json: { message: @project.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def destroy
    @project.update(discarded: true)
    render json: { message: 'Project was successfully destroyed.' }
  end

  def clear
    completed_count = @project.items.complete.update_all(discarded: true)

    message = completed_count.zero? ? 'There are no completed items for this project.' : 'Completed items were successfully cleared.'

    render json: { message: message }
  end

  def projects_report
    respond_with_csv
  end

  def project_report
    items = case params[:filter]
    when "completed"
      @project.items.complete
    when "not_completed"
      @project.items.incomplete
    else
      @project.items
    end

    respond_with_csv(items: items)
  end

  private

  def respond_with_csv(items: Item.complete)
    send_data CompletedItemsCsvExporter.new(items: items).data,
    filename: "completed_items_#{Time.current.strftime('%Y-%m-%d_%H-%M-%S')}.csv",
    type: "text/csv",
    disposition: "attachment"
  end

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:title, :filter)
  end

  def record_not_unique(exception)
    render json: { message: "Record already exists." }, status: :unprocessable_entity
  end
end
