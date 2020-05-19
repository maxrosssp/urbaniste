import React from 'react';
import { getPlayers } from '../../../../../urbaniste/players/selectors';
import Player from './Player/Player';

function Players({
  G,
  playerId
}) {
  return (
    <div className="players">
      {getPlayers(G, playerId).map(player => (
        <Player key={player.id} player={player} playerId={playerId} />
      ))}
    </div>
  );
}

export default Players;
