class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputDate = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
        new ListaNegociacoes(),
        new NegociacoesView($('#negociacoesview')),
        'adiciona', 'esvazia');

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
}
