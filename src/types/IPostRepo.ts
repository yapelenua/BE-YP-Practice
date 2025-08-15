import { Post } from './Post';

export interface IPostRepo {
  createPost(data: Partial<Post>): Promise<Post>;
  updatePostById(id: string, data: Partial<Post>): Promise<Post | null>;
  getAllPosts(limit?: number, offset?: number, sortBy?: 'comments' | 'title' | 'createdAt', sortOrder?: 'asc' | 'desc', havingOption?: 'eq' | 'gt' | 'lt' | 'gte', searchTerm?: string): Promise<{data: Post[], meta: {total: number, limit: number, offset: number, page: number, totalPages: number}}>;
  getPostById(id: string): Promise<Post | null>;
  deletePostById(id: string): Promise<Post>;
}