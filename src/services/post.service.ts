import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { PostComment } from "../entities/comment.entity";
import { PostgresDataSource } from "../utils/db";
import { In } from "typeorm";

const postRepository = PostgresDataSource.getRepository(Post);
const postCommentRepostiory = PostgresDataSource.getRepository(PostComment);
const userRepository = PostgresDataSource.getRepository(User);

export const createPost = async (input: Partial<Post>, user: User) => {
  return await postRepository.save(postRepository.create({ ...input, user }));
};

export const getPost = async (postId: string) => {
  return await postRepository.findOneBy({ id: postId });
};

export const findPosts = async (
  user: User,
  page: number = 1,
  perPage: number = 30,
) => {
  const useriWithFollowers = await userRepository.findOne({
    where: { id: user.id },
    select: {
      following: {
        id: true,
      },
    },
    relations: { following: true },
  });
  const userIds = [user.id, ...useriWithFollowers.following.map((x) => x.id)];

  const [results, totalCount] = await postRepository.findAndCount({
    relations: ["user"],
    where: {
      user: {
        id: In(userIds),
      },
    },
    order: { created_at: "DESC" },
    take: perPage,
    skip: (page - 1) * perPage,
  });

  return {
    paging: {
      page: Number(page),
      perPage: Number(perPage),
      totalCount,
    },
    data: results,
  };
};

export const createPostComment = async (
  input: Partial<PostComment>,
  post: Post,
  user: User,
) => {
  return await postCommentRepostiory.save(
    postCommentRepostiory.create({ ...input, post, user }),
  );
};

export const getPostComments = async (postId: string) => {
  return await postCommentRepostiory.find({
    where: { post: { id: postId } },
    relations: { user: true },
  });
};
