class APIFilters {
  nonNumeric = [];
  paginationValues = ["page", "skipCount"];
  constructor(query, queryStr, exceptionalKeys, operator) {
    this.query = query;
    this.queryStr = queryStr;
    this.copyQueryStr = { ...queryStr };
    this.operator = operator;
    this.exceptionalKeys = [...exceptionalKeys];
  }

  search() {
    let obj = {};
    const configArr = [];
    for (const key in this.copyQueryStr) {
      if (!this.paginationValues.includes(key)) {
        if (!this.exceptionalKeys.includes(key)) {
          this.nonNumeric.push(key);
          if (this.queryStr.hasOwnProperty(key)) {
            configArr.push({
              [key]: {
                $regex: this.queryStr[key],
                $options: "i", // case-insensitive
              },
            });
          }
        } else {
        }
      } else {
        delete this.queryStr[key];
      }
    }

    if (!!configArr && configArr.length > 0) {
      obj[this.operator] = configArr;
    }

    this.query = this.query.find({
      ...obj,
    });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };

    const fieldsToRemove = this.nonNumeric;
    fieldsToRemove.forEach((e) => delete queryCopy[e]);

    let jsonString = JSON.stringify(queryCopy);

    // Replace the keys in the JSON string
    jsonString = jsonString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(jsonString));

    return this;
  }

  pagination() {
    const currentPage = Number(this.copyQueryStr.page) || 1;
    const skip = Number(this.copyQueryStr.skipCount) * Number(currentPage - 1);

    this.query = this.query.limit(this.copyQueryStr.skipCount).skip(skip);

    return this;
  }

  // {
  //   "$and": [
  //     {
  //       "$or": [
  //         {"name": {"$regex": "appl", "$options": "i"}},
  //         {"category": {"$regex": "Electronics", "$options": "i"}}
  //       ]
  //     },
  //     {"price": {"$gte": 26}},
  //     {"ratings": {"$gte": 3}}
  //   ]
  // }
}

export default APIFilters;
