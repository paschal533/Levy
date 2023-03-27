export const getCreators = (array : any) => {
  const finalized = [];

  const result = array.reduce((res : any, currentValue : any) => {
    (res[currentValue.seller] = res[currentValue.seller] || []).push(
      currentValue
    );

    return res;
  }, {});

  Object.entries(result).forEach((itm : any) => {
    const seller = itm[0];
    const sumall = itm[1]
      .map((item : any) => Number(item.price))
      .reduce((prev : any, curr : any) => prev + curr, 0);

    finalized.push({ seller, sumall });
  });

  return finalized;
};
