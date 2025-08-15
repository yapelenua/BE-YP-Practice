import { IPostRepo } from 'src/types/IPostRepo';
import { ICommentRepo } from 'src/types/ICommentRepo';
import { HttpError } from 'src/api/errors/HttpError';

export async function getPostById(params: {
  postRepo: IPostRepo;
  commentRepo: ICommentRepo;
  postId: string;
}) {
  const post = await params.postRepo.getPostById(params.postId);
  
  if (!post) {
    throw new HttpError(404, 'Post not found');
  }

  const comments = await params.commentRepo.getCommentsByPostId(post.id);

  return {
    ...post,
    comments
  };
}