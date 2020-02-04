const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.post.fin(post => post.di === postId && post.published);
      if (!post) {
        throw new Error("Post not found nor public available");
      }
      return pubsub.asyncIterator(`commment ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator("post");
    }
  }
};

export { Subscription as default };
