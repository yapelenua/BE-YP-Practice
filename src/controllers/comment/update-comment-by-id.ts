import { ICommentRepo } from 'src/types/ICommentRepo';
import { Comment } from 'src/types/Comment';
import { HttpError } from 'src/api/errors/HttpError';

export async function updateCommentById(params: {
  commentRepo: ICommentRepo;
  commentId: string;
  data: Partial<Comment>;
}): Promise<Comment> {
  const comment = await params.commentRepo.updateCommentById(params.commentId, params.data);
  
  if (!comment) {
    throw new HttpError(404, 'Comment not found');
  }

  return comment;
}