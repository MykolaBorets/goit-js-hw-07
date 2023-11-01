import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

function createGalleryItem(item) {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");

  const link = document.createElement("a");
  link.classList.add("gallery__link");
  link.href = item.original;

  const image = document.createElement("img");
  image.classList.add("gallery__image");
  image.src = item.preview;
  image.alt = item.description;
  image.setAttribute("data-source", item.original);

  link.addEventListener("click", function (event) {
    event.preventDefault();
  });

  link.appendChild(image);
  galleryItem.appendChild(link);

  return galleryItem;
}

function appendGalleryItems(items) {
  const fragment = [];

  items.forEach((item) => {
    const galleryItem = createGalleryItem(item);
    fragment.push(galleryItem);
  });

  gallery.append(...fragment);
}

appendGalleryItems(galleryItems);

gallery.addEventListener("click", onGalleryClick);
let instance = null;

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.classList.contains("gallery__image")) {
    const largeImageURL = event.target.dataset.source;
    instance = basicLightbox.create(`
      <img src='${largeImageURL}' width="1400" height="900">
    `);
    instance.show();
  }
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && instance) {
    instance.close();
  }
});