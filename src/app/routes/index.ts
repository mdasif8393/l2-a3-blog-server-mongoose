import { Router } from 'express';
import { BlockUserRoute } from '../modules/BlockUserByAdmin/blockUserByAdmin.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BlogDeleteAdminRoute } from '../modules/DeleteBlogByAdmin/deleteBlogByAdmin.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin/users',
    route: BlockUserRoute,
  },
  {
    path: '/admin/blogs',
    route: BlogDeleteAdminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
