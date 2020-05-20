import React from 'react';
import ReactDOM from 'react-dom';
import { Lobby } from 'boardgame.io/react';
import UrbanisteBoard from './js/Urbaniste';
import { Urbaniste } from '../../urbaniste';

const importedGames = [
  { game: Urbaniste, board: UrbanisteBoard }
];

ReactDOM.render((
  <Lobby
    gameServer={`https://${window.location.hostname}:8000`}
    lobbyServer={`https://${window.location.hostname}:8000`}
    gameComponents={importedGames}
  />
), document.getElementById('app'));
