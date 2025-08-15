import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { commentsTable } from 'src/services/drizzle/schema';
import { Comment, CommentSchema } from 'src/types/Comment';
import { ICommentRepo } from 'src/types/ICommentRepo';

export function getCommentRepo(db: NodePgDatabase): ICommentRepo {
  return {
    async createComment(data) {
      const comment = await db.insert(commentsTable).values(data as Comment).returning();
      return CommentSchema.parse(comment[0]);
    },

    async getCommentsByPostId(postId) {
      const comments = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.postId, postId));
      return comments.map(comment => CommentSchema.parse(comment));
    },

    async updateCommentById(id, data) {
      const comment = await db
        .update(commentsTable)
        .set(data as Partial<Comment>)
        .where(eq(commentsTable.id, id))
        .returning();
      return comment.length > 0 ? CommentSchema.parse(comment[0]) : null;
    },

    async deleteCommentById(id) {
      const comment = await db.delete(commentsTable).where(eq(commentsTable.id, id));
      return comment;
    }
  };
}
