import React, { useState } from 'react';
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';
import { saveAs } from 'file-saver';
import './InteractiveExcelSheet.css';

const InteractiveExcelSheet = () => {
  const [productData, setProductData] = useState([
    ['Products','Serial Number', 'Voltage', 'Warranty', 'Quantity', 'Rating'],
    ['Smartphone','', '', '', '', ''],
    ['Fan','', '', '', '', ''],
    ['Light Bulb','', '', '', '', ''],
    ['Refrigerator','', '', '', '', ''],
    ['Television','', '', '', '', '']
  ]);

  const handleCellValueChange = (event, rowIndex, columnIndex) => {
    const updatedProductData = [...productData];
    updatedProductData[rowIndex][columnIndex] = event.target.value;
    setProductData(updatedProductData);
  };

  const handleDownload = () => {
    const wb = XLSXUtils.book_new();
    const ws = XLSXUtils.aoa_to_sheet(productData);
    const sheetName = 'Product Data';
    XLSXUtils.book_append_sheet(wb, ws, sheetName);

    const wbout = XLSXWrite(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'product_data.xlsx');
  };

  return (
    <div>
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
      <button onClick={handleDownload}>Download Excel Sheet</button>
    </div>
  );
};

export default InteractiveExcelSheet;
