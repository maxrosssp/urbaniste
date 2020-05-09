export default function({ row, col }, resource) {
  var owner;

  return {
    position: {row, col},
    coordinates: [row, col],
    getResource: () => resource,
    getOwner: () => owner,
    take: (playerId) => {
      owner = playerId
    }
  }
}
