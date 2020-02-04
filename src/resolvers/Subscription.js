const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count
        });
      }, 1000);
      return pubsub.asyncIterator("count");
    }
  },
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
