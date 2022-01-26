import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import PB_LOGO from '../../../assets/images/pblogo-dark.png';
import {
  translateToHumanReadableFormat,
  generateImageToDataUrl,
} from '../../App/globalHelpers';
const htmlToPdfmake = require('html-to-pdfmake');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateBlindCvPdf = async blindCv => {
  const dateToday = moment(new Date()).format('MMDDYYYY');
  const fileName = `${blindCv.job_title} ${translateToHumanReadableFormat(
    blindCv.experience_level,
  )} ${dateToday}.pdf`;

  const pbLogo = await generateImageToDataUrl(PB_LOGO);
  const fontRegex = /font-family:[^;']*(;)?/g;
  const workExperience = htmlToPdfmake(
    `<div style="font-size: 13px; color: #34475F;">${blindCv.work_experience.replace(/  +/g, ' ').replaceAll('> ', '>').replace(
      fontRegex,
      '',
    )}</div>`,
    {
      defaultStyles: {
        div: {
          lineHeight: 1.5,
        },
        b: {
          lineHeight: 1.5,
        },
        p: {
          lineHeight: 1.5,
        },
        ul: {
          marginBottom: 20,
          marginTop: 2,
          lineHeight: 1.5,
          alignment: 'left',
        },
      },
    },
  );
  const education = `<div style="font-size: 13px; color: #34475F; margin: 0px; line-height: 1.5;">${blindCv.education.replace(fontRegex, '')}</div>`;
  const summary = `<div style="font-size: 13px; color: #34475F; margin: 0; text-align: justify; line-height: 1.5;">${blindCv.summary.replace(fontRegex, '')}</div>`;

  const borderWorkExperienceOrange = htmlToPdfmake(
    '<h3 style="color:#1E76E2; margin: 0; font-size: 13px;">WORK EXPERIENCE</h3><p style="color:#F7931E; background-color:#F7931E; font-size:6px;">_________________________________________________</p>',
  );
  const borderEducation = '<h3 style="color:#1E76E2; margin: 30px 0 0 0; font-size: 13px;">EDUCATION</h3><p style="color:#F7931E; background-color:#F7931E; font-size:6px; margin-bottom: 0px;">_________________________________________________</p>';
  const borderSummary = '<h3 style="color:#1E76E2; margin: 0px; font-size: 13px;">SUMMARY</h3><p style="color:#F7931E; background-color:#F7931E; font-size:6px;">_________________________________________________</p>';

  const sidebarContent = htmlToPdfmake(
    `<div style="border: 1px solid #DBE4F2; border-color: #DBE4F2;  height: 100vh;">${borderSummary} ${summary} ${borderEducation} ${education} </div>`,
    {
      defaultStyles: {
        div: {
          lineHeight: 1.5,
          fontSize: 10,
        },
        p: {
          lineHeight: 1.5,
          fontSize: 10,
        },
      },
    },
  );
  const doc = {
    info: {
      title: fileName,
    },
    pageMargins: [30, 30, 30, 30],
    content: [
      {
        columns: [
          {
            width: 230,
            stack: [
              {
                table: {
                  headerRows: 1,
                  dontBreakRows: true,
                  widths: [220],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        fillColor: '#1E76E2',
                        text: `${blindCv.job_title}`,
                        alignment: 'left',
                        color: '#ffffff',
                        fontSize: 30,
                        bold: true,
                        margin: [10, 30, 0, 30],
                      },
                    ],
                  ],
                  layout: 'noBorders',
                },
              },
              {
                table: {
                  heights: [ 600 ],
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                    },
                    vLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                    },
                  },
                  body: [
                    [
                      {
                        border: [true, true, true, true],
                        borderColor: ['#DBE4F2', '#DBE4F2', '#DBE4F2', '#DBE4F2'],
                        margin: [10, 20, 10, 0],
                        stack: [...sidebarContent],
                      },
                    ],
                  ],
                },
              },
            ],
          },
          {
            margin: [20, 30, 0, 30],
            stack: [
              {
                image: pbLogo,
                width: 215,
                height: 45,
                margin: [0, 0, 0, 40],
              },
              ...borderWorkExperienceOrange,
              {
                margin: [0, 10, 0, 30],
                stack: [...workExperience],
              },
            ],
          },
        ],
      },
    ],
  };

  pdfMake.createPdf(doc).download(fileName);
};
