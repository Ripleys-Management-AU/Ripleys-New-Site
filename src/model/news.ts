import prisma from "@/model/client";

export const getNews = async () => {
  try {
    const news = await prisma.blog_post.findMany({
      include: {
        blog_post_image_blog_post_image_blog_post_idToblog_post: true,
      },
    });
    return news;
  } catch (e) {
    console.error(e);
    return null;
  }
};
