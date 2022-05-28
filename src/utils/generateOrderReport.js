import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { formatDate } from './formatDate';
import { getDate } from './getDate';

export const generateOrderReport = (title, dateRange, data) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: `${title}\n${dateRange || ' '}`,
      alignment: 'center',
      bold: true,
      margin: [15, 20, 0, 45], // left top right bottom
    },
  ];

  const items = data.map((item) => {
    let delivery = '-';
    if (item.delivered == 0) {
      delivery = 'Pendente';
    } else if (item.delivered == 1) {
      delivery = 'Efetuada';
    } else if (item.delivered == 2) {
      delivery = 'Em Rota';
    }

    return [
      { text: item.id, fontSize: 9, alignment: 'center' },
      { text: item.name, fontSize: 9, margin: [0, 0, 10, 0] },
      { text: item.total, fontSize: 9, alignment: 'center' },
      { text: getDate(item.created_at), fontSize: 9, alignment: 'center' },
      { text: delivery, fontSize: 9, alignment: 'center' },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['10%', '*', '10%', '10%', '10%'],
        body: [
          [
            { text: 'Código', style: 'tableHeader', alignment: 'center', fontSize: 10 },
            { text: 'Pedido', style: 'tableHeader', fontSize: 10 },
            { text: 'Valor', style: 'tableHeader', fontSize: 10 },
            { text: 'Data', style: 'tableHeader', alignment: 'center', fontSize: 10 },
            { text: 'Entrega', style: 'tableHeader', alignment: 'center', fontSize: 10 },
          ],
          ...items,
        ],
      },
      layout: {
        fillColor: function (rowIndex) {
          return rowIndex % 2 === 0 ? '#CCCCCC' : null;
        },
      },
    },
  ];

  const footer = (currentPage, pageCount) => {
    let amount = 0;
    data.forEach((e) => (amount = amount + parseFloat(e.total)));
    amount = amount.toFixed(2);

    return [
      {
        columns: [
          {
            text: `Valor Total R$ ${amount}, ${data.length} Pedido(s)`,
            alignment: 'left',
            fontSize: 9,
            margin: [20, 10, 0, 0],
          },
          { text: `${formatDate()}`, alignment: 'center', fontSize: 9, margin: [0, 10, 0, 0] },
          {
            text: `${currentPage} / ${pageCount}`,
            alignment: 'right',
            fontSize: 9,
            margin: [0, 10, 20, 0],
          },
        ],
      },
    ];
  };

  const docDefinitions = {
    pageZise: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer,
  };

  pdfMake.createPdf(docDefinitions).download(`${title}.pdf`);
};
