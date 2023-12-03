const imageLandscape = document.querySelector(".image-project");

const effectOnImage = (event, element) => {
  let posisiX = event.offsetX;
  let posisiY = event.offsetY;
  let rotateX = 0;
  let rotateY = 0;

  const heightImg = element.height;
  const widthImg = element.width;

  const countPercentageX = (persen) => {
    return (persen / widthImg) * 100;
  };
  const countPercentageY = (persen) => {
    return (persen / heightImg) * 100;
  };
  let persenX = countPercentageX(posisiX);
  let persenY = countPercentageY(posisiY);
  if (persenY <= 50) {
    persenY = (persenY - 50) / 2;
    rotateX = -persenY;
  } else if (persenY >= 50) {
    persenY = (persenY - 50) / 2;
    rotateX = -persenY;
  }
  if (persenX <= 50) {
    persenX = (persenX - 50) / 2;
    rotateY = persenX;
  } else if (persenX >= 50) {
    persenX = (persenX - 50) / 2;
    rotateY = persenX;
  }
  element.style = `transition: all ease-in 100ms; transform: rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  // imageLandscape.style = `transition: all ease-in 100ms; transform: rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
};

const notEffectOnImage = (element) => {
  element.style = "";
  // imageLandscape.style = "";
};
