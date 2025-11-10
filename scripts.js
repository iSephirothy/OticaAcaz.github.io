let banners = [
  "Bem-vindo à Ótica Acaz",
  "Promoções incríveis todo mês",
  "Os melhores óculos com estilo"
];

let bannerText = document.querySelector(".banner h1");
let index = 0;

setInterval(() => {
  index = (index + 1) % banners.length;
  bannerText.textContent = banners[index];
}, 4000);
