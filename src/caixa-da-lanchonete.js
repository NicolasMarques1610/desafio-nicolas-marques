const validaMetodoPagamento = ['credito', 'debito', 'dinheiro'];
const cardapio = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.00},
    { codigo: 'chantily', descricao: 'Chantily', valor: 1.50, requere: 'cafe'},
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20},
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50},
    { codigo: 'queijo', descricao: 'Queijo', valor: 2.00, requere: 'sanduiche'},
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25},
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50},
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50},
]

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(!validaMetodoPagamento.includes(metodoDePagamento)) return "Forma de pagamento inválida!";
        if(!itens.length) return "Não há itens no carrinho de compra!";

        itens = itens.map(i => { return { codigo: i.split(',')[0], quantidade: i.split(',')[1]}});

        if(!this.verificaItem(itens)) return "Item inválido!";
        if(!this.verificaQuantidade(itens)) return "Quantidade inválida!";
        if(!this.verificaItemExtra(itens)) return "Item extra não pode ser pedido sem o principal";

        return "R$ " + this.pagamentoTotal(itens, metodoDePagamento).toFixed(2).replace(".", ",");
    }

    verificaItem(itens) {
        for (let i = 0; i < itens.length; i++) {
            if (!cardapio.map(c => c.codigo).includes(itens[i].codigo)) {
                return false;
            }
        }

        return true;
    }

    verificaQuantidade(itens) {
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].quantidade <= 0) {
                return false;
            }
        }

        return true;
    }

    verificaItemExtra(itens) {
        if(itens.map(it => it.codigo).includes('chantily') && !itens.map(it => it.codigo).includes('cafe'))
            return false;
        
        if(itens.map(it => it.codigo).includes('queijo') && !itens.map(it => it.codigo).includes('sanduiche'))
            return false;
  
        return true;
    }
    
    pagamentoTotal(itens, metodoDePagamento) {
        var valorTotal = 0;

        for (let i = 0; i < itens.length; i++) {
            for (let j = 0; j < cardapio.length; j++) {
                if(cardapio[j].codigo == itens[i].codigo) {
                    let valor = cardapio[j].valor * itens[i].quantidade;
                    valorTotal = valorTotal + valor;
                }
            }
        }

        if(metodoDePagamento == validaMetodoPagamento[0]) {
            return this.pagamentoCredito(valorTotal);
        } else if(metodoDePagamento == validaMetodoPagamento[2]) {
            return this.pagamentoDinheiro(valorTotal);
        } else return valorTotal;
    }

    pagamentoDinheiro(valorTotal) {
        return valorTotal * 0.95;
    }

    pagamentoCredito(valorTotal) {
        return valorTotal * 1.03;
    }

}

export { CaixaDaLanchonete };
