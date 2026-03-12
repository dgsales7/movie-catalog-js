document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritos-container");

  // pegar favoritos simulados (depois isso vem do backend)
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    container.innerHTML = "<p>Você ainda não tem filmes favoritos 😢</p>";
    return;
  }

  favoritos.forEach(filme => {
    const card = document.createElement("div");
    card.classList.add("card-filme");
    card.innerHTML = `
      <img src="${filme.poster}" alt="${filme.titulo}">
      <h3>${filme.titulo}</h3>
      <button class="remover" data-id="${filme.id}">Remover</button>
    `;
    container.appendChild(card);
  });

  // remover filme dos favoritos
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remover")) {
      const id = e.target.getAttribute("data-id");
      const novosFav = favoritos.filter(f => f.id != id);
      localStorage.setItem("favoritos", JSON.stringify(novosFav));
      e.target.closest(".card-filme").remove();
    }
  });
});
