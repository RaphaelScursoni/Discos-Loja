class Disco {
    constructor(){
        this.discos = localStorage.getItem('tbDiscos') == null
        ? []
        : JSON.parse(localStorage.getItem('tbDiscos'))
    }
    salva(disco){
        if(document.getElementById('codigo').getAttribute('disabled') == 'disabled'){
            this.apaga(disco.codigo)
        }
        this.discos.push(disco) 
        localStorage.setItem('tbDiscos', JSON.stringify(this.discos))
        alert('Disco salvo com sucesso!')
    }
    apaga(codigo){
        let index = this.discos.findIndex(disco => disco.codigo == codigo)
        this.discos.splice(index, 1)
        localStorage.setItem('tbDiscos', JSON.stringify(this.discos))
        disco.atualiza()
    }
    edita(disco){
        document.getElementById('codigo').value = disco.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('nome').value = disco.nome
        document.getElementById('artista').value = disco.artista
        document.getElementById('nomealbum').value = disco.nomealbum
        document.getElementById('ano').value = disco.ano
        document.getElementById('pagamento').value = disco.pagamento
        document.getElementById('valor').value = disco.valor
        document.getElementById('observacoes').value = disco.observacoes
    }
    lista(){
        const listagem = this.discos.map((disco) => (
            `<tr> 
                <td>${disco.codigo}</td>
                <td>${disco.nome}</td>
                <td>${disco.artista}</td>
                <td>${disco.nomealbum}</td>
                <td>${disco.ano}</td>
                <td>${disco.pagamento}</td>
                <td>${disco.valor}</td>
                <td>${disco.observacoes}</td>
                <td>
                <button id='exclui' onClick='disco.apaga(${disco.codigo})'>🗑️ Excluir</button>
                <button id='editar' onClick='disco.edita(${JSON.stringify(disco)})'>📝 Editar</button>
                </td>
            </tr>
            `
        )).join("")

        return (`<table border='1' class='paleBlueRows'>
        <caption>Tabela de Discos</caption>
        <thead>
            <th>Código do Disco</th>
            <th>Nome do Disco</th>
            <th>Artista</th>
            <th>Nome do Album</th>
            <th>Ano de Lançamento</th>
            <th>Forma de Pagamento</th>
            <th>Valor do Disco</th>
            <th>Observações Adicionais</th>
        </thead>
        <tbody>${listagem}</tbody>
        </table>
        `)
    }
    atualiza(){ 
        document.getElementById('listagem').innerHTML = disco.lista()
    }
}
const disco = new Disco()

document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        artista: document.getElementById('artista').value,
        nomealbum: document.getElementById('nomealbum').value,
        ano: document.getElementById('ano').value,
        pagamento: document.getElementById('pagamento').value,
        valor: document.getElementById('valor').value,
        observacoes: document.getElementById('observacoes').value
    }

    if(registro.codigo == ''){
        alert('O Código do Disco é obrigatório!')
        return false;
    }
    if(registro.nome == ''){
        alert('O nome do Disco é obrigatório!')
        return false;
    }
    if(registro.artista == ''){
        alert('O nome do Artista é obrigatório!')
        return false;
    }
    if(registro.album == '' || registro.ano == '' || registro.pagamento == '' || registro.valor == ''){
        alert('Os dados: Nome do album, o ano de lançamento, a forma de pagamento e o valor são obrigatórios!')
        return false;
    }
    disco.salva(registro)
}

window.onload = function() {
    disco.atualiza()
}
