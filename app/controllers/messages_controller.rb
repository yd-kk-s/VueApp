class MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    messages = Message.where(group_id: params[:group_id])
    respond_to do |format|
      format.html
      format.json { render json: { messages: messages, group_name: group.name } }
    end
  end
end
