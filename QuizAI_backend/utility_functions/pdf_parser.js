import { getDocument } from 'pdfjs-dist';

export default async function parsePDF(filePath) {
  const pdf = await getDocument(filePath).promise;

  let fullText = '';

  // Loop through all pages in the PDF
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // Extract text items and concatenate them
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n'; // Add newlines between pages
  }

  return fullText;
}
