class APIFilters {
  constructor(query, queryStr, exceptionalKeys, operator) {
    this.query = query;
    this.queryStr = queryStr;
    this.copyQueryStr = { ...queryStr };
    this.operator = operator;
    this.exceptionalKeys = exceptionalKeys;
  }

  // search() {
  //   let obj = {};
  //   const configArr = [];

  //   this.exceptionalKeys.forEach((e) => {
  //     for (const key in this.queryStr) {
  //       if (e !== key) {
  //         delete this.copyQueryStr[key];
  //         if (this.queryStr.hasOwnProperty(key)) {
  //           configArr.push({
  //             [key]: {
  //               $regex: this.queryStr[key],
  //               $options: "i", // case-insensitive
  //             },
  //           });
  //         }
  //       }
  //     }
  //   });

  //   obj[this.operator] = configArr;

  //   this.query = this.query.find({
  //     ...obj,
  //   });

  //   this.filters();

  //   return this;
  // }

  // filters() {
  //   console.log(this.copyQueryStr);
  // }

  search() {
    const keyword = this.queryStr.name
      ? {
          name: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({
      ...keyword,
    });

    // this.filters();

    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };
    const fieldsToRemove = ["name"];
    fieldsToRemove.forEach((e) => delete queryCopy[e]);

    let jsonString = JSON.stringify(queryCopy);

    // Replace the keys in the JSON string
    jsonString = jsonString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(jsonString));

     let transformedQueryStr = JSON.parse(jsonString);

    console.log("========================");
    console.log(transformedQueryStr);
    console.log("========================");
    return this;
  }
}

export default APIFilters;
