import axios from 'axios';

const URBANISTE_LOBBY = `https://${window.location.hostname}:8000/games/Urbaniste`;

export function getRooms() {
  return axios.get(URBANISTE_LOBBY).then(response => response.data.rooms.map(({
    gameID,
    players,
    setupData
  }) => ({
    gameID,
    name: setupData.name,
    players,
    status: { [players.every(({ name }) => name) ? 'negative' : 'positive']: true },
    data: setupData
  })));
}

export function getRoom(gameID) {
  return axios.get(`${URBANISTE_LOBBY}/${gameID}`).then(response => {
    const { roomID, players, setupData } = response.data;
    return {
      gameID: roomID,
      name: setupData.name,
      players,
      status: { [players.every(({ name }) => name) ? 'negative' : 'positive']: true },
      data: setupData
    };
  });
}

export function joinRoom(playerID, playerName, gameID) {
  return axios.post(`${URBANISTE_LOBBY}/${gameID}/join`, { playerID, playerName }).then(response => ({
    gameID,
    playerID,
    credentials: response.data.playerCredentials
  }));
}

export function createRoom(playerName, roomName, shopConfig = {}, boardConfig = {}, unlisted = false) {
  return axios.post(`${URBANISTE_LOBBY}/create`, {
    numPlayers: 2,
    setupData: { name: roomName, boardConfig, shopConfig },
    unlisted
  }).then(response => joinRoom('0', playerName, response.data.gameID));
}

export function leaveRoom(gameID, playerID, credentials) {
  return axios.post(`${URBANISTE_LOBBY}/${gameID}/leave`, { playerID, credentials });
}

export function playAgain(gameID, playerID, credentials) {
  return axios.post(`${URBANISTE_LOBBY}/${gameID}/playAgain`, { playerID, credentials });
}
