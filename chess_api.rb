require 'sinatra'
require 'uci'
require 'json'

get '/' do
  send_file './html/index.html'
end

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
