import { Blog } from '../blog/blog.model';

export const deleteBlogFromDbByAdmin = async (_id: string) => {
  const result = await Blog.findByIdAndDelete(_id);
  return result;
};
