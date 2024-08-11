import { isNull, isEmpty } from "lodash";

export const isEmptyValue = (value) => {
  return isNull(value) || isEmpty(value);
};
