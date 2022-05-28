import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { formatDate } from './formatDate';

export const generateSingleOrderReport = (order, cart, customer) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: `Relatório de Pedido Cód.: ${order.id}`,
      alignment: 'center',
      bold: true,
      margin: [15, 20, 0, 45], // left top right bottom
    },
  ];

  const customerInfo = [
    {
      columns: [
        {
          width: '10%',
          text: 'Compra',
          bold: true,
        },
        {
          width: '*',
          text: `Cód.${order.id} ${order.name}`,
        },
      ],
    },
    {
      columns: [
        {
          width: '10%',
          text: 'Cliente',
          bold: true,
        },
        {
          width: '*',
          text: `Cód.${customer.id} - ${customer.name}`,
        },
      ],
    },
    {
      columns: [
        {
          width: '10%',
          text: `CEP`,
          bold: true,
        },
        {
          width: '*',
          text: `${customer.Addresses[0].postal_code}`,
        },
      ],
    },
    {
      columns: [
        {
          width: '10%',
          text: `Rua`,
          bold: true,
        },
        {
          width: '*',
          text: `${customer.Addresses[0].street}`,
        },
      ],
    },
    {
      columns: [
        {
          width: '10%',
          text: `Número`,
          bold: true,
        },
        {
          width: '*',
          text: `${customer.Addresses[0].house_number}`,
        },
      ],
    },
    {
      columns: [
        {
          width: '10%',
          text: `Bairro`,
          bold: true,
        },
        {
          width: '*',
          text: `${customer.Addresses[0].district}`,
        },
      ],
    },
    {
      columns: [
        {
          width: '10%',
          text: `Compl.`,
          bold: true,
        },
        {
          width: '*',
          text: `${customer.Addresses[0].obs}`,
          margin: [0, 0, 0, 20],
        },
      ],
    },
  ];

  const items = cart.map((item) => {
    return [
      { text: item.id, fontSize: 9, alignment: 'center' },
      { text: item.product_name, fontSize: 9, margin: [0, 0, 10, 0] },
      {
        text: item.quantity,
        fontSize: 9,
        margin: [0, 0, 10, 0],
        alignment: 'center',
      },
      { text: (parseFloat(item.price) * item.quantity).toFixed(2), fontSize: 9, alignment: 'center' },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['10%', '*', '10%', '15%'], // auto
        body: [
          [
            { text: 'Código', style: 'tableHeader', alignment: 'center', fontSize: 10 },
            { text: 'Produto', style: 'tableHeader', fontSize: 10 },
            { text: 'Quantidade', style: 'tableHeader', alignment: 'center', fontSize: 10 },
            { text: 'Valor Parcial', style: 'tableHeader', alignment: 'center', fontSize: 10 },
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
    return [
      {
        columns: [
          {
            text: `Valor Total R$ ${order.total}`,
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
    content: [customerInfo, details],
    footer,
  };

  pdfMake.createPdf(docDefinitions).download(`Relatório de pedido Cód:${order.id}.pdf`);
};
