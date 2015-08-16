require 'sinatra'
require 'uci'
require 'json'

get '/next_best/:moves' do
  content_type :json
  uci = Uci.new(:engine_path => './stockfish')
  moves = params[:moves].scan(/..../)
  moves.each do |move|
    uci.move_piece(move)
  end
  board_before_move = uci.board
  begin
    best_move = uci.bestmove
  rescue ReturnStringError
    retry
  end
  { moves: moves, boardBefore: board_before_move, bestNext: best_move }.to_json
end
