import Board from './Board.js';
import Player from './Player.js';
import Shop from './Shop.js';

export default function() {
  const board = Board();
  const players = [
    Player(0, 'Player 1'),
    Player(1, 'Player 2')
  ];
  const shop = Shop();

  return {
    board,
    players,
    shop,
    getBoard: () => board,
    getPlayers: () => players,
    getShop: () => shop
  }
}