import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserInput } from './utils/UpdateUserInput';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserRole } from './entities/user-role.entity';
import { userRoleTypeEnum } from 'src/common/common.enum';
import { CurrentUser } from '../auth/decorators/current.user.decorator';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUserById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findUserById(id);
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAllusers();
  }

  @Query(() => User)
  async getUserByUserName(@Args('userName') userName: string) {
    return this.userService.findUserByUserName(userName);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => UserRole)
  async addRoleToUser(
    @Args('userName') userName: string,
    @Args('userRole')
    userRole: userRoleTypeEnum,
  ): Promise<UserRole> {
    return this.userService.addRoleToUser(userName, userRole);
  }

  @Query(() => User)
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    const CurrentUser = this.userService.findUserById(user.id);
    return CurrentUser;
  }
}
