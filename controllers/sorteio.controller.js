const db = require('../models');
const Sort = db.sort;
const Op = db.Sequelize.Op;

// Sorteia um participante
exports.sortOne = async (req, res) => {

  const randomNumber = Math.floor(Math.random() * 29)

  const winner = await Sort.findByPk(randomNumber)

  // Sort.destroy(randomNumber)

  console.log(winner.phone);

  res.status(200).json(winner)
}

// Cria e salva um novo jogador.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.phone) {
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
    return;
  }

  // Cria um participante
  const participant = {
    name: req.body.name,
    phone: req.body.phone
  };

  // Salva o jogador no Banco de dados

  Sort.create(participant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error on create participant',
      });
    });
};

// Retoma todos os nomes do banco.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Sort.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving participants."
      });
    });
};

// Retorna um único nome por Id.
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sort.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Participant with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Participant with id=" + id
      });
    });
};

// UAtualiza um nome por Id.
exports.update = (req, res) => {
  const id = req.params.id;

  Sort.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Participant was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Participant with id=${id}. Maybe Participant was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Participant with id=" + id
      });
    });
};

// Deleta um nome por Id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Sort.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Participant was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Participant with id=${id}. Maybe Participant was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Participant with id=" + id
      });
    });
};

// Deleta todos os nomes do banco.
exports.deleteAll = (req, res) => {
  Sort.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Participants were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Participants."
      });
    });
};
