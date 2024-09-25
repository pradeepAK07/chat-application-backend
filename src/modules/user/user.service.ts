import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserInput } from './utils/createUserInput';
import { UpdateUserInput } from './utils/UpdateUserInput';
import * as bcrpt from 'bcrypt';
import { UserRoleRepository } from './user-role.repository';
import { userRoleTypeEnum } from 'src/common/common.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userRoleRepo: UserRoleRepository,
  ) {}

  async findUserByUserName(userName: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userName } });
    if (!user) {
      throw new NotFoundException('user does not exist!');
    }
    return user;
  }

  async createUser(createUserInput: createUserInput): Promise<User> {
    const isUserExists = await this.userRepository.findOne({
      where: { userName: createUserInput.userName },
    });

    if (isUserExists) {
      throw new Error(
        'user name already taken, Please use a different user name',
      );
    }

    const hashedPassword: string = await bcrpt.hash(
      createUserInput.password,
      10,
    );
    createUserInput.password = hashedPassword;
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async addRoleToUser(userName: string, roleType: userRoleTypeEnum) {
    const user = await this.findUserByUserName(userName);
    if (user) {
      const userRoleInfo = await this.userRoleRepo.findOne({
        where: {
          userId: user?.id,
          userType: roleType,
        },
      });
      if (userRoleInfo) {
        throw new UnprocessableEntityException('user role already exists');
      } else {
        const role = {
          userId: user.id,
          userType: roleType,
        };
        const createUserRole = await this.userRoleRepo.save(role);
        return createUserRole;
      }
    } else {
      throw new NotFoundException('user does not exist!');
    }
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const hashedPassword: string = await bcrpt.hash(
      updateUserInput.password,
      10,
    );
    updateUserInput.password = hashedPassword;
    return await this.userRepository.save({ ...user, ...updateUserInput });
  }

  async deleteUser(id: string): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return 'User deleted successfully';
  }

  async getAllusers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
