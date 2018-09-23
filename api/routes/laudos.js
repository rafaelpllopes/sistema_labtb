laudos = [
    {
        id: 1,
        data_entrada: new Date(),
        nome_paciente: 'teste1',
        sexo_paciente: 'M',
        endereco_paciente: {
            logradouro: 'Rua ...',
            numero: '1',
            bairro: '?',
            cidade: '?',
            cep: '?'
        }
    },
    {
        id: 2,
        data_entrada: new Date(),
        nome_paciente: 'teste2',
        sexo_paciente: 'M',
        endereco_paciente: {
            logradouro: 'Rua ...',
            numero: '1',
            bairro: '?',
            cidade: '?',
            cep: '?'
        }
    },
    {
        id: 3,
        data_entrada: new Date(),
        nome_paciente: 'teste3',
        sexo_paciente: 'M',
        endereco_paciente: {
            logradouro: 'Rua ...',
            numero: '1',
            bairro: '?',
            cidade: '?',
            cep: '?'
        }
    },
]
module.exports = app => {
    app.route('/laudos')
        .get((req, res) => res.json(laudos))
        .post((req, res) => {
            if(req.body) {
                laudos.push(req.body);
                res.sendStatus(201);
            } else {
                res.sendStatus(412);
            }
        });

    app.route('/laudos/:id')
        .get((req, res) => {
            res.json(laudos.find(laudo => laudo.id == req.params.id))
        })
        .put((req, res) => {
            let id = req.params.id;
            if(id) {
                laudos[id - 1] = req.body;
                res.sendStatus(202);
            } else {
                res.sendStatus(412);
            }
        })
        .delete((req, res) => {
            let id = req.params.id;
            if(id) {
                let index = laudos.find(laudo => laudo.id == req.params.id);
                laudos.splice(index, 1);
                res.sendStatus(202);
            } else {
                res.sendStatus(412);
            }
        });
};