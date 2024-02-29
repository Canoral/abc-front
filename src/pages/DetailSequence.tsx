import { useEffect } from "react";
import Cards from "../components/Cards";
import LevelButton from "../components/LevelButton";
import { useAppDispatch, useAppSelector } from "../../commons/redux";
import { getCards } from "../../redux/reducers/card";
import SessionsTables from "../components/SessionsTables";
import { getOneSequence } from "../../redux/reducers/sequences";
import { LeftBarChart } from "../components/LeftBarChart";
import { RightBarChart } from "../components/RightBarChart";
import PieChart from "../components/PieChart";

export default function DetailSequence() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.card.cards);
  const sessions = useAppSelector((state) => state.sequence.sequence);
  const sequenceId = Number(sessionStorage.getItem("sequence_id"));

  useEffect(() => {
    dispatch(getCards());
    dispatch(getOneSequence(sequenceId));
  }, []);

  return (
    <div className="DetailSequence mb-20">
      <LevelButton />
      {cards && cards.length !== 0 && <Cards cards={cards} />}
      {sessions && sessions.length !== 0 && (
        <SessionsTables sequence={sessions} />
      )}
      {sessions && sessions.length !== 0 && (
        <div className="flex justify-evenly">
          <LeftBarChart sessions={sessions} />
          <PieChart sessions={sessions} />
          <RightBarChart sessions={sessions} />
        </div>
      )}
    </div>
  );
}
