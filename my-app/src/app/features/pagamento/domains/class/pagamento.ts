export class Pagamento {


    montarPayload(infoProjeto: any, autor: any, dadosUsuario: any, dadosPIX: any, dadosEndereco: any, fracoes: any, boleto: any, cartaoCredito: any) {

        console.log('CHEGOU NO PAYLOAD INFO PROJETO', infoProjeto);
        console.log('CHEGOU NO PAYLOAD AUTOR', autor);
        console.log('CHEGOU NO PAYLOAD DADOS USUARIO', dadosUsuario);
        console.log('CHEGOU NO PAYLOAD DADOS dadosPIX', dadosPIX);
        console.log('CHEGOU NO PAYLOAD DADOS dadosEndereco', dadosEndereco);
        console.log('CHEGOU NO PAYLOAD DADOS fracoes', fracoes);
        console.log('CHEGOU NO PAYLOAD DADOS boleto', boleto);
        console.log('CHEGOU NO PAYLOAD DADOS cartaoCredito', cartaoCredito);

        let data = {
            "description": infoProjeto.description,
            "systemId": 1,
            "name": autor.nome,
            "userId": autor.cpfCnpj,
            "phoneNumber": autor.telefone,
            "email": autor.email,
            "docNumber": autor.cpfCnpj,
            "docType": 'CPF',
            "payload": {
                "entityId": infoProjeto.id,
                "userId": infoProjeto.owner,
                "status": "W",
                "paymentId": null,
                "ammount": dadosUsuario.valorContribuicao ?  dadosUsuario.valorContribuicao : false,
                "recurrent": dadosUsuario.doacaoMensal ? dadosUsuario.doacaoMensal : false,
                "platform": dadosUsuario.doacaoPlataforma ? dadosUsuario.doacaoPlataforma : false,
                "anonymous": dadosUsuario.anonimo ? dadosUsuario.anonimo : false,
                "emailDoneReport": dadosUsuario.emailContribuicao ? dadosUsuario.emailContribuicao: false
            },
            "creditCard": cartaoCredito,
            "billet": boleto,
            "pix": dadosPIX,
            "address": dadosEndereco,
            "repeat": dadosUsuario.doacaoMensal ? true : false,
            "repeatType": dadosUsuario.doacaoMensal ? 'M' : '',
            "fractions": fracoes
        }

        return data;
    }

    montarPIX(dadosPIX: any) {
        let pix = {
            "key": null,
            "paymentId": null,
            "name": dadosPIX.nomeCompleto,
            "email": dadosPIX.email,
            "expires": null
        }

        return pix;
    }


    montarBoleto(dadosBoleto: any) {
        let pix = {
            "number": null,
            "paymentId": null,
            "name":  dadosBoleto.nomeCompleto,
            "email": dadosBoleto.email,
            "docNumber": dadosBoleto.cpf,
            "docType": 'CPF',
            "downloadUrl": null,
            "expires": null
        }

        return pix;
    }

    montarEnderecoCartao(dadosEndereco: any) {
        let endereco = {
            "id": null,
            "zip": dadosEndereco.cepCartao,
            "address": dadosEndereco.enderecoCartao,
            "district": dadosEndereco.bairroCartao,
            "complement": dadosEndereco.complementoCartao,
            "city": dadosEndereco.cidadeCartao,
            "state": dadosEndereco.estadoCartao
        }

        return endereco;
    }

    montarEnderecoBoleto(dadosEndereco: any) {
        let endereco = {
            "id": null,
            "zip": dadosEndereco.cepBoleto,
            "address": dadosEndereco.enderecoBoleto,
            "district": dadosEndereco.bairroBoleto,
            "complement": dadosEndereco.complementoBoleto,
            "city": dadosEndereco.cidadeBoleto,
            "state": dadosEndereco.estadoBoleto
        }

        return endereco;
    }

    montarCartaoCredito(dadosCartao: any, dadosPagamento: any) {
        let cartao = {
            "id": null,
            "number": dadosCartao.numeroCartao.trim(),
            "cvv": dadosCartao.cvv,
            "expires": dadosCartao.vencimento,
            "name": dadosCartao.nomeCompletoCartao,
            "addressId": null,
            "docNumber": dadosPagamento.cpf,
            "docType": "CPF",
            "flag": null
        }

        return cartao;
    }


    detectCardType(numberCredit: any): any {
        var re: any = {
            electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
            maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
            dankort: /^(5019)\d+$/,
            interpayment: /^(636)\d+$/,
            unionpay: /^(62|88)\d+$/,
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/
        }
    
        let result = null;

        for(var key in re) {
            if(re[key].test(numberCredit)) {
                result = key;
            }
        }

        return result;
    }
}