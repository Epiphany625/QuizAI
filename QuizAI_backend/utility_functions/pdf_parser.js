import { getDocument } from 'pdfjs-dist';


const pdfPath = '../uploads/xinyangx/Calculus I/104handout25.pdf'; // Replace with a correct file path

const loadPDF = async () => {
  const pdf = await getDocument(pdfPath).promise;

  let fullText = '';

  // Loop through all pages in the PDF
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // Extract text items and concatenate them
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n'; // Add newlines between pages
  }

  console.log(fullText); // This is the full text of the PDF
};

loadPDF();
