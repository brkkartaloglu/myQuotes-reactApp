import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";
const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div props={props} ref={ref}>
      <h2>MyQuotesApp</h2>
      <br></br>
      {props?.props.map((item) => {
        return (
          <div key={item?.id}>
            <h4>{item?.content}</h4>
            <h4>
              -<i>{item?.author}</i>
            </h4>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
});

export default function Print({ selectedRows }) {
  const componentRef = useRef();
  const selectedRowsArray = Object.values(selectedRows);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div>
        <Button onClick={handlePrint}>Print selected Quotes</Button>
      </div>

      <div style={{ display: "none" }}>
        <ComponentToPrint props={selectedRowsArray} ref={componentRef} />
      </div>
    </>
  );
}
