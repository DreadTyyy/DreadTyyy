import getDataProject from "./data.js";
const dataProjects = getDataProject();
const widthDoc = document.body.offsetWidth;
const tabletDevice = 1080;

window.onload = () => {
  dataProjects.map((item) => {
    renderProjectImg(item);
  });

  const timeline = document.getElementById("timeline");
  const topSkill = document.getElementById("top-skill");
  const heightDoc = document.getElementsByTagName("body")[0].clientHeight;
  timeline.style.height = `${heightDoc}px`;

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
};

const navigationBar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
  const posisiScroll = window.pageYOffset;
  if (posisiScroll > 0 && widthDoc > tabletDevice) {
    navigationBar.style.transform = "translateY(-100%)";
  } else if (posisiScroll === 0) {
    navigationBar.style.transform = "translateY(0%)";
    navigationBar.style.background = "transparent";
  } else if (posisiScroll > 0 && widthDoc < tabletDevice) {
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

const renderProjectImg = (data) => {
  let style = "";
  if (widthDoc > tabletDevice) {
    if (data.id == 2) {
      style = "margin-top: 4rem;";
    } else if (data.id > 2) {
      let translateX = 0;
      const translateY = data.id % 2 == 0 ? 8 : 2;
      const baris = Math.ceil(data.id / 2);
      if (baris % 2 == 0) {
        translateX = 4;
      }
      style = `margin-top: ${translateY}rem; margin-left:${translateX}rem;`;
    }
  }

  const photos = document.querySelector(".photos");

  const imageProject = document.createElement("div");
  imageProject.classList.add("image-project");
  imageProject.setAttribute("data-style-type", data.id);
  imageProject.setAttribute("style", style);

  const image = document.createElement("img");
  Object.assign(image, {
    className: data.size ? "image-landscape" : "image-portrait",
    src: `assets/${data.image}`,
    alt: data.alt,
  });
  image.setAttribute("onmousemove", "effectOnImage(event,this)");
  image.setAttribute("onmouseout", "notEffectOnImage(this)");

  const imageBody = document.createElement("div");
  imageBody.classList.add("image-body");

  const imageh5 = document.createElement("h5");
  imageh5.innerText = data.title;

  const visitProject = document.createElement("div");
  visitProject.classList.add("visit-project");
  if (data.github && data.link) {
    const links = [data.github, data.link];
    const icons = ["fa-brands", "fa-github", "fa-solid", "fa-link"];
    let j = 0;
    for (let i = 0; i < 2; i++) {
      const link = document.createElement("a");
      link.setAttribute("href", links[i]);
      link.setAttribute("target", "_blank");
      const icon = document.createElement("i");
      icon.classList.add(icons[j]);
      j++;
      icon.classList.add(icons[j]);
      j++;
      link.appendChild(icon);
      visitProject.appendChild(link);
    }
  }

  imageBody.appendChild(imageh5);
  imageBody.appendChild(visitProject);
  imageProject.appendChild(image);
  imageProject.appendChild(imageBody);
  photos.appendChild(imageProject);
};

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
