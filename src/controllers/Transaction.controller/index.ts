import { Op } from "sequelize";
import models from '../../db/models';

interface Itransaction {
  to: string;
  from: string;
  amount: number;
}

class TransactionController {
  constructor() {}

  static async create(trans: Itransaction) {
    const transaction = await models.transaction.build(trans);
    const response = await transaction.save();
    return response;
  }

  static async findAll() {
    const transactions = await models.transaction.findAll();
    return transactions;
  }

  static async findOne(id: number) {
    const transaction = await models.transaction.findByPk(id);
    return transaction;
  }

  static async findAllOfUser(email: string) {
    const transactionsOfUser = await models.transaction.findAll({
      where: {
        [Op.or]: [{ to: email }, { from: email }],
      },
    });
    return transactionsOfUser;
  }
}

export {TransactionController};
