class GroupsController < ApplicationController
  protect_from_forgery except: :create

  def index
    groups = Group.all
    respond_to do |format|
      format.html
      format.json { render json: groups }
    end
  end

  def new
    @groups = Group.all
  end

  def create
    group = Group.new(group_params)
    if group.save
      respond_to do |format|
        format.html { redirect_to groups_path }
        format.json { render json: group }
      end
    else
      redirect_to action: 'index', alert: 'グループ名を入力してください'
    end
  end

  private
  def group_params
    params.permit(:name)
  end
end
