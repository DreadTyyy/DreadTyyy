const renderProjectImg = (data, widthDoc, tabletDevice, photo = ".photos") => {
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

  const photos = document.querySelector(photo);

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

export default renderProjectImg;
