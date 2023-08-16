const cardapio = [
    { codigo: 'cafe', valor: 3.00},
    { codigo: 'chantily', valor: 1.50, requere: 'cafe'},
    { codigo: 'suco', valor: 6.20},
    { codigo: 'sanduiche', valor: 6.50},
    { codigo: 'queijo', valor: 2.00, requere: 'sanduiche'},
    { codigo: 'salgado', valor: 7.25},
    { codigo: 'combo1', valor: 9.50},
    { codigo: 'combo2', valor: 7.50},
]

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(!this.verificaMetodoPagamento(metodoDePagamento)) return "Forma de pagamento inválida!";
        if(!this.verificaCarrinhoVazio(itens)) return "Não há itens no carrinho de compra!";

        itens = this.mapeamentoItens(itens);

        if(!this.verificaItem(itens)) return "Item inválido!";
        if(!this.verificaQuantidade(itens)) return "Quantidade inválida!";
        if(!this.verificaItemExtra(itens)) return "Item extra não pode ser pedido sem o principal";

        return `R$ ${this.pagamentoTotal(itens, metodoDePagamento).toFixed(2).replace(".", ",")}`;
    }

    verificaMetodoPagamento(metodoDePagamento) {
        return ['credito', 'debito', 'dinheiro'].includes(metodoDePagamento);
    }

    verificaCarrinhoVazio(itens) {
        if(!itens.length)
            return false;
        
        return true;
    }
    
    mapeamentoItens(itens) {
        return itens = itens.map(i => { 
            return { codigo: i.split(',')[0], quantidade: i.split(',')[1]}
        });
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

        return valorTotal * this.taxaPagamento(metodoDePagamento);
    }

    taxaPagamento(metodoDePagamento) {
        switch (metodoDePagamento) {
            case 'credito':
                return 1.03;
            case 'dinheiro':
                return 0.95;
            default:
                return 1;
        }
    }
}

export { CaixaDaLanchonete };