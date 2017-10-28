class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputDate = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._ordemAtual = '';

    this._listaNegociacoes = new Bind(
        new ListaNegociacoes(),
        new NegociacoesView($('#negociacoesview')),
        'adiciona', 'esvazia', 'ordena', 'inverterOrdem');

    this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($('#mensagemview')),
        'texto');
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociacao adicionada com sucesso';
    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Lista de Negociacoes apagadas com sucesso';
  }

  _criaNegociacao() {
    return new Negociacao(
           DateHelper.textoParaData(this._inputDate.value),
           this._inputQuantidade.value,
           this._inputValor.value
    );
  }

  _limpaFormulario() {
    this._inputDate.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputDate.focus();
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()]
    ).then(negociacoes => {
        negociacoes
          .reduce((arrayJoin, array) => arrayJoin.concat(array), [])
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        this._mensagem.texto = 'Negociacoes importadas com sucessso';
    })
    .catch(err => this._mensagem.texto = err);
  }

  ordena(coluna) {
    if(this._ordemAtual == coluna) {
      this._listaNegociacoes.inverterOrdem();
    }
    else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }
}
