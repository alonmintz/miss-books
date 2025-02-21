import { LongTxt } from "./LongTxt.jsx";

export function ReviewTextDisplay({ rating }) {
  return <LongTxt txt={rating} length={25} className={"text-review"} />;
}
