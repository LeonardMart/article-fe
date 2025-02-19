import moment from "moment";

const route = useRoute();

export const getNumbering = (data: any) => {
  moment.locale("en");
  const formatData = data.map((data: any, index: number) => {
    const rowNumber = (Number(route.query.page) - 1 || 0) * 10 + index + 1;
    return {
      ...data,
      rowNumber,
    };
  });
  return formatData;
};

export const formattingDate = (data: any) => {
  moment.locale("en");
  const formatData = data.map((data: any) => {
    return {
      ...data,
      createdAt: moment(data.createdAt).format("ddd, MMM DD, YYYY"),
    };
  });
  return formatData;
};
