class LobbiesController < ApplicationController
  def index
    lobbies = Lobby.all
    render json: lobbies
  end

  def show
    lobby = find_lobby
    render json: lobby
  end

  def create
    lobby = Lobby.create(lobby_params)
    render json: lobby, status: :created
  end

  def update
    lobby = find_lobby
    lobby.update(lobby_params)
    render json: lobby
  end

  def destroy
    lobby = find_lobby
    lobby.destroy
    render json: lobby
  end

  def players_in_lobby
    lobby = find_lobby
    render json: lobby.players
  end

private

  def find_lobby
    Lobby.find(params[:id])
  end

  def lobby_params
    params.permit(:title, :rank, :is_full)
  end
end
