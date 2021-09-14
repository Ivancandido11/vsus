class PlayersController < ApplicationController
  def index
    players = Player.all
    render json: players
  end

  def show
    player = find_player
    render json: player
  end

  def create
    player = Player.create(player_params)
    render json: player, status: :created
  end

  def update
    player = find_player
    player.update(player_params)
    render json: player
  end

private

  def find_player
    Player.find(params[:id])
  end

  def player_params
    params.permit(:name, :points, :password, :lobby_id, :in_lobby)
  end
end
