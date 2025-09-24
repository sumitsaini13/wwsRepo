module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.post && data.user) {
      // create compositeKey automatically
      data.compositeKey = `${data.post}:${data.user}`;

      // check if like already exists
      const existing = await strapi.db.query('api::like.like').findOne({
        where: { compositeKey: data.compositeKey },
      });

      if (existing) {
        throw new Error('User already liked this post');
      }
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.post && data.user) {
      data.compositeKey = `${data.post}:${data.user}`;
    }
  },
};
