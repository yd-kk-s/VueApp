class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def speak(data)
    Message.create(message: data['message'])
  end
end
