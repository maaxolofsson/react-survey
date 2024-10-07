import { useState } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [open, setOpen] = useState(false); //Ignore this state

  let formId = 0;

  // Object to save the data from form in
  const formDataDef = {
    id: -10,
    color: "",
    spend_time: [],
    review: "",
    username: "",
    email: "",
  };

  const [formData, setFormData] = useState(formDataDef);
  const [answers, setAnswers] = useState([])

  const handleSubmitForm = (e) => {
    e.preventDefault(); // To avoid reloading page
    const formMayExist = answers.find(ans => parseInt(ans.id) === parseInt(formData.id))
    if (formMayExist === undefined) { // New answer
      formData.id = formId;
      formId++;
      answers.push(formData)
      setAnswers(answers)
    } else { // Edited answer
      const formMayExistIx = answers.indexOf(formMayExist)
      answers[formMayExistIx] = formData
      setAnswers(answers)
    }

    console.log(formData); // Print the form in console
    setFormData(formDataDef); // Resetting the form state
  };

  const handleChange = (e) => {
    if (e.target.name === "spend_time") {
      if (e.target.checked) {
        formData["spend_time"].push(e.target.value);
        setFormData(formData);
      } else {
        formData["spend_time"].splice(
          formData["spend_time"].indexOf(e.target.value),
          1
        );
        setFormData(formData);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (editedData) => {
    setFormData(editedData)
  }

  return (
    <>
      <main className="survey">
        <section className={`survey__list ${open ? "open" : ""}`}>
          <h2>Answers list</h2>
          <AnswersList answersList={answers} handleEdit={handleEdit}></AnswersList>
        </section>
        <section className="survey__form">
          <form className="form">
            <h2>Tell us what you think about your rubber duck!</h2>
            <div className="form__group radio">
              <h3>How do you rate your rubber duck colour?</h3>
              <ul>
                <li>
                  <input
                    id="color-one"
                    type="radio"
                    name="color"
                    value="1"
                    checked={formData.color === "1" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="color-one">1</label>
                </li>
                <li>
                  <input
                    id="color-two"
                    type="radio"
                    name="color"
                    value="2"
                    checked={formData.color === "2" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="color-two">2</label>
                </li>
                <li>
                  <input
                    id="color-three"
                    type="radio"
                    name="color"
                    value="3"
                    checked={formData.color === "3" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="color-three">3</label>
                </li>
                <li>
                  <input
                    id="color-four"
                    type="radio"
                    name="color"
                    value="4"
                    checked={formData.color === "4" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="color-four">4</label>
                </li>
              </ul>
            </div>
            <div className="form__group">
              <h3>How do you like to spend time with your rubber duck</h3>
              <ul>
                <li>
                  <label>
                    <input
                      name="spend_time"
                      type="checkbox"
                      value="swimming"
                      checked={formData.spend_time.find(
                        (el) => el === "swimming"
                      )}
                      onChange={handleChange}
                    />
                    Swimming
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      name="spend_time"
                      type="checkbox"
                      value="bathing"
                      checked={formData.spend_time.find(
                        (el) => el === "bathing"
                      )}
                      onChange={handleChange}
                    />
                    Bathing
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      name="spend_time"
                      type="checkbox"
                      value="chatting"
                      checked={formData.spend_time.find(
                        (el) => el === "chatting"
                      )}
                      onChange={handleChange}
                    />
                    Chatting
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      name="spend_time"
                      type="checkbox"
                      value="noTime"
                      checked={formData.spend_time.find(
                        (el) => el === "notime"
                      )}
                      onChange={handleChange}
                    />
                    I don&apos;t like to spend time with it
                  </label>
                </li>
              </ul>
            </div>
            <label>
              What else have you got to say about your rubber duck?
              <textarea
                name="review"
                cols="30"
                rows="10"
                value={formData.review}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              Put your name here (if you feel like it):
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Leave us your email pretty please??
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <input
              className="form__submit"
              type="submit"
              value="Submit Survey!"
              onClick={handleSubmitForm}
            />
          </form>
        </section>
      </main>
    </>
  );
}

export default Survey;
