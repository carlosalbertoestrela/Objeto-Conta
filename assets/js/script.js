function Conta(agencia=0,conta=0,digito=0,saldo=0,titular=null,tipo="CC"){
    this.agencia = agencia;
    this.conta = conta;
    this.digito = digito;
    this.titular = titular;
    this.tipo = tipo;
    this.saldo = saldo;
    this.movimentacoes = []
}
Conta.prototype.banco = "Broken Bank"
Conta.prototype.extrato = function(){
    let extrato = "EXTRATO:";
    extrato += `\nSaldo atual = ${this.saldo}`
    for(i in this.movimentacoes){
        let teste = `\n\n${JSON.stringify(this.movimentacoes[i]).replace(",", " -").replaceAll(",","\n")}`
        extrato += teste
    }
    console.log(extrato)
    return "Fim"
}
Conta.prototype.depositar = function(valor,contaOrigem = null){
    this.saldo += valor
    this.movimentacoes.push(new this.Movimentacao(valor,"Depósito",this.saldo,this.conta,contaOrigem))
    return this.saldo;
}
Conta.prototype.sacar = function(valor){
    let saque = false
    if(this.saldo < valor){
        console.error("Transação não realizada: Saldo insuficiente")   
    }else{
        saque = true;
        this.saldo -= valor
    }
    this.movimentacoes.push(new this.Movimentacao(valor,"Saque",this.saldo,null,this.conta,saque))
    
    return [saque, this.saldo]
}
Conta.prototype.transferir = function(valor, conta){
    saque = this.sacar(valor)[0]
    console.log(saque)
    if(saque){
        conta.depositar(valor,this.conta);
    }
    this.movimentacoes.push(new this.Movimentacao(valor,"transferência",this.saldo,conta.conta,this.conta,saque))
    return this.saldo

}
Conta.prototype.Movimentacao = function(valor, movimento,saldo,contaDestino= null, contaOrigem = null, concluido = true){
    this.data = new Date(Date.now()).toUTCString()
    this.valor = valor;
    this.movimento = movimento;
    this.contaOrigem = contaOrigem;
    this.contaDestino = contaDestino;
    this.concluido = concluido;
    this.saldoFinal = saldo;
}