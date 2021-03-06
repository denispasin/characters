import { NextApiRequest, NextApiResponse } from 'next';
import faunadb from 'faunadb';

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

export const fetchVampireFromDB = async () => {
  try {
    const dbs: { data: Array<Array<string>> } = await client.query(
      // iterate each item in result
      q.Paginate(
        // make paginatable
        q.Match(
          // query index
          q.Index('all_vampires')
        )
      )
    );
    // ok

    return {
      characters: dbs.data.map((e) => ({ key: e[0], name: e[1] })),
      failed: false,
    };
  } catch (e) {
    // something went wrong
    return { error: e.message, failed: true };
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetchVampireFromDB();

  if (!result.failed) {
    // ok
    res.status(200).json(result);
  } else {
    // something went wrong
    res.status(500).json(result);
  }
};
