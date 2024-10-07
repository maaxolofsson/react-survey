import AnswersItem from "./AnswersItem";

export default function AnswersList(props) {
  const { answersList, handleEdit } = props;

  return (
    <ul>
      {answersList.length > 0 ? answersList.map((answer, i) => (
        <AnswersItem answer={answer} handleEdit={handleEdit} key={i} />
      )) : null}
    </ul>
  );
}
