class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def speak(data)
    id = data['group_id']['id']
    @group = Group.find(id)
    @group.messages.create(message: data['message'])
  end
end
