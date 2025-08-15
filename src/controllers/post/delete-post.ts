import { HttpError } from 'src/api/errors/HttpError';
import { IPostRepo } from 'src/types/IPostRepo';

export async function deletePostById(params: {
  postRepo: IPostRepo;
  postId: string;
}) {
  const deleted = await params.postRepo.deletePostById(params.postId);

  if (!deleted) {
    throw new HttpError(404, 'Post not found');
  }

  return { success: true };
} 