import { RateBySelect } from "./RateBySelect.jsx";
import { RateByStars } from "./RateByStars.jsx";
import { RateByTextbox } from "./RateByTextBox.jsx";

const { useState } = React;

export function AddReview({ onAddReview }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedRateType, setSelectedRateType] = useState(null);

  const handleChange = ({ target }) => {
    setSelectedRateType(target.value);
  };

  function onCloseReview() {
    setIsAddOpen(false);
  }

  return (
    <section className="add-review">
      <button onClick={() => setIsAddOpen(true)}>Add Review</button>
      {isAddOpen && (
        <section>
          <button onClick={() => setIsAddOpen(false)}>Close</button>
          <section className="flex">
            <input
              type="radio"
              id="bySelect"
              name="rateTypes"
              value="select"
              onChange={handleChange}
            />
            <label htmlFor="bySelect">bySelect</label>

            <input
              type="radio"
              id="byTextbox"
              name="rateTypes"
              value="textbox"
              onChange={handleChange}
            />
            <label htmlFor="byTextbox">byTextbox</label>

            <input
              type="radio"
              id="byStars"
              name="rateTypes"
              value="stars"
              onChange={handleChange}
            />
            <label htmlFor="byStars">byStars</label>
          </section>
          <DynamicRate
            rateType={selectedRateType}
            onAddReview={onAddReview}
            onClose={onCloseReview}
          />
        </section>
      )}
    </section>
  );
}

//TODO: complete all dynamic ratings
function DynamicRate({ rateType, ...restOfProps }) {
  const rateTypeMap = {
    select: <RateBySelect {...restOfProps} />,
    textbox: <RateByTextbox {...restOfProps} />,
    stars: <RateByStars {...restOfProps} />,
  };
  return rateTypeMap[rateType];
}
