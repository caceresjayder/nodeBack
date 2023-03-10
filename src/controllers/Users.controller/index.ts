import models from '../../db/models';
import { Op } from 'sequelize';
import {PasswordHash} from '../../services/middlewares/Passwords'

interface Idata {
  name: string;
  email: string;
  password: string;
  role: ROLES;
}

enum ROLES {
  "ADMIN",
  "USER",
  "WORKER",
}

class UserController{
  
  constructor() {}

  static async create(_data: Idata) {
    const pass = await PasswordHash( _data.password);
    _data.password = pass;
    const newUser = await models.user.build(_data);
    const response = await newUser.save();
    return response;
  }

  static async findAll() {
    const users = await models.user.findAll({
       attributes: { exclude: ['password']},
       where: {
      role: {
        [Op.not]: 'ADMIN'
      }
    }});
    return users;
  }

  static async findByEmail(_email: string) {
    const user = await models.user.findOne({ where: { email: _email } });
    return user
  }

  static async findByID(_id: number) {
    const user = await models.user.findByPk(_id);
      return user;
  }

  static async update(_id: number, _changes: Partial<Idata>) {
    const userToUpdate = await models.user.findByPk(_id);
      const response = await userToUpdate.update(_changes);
      return response;
  }

  static async userBalanceIncrement(_id: number, _amount: string) {
    const user: any = await this.findByID(_id);
    const response = await user.increment("balance", { by: _amount });
    return response;
  }

  static async userBalanceDecrement(_id: number, _amount: string) {
    const user: any = await this.findByID(_id);
    const response = await user.decrement("balance", { by: _amount });
    return response;
  }

  static async delete(_id: number) {
    const userToDelete = await models.user.findByPk(_id);
      const response = userToDelete.destroy();
      return response;
}

}
export  {UserController};
