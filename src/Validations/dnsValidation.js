import * as yup from "yup";

export const createNewRecordSchema = yup.object().shape({
  Name: yup.string().nullable(),
  Value: yup.string().required("Value required"),
  recordType: yup.string().required("Record type required"),
});
