import { Comment } from './Comment';

export interface ICommentRepo {
    createComment(data: Partial<Comment>): Promise<Comment>;
    getCommentsByPostId(postId: string): Promise<Comment[]>;
    updateCommentById(id: string, data: Partial<Comment>): Promise<Comment | null>;
    deleteCommentById(id: string): Promise<void>;
}