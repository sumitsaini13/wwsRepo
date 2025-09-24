import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::like.like', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('Login required');

    const postId = ctx.request.body.data.post;
    const compositeKey = `${postId}:${user.id}`;

    const existing = await strapi.db.query('api::like.like').findOne({ where: { compositeKey } });
    if (existing) return ctx.badRequest('Already liked');

    ctx.request.body.data.user = user.id;
    ctx.request.body.data.compositeKey = compositeKey;

    return await super.create(ctx);
  },
}));
