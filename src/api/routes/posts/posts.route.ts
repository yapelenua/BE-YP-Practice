import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CreatePostReqSchema } from '../schemas/post/CreatePostReqSchema';
import { GetPostByIdRespSchema } from '../schemas/post/GetPostByIdRespSchema';
import { createPost } from 'src/controllers/post/create-post';
import { getAllPosts } from 'src/controllers/post/get-all-posts';
import { GetAllPostsRespSchema } from '../schemas/post/GetAllPostRespSchema';
import { z } from 'zod';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  // Create post
  fastify.post('/', {
    schema: {
      response: {
        200: GetPostByIdRespSchema
      },
      body: CreatePostReqSchema
    }
  }, async req => {
    const post = await createPost({
      postRepo: fastify.repos.postRepo,
      data: req.body
    });
    return post;
  });

  // Get all posts
  fastify.get('/', {
    schema: {
      querystring: z.object({
        limit: z.string().optional(),
        offset: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        havingOption: z.enum(['eq', 'gt', 'lt', 'gte']).optional(),
        sortBy: z.enum(['comments', 'title', 'createdAt']).optional(),
        searchTerm: z.string().optional()
      }),
      response: {
        200: GetAllPostsRespSchema
      }
    }
  }, async req => {
    const { limit, offset, sortOrder, havingOption, sortBy, searchTerm } = req.query;
    const posts = await getAllPosts({
      postRepo: fastify.repos.postRepo,
      limit: Number(limit),
      offset: Number(offset),
      sortOrder,
      havingOption,
      sortBy,
      searchTerm
    });
    return posts;
  });
};

export default routes;