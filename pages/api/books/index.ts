import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';

// POST request to create user bio
const handle: NextApiHandler = async (req, res) => {
  const { title, author, year, pages, language, imageLink, link, country } = req.body;

  const session = await getSession({ req });

  if (!session) {
    return;
  }

  const newBook = await prisma.book.create({
    data: {
      title: title,
      year: Number(year),
      pages: Number(pages),
      language: language,
      image: imageLink,
      link: link,
      country: country,
      author: {
        connect: {
          fullName: author,
        },
      },
    },
  });

  res.json(newBook);
};

export default handle;
