class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputDate = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = new Negociacao(
        DateHelper.textoParaData(this._inputDate.value),
        this._inputQuantidade.value,
        this._inputValor.value
    );

    this._listaNegociacoes.adiciona(negociacao);

    console.log(this._listaNegociacoes.negociacoes);
  }
}
