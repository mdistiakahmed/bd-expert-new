import { CircularProgress } from "@mui/material";
import CSS from "csstype";

const divStyles: CSS.Properties = {
  backgroundColor: "#251a1a99",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  zIndex: 200000,
};

const Loader = (props: any) => {
  if (!props.loading) {
    return null;
  }
  return (
    <div style={divStyles}>
      <CircularProgress size={100} sx={{}} />
    </div>
  );
};

export default Loader;
