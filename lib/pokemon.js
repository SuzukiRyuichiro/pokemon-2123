const url = "https://pokeapi.co/api/v2/pokemon";

const cardsContainer = document.getElementById("cardsContainer");
const cardTemplate = document.getElementById("cardTemplate");
const infoTemplate = document.getElementById("infoTemplate");
const infoContainer = document.getElementById("infoContainer");

fetch(url)
  .then((response) => response.json())
  .then(({ results }) => {
    return Promise.all(results.map(({ url }) => fetch(url)));
  })
  .then((responses) =>
    Promise.all(responses.map((response) => response.json()))
  )
  .then((pokemons) => {
    pokemons.forEach(({ sprites, name, types, cries }) => {
      const cardClone = cardTemplate.content.cloneNode(true);
      cardClone.querySelector(".pokemon-card-image").src =
        sprites.front_default;
      cardClone.querySelector("h2").innerText = name;
      cardClone.querySelector("p").innerText = types
        .map(({ type: { name } }) => name)
        .join(", ");
      const audio = new Audio(cries.legacy);

      cardClone.querySelector("a").addEventListener("click", () => {
        audio.play();
        const infoClone = infoTemplate.content.cloneNode(true);
        infoClone.querySelector(".pokemon-card-image").src =
          sprites.back_default;
        infoClone.querySelector("h2").innerText = name;
        infoClone.querySelector("p").innerText = types
          .map(({ type: { name } }) => name)
          .join(", ");
        infoContainer.innerHTML = "";
        infoContainer.appendChild(infoClone);
      });

      cardsContainer.appendChild(cardClone);
    });
  });
