/**
 * globalHelpers.js
 *
 * This file is the helpers around the actual pages, and should only
 * contain code that should be of help on all pages. (e.g. checking if response is "SUCCESS")
 */
import Cookies from 'js-cookie';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import { createCanvas, loadImage } from 'canvas';
import env from '../../config/env';
/**
 * Check's if the server's response status string is SUCCESS
 *
 * @param {string} status The response status of the server
 */
export const checkIfResponseIsSuccess = status => {
  if (status === 'SUCCESS') {
    return true;
  }
  return false;
};

/**
 * Validates string based on email
 *
 * @param {string} email - the email string ex. johndoe@mailinator.com
 */

export const validateEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

/**
 * Validate url
 * Reference: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
 * @param {string} url User entered url
 */
export const validateUrl = url => {
  const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regex.test(url);
};

/**
 * Set's the cookie for the user token
 *
 * @param {string} token the token from the server
 */
export const setToken = token => {
  Cookies.set('token', token, { sameSite: 'lax', secure: true });
};

/**
 * Clear's the user data
 */
export const clearUserData = () => {
  Cookies.remove('token');
  localStorage.removeItem('user_name');
  localStorage.removeItem('me');
  localStorage.removeItem('portals');
  localStorage.removeItem('select-portal');
  localStorage.removeItem('menus');

  // To make sure that all possible data are remove
  localStorage.clear();
};

/**
 * Returns true if response is 404
 */
export const isResponse401 = error => {
  const message = JSON.stringify(error.message);
  return message.includes('401');
};

/**
 * Capitlizes each first letter of word
 *
 * @param {string} string - the string to capitalize
 */
export const toTitleCase = str =>
  str.replace(/\w\S*/g, function cb(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

/**
 * Detects if user presses enter
 *
 * @param {object} event - The event object for keyboard
 * @param {func} cb - the callback if user presses enter;
 */
export const onEnter = (evt, cb) => {
  if (evt.key === 'Enter') {
    cb();
  }
};

/**
 * Get's the token in the browser
 */
export const getToken = () => Cookies.get('token');

/**
 * Set users menu
 * @param {*} menus
 */
export const setUsersMenu = menus =>
  localStorage.setItem('menus', JSON.stringify(menus));

/**
 * Set users accessible portals and default portal
 * @param {*} portal
 * @param {*} selectedPortal
 */
export const setUserPortal = (portal, selectedPortal) => {
  localStorage.setItem('portals', portal);
  localStorage.setItem('select-portal', selectedPortal);
};
/**
 * Format date to Long Date
 *
 * @param {date} string ISO date format from the database
 * @param {isWithTime} boolean optional parameter to include the time
 */
export const formatISOtoLongYear = (isoDate, isWithTime = false) => {
  if (isoDate == '0000-00-00' || isoDate == null || isoDate == '') {
    return '-';
  }
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  let meridiem = '';
  const date = moment(isoDate);
  const temp = date;
  if (isWithTime) {
    // meridiem = date.format('hh:mmA');
    meridiem = temp.format('HH:mmA');
    const hours = temp.format('HH');
    if (hours > 12) {
      meridiem = temp.format(`${hours - 12}:mmA`);
    }
  }

  return `${date.date()} ${months[date.month()]} ${date.year()} ${meridiem}`;
};
/**
 * Format number or string into a currency format $ 1, 000.00
 * @param {string | number} amount amount to be formatted 1000 to $1, 000.00
 * @param {string} typeOfCurrency currency USD
 */
export const formatStringToCurrency = amount => {
  const formatAmount = parseFloat(amount);
  return formatAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

/**
 * Convert array to csv format
 * @param {object} data
 * Reference: https://jbetancur.github.io/react-data-table-component/?path=/story/export-csv--using-actions
 */
export const convertArrayOfObjectsToCSV = (data, columns) => {
  let result;

  const invoiceBreakdownTotal = [];
  columns.map(column => {
    invoiceBreakdownTotal[column.accessor] = column.Footer;
  });
  data.push(invoiceBreakdownTotal);

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(data[0]);

  result = columns.map(column => column.Header).join(',');
  result += lineDelimiter;

  data.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key].toString().replace(',', '');
      // eslint-disable-next-line no-plusplus
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

/**
 * Convert CSV to Excel
 * @param {object} trackedItems
 * @param {string} filename
 */
export const convertCSVToExcel = (trackedItems, fileName, columns) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const headers = [];
  // eslint-disable-next-line array-callback-return
  columns.map(column => {
    headers[column.accessor] = column.Header;
  });

  const invoiceBreakdownTotal = [];
  columns.map(column => {
    invoiceBreakdownTotal[column.Header] = column.Footer;
  });

  const jsonSheetData = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < trackedItems.length; i++) {
    const tempData = [];
    columns.map(column => {
      tempData[headers[column.accessor]] = trackedItems[i][column.accessor];
      return true;
    });
    jsonSheetData.push(tempData);
  }

  jsonSheetData.push(invoiceBreakdownTotal);

  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(jsonSheetData);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

/**
 * Export html to PDF
 * @param {object} input
 */
export const exportDocumentToPdf = (input, filename) => {
  try {
    // https://stackoverflow.com/questions/36213275/html2canvas-does-not-render-full-div-only-what-is-visible-on-screen
    window.scrollTo(0, 0);
    const pdf = new JsPDF('portrait', 'mm', 'letter');
    pdf.scaleFactor = 1;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${filename}.pdf`);
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Change zero values to -
 * @param {string | number} val the number to replace
 */
export const replaceZeroValues = val => (parseFloat(val) <= 0 ? '-' : val);

/**
 * Format html string for text editor
 * @param {string} html html string
 */
export const formatHtmlToEditorState = html => {
  const contentBlock = htmlToDraft(html);
  let editorStateInitial = '';
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    );
    editorStateInitial = EditorState.createWithContent(contentState);
  }
  return editorStateInitial;
};

/**
 * Format editor state to html
 * @param {*} editorState
 */
export const formatEditorStateToHtml = editorState =>
  EditorState.createWithContent(
    ContentState.createFromBlockArray(htmlToDraft(editorState).contentBlocks),
  );

/**
 * Convert react text editor object to string
 * @param {*} obj
 */
export const convertObjectToString = obj =>
  draftToHtml(convertToRaw(obj.getCurrentContent()));

/**
 * Translate to human readable format
 * @param {string} string
 */
export const translateToHumanReadableFormat = string => {
  switch (string) {
    // Experience Level
    case 'FRESH-GRAD':
      return 'Fresh Grad (0-1 year)';
    case 'JUNIOR':
      return 'Junior (1-3 years)';
    case 'MID-LEVEL':
      return 'Mid-Level (3-5 years)';
    case 'SENIOR':
      return 'Senior (5-8 years)';
    case 'MANAGER':
      return 'Manager (> 8 years)';
    // Contracts
    case 'DRAFT':
      return 'Draft';
    case 'REJECTED':
      return 'Rejected';
    case 'ACCEPTED':
      return 'Accepted';
    case 'IN-PROGRESS':
      return 'In Progress';
    case 'FINAL':
      return 'Final';
    // Clients
    case 'ACTIVE':
      return 'Active';
    case 'INACTIVE':
      return 'Inactive';
    case 'ON-HOLD':
      return 'On-Hold';
    case 'EXIT-30':
      return 'Exiting (30 days)';
    case 'EXIT-60':
      return 'Exiting (60 days)';
    case 'EXIT-PENDING':
      return 'Exited (Pending)';
    case 'EXITED':
      return 'Exited';
    case 'PROSPECT':
      return 'Prospect';
    // Due Diligence
    case 'PASSPORT':
      return 'Passport';
    case 'DRIVER':
      return "Driver's License";
    case 'PHILHEALTH':
      return 'PhilHealth';
    case 'TIN':
      return 'TIN ID';
    case 'POSTAL':
      return 'Postal ID';
    case 'VOTERS':
      return 'Voters ID';
    case 'PRC':
      return 'PRC ID';
    case 'SENIOR':
      return 'Senior Citizen ID';
    case 'OFW':
      return 'OFW ID';
    case 'OTHERS':
      return 'Others';
    // Company Info - Contact Info
    case 'WHATSAPP':
      return 'Whatsapp';
    case 'VIBER':
      return 'Viber';
    case 'SKYPE':
      return 'Skype';
    case 'ZOOM':
      return 'Zoom';
    case '':
      return '';
    default:
      return string;
  }
};

export const translateToHumanReadableFormatClassName = string => {
  switch (string) {
    // Clients
    case 'ACTIVE':
      return 'active';
    case 'INACTIVE':
      return 'inactive';
    case 'ON-HOLD':
      return 'on-hold';
    case 'EXIT-30':
      return 'exiting-30d';
    case 'EXIT-60':
      return 'exiting-60d';
    case 'EXIT-PENDING':
      return 'exited-pending';
    case 'EXITED':
      return 'exited';
    case 'PROSPECT':
      return 'prospect';
    default:
      return string;
  }
};

/**
 * Translate to human readable format
 * @param {string} string
 */
export const translateHmoToReadableFormat = hmoEffectivity => {
  switch (hmoEffectivity) {
    case 'IMMEDIATE':
      return 'Immediately';
    case '3-MONTHS':
      return '3 Months';
    case '6-MONTHS':
      return '6 Months';
    case 'NOT-APPLICABLE':
      return 'Not Applicable';
    case '':
      return '-';
    default:
      return hmoEffectivity;
  }
};

/**
 * Translate to human readable format
 * @param {string} string
 */
export const translateContractStatusToReadableFormat = status => {
  switch (status) {
    case 'DRAFT':
      return 'Draft';
    case 'REJECTED':
      return 'Rejected';
    case 'ACCEPTED':
      return 'Accepted';
    case 'IN-PROGRESS':
      return 'In Progress';
    case 'FINAL':
      return 'Final';
    case '':
      return '-';
    case 'FOR-AMENDMENT':
      return 'For Amendment';
    default:
      return status;
  }
};

/**
 * Removes an item from an array
 * @param {array} array to remove from
 * @param {value} any value to remove
 *
 */

export const removeItemFromArray = (array, value) => {
  const index = array.indexOf(value);
  return index > -1 ? array.splice(index, 1) : array;
};

/**
 * anyMatchInArray - checks whether an array has an element of an array
 * @param {*} target
 * @param {*} toMatch
 */
export const anyMatchInArray = function(target, toMatch) {
  let found;
  let targetMap;
  let i;
  let j;
  let cur;
  found = false;
  targetMap = {};

  // Put all values in the `target` array into a map, where
  //  the keys are the values from the array
  for (i = 0, j = target.length; i < j; i++) {
    cur = target[i];
    targetMap[cur] = true;
  }
  // Loop over all items in the `toMatch` array and see if any of
  //  their values are in the map from before
  for (i = 0, j = toMatch.length; !found && i < j; i++) {
    cur = toMatch[i];
    found = !!targetMap[cur];
    // If found, `targetMap[cur]` will return true, otherwise it
    //  will return `undefined`...that's what the `!!` is for
  }

  return found;
};

/**
 * Returns the Current date format into D MMM YYYY ie 1 Jan 2020
 * @param {string} date the date string to format
 */
export const formatDateToDayMonthNameYear = date => {
  if (new Date(date) == 'Invalid date') {
    return '-';
  }
  return moment(date).format('D MMM YYYY');
};

/**
 * Format date to 2 July 2020 11:00:00 AM
 * @param {*} dateTime date time
 */
export const formatCompleteTimestamp = dateTime => {
  if (dateTime.toString() === 'Invalid Date' || dateTime.toString() === 'Invalid date') {
    return 'Skipped';
  }
  return moment(dateTime).format('D MMM YYYY  h:mm:ss A');
}

/**
 * Returns the available counted shortlists count only
 */
export const countedShortlists = () => [
  'SHORTLISTED',
  'IN-PROCESS',
  'FOR INTERVIEW',
  'PARKED',
  'JOB-OFFER',
];

/**
 * Convert iamge to base64 url
 * @param {*} imageToConvert
 */
export const generateImageToDataUrl = async imageToConvert => {
  const x = await loadImage(imageToConvert).then(image => {
    const canvas = createCanvas(333, 72);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();
  });
  return x;
};

/**
 * Gets the client name
 */
export const getClientName = () => localStorage.getItem('client_name');

/**
 * Gets the user id of the current user
 */
export const extractToken = () => jwt_decode(Cookies.get('token'));

/**
 * returns true if the url is indeed from pb careers page
 */
export const isUrlCareersPage = resource => {
  const careersPage = 'penbrothers.com/job_orders/jobs?jo_code=';
  return resource.includes(careersPage);
};

export const getUserInformation = () => {
  if (localStorage.getItem('me')) {
    const userDetails = JSON.parse(localStorage.getItem('me'));
    return {
      interviewer_name: `${userDetails.first_name} ${userDetails.last_name}`,
      interviewer_email: userDetails.email,
      interviewer_position: userDetails.position,
    };
  }

  return {
    interviewer_email: '',
    interviewer_name: '',
    interviewer_position: '',
  };
};

/**
 *
 * @param {string} file - file from the google cloud
 * @returns
 */
export const renderFileName = file => {
  if (file && typeof file === 'string') {
    const filename = file.split('/');
    const finalFilename = filename[filename.length - 1];
    return finalFilename;
  }

  return '';
};

/**
 * formats the file size on human readable
 * @param {number} b
 * @returns
 */
export const formatBytes = b => {
  const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0;
  let n = b;

  while (n >= 1024) {
    n /= 1024;
    l += 1;
  }

  return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)}${units[l]}`;
};

export const isRolePermitted = (globalSettings) => {
  const tokenDetails = extractToken();
  const originalRole = tokenDetails.role_id;
  let isInArray = false;

  globalSettings.forEach(gs => {
    if (originalRole.includes(gs.gs_role_id)) {
      isInArray = true;
    }
  });
  
  return isInArray;
}
