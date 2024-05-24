import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  switch (event.method) {
    case "GET":
      try {
        const user = await prisma.user.findUnique({
          where: { id: Number(id) },
        });
        return user;
      } catch (error) {
        console.error(error);
      }
      break;

    case "PUT":
      const { name, email } = await readBody(event);
      try {
        const updatedUser = await prisma.user.update({
          where: { id: Number(id) },
          data: { name, email },
        });
        return updatedUser;
      } catch (error) {
        console.error(error);
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await prisma.user.delete({
          where: { id: Number(id) },
        });
        return deletedUser;
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      break;
  }
});