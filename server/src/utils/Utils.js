module.exports = {
  // remove sub element key when querying with includes
  removeJsonKeyInArray(key, array) {
    let finalObj = [];
    array.forEach((elem)=> {
      finalObj.push(elem['dataValues'][key].dataValues);
    });

    return finalObj;
  },
};
