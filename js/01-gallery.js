import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
createGalleryItem(galleryItems);
gallery.addEventListener("click", onGalleryClick);
let instance = null;

function createGalleryItem(items) {
  const galleryItem = items
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
  gallery.insertAdjacentHTML("beforeend", galleryItem);
  return galleryItem;
}

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.classList.contains("gallery__image")) {
    const largeImageURL = event.target.dataset.source;
    instance = basicLightbox.create(`
      <img src='${largeImageURL}' width="1400" height="900">
    `);
    instance.show();
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape" && instance) {
        instance.close();
        window.removeEventListener("keydown", (event));
      }
    });
  }
}