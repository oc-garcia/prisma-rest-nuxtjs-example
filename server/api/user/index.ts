import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log(query);

  switch (event.method) {
    case "GET":
      const limit = Number(query?.limit) || 10;
      const page = Number(query?.page) || 1;
      const skip = (page - 1) * limit;
      const nameQuery = String(query?.name);
      const emailQuery = String(query?.email);
      try {
        const users = await prisma.user.findMany({
          take: limit,
          skip: skip,
          where: {
            name: nameQuery,
            email: emailQuery,
          },
        });

        const total = await prisma.user.count({
          where: {
            name: nameQuery,
            email: emailQuery,
          },
        });

        return {
          total: total,
          limit: limit,
          skip: skip,
          data: users,
        };
      } catch (error) {
        console.error(error);
      }
      break;

    case "POST":
      const { name, email } = await readBody(event);
      try {
        const createUser = await prisma.user.create({
          data: {
            name,
            email,
          },
        });
        return "User Created";
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      break;
  }
});
// index get post

//[id] getbyid patch, put e delete
