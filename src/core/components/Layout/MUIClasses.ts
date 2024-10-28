import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "var(--default-color-button)",
      height: 3,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "var(--default-color-button)",
    },
  },
});
