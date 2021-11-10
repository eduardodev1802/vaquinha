export class Pagamento {


    montarPayload(infoProjeto: any, autor: any, dadosUsuario: any, dadosPIX: any, dadosEndereco: any, fracoes: any, boleto: any) {
        let data = {
            "description": infoProjeto.description,
            "systemId": 1,
            "name": autor.nome,
            "userId": autor.uid,
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
            "creditCard": null,
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
}