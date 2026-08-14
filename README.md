# NexCart

A vanilla HTML/CSS/JavaScript ecommerce storefront backed by Express and MongoDB. The original landing page and product catalogue styling are retained; the API-enhanced products page falls back to its built-in eight-product catalogue whenever the backend is unavailable.

## Features

Product search/filter/sort/pagination API; guest cart and wishlist storage; JWT login; profile management; checkout with COD/demo online payment; orders; rule-based Smart Shopping Planner; and protected admin statistics/product tools.

## Stack and structure

- Frontend: HTML5, CSS3, vanilla JavaScript
- Backend: Node.js, Express, Mongoose, MongoDB
- Auth/security: bcryptjs, JWT/cookies, Helmet, CORS, rate limiting

`frontend/` contains pages, styles and browser code. `backend/` contains models, routes, middleware, the planner service and database seeder.

## Install and run

```powershell
cd D:\Desktop\E-Commerce\backend
npm install
Copy-Item .env.example .env
# edit .env with your MongoDB connection string and a strong JWT_SECRET
npm run seed
npm run dev
```

Serve `D:\Desktop\E-Commerce\frontend` with a static web server (for example VS Code Live Server) at the `CLIENT_URL` configured in `.env`. The API is `http://localhost:5000/api`.

## MongoDB Atlas

1. Create a free Atlas cluster and database user.
2. In Network Access, allow your current IP for development.
3. Copy the Node.js connection string, replace username/password, and append `/nexcart` as the database name.
4. Put it in `D:\Desktop\E-Commerce\backend\.env` as `MONGODB_URI`.
5. Set a long random `JWT_SECRET`, then run `npm run seed`.

## Admin setup

Register a normal user, then use Atlas (or MongoDB Compass) to change that user's `role` field in the `users` collection to `admin`. Log out and in again, then open `frontend/admin.html`. There is intentionally no default password or seeded administrator.

## API

| Area | Endpoints |
| --- | --- |
| Auth | `POST /auth/register`, `/auth/login`, `/auth/logout`; `GET /auth/me`; `PUT /auth/profile` |
| Products | `GET /products`, `GET /products/:id`; admin `POST`, `PUT`, `DELETE /products/:id` |
| Cart | `GET, POST, DELETE /cart`; `PUT, DELETE /cart/:productId` |
| Wishlist | `GET /wishlist`; `POST, DELETE /wishlist/:productId` |
| Orders | `POST, GET /orders`; `GET /orders/:id`; `PUT /orders/:id/cancel` |
| Planner | `POST /planner/recommend` |
| Admin | `GET /admin/stats`, `/admin/users`; `PUT /admin/users/:id`, `/admin/orders/:id` |

Product list query parameters: `search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, and `limit`.

## Deployment and troubleshooting

Set `NODE_ENV=production`, a production `CLIENT_URL`, secure `JWT_SECRET`, and a MongoDB Atlas URI in your host environment. Deploy the frontend as static files and backend as a Node service. If products remain visible but API-driven actions do not work, confirm the API is running, the Atlas IP allowlist permits the host, and the frontend is served from the configured `CLIENT_URL`.
