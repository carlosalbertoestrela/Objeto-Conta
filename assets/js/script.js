function Conta(agencia=0,conta=0,digito=0,saldo=0,titular=null,tipo="CC"){
    this.agencia = agencia;
    this.conta = conta;
    this.digito = digito;
    this.titular = titular;
    this.tipo = tipo;
    this.saldo = saldo;
    this.movimentacoes = [];
}

Conta.prototype.banco = "Broken Bank";

Conta.prototype.extrato = function(){
    let extrato = `EXTRATO: \nConta: ${this.conta}\nTitular: ${this.titular}`;
    extrato += `\nSaldo atual = R$${this.saldo.toFixed(2)}\n\nMOVIMENTAÇÕES =>`;
    for(let i in this.movimentacoes){
        extrato += `\n\n${JSON.stringify(this.movimentacoes[i],null,2)}`;
    }

    return document.getElementById("texto").innerHTML = extrato
}
Conta.prototype.depositar = function(valor,contaOrigem = null){
    this.saldo += valor;
    this.movimentacoes.unshift(new this.Movimentacao(valor,"Depósito",this.saldo,this.conta,contaOrigem));
    return this.saldo;
}
Conta.prototype.sacar = function(valor,transf=false){
    let saque = false;
    if(this.saldo < valor){
        console.error("Transação não realizada: Saldo insuficiente"); 
    }else{
        saque = true;
        this.saldo -= valor;
    }
    if(!transf){
        this.movimentacoes.unshift(new this.Movimentacao(valor,"Saque",this.saldo,null,this.conta,saque));
    }
    
    return [saque, this.saldo]
}
Conta.prototype.transferir = function(valor, conta){
    const saque = this.sacar(valor,true)[0];
    if(saque){
        conta.depositar(valor,this.conta);
    }
    this.movimentacoes.unshift(new this.Movimentacao(valor,"transferência",this.saldo,conta.conta,this.conta,saque));
    return this.saldo;
}

Conta.prototype.Movimentacao = function(valor, movimento,saldo,contaDestino= null, contaOrigem = null, concluido = true){
    this.data = new Date(Date.now()).toUTCString();
    this.valor = `R$${valor.toFixed(2)}`;
    this.movimento = movimento;
    this.contaOrigem = contaOrigem;
    this.contaDestino = contaDestino;
    this.Realizada = concluido? "SIM" : "Não";
    this.saldo_Final = `R$${saldo.toFixed(2)}`;
}

// ------------------- TESTES --------------------//
    // para facilitar a correção só descomentar os testes e executar o .extrato() no terminal.
/*
const conta1 = new Conta(1,1234,5,983,"Carlos")
const conta2 = new Conta(2,6543,9,500,"Oslente")

conta1.transferir(500,conta2);
conta2.sacar(89);
conta1.depositar(200);
conta2.transferir(900,conta1);
conta1.sacar(300);
conta2.depositar(102); */


