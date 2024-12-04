import { utils, writeFile } from "xlsx";

export const handleOnExportExcel = <T>(data: T[]) => {
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(data ?? null);
  utils.book_append_sheet(wb, ws, "file");
  writeFile(wb, "myFile.xlsx");
};
