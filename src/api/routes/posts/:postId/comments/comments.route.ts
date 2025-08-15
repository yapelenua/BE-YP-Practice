import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { CreateCommentReqSchema } from 'src/api/routes/schemas/comment/CreateCommentReqSchema';
import { createComment } from 'src/controllers/comment/create-comment';
import { GetCommentByIdRespSchema } from 'src/api/routes/schemas/comment/GetCommentByIdRespSchema';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  // Create comment
  fastify.post('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: GetCommentByIdRespSchema
      },
      body: CreateCommentReqSchema
    }
  }, async req => {
    const comment = await createComment({
      commentRepo: fastify.repos.commentRepo,
      data: {
        ...req.body,
        postId: req.params.postId
      }
    });
    return comment;
  });
};
export default routes;