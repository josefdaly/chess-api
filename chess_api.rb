require 'sinatra'
require 'uci'
require 'json'
require 'chess'

get '/' do
  send_file './public/html/index.html'
end

#takes movestring and
#assumes movestring is valid
get '/next_best/:moves' do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
  uci = Uci.new(:engine_path => './stockfish')
  moves = params[:moves].scan(/..../)

  moves.each do |move|
    uci.move_piece(move)
  end

  while !uci.ready? do
    sleep(1)
  end

  begin
    best_move = uci.go!.last
  rescue ReturnStringError
    retry
  end

  { bestNext: best_move }.to_json
end

#takes movestring and returns true if the last move is valid
#assumes all moves before last move are valid
get '/valid_move/:moves' do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
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

# Possible values
#   'in_progress'
#     the game is in progress.
#
#   'white_won'
#     white player has won with a checkmate.
#
#   'black_won'
#     black player has won with a checkmate.
#
#   'white_won_resign'
#     white player has won for resign.
#
#   'black_won_resign'
#     black player has won for resign.
#
#   'stalemate'
#     draw for stalemate.
#
#   'insufficient_material'
#     draw for insufficient material to checkmate.
#
#   'fifty_rule_move'
#     draw for fifty rule move.
#
#   'threefold_repetition'
#     draw for threefold_repetition.
#
#   'unknown'
#     something went wrong.
get '/status/:moves' do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
  game = Chess::Game.new
  moves = params[:moves].scan(/..../)
  moves.each do |move|
    game.move(move)
  end

  { gameStatus: game.status.to_s }.to_json
end

get '/board_string/:moves' do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
  game = Chess::Game.new
  moves = params[:moves].scan(/..../)
  moves.each do |move|
    game.move(move)
  end

  { board: game.board.to_s }.to_json
end
