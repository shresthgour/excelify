import React, { useState, forwardRef } from "react";
import { utils as XLSXUtils, write as XLSXWrite } from "xlsx";
import { saveAs } from "file-saver";
import * as Yup from "yup";
import "./InteractiveExcelSheet.css";

const validationSchema = Yup.object().shape({
  selectedProduct: Yup.string().required("Please select a product"),
  // Add validation rules for other fields if needed
});

const InteractiveExcelSheet = forwardRef((props, ref) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productData, setProductData] = useState([
    ["Product", "Serial Number", "Voltage", "Warranty", "Quantity", "Rating"],
    ["", "", "", "", "", ""],
  ]);
  const [errors, setErrors] = useState({});

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    setProductData([
      ["Product", "Serial Number", "Voltage", "Warranty", "Quantity", "Rating"],
      [event.target.value, "", "", "", "", ""],
    ]);
    validateField("selectedProduct", event.target.value);
  };

  const handleCellValueChange = (event, rowIndex, columnIndex) => {
    const updatedProductData = [...productData];
    updatedProductData[rowIndex][columnIndex] = event.target.value;
    setProductData(updatedProductData);
  };

  const validateField = async (fieldName, value) => {
    try {
      await Yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };

  const handleDownload = () => {
    const isValid = validateForm();
    if (isValid) {
      const wb = XLSXUtils.book_new();
      const ws = XLSXUtils.aoa_to_sheet(productData);
      const sheetName = "Product Data";
      XLSXUtils.book_append_sheet(wb, ws, sheetName);

      const wbout = XLSXWrite(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "product_data.xlsx");
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate({ selectedProduct });
      setErrors({});
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((fieldError) => {
        validationErrors[fieldError.path] = fieldError.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  return (
    <div className="container" ref={ref}>
      <h2 className="title">Excelify Table</h2>
      <div className="dropdown">
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className={errors["selectedProduct"] ? "error" : ""}
        >
          <option value="">Select a product</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Fan">Fan</option>
          <option value="Light Bulb">Light Bulb</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Television">Television</option>
        </select>
        {errors["selectedProduct"] && (
          <p className="error-message">{errors["selectedProduct"]}</p>
        )}
      </div>
      <table className="excel-table">
        <thead>
          <tr>
            {productData[0].map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(event) =>
                      handleCellValueChange(event, rowIndex + 1, columnIndex)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={handleDownload}>
        Download Excel Sheet
      </button>
    </div>
  );
});

export default InteractiveExcelSheet;
