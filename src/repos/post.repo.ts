import { eq, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IPostRepo } from 'src/types/IPostRepo';
import { Post, PostSchema } from 'src/types/Post';
import { commentsTable, postsTable } from 'src/services/drizzle/schema';
import { getHavingFunction, getSortFunction } from './helpers/sorting.helpers';
import { HttpError } from 'src/api/errors/HttpError';

export function getPostRepo(db: NodePgDatabase): IPostRepo {
  return {
    async createPost(data) {
      const post = await db.insert(postsTable).values(data as Post).returning();
      return PostSchema.parse(post[0]);
    },

    async updatePostById(id, data) {
      const posts = await db
        .update(postsTable)
        .set(data as Post)
        .where(eq(postsTable.id, id))
        .returning();
      return posts.length > 0 ? PostSchema.parse(posts[0]) : null;
    },

    async getAllPosts(
      limit = 10,
      offset = 0,
      sortBy: 'comments' | 'title' | 'createdAt' = 'comments',
      sortOrder: 'asc' | 'desc' = 'asc',
      havingOption: 'eq' | 'gt' | 'lt' | 'gte' = 'gte',
      searchTerm: string
    ) {

      if(limit >= 100) {
        throw new HttpError(400, 'Limit must be less than 100');
      }
      // Count comments per post
      const sqlCommentsCount = sql<number>`COALESCE(COUNT(${commentsTable.id}), 0)`.mapWith(Number); 
      // Get HAVING condition function
      const havingFn = getHavingFunction(havingOption, sqlCommentsCount);
      // Get ORDER BY function
      const sortFn = getSortFunction(sortBy, sortOrder, sqlCommentsCount, postsTable);
    
      // Base query with join to comments table
      let baseQuery = db
        .select({
          id: postsTable.id,
          title: postsTable.title,
          description: postsTable.description,
          updatedAt: postsTable.updatedAt,
          createdAt: postsTable.createdAt,
          commentsCount: sqlCommentsCount
        })
        .from(postsTable)
        .leftJoin(commentsTable, eq(postsTable.id, commentsTable.postId));
    
      if (searchTerm) {
        // Apply search filter on title or description (case-insensitive)
        baseQuery = (baseQuery as typeof baseQuery & { where: any }).where(
          sql`
            similarity(LOWER(${postsTable.title}), LOWER(${searchTerm})) > 0.3
            OR 
            similarity(LOWER(${postsTable.description}), LOWER(${searchTerm})) > 0.3
          `
        );
      }
    
      // Group by post id and apply HAVING filter
      const groupedQuery = baseQuery.groupBy(postsTable.id).having(havingFn);
    
      // Get total count for pagination metadata
      const totalResult = await db
        .select({ total: sql<number>`COUNT(*)`.mapWith(Number) })
        .from(groupedQuery.as('sub'));
    
      const total = totalResult[0]?.total ?? 0;
    
      // Fetch paginated, sorted posts with comment counts
      const postsWithCounts = await groupedQuery
        .orderBy(sortFn)
        .limit(limit)
        .offset(offset);
    
      return {
        data: postsWithCounts.map(post => PostSchema.parse(post)),
        meta: {
          total,
          limit,
          offset,
          page: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(total / limit)
        }
      };
    },

    async getPostById(id) {
      const post = await db.select().from(postsTable).where(eq(postsTable.id, id));
      return post.length > 0 ? PostSchema.parse(post[0]) : null;
    },

    async deletePostById(id) {
      const post = await db.delete(postsTable).where(eq(postsTable.id, id));
      return post;
    }
  };
}