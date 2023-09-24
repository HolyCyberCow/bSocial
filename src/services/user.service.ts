import { User } from "../entities/user.entity";
import { PostgresDataSource } from "../utils/db";
import config from "../config/config";
import { signJwt } from "../utils/jwt";

const userRepository = PostgresDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUserWithRelations = async (userId: string) => {
  return await userRepository.findOne({
    where: { id: userId },
    relations: { following: true },
  });
};

export const findUser = async (query: object) => {
  return await userRepository.findOneBy(query);
};

export const signTokens = async (user: User) => {
  const access_token = signJwt({ sub: user.id }, "accessToken", {
    expiresIn: `${config.accessTokenExpiresInMinutes}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, "refreshToken", {
    expiresIn: `${config.refreshTokenExpiresInMinutes}m`,
  });

  return { access_token, refresh_token };
};

export const followUser = async (user: User, followUser: User) => {
  if (!user.following) {
    user.following = [followUser];
  } else {
    user.following.push(followUser);
  }
  return await userRepository.save(user);
};
