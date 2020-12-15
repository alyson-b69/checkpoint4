import moment from "moment";

class dates {
  static datify(timeStamp, format) {
    let year = timeStamp.split("-")[0];
    let month = timeStamp.split("-")[1];
    let day = timeStamp.split("-")[2].split("T")[0];
    let hour = parseInt(timeStamp.split("T")[1].split(":")[0]) + 1;
    let minute = timeStamp.split("T")[1].split(":")[1];
    if (format === "date") {
      return day + "/" + month + "/" + year;
    } else if (format === "time") {
      return hour + "h" + minute;
    } else if (format === "month-year") {
      return month + "/" + year;
    } else {
      return day + "/" + month + "/" + year + " - " + hour + "h" + minute;
    }
  }

  static getAge(birthdate) {
    return moment().diff(birthdate, "years");
  }

  static getAgeInMonth(birthdate) {
    return moment(new Date()).diff(birthdate, "months", true);
  }

  static birthdate(birth) {
    let year = birth.split("-")[0];
    let month = birth.split("-")[1];
    let day = birth.split("-")[2];

    return day + "/" + month + "/" + year;
  }
}

export default dates;
