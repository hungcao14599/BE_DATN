import { Post, PostLike } from "../model";
import httpStatus from "http-status";

export const handlePostMoods = async ({ postID }, createdBy) => {
  try {
    const mood = await PostLike.findOne({ where: { postID, createdBy } });
    const post = await Post.findOne({ where: { id: postID } });
    if (!mood) {
      await PostLike.create({ postID, createdBy, status: 1 });
      await post.update({ ...post, likes: post.likes + 1 });
    } else {
      await mood.destroy();
      await post.update({
        ...post,
        likes: post.like > 0 ? post.likes - 1 : 0,
      });
    }
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};
