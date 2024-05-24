import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  switch (event.method) {
    case "GET":
      const limit = 10;
      const page = event.context.query?.page || 1;
      const skip = (page - 1) * limit;

      try {
        const users = await prisma.user.findMany({
          take: limit,
          skip: skip,
        });

        return {
          total: users.length,
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
