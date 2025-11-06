// Fetch the list of pokemons
// Console log the response.
const url = "https://pokeapi.co/api/v2/pokemon/";
const cardsContainer = document.querySelector("#cardsContainer");
const infoContainer = document.querySelector("#infoContainer");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // get the results array from the data
    // iterate over the array
    data.results.forEach((pokemon) => {
      // on each iteration make a request to get info about individual pokemon

      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          // get the name
          const name = data.name;
          // get types, join them with comma (fire, poison)
          const types = data.types.map(({ type: { name } }) => name).join(", ");
          // get image from sprites
          const sprite = data.sprites.front_default;
          // get audio link
          const cry = data.cries.latest;

          // clone the content of the template
          const template = document.querySelector("#cardTemplate");
          const clone = template.content.cloneNode(true);
          // update the src of img
          clone.querySelector("img").src = sprite;
          // change the h2 title to name of the pokemon
          clone.querySelector("h2").innerText = name;
          // change the p subtitle to the types of the pokemon
          clone.querySelector("p").innerText = types;

          // Grab the link tag and add an click event listener
          clone.querySelector("a").addEventListener("click", () => {
            // on the click event

            // 1. clone the info template
            const infoTemplate = document.querySelector("#infoTemplate");
            const clone = infoTemplate.content.cloneNode(true);
            // 2. update the src of the image
            clone.querySelector("img").src = sprite;
            // 3. update the title with name
            clone.querySelector("h2").innerText = name;
            // 4. update the subtitle with types
            clone.querySelector("p").innerText = types;
            // 5. play the cry
            const audio = new Audio(cry);
            audio.play();
            // replace inside of the info container with the clone
            // clear whatever that's inside the container
            infoContainer.innerHTML = "";
            // append child
            infoContainer.appendChild(clone);
          });

          // append the card into the cards container
          cardsContainer.appendChild(clone);
        });
    });
  });
