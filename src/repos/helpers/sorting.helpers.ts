import { eq, gt, lt, gte, asc, desc } from 'drizzle-orm';

export function getHavingFunction(havingOption: 'eq' | 'gt' | 'lt' | 'gte', count: any) {
  switch (havingOption) {
    case 'eq':
      return eq(count, 5);
    case 'gt':
      return gt(count, 5);
    case 'lt':
      return lt(count, 5);
    case 'gte':
      return gte(count, 0);
  }
}

export function getSortFunction(
  sortBy: 'comments' | 'title' | 'createdAt',
  sortOrder: 'asc' | 'desc',
  count: any,
  postsTable: any
) {
  switch (sortBy) {
    case 'comments':
      return sortOrder === 'asc' ? asc(count) : desc(count);
    case 'title':
      return sortOrder === 'asc' ? asc(postsTable.title) : desc(postsTable.title);
    case 'createdAt':
      return sortOrder === 'asc' ? asc(postsTable.createdAt) : desc(postsTable.createdAt);
  }
}
