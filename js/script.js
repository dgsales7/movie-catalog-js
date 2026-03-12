const campo = document.getElementById('search')
const botao = document.getElementById('btnBuscar')
campo.addEventListener("keydown", function(event) {
    // 3. Verificar se a tecla pressionada é "Enter" (código 13 ou key "Enter")
    if(event.key ==="Enter"){
        // 4. Prevenir comportamento padrão (como enviar formulário)
        event.preventDefault();
        // 4. Prevenir comportamento padrão (como enviar formulário)
        botao.click();
    }
});

document.getElementById("btnBuscar").addEventListener("click", async () => {
    const query = document.getElementById("search").value.trim();
    const container = document.getElementById("resultados");

    if (query === "") {
        container.innerHTML = "<p>Digite o nome de um filme para buscar.</p>";
        return;
    }

    // Usaremos a API gratuita OMDb
    const url = `https://www.omdbapi.com/?s=${query}&apikey=6a9620b9`;

    const resposta = await fetch(url);
    const data = await resposta.json();

    if (data.Response === "False") {
        container.innerHTML = "<p>Nenhum filme encontrado 😢</p>";
        return;
    }

    container.innerHTML = ""; // limpar resultados

    data.Search.forEach(filme => {
        const card = document.createElement("div");
        card.classList.add("filme");

        card.innerHTML = `
            <img src="${filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/200"}" alt="${filme.Title}">
            <h3>${filme.Title}</h3>
            <button class="favoritar"
                data-id="${filme.imdbID}"
                data-titulo="${filme.Title}"
                data-poster="${filme.Poster}">
                ⭐ Favoritar
            </button>
        `;

        container.appendChild(card);
    });
});


// Salvando no localStorage quando clicar no botão "favoritar"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("favoritar")) {
    const id = e.target.dataset.id;
    const titulo = e.target.dataset.titulo;
    const poster = e.target.dataset.poster;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Evitar duplicados
    if (!favoritos.some(f => f.id === id)) {
        favoritos.push({ id, titulo, poster });
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("⭐ Adicionado aos favoritos!");
    } else {
        alert("Este filme já está nos favoritos 😉");
    }
  }
});

///