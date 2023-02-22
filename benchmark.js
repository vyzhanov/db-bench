import { db } from './db.js';

import whereEqual from './benchmarks/where-equal.benchmark.js';
import whereLike from './benchmarks/where-like.benchmark.js';
// import rowUpdate from './benchmarks/row-update.benchmark.js';
// import rowInsert from './benchmarks/row-insert.benchmark.js';
// import addColumn from './benchmarks/add-column.benchmark.js';

(async () => {
  try {
    await whereEqual();
    await whereLike();
    // await rowUpdate();
    // await rowInsert();
    // await addColumn();
  } finally {
    await db.destroy();
  }
})();
