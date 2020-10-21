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
			despesa.id = i
			despesas.push(despesa) // adicionando no array de despesas
		}
		return despesas
	}

	pesquisar(despesa) {
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()

		// filtros
		if(despesa.ano != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		if(despesa.mes != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}	

		if(despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		if(despesa.tipo != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		if(despesa.descricao != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		if(despesa.valor != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover(id) {
		localStorage.removeItem(id)
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

		// limpando os campos
		for(let i in despesa) {
			document.getElementById(i).value = ''
		}
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

function carregaListaDespesas(despesas = Array(), filtro = false) {
	if (despesas.length == 0 && filtro == false) {
		despesas = bd.recuperarTodosRegistros()
	}	

	// selecionando o tbody do consulta.html
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	// percorrendo o array despesas e listando cada despesa
	despesas.forEach(function(d) {
		// criando a linha (tr), uma linha para cada despesa
		let linha = listaDespesas.insertRow()

		// criando a coluna (td), cada linha 4 colunas
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		// ajustando o tipo
		switch(parseInt(d.tipo)) {
			case 1: d.tipo = 'Alimentação'
			break
			case 2: d.tipo = 'Educação'
			break
			case 3: d.tipo = 'Lazer'
			break
			case 4: d.tipo = 'Saúde'
			break
			case 5: d.tipo = 'Transporte'
			break
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = `R$ ${d.valor}`

		// botão de excluir
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id-despesa-${d.id}`
		btn.onclick = function() {
			let id = this.id.replace('id-despesa-', '')
			
			document.getElementById('exampleModalLabel').innerHTML = 'Excluído!'
			document.getElementById('exampleModalLabel').className = 'modal-title text-primary'
			document.getElementById('msg').innerHTML = 'Despesa excluída com sucesso'
			document.getElementById('botao').innerHTML = 'Recarregar'
			document.getElementById('botao').className = 'btn btn-primary'
			$('#modalDespesaExcluida').modal('show')

			bd.remover(id)
		}
		linha.insertCell(4).append(btn)
	})
}

function pesquisarDespesas() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
	let despesas = bd.pesquisar(despesa)
	carregaListaDespesas(despesas, true)
}



