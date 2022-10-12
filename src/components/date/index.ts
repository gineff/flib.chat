/* eslint-disable camelcase */
import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const monthsShort = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Ноя", "Дек"];
const getWeekDay = (date: Date) => days[date.getDay()];
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

const getFormatedDate = (date: Date) =>
  `${String(date.getDate()).replace(/0(\d)/, "$1")} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
export { getFormatedDate };

export default class DateComponent extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  render(): void {
    const { time, format } = this.props;
    const date = new Date();
    const isToday = time.slice(0, 10) === todayStr;
    const isThisWeek =
      (today.getTime() - date.getTime()) / TWENTY_FOUR_HOURS < 7 && today.getDay() > (date.getDay() || 7);

    const formattedTime = ((format: string) => {
      if (format === "hh:mm") {
        return time.substr(11, 5);
      }

      if (isToday) return time.slice(11, 16);
      if (isThisWeek) return getWeekDay(date);
      return getFormatedDate(date);
    })(format);

    this.setState({ ...this.props, formattedTime });
    super.render();
  }
}
