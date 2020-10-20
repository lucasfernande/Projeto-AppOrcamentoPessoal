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

class BD {
	constructor() {
		let id = localStorage.getItem('id')
		if (id === null) {
			localStorage.setItem('id', 0)
		}	
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		// acessando o local storage do navegador
	    // convertendo o objeto literal para uma anotação JSON
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}
}

let bd = new BD()

function cadastrarDespesa() {
	// recuperando os dados do formulário de cadastro
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	// instanciando 
	let despesa = new Despesa (
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)
	bd.gravar(despesa)
}



