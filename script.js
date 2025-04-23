function toggleMenu(event) {
    event.stopPropagation(); // Impede que o clique no menu-icon feche o menu
    const menu = document.getElementById("menuContent");
    const menuIcon = document.querySelector(".menu-icon");

    // Alterna a classe "open" no menu
    menu.classList.toggle("open");

    // Alterna a classe "active" no ícone do menu
    if (menu.classList.contains("open")) {
        menuIcon.classList.add("active"); // Adiciona a classe "active" ao abrir
    } else {
        menuIcon.classList.remove("active"); // Remove a classe "active" ao fechar
    }
}

function toggleSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.classList.toggle("search-open"); // Alterna a classe "search-open"
    if (searchInput.classList.contains("search-open")) {
        searchInput.focus(); // Foca no campo de entrada ao abrir
    }
}

// Fecha o menu ao clicar fora dele
document.addEventListener("click", function (event) {
    const menu = document.getElementById("menuContent");
    const menuIcon = document.querySelector(".menu-icon");

    // Verifica se o clique foi fora do menu e do ícone do hambúrguer
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.classList.remove("open"); // Remove a classe "open" para fechar o menu
        menuIcon.classList.remove("active"); // Remove a classe "active" do ícone
    }
});

// Fecha o campo de pesquisa ao clicar fora dele
document.addEventListener("click", function (event) {
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.querySelector(".search-icon");

    // Verifica se o clique foi fora do campo de pesquisa e do botão da lupa
    if (
        searchInput &&
        !searchInput.contains(event.target) &&
        searchIcon &&
        !searchIcon.contains(event.target)
    ) {
        searchInput.classList.remove("search-open"); // Remove a classe "search-open" para fechar o campo
    }
});

function swapTeams() {
    const team1 = document.getElementById("team1").querySelector(".team-list");
    const team2 = document.getElementById("team2").querySelector(".team-list");

    // Troca os jogadores entre os times
    const team1Players = team1.innerHTML;
    const team2Players = team2.innerHTML;

    team1.innerHTML = team2Players;
    team2.innerHTML = team1Players;
}

function movePlayer(button, targetTeamId) {
    const player = button.parentElement; // O elemento <li> do jogador
    const targetTeam = document.getElementById(targetTeamId).querySelector(".team-list");

    // Remove o jogador do time atual e adiciona ao time alvo
    targetTeam.appendChild(player);

    // Atualiza o botão para trocar de volta
    const newTargetTeamId = targetTeamId === "team1" ? "team2" : "team1";
    button.setAttribute("onclick", `movePlayer(this, '${newTargetTeamId}')`);
}

function addToTeam(teamId, username) {
    // Seleciona o time pelo ID
    const team = document.getElementById(teamId).querySelector(".team-list");

    // Conta apenas os elementos <li> (jogadores) na lista
    const playerCount = Array.from(team.children).filter((child) => child.tagName === "LI").length;

    // Verifica se o time já tem 5 jogadores
    if (playerCount >= 5) {
        alert(`O ${teamId} já está cheio! Máximo de 5 jogadores.`);
        return;
    }

    // Cria um novo elemento <li> para o jogador
    const newPlayer = document.createElement("li");
    newPlayer.textContent = username;

    // Garante que o novo jogador seja visível
    newPlayer.style.visibility = "visible";
    newPlayer.style.color = "#000"; // Define a cor do texto como preto

    // Insere o jogador no início da lista
    team.appendChild(newPlayer);
}

function registerUser(event) {
    event.preventDefault(); // Impede o envio do formulário

    const usernameInput = document.getElementById("username");
    const userDisplayName = document.getElementById("userDisplayName");

    // Captura o nome do usuário
    const username = usernameInput.value.trim();

    // Verifica se o nome está vazio
    if (!username) {
        alert("Por favor, insira um nome válido.");
        return;
    }

    // Exibe o nome do usuário no canto superior direito
    userDisplayName.textContent = username;

    // Escolhe um time aleatório (team1 ou team2)
    const randomTeamId = Math.random() < 0.5 ? "team1" : "team2";

    // Adiciona o jogador ao time aleatório
    addToTeam(randomTeamId, username);

    // Limpa o campo de entrada
    usernameInput.value = "";
}

function editTeamName(teamId) {
    const teamNameSpan = document.getElementById(`${teamId}Name`);
    const teamInput = document.getElementById(`${teamId}Input`);

    // Oculta o nome atual e exibe a caixa de entrada
    teamNameSpan.classList.add("hidden");
    teamInput.classList.remove("hidden");

    // Define o valor atual do nome no campo de entrada
    teamInput.value = teamNameSpan.textContent;

    // Foca no campo de entrada
    teamInput.focus();
}

function saveTeamName(teamId) {
    const teamNameSpan = document.getElementById(`${teamId}Name`);
    const teamInput = document.getElementById(`${teamId}Input`);
    const teamError = document.getElementById(`${teamId}Error`);

    // Obtém o valor do campo de entrada
    let newName = teamInput.value.trim();

    // Valida o comprimento do nome (entre 2 e 15 caracteres)
    if (newName.length < 2 || newName.length > 15) {
        if (teamError) {
            teamError.textContent = "O nome deve ter entre 2 e 15 caracteres.";
            teamError.classList.add("visible"); // Exibe a mensagem de erro
        }
        teamInput.focus(); // Foca novamente no campo de entrada
        return;
    }

    // Remove a mensagem de erro se o nome for válido
    if (teamError) {
        teamError.classList.remove("visible");
    }

    // Converte o nome para maiúsculas
    newName = newName.toUpperCase();

    // Atualiza o nome do time com o valor validado
    teamNameSpan.textContent = newName;

    // Exibe o nome atualizado e oculta a caixa de entrada
    teamNameSpan.classList.remove("hidden");
    teamInput.classList.add("hidden");
}

function handleKeyPress(event, teamId) {
    if (event.key === "Enter") {
        saveTeamName(teamId); // Chama a função para salvar o nome
    }
}

function exitRoom() {
    // Exibe uma mensagem de confirmação
    const confirmExit = confirm("Tem certeza de que deseja sair da sala?");
    if (confirmExit) {
        // Redireciona ou executa a lógica de saída
        alert("Você saiu da sala.");
        // Aqui você pode adicionar lógica para redirecionar ou limpar dados
    }
}

function leaveTeam() {
    const userDisplayName = document.getElementById("userDisplayName").textContent; // Nome do jogador exibido
    const teams = document.querySelectorAll(".team-list"); // Seleciona as listas de jogadores dos times

    let playerRemoved = false;

    // Percorre os times para encontrar e remover o jogador
    teams.forEach((team) => {
        const players = team.querySelectorAll("li");
        players.forEach((player) => {
            if (player.textContent === userDisplayName) {
                player.remove(); // Remove o jogador da lista
                playerRemoved = true;
            }
        });
    });

    if (playerRemoved) {
        alert(`${userDisplayName} saiu da sala.`);
        document.getElementById("userDisplayName").textContent = "Visitante"; // Reseta o nome do jogador
    } else {
        alert("Você não está em nenhum time.");
    }
}

