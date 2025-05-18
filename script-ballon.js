
const jogadoresBallonDor = [
    "Da Cunha", "Hori", "Jacaré", "Maradona", "Microsony", 
    "Pelé", "Ratanabá", "Taylor Swift", "Waldir Braz", "Zikaum"
];


 
  function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    jogadorAntigo = null;
  }
  
  function adicionarNegritoAoSegurar(element) {
    element.addEventListener('mousedown', () => {
      element.style.fontWeight = 'bold';
    });
  
    element.addEventListener('mouseup', () => {
      element.style.fontWeight = 'normal';
    });
  
    element.addEventListener('mouseleave', () => {
      // caso o mouse saia do elemento sem soltar o botão
      element.style.fontWeight = 'normal';
    });
  
    // para suportar toque em dispositivos móveis (segurar toque)
    element.addEventListener('touchstart', () => {
      element.style.fontWeight = 'bold';
    });
  
    element.addEventListener('touchend', () => {
      element.style.fontWeight = 'normal';
    });
  }
  
  const ballonDor = document.getElementById('ballonDor');
  const goldenTeam = document.getElementById('goldenTeam');

    ballonDor.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  adicionarNegritoAoSegurar(ballonDor);
  adicionarNegritoAoSegurar(goldenTeam);
  
function rolarParaBaixo() {
  document.getElementById('4838').scrollIntoView({ behavior: 'smooth' });
}


 // =============================================
// SISTEMA DE RANKING (PREFIXO 
// =============================================

function abrirPopupEnviar() {
  const popup = document.getElementById('popupEnviar');
  if (!popup) return;
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.opacity = 1;
  }, 10);

  // Fecha automaticamente após 5 segundos
  setTimeout(() => {
    fecharPopup('popupEnviar');
  }, 5000);
}

function abrirPopupErro() {
  const popup = document.getElementById('popupErro');
  if (!popup) return;
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.opacity = 1;
  }, 10);

  // Fecha automaticamente após 5 segundos
  setTimeout(() => {
    fecharPopup('popupErro');
  }, 5000);
}

function fecharPopup(id) {
  const popup = document.getElementById(id);
  if (!popup) return;
  popup.style.opacity = 0;
  setTimeout(() => {
    popup.style.display = 'none';
  }, 500);
}



function normalizarNome(nome) {
    return nome
        .normalize("NFD")                   // separa letras de seus acentos
        .replace(/[\u0300-\u036f]/g, "")    // remove os acentos
        .toLowerCase()                      // tudo minúsculo
        .replace(/\s+/g, '');               // remove todos os espaços
}

const rankingSelecionado = Array(10).fill(null); // Armazena os 10 escolhidos


function renderRankingList() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // Limpa tudo

    for (let i = 0; i < 10; i++) {
        const slot = document.createElement('div'); // esse é o wrapper
        slot.className = 'rank-slot'; // nova classe só pra organizar
        slot.style.margin = '5px';

        const div = document.createElement('div');
        div.className = 'player rank-player';
        div.dataset.rank = i;

        if (rankingSelecionado[i]) {
            const nome = rankingSelecionado[i];
            const nomeNormalizado = normalizarNome(nome);
            div.innerHTML = `
                <img src="sprites/${nomeNormalizado}.png" alt="${nome}">
                <small>${i + 1}º - ${nome}</small>
            `;
        } else {
            div.innerHTML = `<small>${i + 1}º</small><span style="font-size: 24px;">+</span>`;
        }

        div.onclick = () => abrirSelecaoRanking(i, div);
        slot.appendChild(div);           // ⬅ coloca o botão dentro do slot
        rankingList.appendChild(slot);  // ⬅ coloca o slot na lista
    }
}


function abrirSelecaoRanking(index, div) {
    const ul = document.getElementById('lista-jogadores-ballon');
    ul.innerHTML = '';

    jogadoresBallonDor.forEach(jogador => {
        const li = document.createElement('li');
        li.textContent = jogador;

        // Adiciona destaque visual se já estiver selecionado
        if (rankingSelecionado.includes(jogador)) {
            li.classList.add('selecionado');
        }

        li.onclick = () => selecionarJogadorRanking(index, jogador);
        ul.appendChild(li);
    });

    document.getElementById('modal-ballon-dor').style.display = 'flex';
}




function selecionarJogadorRanking(index, nome) {
  // Remove o jogador de onde ele já estiver, exceto na posição atual
  for (let i = 0; i < rankingSelecionado.length; i++) {
    if (i !== index && rankingSelecionado[i] === nome) {
      rankingSelecionado[i] = null;
    }
  }

  rankingSelecionado[index] = nome;
  renderRankingList();
  fecharModalBallonDor();
}






function fecharModalBallonDor() {
    document.getElementById('modal-ballon-dor').style.display = 'none';
}

function enviarVotoBallonDor() {
  if (rankingSelecionado.includes(null)) {
    abrirPopupErro();
    return;
  }

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSevPkeYnwqC0MAeN0QR-IeyHJc8ngQqHu0OruHIUOaVZ5vsoQ/formResponse';

  // Substitua pelos seus códigos reais (entry.X)
  const camposForm = [
    'entry.1098755557', // 1º lugar
    'entry.574550575', // 2º lugar
    'entry.2040683607', // 3º lugar
    'entry.1030411329', // 4º lugar
    'entry.390458148', // 5º lugar
    'entry.2126483727', // 6º lugar
    'entry.799216947', // 7º lugar
    'entry.274500633', // 8º lugar
    'entry.332947841', // 9º lugar
    'entry.2124678460'  // 10º lugar
  ];

  const formData = new FormData();

  for (let i = 0; i < 10; i++) {
    formData.append(camposForm[i], rankingSelecionado[i]);
  }

  fetch(formUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  }).then(() => {
    abrirPopupEnviar();
  });
}


window.addEventListener('DOMContentLoaded', () => {
    renderRankingList();
});

function resetarRanking() {
  for (let i = 0; i < rankingSelecionado.length; i++) {
    rankingSelecionado[i] = null;
  }
  renderRankingList();
}