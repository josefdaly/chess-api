require 'sinatra'
require 'uci'
require 'json'
require 'chess'

get '/' do
  send_file './index.html'
end

#takes movestring and
#assumes movestring is valid
get '/next_best/:moves' do
  content_type :json
  uci = Uci.new(:engine_path => './stockfish')
  moves = params[:moves].scan(/..../)

  moves.each do |move|
    uci.move_piece(move)
  end

  board_before_move = uci.board

  while !uci.ready? do
    sleep(1)
  end

  begin
    best_move = uci.go!.last
  rescue ReturnStringError
    retry
  end

  { moves: uci.moves, boardBefore: board_before_move, bestNext: best_move }.to_json
end

#takes movestring and returns true if the last move is valid
#assumes all moves before last move are valid
get '/valid_move/:moves' do
  content_type :json
  valid_move = true
  game = Chess::Game.new
  moves = params[:moves].scan(/..../)
  last_move = moves.pop
  moves.each do |move|
    game.move(move)
  end

  begin
    game.move(last_move)
  rescue Chess::IllegalMoveError
    valid_move = false
  end

  { validMove: valid_move }.to_json
end

get '/status/:moves' do
  content_type :json
  game = Chess::Game.new
  moves = params[:moves].scan(/..../)
  moves.each do |move|
    game.move(move)
  end

  { gameStatus: game.status.to_s }.to_json
end
