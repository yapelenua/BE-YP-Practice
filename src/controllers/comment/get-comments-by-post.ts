import { ICommentRepo } from 'src/types/ICommentRepo';
import { Comment } from 'src/types/Comment';
import { HttpError } from 'src/api/errors/HttpError';

export async function getCommentsByPostId(params: {
  commentRepo: ICommentRepo;
  postId: string;
}): Promise<Comment[]> {
  const comments = await params.commentRepo.getCommentsByPostId(params.postId);

  if (!comments) {
    throw new HttpError(404, 'Comments not found');
  }

  return comments;
}