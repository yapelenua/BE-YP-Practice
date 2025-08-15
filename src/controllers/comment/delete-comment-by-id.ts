import { ICommentRepo } from 'src/types/ICommentRepo';

export async function deleteCommentById(params: {
  commentRepo: ICommentRepo;
  commentId: string;
}) {
  const comment = await params.commentRepo.deleteCommentById(params.commentId);

  return comment;
}