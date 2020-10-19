class Despesa {
	constructor(ano, mes, dia, tipo, valor, descricao) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
}

function cadastrarDespesa() {
	// recuperando os dados do formulário de cadastro
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	// instanciando 
	let despesa = new Despesa(
		ano.value
		mes.value
		dia.value
		tipo.value
		descricao.value
		valor.value
	)
}