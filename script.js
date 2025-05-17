const jogadores = {
    goleiro: ['Buffon', 'Neuer'],
    defesa: ['Maldini', 'Beckenbauer', 'Cannavaro', 'Ramos'],
    meio: ['Maradona', 'Zidane', 'Iniesta'],
    atacante: ['Pelé', 'Cristiano Ronaldo', 'Messi']
  };
  
  const selecionados = new Set();
  
  let jogadorAtual = null;
  let divAtual = null;
  
  function abrirSelecao(div) {
    const posicao = div.dataset.posicao;
    jogadorAtual = posicao;
    divAtual = div;
  
    const lista = jogadores[posicao].filter(j => !selecionados.has(j));
    const ul = document.getElementById('lista-jogadores');
    ul.innerHTML = '';
  
    lista.forEach(jogador => {
      const li = document.createElement('li');
      li.textContent = jogador;
      li.onclick = () => selecionarJogador(jogador);
      ul.appendChild(li);
    });
  
    document.getElementById('modal').style.display = 'flex';
  }
  
  function selecionarJogador(nome) {
    selecionados.add(nome);
    divAtual.innerHTML = `
      <img src="sprite/suit.jpg" alt="Jogador">
      <small>${nome}</small>
    `;
    divAtual.onclick = null;
    fecharModal();
  }
  
  function fecharModal() {
    document.getElementById('modal').style.display = 'none';
  }
  