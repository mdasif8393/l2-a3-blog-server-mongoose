import { Router } from 'express';
import { BlogDeleteAdminRoute, BlogRoutes } from '../modules/blog/blog.route';
import { BlockUserRoute, UserRoutes } from '../modules/user/user.route';

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
