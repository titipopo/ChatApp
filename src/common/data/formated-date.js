const GetParsedDate = (strDate, fomart) => {
  var strDt;
  var date = new Date(strDate);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var ms = date.getMilliseconds();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  if (h < 10) {
    h = '0' + h;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  switch (fomart) {
    case 1:
      strDt = dd + '-' + mm + '-' + yyyy;
      break;
    case 2:
      strDt = h + ':' + m + ':' + s + ' ' + dd + '-' + mm + '-' + yyyy;
      break;
    case 3:
      strDt = yyyy + '-' + mm;
      break;
    case 4:
      strDt = mm + '-' + dd;
      break;
    case 5:
      strDt = yyyy + '-' + mm + '-' + dd;
      break;
    case 6:
      strDt = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
      break;
    case 7:
      strDt = h + ':' + m;
      break;
    case 8:
      strDt = h + ':' + m + ':' + s;
      break;
    case 9:
      strDt =
        yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s + '.' + ms;
      break;
    default:
      strDt = yyyy + '-' + mm + '-' + dd;
      break;
  }
  return strDt;
};

const GetFromDate = (date, fomart) => {
  var strDt;
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var ms = date.getMilliseconds();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  if (h < 10) {
    h = '0' + h;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  switch (fomart) {
    case 1:
      strDt = dd + '-' + mm + '-' + yyyy;
      break;
    case 2:
      strDt = h + ':' + m + ':' + s + ' ' + dd + '-' + mm + '-' + yyyy;
      break;
    case 3:
      strDt = yyyy + '-' + mm;
      break;
    case 4:
      strDt = mm + '-' + dd;
      break;
    case 5:
      strDt = yyyy + '-' + mm + '-' + dd;
      break;
    case 6:
      strDt = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
      break;
    case 7:
      strDt = h + ':' + m;
      break;
    case 8:
      strDt = h + ':' + m + ':' + s;
      break;
    case 9:
      strDt =
        yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s + '.' + ms;
      break;
    default:
      strDt = yyyy + '-' + mm + '-' + dd;
      break;
  }
  return strDt;
};

export { GetParsedDate, GetFromDate };
