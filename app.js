class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false	
			}			
		}
		return true
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

	recuperarTodosRegistros() {
		let despesas = Array() // array de despesas
		let id = localStorage.getItem('id')

		// recuperando todas as despesas
		for (let i = 1; i <= id; i++) {
			// convertendo a despesa de JSON para objeto literal
			let despesa = JSON.parse(localStorage.getItem(i))	

			if (despesa == null) { // testando se existe um indice null
				continue
			}
			
			despesas.push(despesa) // adicionando no array de despesas
		}
		return despesas
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

	// instanciando um objeto despesa
	let despesa = new Despesa (
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if (despesa.validarDados()) {
		bd.gravar(despesa)
		document.getElementById('exampleModalLabel').innerHTML = 'Sucesso'
		document.getElementById('exampleModalLabel').className = 'modal-title text-success'
		document.getElementById('msg').innerHTML = 'Despesa registrada com sucesso'
		document.getElementById('botao').innerHTML = 'OK'
		document.getElementById('botao').className = 'btn btn-success'
		$('#modalRegistraDespesa').modal('show')
	}
	else {
		document.getElementById('exampleModalLabel').innerHTML = 'Erro ao Registrar'
		document.getElementById('exampleModalLabel').className = 'modal-title text-danger'
		document.getElementById('msg').innerHTML = 'Talvez algum campo não tenha sido preenchido'
		document.getElementById('botao').innerHTML = 'Corrigir'
		document.getElementById('botao').className = 'btn btn-danger'
		$('#modalRegistraDespesa').modal('show')
	}
}

function carregaListaDespesas() {
	let despesas = Array()
	despesas = bd.recuperarTodosRegistros()
	console.log(despesas)
}



