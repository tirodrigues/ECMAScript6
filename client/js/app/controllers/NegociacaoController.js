class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputDate = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = new Negociacao(
        DateHelper.textoParaData(this._inputDate.value),
        this._inputQuantidade.Value,
        this._inputValor.value
    );
  }
}
