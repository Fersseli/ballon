const jogadores = {
    goleiro: ['Carlinhos', 'El Careca', 'Luis', 'Nathan', 'Noia'],
    le: ['Charlotte','Oliveira','Selton'],
    ld: ['Bora Bill','Nathan','Oliveira'],
    zag1: ['Cabeça de Pi', 'Charlotte', 'DVD', 'Ian', 'Kaio','Waldir Braz'],
    zag2: ['Cabeça de Pi', 'Charlotte', 'DVD', 'Ian', 'Kaio','Waldir Braz'],
    mcvol1: ['Baglini', 'Diogo', 'El Careca', 'Guiça','Jacaré','Luis','Renan','Tigrinho','Waldir Braz','Wolksvagner','Zikaum'],
    mcvol2: ['Baglini', 'Diogo', 'El Careca', 'Guiça','Jacaré','Luis','Renan','Tigrinho','Waldir Braz','Wolksvagner','Zikaum'],
    mee: ['Da Cunha','Hori','Jacaré','Kanye West','Maradona','Microsony','Pelé','Rataria','Salahmuel','Waldir Braz','Wolksvagner'],
    med: ['Da Cunha','Hori','Jacaré','Kanye West','Maradona','Microsony','Pelé','Rataria','Salahmuel','Waldir Braz','Wolksvagner'],
    mei: ['Jacaré','Kanye West','Maradona','Pelé','Ratanabá','Zikaum'],
    atacante: ['Da Cunha', 'Hori', 'Microsony', 'Pelé','Ronaldinho','Taylor Swift','Wolksvagner','Zikaum']
  };
  
// Adicione no início do script.js (junto com as outras variáveis)
const jogadoresBallonDor = [
    "Da Cunha", "Hori", "Jacaré", "Maradona", "Microsony", 
    "Pelé", "Ratanabá", "Taylor Swift", "Waldir Braz", "Zikaum"
];

let jogadorSelecionadoBallon = null;

  const selecionados = new Set();
  let jogadorAntigo = null;
  
  function abrirSelecao(div) {
    const posicao = div.dataset.posicao;
    jogadorAntigo = div.dataset.jogador || null;
  
    const lista = jogadores[posicao].filter(j => !selecionados.has(j) || j === jogadorAntigo);
  
    const ul = document.getElementById('lista-jogadores');
    ul.innerHTML = '';
  
    lista.forEach(jogador => {
      const li = document.createElement('li');
      li.textContent = jogador;
      li.onclick = () => selecionarJogador(jogador, div);
      ul.appendChild(li);
    });
  
    document.getElementById('modal').style.display = 'flex';
  }
  
  function selecionarJogador(nome, div) {
    if (jogadorAntigo && jogadorAntigo !== nome) {
      selecionados.delete(jogadorAntigo);
    }
  
    selecionados.add(nome);
    div.dataset.jogador = nome;
    div.innerHTML = `
      <img src="sprites/suit.png" alt="Jogador">
      <small>${nome}</small>
    `;
    div.onclick = () => abrirSelecao(div);
  
    fecharModal();
  }
  
  function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    jogadorAntigo = null;
  }
  
  document.getElementById('btnEnviarTime').addEventListener('click', () => {
    const players = document.querySelectorAll('.player');
    let tudoSelecionado = true;
  
    // Verifica se todos têm jogador selecionado
    players.forEach(div => {
      if (!div.dataset.jogador) {
        tudoSelecionado = false;
      }
    });
  
    if (!tudoSelecionado) {
        abrirPopupErro();
        return;
    }
  
    // Se chegou aqui, todos preenchidos, vamos enviar
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdhCVxEVbH4UN5-AI_WqRF0cXPjLe7G-ho_ZgEPKIEtm5PA0Q/formResponse';
  
    const camposForm = {
      goleiro: 'entry.1725006530',
      le: 'entry.751698088',
      zag1: 'entry.298442851',
      zag2: 'entry.2069063659',
      ld: 'entry.34120782',
      mcvol1: 'entry.1087586518',
      mcvol2: 'entry.1614376260',
      mee: 'entry.2129153787',
      mei: 'entry.1349472948',
      med: 'entry.1823422459',
      atacante: 'entry.1583529767'
    };
  
    const formData = new FormData();
  
    players.forEach(div => {
      const posicao = div.dataset.posicao;
      const jogador = div.dataset.jogador;
  
      if (posicao && jogador && camposForm[posicao]) {
        formData.append(camposForm[posicao], jogador);
      }
    });
  
    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then(() => {
      // Só aqui abre o popup de sucesso
      abrirPopupEnviar();
    })
    .catch((err) => {
        abrirPopupErro();
    });
  });
  
  
  let popupTimeout;
  
  function mostrarPopup() {
    const popup = document.getElementById("popup-reset");
    if (!popup) return;
    popup.classList.add("show");
    popup.style.display = 'flex';
    popup.style.opacity = 1;
  
    clearTimeout(popupTimeout);
  
    popupTimeout = setTimeout(() => {
      fecharPopup('popup-reset');
    }, 5000);
  }
  
  function abrirPopupEnviar() {
    const popup = document.getElementById('popupEnviar');
    if (!popup) return;
    popup.style.display = 'flex';  // só aqui aparece
    setTimeout(() => {
      popup.style.opacity = 1;      // e faz o fade-in
    }, 10);
  
    // Desaparece sozinho em 5 segundos
    setTimeout(() => {
      fecharPopup('popupEnviar');
    }, 5000);
  }

  function abrirPopupErro() {
    const popup = document.getElementById('popupErro');
    if (!popup) return;
    popup.style.display = 'flex';  // só aqui aparece
    setTimeout(() => {
      popup.style.opacity = 1;      // e faz o fade-in
    }, 10);
  
    // Desaparece sozinho em 5 segundos
    setTimeout(() => {
      fecharPopup('popupErro');
    }, 5000);
  }
  
  function fecharPopup(id) {
    if (!id) return;
    const popup = document.getElementById(id);
    if (!popup) return;
  
    popup.style.opacity = 0;
    popup.classList.remove("show");
    setTimeout(() => {
      popup.style.display = 'none';
    }, 500);
  }
  
  document.getElementById('btnReset').addEventListener('click', () => {
    selecionados.clear(); // limpa o Set de selecionados
  
    // seleciona todas as divs dos jogadores no campo
    const players = document.querySelectorAll('.player');
  
    players.forEach(div => {
      // limpa o data-jogador
      delete div.dataset.jogador;
      // limpa o conteúdo HTML
      div.innerHTML = '+';
      // reseta o evento para abrir seleção
      div.onclick = () => abrirSelecao(div);
    });
  
    mostrarPopup();
  });
  
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
  
  goldenTeam.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  adicionarNegritoAoSegurar(ballonDor);
  adicionarNegritoAoSegurar(goldenTeam);
  
  // Adicione um event listener para fechar popup-reset ao clicar no "X"
  // Supondo que o botão tenha id "btnFecharReset"
  const btnFecharReset = document.getElementById('btnFecharReset');
  if (btnFecharReset) {
    btnFecharReset.addEventListener('click', () => fecharPopup('popup-reset'));
  }
 // =============================================
// SISTEMA DE RANKING (PREFIXO 'r' PARA TODAS AS VARIÁVEIS/FUNÇÕES)
// =============================================



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
    rankingList.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.className = 'player rank-player';
        div.style.margin = '10px auto';
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
        rankingList.appendChild(div);
    }
}

function abrirSelecaoRanking(index, div) {
    const ul = document.getElementById('lista-jogadores-ballon');
    ul.innerHTML = '';

    jogadoresBallonDor.forEach(jogador => {
        const jaSelecionado = rankingSelecionado.includes(jogador);
        if (!jaSelecionado || rankingSelecionado[index] === jogador) {
            const li = document.createElement('li');
            li.textContent = jogador;
            li.onclick = () => selecionarJogadorRanking(index, jogador);
            ul.appendChild(li);
        }
    });

    document.getElementById('modal-ballon-dor').style.display = 'flex';
}

function selecionarJogadorRanking(index, nome) {
    rankingSelecionado[index] = nome;
    renderRankingList();
    fecharModalBallonDor();
}


function fecharModalBallonDor() {
    document.getElementById('modal-ballon-dor').style.display = 'none';
}

function enviarVotoBallonDor() {
    if (rankingSelecionado.includes(null)) {
        alert("Preencha todas as 10 posições antes de votar!");
        return;
    }

    console.log("Ranking votado:", rankingSelecionado);

    // Exemplo: enviar para um Google Form (adicione os campos corretos)
    // const formUrl = 'https://seu-form-url-aqui';
    // const formData = new FormData();
    // rankingSelecionado.forEach((jogador, i) => {
    //     formData.append(`entry.X${i}`, jogador); // substitua X0, X1... com seus entry IDs reais
    // });
    // fetch(formUrl, { method: 'POST', mode: 'no-cors', body: formData });

    abrirPopupEnviar();
}

window.addEventListener('DOMContentLoaded', () => {
    renderRankingList();
});