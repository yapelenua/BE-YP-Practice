import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetPostByIdRespSchema } from 'src/api/routes/schemas/post/GetPostByIdRespSchema';
import { z } from 'zod';
import { updatePostById } from 'src/controllers/post/update-post-by-id';
import { UpdatePostReqSchema } from '../../schemas/post/UpdatePostReqSchema';
import { getPostById } from 'src/controllers/post/get-post-by-id';
import { deletePostById } from 'src/controllers/post/delete-post';
import { DeletePostRespSchema } from '../../schemas/post/DeletePostRespSchema';
import { GetPostByIdWithCommentsRespSchema } from '../../schemas/post/GetPostByIdWithCommentsRespSchema';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  // Update post
  fastify.patch('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetPostByIdRespSchema
      },
      body: UpdatePostReqSchema
    }
  }, async req => {
    const post = await updatePostById({
      postRepo: fastify.repos.postRepo,
      postId: req.params.postId,
      data: req.body
    });
    return post;
  });

  // Get post by id
  fastify.get('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetPostByIdWithCommentsRespSchema
      }
    }
  }, async req => {
    const post = await getPostById({
      commentRepo: fastify.repos.commentRepo,
      postRepo: fastify.repos.postRepo,
      postId: req.params.postId
    });
    return post;
  });

  // Delete post
  fastify.delete('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: DeletePostRespSchema
      }
    }
  }, async req => {
    const deleted = await deletePostById({
      postRepo: fastify.repos.postRepo,
      postId: req.params.postId
    });
    return deleted;
  });
};

export default routes;