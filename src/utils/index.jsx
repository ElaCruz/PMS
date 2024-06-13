// utils/exportData.js
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Function to export data as CSV
export const exportToCSV = (data, fileName) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Function to export data as PDF
export const exportToPDF = (data, fileName) => {
    const doc = new jsPDF();
    const tableColumn = Object.keys(data[0]);
    const tableRows = data.map(item => Object.values(item));

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
    });

    doc.save(`${fileName}.pdf`);
};
