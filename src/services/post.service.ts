import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { PostComment } from "../entities/comment.entity";
import { PostgresDataSource } from "../utils/db";

const postRepository = PostgresDataSource.getRepository(Post);
const postCommentRepostiory = PostgresDataSource.getRepository(PostComment);

export const createPost = async (input: Partial<Post>, user: User) => {
  return await postRepository.save(postRepository.create({ ...input, user }));
};

export const getPost = async (postId: string) => {
  return await postRepository.findOneBy({ id: postId });
};

export const findPosts = async (page: number = 1, perPage: number = 30) => {
  const [results, totalCount] = await postRepository.findAndCount({
    where: {},
    order: { "created_at": "DESC" },
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
  });
};
