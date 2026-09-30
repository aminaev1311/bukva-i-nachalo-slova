import { sayText } from "./scripts/utils.js";
import { animate, burst } from "./scripts/confetti.js";

const border = {
  fox: "red",
  turkey: "green",
  leopard: "green",
  parrot: "red",
  ant: "red"
};

const mapToRussianWord = {
  fox: "лиса",
  turkey: "индюк",
  leopard: "ирбис",
  parrot: "попугай",
  ant: "муравей",
};

const isWon = () => {
  if (document.querySelector("#turkey").classList.contains("green-border") &&
    document.querySelector("#leopard").classList.contains("green-border")) {

    for (const image of document.querySelectorAll("img")) {
      image.removeEventListener("click", clickHandler);
    }

    setTimeout(() => new Audio("./audio/success.mp3").play(), 1500);
    return true;
  }
  return false;
}

const playSound = (elementId) => {
  const sound = new Audio("./audio/" + elementId + ".mp3");
  sound.play();
  setTimeout(function () {
    sound.pause();
    sound.currentTime = 0;
  }, 1500);
};

const addBorder = (elementId, color) => {
  document.querySelector("#" + elementId).classList.add(color + "-border");
};

const clickHandler = (e) => {
  console.log(e.target.id);
  addBorder(e.target.id, border[e.target.id]);
  playSound(e.target.id);
  sayText(mapToRussianWord[e.target.id]);
  if (isWon()) {
    burst(window.innerWidth / 2, window.innerHeight / 2, 'star', 60);
    animate();
  }
};

let images = document.querySelectorAll("img");

for (const image of images) {
  image.addEventListener("click", clickHandler);
}
