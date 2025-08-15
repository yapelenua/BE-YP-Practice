import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { deleteCommentById } from 'src/controllers/comment/delete-comment-by-id';
import { updateCommentById } from 'src/controllers/comment/update-comment-by-id';
import { GetCommentByIdRespSchema } from 'src/api/routes/schemas/comment/GetCommentByIdRespSchema';
import { UpdateCommentReqSchema } from 'src/api/routes/schemas/comment/UpdateCommentReqSchema';
import { CommentSchema } from 'src/types/Comment';
import { getCommentsByPostId } from 'src/controllers/comment/get-comments-by-post';

const routes: FastifyPluginAsync = async function (f) {
  const fastify = f.withTypeProvider<ZodTypeProvider>();

  // Update comment
  fastify.patch('/', {
    schema: {
      params: z.object({
        commentId: z.string().uuid()
      }),
      response: {
        200: GetCommentByIdRespSchema
      },
      body: UpdateCommentReqSchema
    }
  }, async req => {
    const comment = await updateCommentById({
      commentRepo: fastify.repos.commentRepo,
      commentId: req.params.commentId,
      data: req.body
    });
    return comment;
  });

  // Delete comment
  fastify.delete('/', {
    schema: {
      params: z.object({
        commentId: z.string().uuid()
      }),
      response: {
        200: GetCommentByIdRespSchema
      }
    }
  }, async req => {
    const comment = await deleteCommentById({
      commentRepo: fastify.repos.commentRepo,
      commentId: req.params.commentId
    });
    return comment;
  });

  // Get comments by post id
  fastify.get('/', {
    schema: {
      params: z.object({
        postId: z.string().uuid()
      }),
      response: {
        200: CommentSchema.array()
      }
    }
  }, async req => {
    const comments = await getCommentsByPostId({
      commentRepo: fastify.repos.commentRepo,
      postId: req.params.postId
    });
    return comments;
  });
};
export default routes;