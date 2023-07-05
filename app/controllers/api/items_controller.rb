# frozen_string_literal: true

class Api::ItemsController < ApplicationController
  before_action :get_project
  
  def create
    @item = @project.items.build(item_params)

    if @item.save
      render json: { message: 'Item was successfully created.', data: @item }, status: :created
    else
      render json: { message: @item.errors.full_messages.first, data: @item.errors }, status: :unprocessable_entity
    end
  end

  def update
    @item = @project.items.where(id: params[:id]).first

    if @item.update(item_params)
      render json: { message: 'Item was successfully updated.', data: @item }, status: :ok
    else
      render json: { message: @item.errors.full_messages.first, data: @item.errors }, status: :unprocessable_entity
    end
  end

  private

  def get_project
    @project = Project.includes(:items).find(params[:project_id])
  end

  def item_params
    params.require(:item).permit(:description, :done)
  end
end
