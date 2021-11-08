export class Pagamento {


    montarPayload(infoProjeto: any, autor: any) {
        let data = {
            "description": infoProjeto.description,
            "systemId": 1,
            "name": autor.nome,
            "userId": autor.uid,
            "phoneNumber": autor.telefone,
            "email": autor.email,
            "docNumber":  autor.cpfCnpj,
            "docType": 'CPF',
            "payload": {
                "entityId": infoProjeto.id,
                "userId": infoProjeto.owner,
                "status": "W",
                "paymentId": null,
                "ammount": null,
                "recurrent": null,
                "platform": null,
                "anonymous": null,
                "emailDoneReport": null
            },
            "creditCard": null,
            "billet": {
                "number": null,
                "paymentId": null,
                "name": null,
                "email": null,
                "docNumber": null,
                "docType": null,
                "downloadUrl": null,
                "expires": null
            },
            "pix": null,
            "address": {
                "id": null,
                "zip": null,
                "address": null,
                "district": null,
                "complement": null,
                "city": null,
                "state": null
            },
            "repeat": true,
            "repeatType": null,
            "fractions": [
                {
                    "accountNumber": null,
                    "ammount": null,
                    "description": "Valor para plataforma"
                },
                {
                    "accountNumber": null,
                    "ammount": null,
                    "description": "Valor para o projeto"
                }
            ]
        }

        return data;
    }
}