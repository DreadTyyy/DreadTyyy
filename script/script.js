import getDataProject from "./data.js";
import renderProjectImg from "./components/ProjectImage.js";
import renderAlert from "./components/AlertSubmit.js";
import sendEmail from "./email.js";

const dataProjects = getDataProject();
const widthDoc = document.body.offsetWidth;
const tabletDevice = 1080;

document.addEventListener("DOMContentLoaded", () => {
  dataProjects.map((item) => {
    renderProjectImg(item, widthDoc, tabletDevice);
  });

  const timeline = document.getElementById("timeline");
  const heightDoc = document.getElementsByTagName("body")[0].clientHeight;
  timeline.style.height = `${heightDoc}px`;

  const topSkill = document.getElementById("top-skill");
  const skills = ["Graphic Designer", "Front End Developer"];

  let arr;
  let count = 0;
  let renderText = [];
  let timer = 0;
  let awalan = "Great People";
  let currentIndex = 0;

  const getSkill = () => {
    if (count > 0) {
      if (currentIndex < skills.length - 1) {
        currentIndex += 1;
      } else {
        currentIndex = 0;
      }
    }
    return skills[currentIndex];
  };
  let skill;
  skill = getSkill();

  const generateString = (lenght) => {
    let result = "";
    const characters = "FrontEdDevlp Gahicsg▩█▚▓░";
    const charactersLenght = characters.length;
    let counter = 0;
    while (counter < lenght) {
      result += characters.charAt(Math.floor(Math.random() * charactersLenght));
      counter += 1;
    }
    return result;
  };
  const checkString = (result) => {
    if (count < 1) {
      count += 1;
      arr = result.split("");
      renderText.push(...arr);
    }
    renderText.map((item, index) => {
      if (item !== skill[index]) {
        renderText[index] = generateString(1);
      } else if (item === skill[index]) {
        renderText[index] = item;
      }
    });
  };

  let intervalId;
  const RenderText = () => {
    intervalId = setInterval(() => {
      skill = getSkill();
      let skillLenght = skill.length;
      const randTxt = generateString(skillLenght);
      checkString(randTxt);
      topSkill.innerHTML = randTxt;
      let TOPSKILL = setInterval(() => {
        if (renderText.join("") === skill) {
          topSkill.innerHTML = renderText.join("");
          clearInterval(TOPSKILL);
        } else {
          topSkill.innerHTML = renderText.join("");
          let io = checkString(renderText);
        }
        if (timer > 1000) {
          topSkill.innerHTML = skill;
          timer = 0;
          clearInterval(TOPSKILL);
        } else {
          timer += 50;
        }
        clearInterval(intervalId);
      }, 50);
    }, 100);
  };
  RenderText();

  setInterval(() => {
    RenderText();
  }, 5000);

  topSkill.innerHTML = awalan;
});

// event ketika scroll
const navigationBar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
  const posisiScroll = window.pageYOffset;
  if (posisiScroll > 0 && widthDoc > tabletDevice) {
    navigationBar.style.transform = "translateY(-100%)";
  } else if (posisiScroll === 0) {
    navigationBar.style.transform = "translateY(0%)";
    navigationBar.style.background = "transparent";
  } else if (posisiScroll > 0 && widthDoc < tabletDevice) {
    navigationBar.style.transform = "translateY(0%)";
    navigationBar.style.background = "#191426";
  }
  const heroY = document.getElementById("header").clientHeight;
  const btnUp = document.querySelector(".btn-up");
  if (posisiScroll > heroY) {
    btnUp.style.opacity = "50%";
    btnUp.style.cursor = "pointer";
  } else {
    btnUp.style.opacity = "0%";
    btnUp.style.cursor = "default";
  }
});

// event ketika mouse hover ke bagian atas untuk nabar
window.addEventListener("mousemove", (e) => {
  if (window.pageYOffset > 0) {
    const posisiY = e.screenY;
    if (posisiY <= 130) {
      navigationBar.style.transform = "translateY(0%)";
    } else {
      navigationBar.style.transform = "translateY(-100%)";
    }
  }
});

// hamburger display
const hamburger = document.getElementById("hamburger");
const links = document.querySelectorAll(".nav-links > li");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show-nav");
  document.body.addEventListener("click", (e) => {
    if (e.target !== navLinks && e.target !== hamburger) {
      navLinks.classList.remove("show-nav");
    }
  });
});
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show-nav");
  });
});

// function send data email
document
  .getElementById("mail-contact")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    sendEmail(this, renderAlert);
  });
