import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('Login required');

    ctx.request.body.data = ctx.request.body.data || {};
    ctx.request.body.data.author = user.id;

    return await super.create(ctx);
  },
}));
