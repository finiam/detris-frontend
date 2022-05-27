export default function setFavicon() {
  let index = Math.floor(Math.random() * 7);

  let link: HTMLLinkElement =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = `${window.location.href}images/favicons/favicon_${index}.ico`;

  document.getElementsByTagName("head")[0].appendChild(link);
}
