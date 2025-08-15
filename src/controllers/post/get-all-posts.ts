import { IPostRepo } from 'src/types/IPostRepo';
import { Post } from 'src/types/Post';
import { Meta } from 'src/types/Meta';

export async function getAllPosts(params: {
  limit?: number;
  offset?: number;
  sortOrder?: 'asc' | 'desc';
  havingOption?: 'eq' | 'gt' | 'lt' | 'gte';
  sortBy?: 'comments' | 'title' | 'createdAt';
  searchTerm?: string;
  postRepo: IPostRepo;
}): Promise<{data: Post[], meta: Meta}> {
  const posts = await params.postRepo.getAllPosts(
    params.limit,
    params.offset,
    params.sortBy,
    params.sortOrder,
    params.havingOption,
    params.searchTerm
  );

  return posts;
}