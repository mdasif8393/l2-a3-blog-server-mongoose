import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query }; // copy

  //   // Filtering
  //   const excludeFields = ['search', 'sortBy', 'sortOrder'];

  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   this.modelQuery = this.modelQuery.find({ author: queryObj?.filter });

  //   return this;
  // }

  sort() {
    const sortBy =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || 'createdAt';
    const sortOrder = (this?.query?.sortOrder as 'asc' | 'desc') || 'asc';

    this.modelQuery = this.modelQuery.sort([[sortBy, sortOrder]]);

    return this;
  }
}

export default QueryBuilder;
