import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function todo(req: NextApiRequest, res: NextApiResponse) {
  console.log("path todo");
  const
    { query, method } = req,
    { path } = query,
    id: number | undefined = Number(query?.path?.[0]);

  console.log("***", method, { id });
  switch (req.method) {
    case 'OPTIONS':
      res.writeHead(204);
      break;
    case 'GET':
      const rows = await prisma.toDo.findMany();
      res.status(200).json(rows);
      break;
    case 'POST':
      await prisma.toDo.create({ data: { text: req.body.text } });
      res.status(201).end();
      break;
    case 'DELETE':
      await prisma.toDo.delete({ where: { id: +id } });
      res.status(201).json('');
      break;
    case 'PATCH':
      const checked = req.body.checked;
      await prisma.toDo.update({ where: { id: +id }, data: { checked } });
      res.status(200).end();
      break;
    default:
      res.statusCode = 404;
  }

}