import moment from 'moment';

/**
 * Check if schedule is valid
 * @param {datetime | string} dateTime Date time inputted by the user
 * @param {datetime | string} setOfSchedules set of schedules to be compared with
 */
export const isScheduleValid = (dateTime, setOfSchedules) => {
  const formattedDateTime = moment(dateTime);
  if (new Date(dateTime) === 'Inavalid Date') {
    return 'Only accepts date and time format.';
  }

  if (dateTime === '' || dateTime === null) {
    return 'Only accepts date and time format.';
  }
  if (formattedDateTime.diff(new Date()) <= 0) {
    return 'Please provide latest schedule';
  }

  if (setOfSchedules.length !== 0) {
    let errorCount = 0;
    setOfSchedules.map(schedule => {
      if (
        formattedDateTime.isSameOrBefore(moment(schedule.end_date)) &&
        formattedDateTime.isSameOrAfter(moment(schedule.start_date))
      ) {
        errorCount += 1;
      }
      if (
        formattedDateTime.isBetween(
          moment(schedule.start_date),
          moment(schedule.end_date),
        )
      ) {
        errorCount += 1;
      }
    });
    if (errorCount > 0) {
      return 'Schedule cannot be repeated.';
    }
  }

  return '';
};

/**
 * Check if the date time range is valid
 * @param {string} startDate Start Datetime
 * @param {string} endDate End Datetime
 */
export const checkValidScheduleRange = (startDate, endDate, setOfSchedules) => {
  const errorMessage = {
    start: '',
    end: '',
  };
  if (moment(startDate).isSameOrAfter(moment(endDate))) {
    errorMessage.start = 'Invalid date and time range';
  }
  if (moment(endDate).isSameOrBefore(moment(startDate))) {
    errorMessage.end = 'Invalid date and time range';
  }

  const isStartDateValid = isScheduleValid(startDate, setOfSchedules);
  const isEndDateValid = isScheduleValid(endDate, setOfSchedules);

  if (errorMessage.start === '') {
    errorMessage.start = isStartDateValid;
  }

  if (errorMessage.end === '') {
    errorMessage.end = isEndDateValid;
  }

  return errorMessage;
};
