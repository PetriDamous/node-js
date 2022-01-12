const randomCardIndex = (cards) => {
  const randomInteger = Math.floor(Math.random() * cards.length);
  return randomInteger;
};

const isObjEmpty = (obj) => Object.keys.length === 0;

module.exports = {
  randomCardIndex,
  isObjEmpty,
};
