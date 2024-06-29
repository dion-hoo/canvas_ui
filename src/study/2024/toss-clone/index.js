const cardList = document.querySelector(".card-list");
const cardItems = cardList.children;

for (let i = 0; i < cardItems.length; i++) {
  const item = cardItems[i];

  item.addEventListener("click", () => {
    item.classList.remove("hover");
    item.classList.toggle("flip");
  });

  item.addEventListener("pointerenter", () => {
    item.classList.add("hover");
  });

  item.addEventListener("pointerleave", () => {
    item.classList.remove("hover");
  });
}
