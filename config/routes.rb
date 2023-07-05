# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :projects do
      resources :items, only: %i[new create edit update]
      delete 'clear', on: :member
      get 'project_report', on: :member
      collection do
        get :projects_report
      end
    end
  end

  root "frontend#index"
  get "*umatched", to: "frontend#index"
end
