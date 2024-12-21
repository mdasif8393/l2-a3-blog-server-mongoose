import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.route';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
