class DateHelper {

  constructor() {
    throw new Error('DataHelper não pode ser instaciando');
  }

  static textoParaData(texto) {

    if(!/\d{4}-\d{2}-\d{2}/.test(texto))
      throw new Error('deve estar no formato aaaa-mm-dd');

    return new Date(...texto.split('-').map((item, index) => item - index % 2));
  }

  static dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }
}
