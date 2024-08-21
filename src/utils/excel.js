import * as XLSX from 'xlsx';

export async function readExcelFile(filePath) {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    console.log("Excel data parsed successfully");
    return data;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
}