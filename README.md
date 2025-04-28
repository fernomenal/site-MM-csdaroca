# Documento para o Projeto: Site de Times de CS2

### **1. Visão Geral do Projeto**

O objetivo do projeto é criar um site interativo para gerenciar times de CS2 (Counter-Strike 2). O site permite que os usuários se cadastrem, sejam atribuídos a times, editem os nomes dos times, troquem jogadores entre os times e iniciem partidas. O projeto também visa integrar a autenticação via Steam para melhorar a experiência do usuário.

**2. Stakeholders**

- **Equipe de Desenvolvimento**: Desenvolvedores front-end e back-end.
- **Usuários Finais**: Jogadores de CS2 que usarão o site para organizar partidas.

### **3. Backlog do Produto**

### **Funcionalidades Principais**

1. **Cadastro de Usuários**:
    - Permitir que os usuários insiram seus nomes para participar dos times.
    - Validar o nome (entre 2 e 15 caracteres).
2. **Gerenciamento de Times**:
    - Adicionar jogadores a times aleatórios.
    - Limitar cada time a 5 jogadores.
    - Permitir a troca de jogadores entre os times.
    - Exibir mensagens de erro quando os limites forem excedidos.
3. **Edição de Nomes dos Times**:
    - Permitir que os nomes dos times sejam editados.
    - Validar o nome do time (entre 2 e 15 caracteres).
    - Exibir mensagens de erro acima do ícone de edição.
4. **Início de Partida**:
    - Adicionar um botão para iniciar a partida.
5. **Sair do Time**:
    - Permitir que os jogadores saiam do time ao qual pertencem.

### **4. Sprint Planning**

### **Sprint 1**: **Funcionalidades Básicas**

- Implementar o cadastro de usuários.
- Adicionar jogadores a times aleatórios.
- Limitar o número de jogadores por time.
- Criar a interface para exibir os times e os jogadores.

### **Sprint 2**: **Edição e Validação**

- Implementar a funcionalidade de edição de nomes dos times.
- Adicionar validação para os nomes dos times e jogadores.
- Exibir mensagens de erro para entradas inválidas.

### **Sprint 3**: **Funcionalidades Avançadas**

- Implementar a troca de jogadores entre os times.
- Adicionar o botão "Iniciar Partida".
- Implementar a funcionalidade "Sair do Time".

### **5. Ferramentas Utilizadas**

- **Controle de Versão**: GitHub.
- **Desenvolvimento**: Visual Studio Code.

### **6. Tecnologias Utilizadas**

O projeto utiliza as seguintes linguagens e tecnologias:

- **HTML**: Para estruturar o conteúdo do site.
- **CSS**: Para estilizar os elementos e criar um design responsivo.
- **JavaScript**: Para adicionar interatividade e lógica ao site.
- **Font Awesome**: Para ícones, como o lápis de edição e o botão de sair.

### **7. Arquivo HTML (index.html)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <title>Time de CS2</title>
    <style>
        .team-list li {
            visibility: hidden; /* Torna os nomes invisíveis */
        }
    </style>
</head>
<body>
    <div class="menu-container">
        <div class="menu-icon" onclick="toggleMenu(event)">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="menu-content" id="menuContent">            
            <div class="registration-container">
                <h2>Cadastro</h2>
                <form id="registrationForm" onsubmit="registerUser(event)">
                    <label for="username">Digite seu nome:</label>
                    <input type="text" id="username" placeholder="Seu nome" required />
                    <button type="submit">Entrar</button>
                </form>
                
            </div>
        </div>
    </div>

    <div class="user-display">
        <span id="userDisplayName">Visitante</span>
    </div>

    <div class="logo-container">
        <img src="ad.png" alt="Logo do Time de CS2">
        <p class="line-text">O melhor site de mix de CS2</p>
    </div>

    <div class="teams-container">
        <div class="team" id="team1">
            <h2 class="team-name">
                <span id="team1Error" class="error-message hidden">deve conter entre 2 e 15 caracteres.</span>
                <span id="team1Name">HOMENS</span>
                <i class="fas fa-pencil-alt edit-icon" onclick="editTeamName('team1')"></i>
                <input type="text" id="team1Input" class="edit-input hidden" 
                       onblur="saveTeamName('team1')" 
                       onkeydown="handleKeyPress(event, 'team1')" />
            </h2>
            <ul class="team-list">
            </ul>
        </div> 

        <div class="team" id="team2">
            <h2 class="team-name">
                <span id="team2Error" class="error-message hidden">deve conter entre 2 e 15 caracteres.</span>
                <span id="team2Name">MULHERES</span>
                <i class="fas fa-pencil-alt edit-icon" onclick="editTeamName('team2')"></i>
                <input type="text" id="team2Input" class="edit-input hidden" 
                       onblur="saveTeamName('team2')" 
                       onkeydown="handleKeyPress(event, 'team2')" />
            </h2>
            <ul class="team-list">
            </ul>
        </div>
    </div>

    <div class="buttons-container">
        <button onclick="swapTeams()">Trocar</button>
    </div>

    <div class="start-container">
        <button class="start-button">
            Iniciar Partida
        </button>
    </div>

    <div class="exit-container">
        <button class="exit-button" onclick="leaveTeam()">
            <i class="fas fa-door-open"></i> Sair do Time
        </button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### **8. Arquivo CSS (style.css)**

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden; 
}

.content {
    padding: 20px;
}

.logo-container {
    text-align: center;
    margin-top: 10px;
    position: relative;
}

.logo-container::after {
    content: ""; 
    display: block;
    width: 40%; 
    height: 2px;
    background-color: #ccc; 
    margin: 10px auto; 
}

.logo-container img {
    max-width: 220px; 
    height: auto;
    display: block;
    margin: 0 auto;

.tagline {
    text-align: center;
    font-size: 18px; 
    color: #555;
    margin-top: 15px;
    font-weight: 400; 
    font-family: Arial, sans-serif;
}

.line-text {
    text-align: center;
    font-size: 18px; 
    color: #555;
    margin-top: 15px;
    font-weight: 400; 
    font-family: Arial, sans-serif; 
    position: relative;
    top: 10px; 
}

.menu-container {
    position: relative;
    color: rgb(0, 0, 0);
    padding: 0px;
}

.menu-icon {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 100px;
    left: 250px;
    background: none;
    border: none;
    outline: none;
    z-index: 1001; 
}

.menu-icon .line {
    width: 25px; 
    height: 4px; 
    margin: 1px 0;
    background-color: rgb(27, 25, 25); 
    border-radius: 7px; 
    transition: background-color 0.3s ease; 
}

.menu-icon.active .line {
    opacity: 0; /* Torna as linhas invisíveis */
    transition: opacity 0.3s ease; /* Adiciona uma transição suave */
}

.menu-content {
    position: fixed;
    top: 0;
    left: -300px; /* Esconde o menu fora da tela */
    width: 250px;
    height: 100%;
    background-color: #ffffff;
    color: black;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    transition: left 0.3s ease; /* Animação suave para abrir/fechar */
    z-index: 1000;
    pointer-events: none; /* Desativa cliques no menu quando ele está escondido */
}

.menu-content a {
    display: block;
    color: rgb(0, 0, 0);
    text-decoration: none;
    margin: 15px 0;
    font-size: 18px;
}

.menu-content a:hover {
    color: #ddd; /* Muda a cor ao passar o mouse */
}

.menu-content.open {
    left: 0; /* Move o menu para dentro da tela */
    pointer-events: auto; /* Permite cliques no menu quando ele está aberto */
}

.menu-icon:hover {
    background-color: #ffffff; /* Muda a cor do fundo ao passar o mouse */
    color: #393737; /* Muda a cor do ícone ao passar o mouse */
}

.menu-icon:hover .line {
    background-color: #555; /* Muda a cor das linhas ao passar o mouse */
}

.teams-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative; 
}

.team {
    text-align: center;
    width: 35%; 
    height: 450px; /* Define uma altura fixa */
    border: 1px solid #ccc;
    padding: 20px; /* Adiciona mais espaço interno */
    border-radius: 10px;
    background-color: #f9f9f9;
    box-sizing: border-box; 
}

.team-name {
    font-size: 24px;
    margin-bottom: 10px;
    cursor: text; /* Permite editar o nome */
}

.team-list {
    list-style: none;
    padding: 0;
}

.team-list li { 
    margin: 5px 0;
    font-size: 18px;
    color: #000; /* Define a cor do texto como preto */
}

.swap-button:hover {
    background-color: #0056b3;
    color: white;
}

.buttons-container {
    text-align: center;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    border: 1px solid #818181; /* Borda cinza */
    background-color: #ffffff;
    color: rgb(101, 101, 101);
    transition: background-color 0.3s ease;
    margin-top: 20px; /* Ajuste a margem superior */
}

button:hover {
    background-color: #555555;
    color: #ffffff; /* Texto branco ao passar o mouse */
}

.registration-container {
    margin: 20px auto; 
    text-align: center;
    width: 100%;
    max-width: 400px; 
    padding: 20px; /* Adiciona espaçamento interno */
    border: 1px solid #ccc; 
    border-radius: 10px; 
    background-color: #f9f9f9; /* Fundo claro */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra */
    overflow: hidden; 
    box-sizing: border-box; 
}

.registration-container h2 {
    font-size: 18px;
    margin-bottom: 10px;
}

.registration-container form {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espaçamento entre os campos */
}

.registration-container input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%; /* Garante que o campo ocupe toda a largura */
    box-sizing: border-box; /* Inclui padding no tamanho total */
}

.registration-container button {
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
}

.registration-container button:hover {
    background-color: #0056b3;
}

.user-display {
    position: absolute;
    top: 100px;
    right: 250px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.hidden {
    display: none; /* Oculta o campo de entrada */
}

.edit-input {
    margin-left: 10px;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.edit-icon {
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    transition: color 0.3s ease;
}

.edit-icon:hover {
    color: #000;
}

.hidden .edit-icon {
    display: inline; /* Garante que o ícone seja exibido */
}

.error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 5px; /* Espaçamento abaixo da mensagem */
    display: none; /* Esconde a mensagem inicialmente */
}

.error-message.visible {
    display: block; /* Exibe a mensagem quando necessário */
}

.exit-container {
    text-align: center;
    margin-top: 0px;
    
}

.exit-button {
    align-items: center; 
    position: relative;
    top: -69px;
    left: -100px;
    gap: 5px;
    font-size: 16px;
    font-weight: semi-bold;
    color: red;
    background-color: white;
    border: 1px solid red;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.exit-button i {
    font-size: 18px;
}

.exit-button:hover {
    background-color: red;
    color: white;
}

.start-container {
    text-align: center;
    margin-top: 20px; /* Espaçamento superior */
}

.start-button {
    padding: 10px 20px;
    position: relative;
    font-size: 16px;
    top: -10px;
    right: -100px;
    font-weight: semi-bold;
    color: white; /* Texto branco */
    background-color: #28a745; /* Fundo verde */
    border: px solid #28a745; /* Borda verde */
    border-radius: 5px; /* Bordas arredondadas */
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.start-button:hover {
    background-color: #218838; /* Fundo verde mais escuro ao passar o mouse */
    border-color: #218838; /* Borda verde mais escura */
}
```

### **9. Arquivo JAVA (script.js)**

```jsx
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
```

### Conclusão

O projeto do **Site de Times de CS2** foi desenvolvido com o objetivo de criar uma plataforma interativa para gerenciar times de jogadores. Utilizando **HTML**, **CSS** e **JavaScript**, o site oferece funcionalidades como cadastro de jogadores, gerenciamento de times, edição de nomes, troca de jogadores e início de partidas.

A validação de entradas e a exibição de mensagens de erro garantem uma experiência de usuário mais intuitiva e funcional. Além disso, o design responsivo e a interatividade proporcionam uma interface amigável e eficiente.

Com a implementação concluída, o site está pronto para ser utilizado por jogadores que desejam organizar partidas de forma prática e dinâmica. Futuras melhorias podem incluir a integração com APIs externas, como sistemas de autenticação ou estatísticas de jogos, para expandir ainda mais as funcionalidades.
