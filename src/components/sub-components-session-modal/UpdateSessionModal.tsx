import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../commons/redux";
import { useRef, useState } from "react";
import {
  getOneSequence,
  updateSession,
} from "../../../redux/reducers/sequences";
import { openUpdateModal } from "../../../redux/reducers/other";

export default function UpdateSessionModal({ isOpen }: { isOpen: boolean }) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const session = useAppSelector((state) => state.sequence.session);
  const [isPresentiel, setIsPresentiel] = useState(true);
  const [isGroupe, setIsGroupe] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    if (session) {
      formData.append("tool_id", session[0].tool_id.toString());
    }
    formData.append("is_face_to_face", isPresentiel.toString());
    formData.append("is_group_work", isGroupe.toString());
    dispatch(updateSession(formData)).then(() =>
      dispatch(getOneSequence(Number(id)))
    );
    formRef.current?.reset();
    dispatch(openUpdateModal(false));
  };

  return (
    session && (
      <dialog
        id="update-session"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div
          className="modal-box w-2/6 max-w-5xl tablet:w-4/6"
          style={{ backgroundColor: session[0].color }}
        >
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
              onClick={() => {
                sessionStorage.removeItem("tool_id");
                dispatch(openUpdateModal(false));
                formRef.current?.reset();
              }}
            >
              ✕
            </button>
          </form>
          <form
            method="post"
            onSubmit={(event) => {
              handleUpdateSubmit(event);
            }}
            ref={formRef}
          >
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white tablet:text-xs"
            >
              Nom de la session
              <input
                id="name-update"
                name="name"
                placeholder="Ecrivez le nom de la session"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 tablet:text-xs"
                autoComplete="off"
                defaultValue={session[0].session_name}
                required
              />
            </label>
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-white tablet:text-xs"
            >
              Durée en minutes
              <input
                type="number"
                id="time-update"
                name="time"
                defaultValue={session[0].time}
                min={0}
                max={100}
                placeholder="Minutes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 tablet:text-xs"
                autoComplete="off"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-white tablet:text-xs">
              Présentiel / Distanciel
              <select
                id="presentiel-update"
                name="is_face_to_face"
                className="bg-gray-50 border border-gray-300 focus:bg-none text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 tablet:text-xs"
                onChange={(e) => {
                  if (e.target.value === "Présentiel") {
                    setIsPresentiel(true);
                  } else {
                    setIsPresentiel(false);
                  }
                }}
                autoComplete="off"
                defaultValue={
                  session[0].is_face_to_face ? "Présentiel" : "Distanciel"
                }
              >
                <option value="Présentiel">Présentiel</option>
                <option value="Distanciel">Distanciel</option>
              </select>
            </label>
            <label className="block mb-2 text-sm font-medium text-white tablet:text-xs">
              Individuel / Groupe
              <select
                id="groupe-update"
                name="is_group_work"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 tablet:text-xs"
                onChange={(e) => {
                  if (e.target.value === "Groupe") {
                    setIsGroupe(true);
                  } else {
                    setIsGroupe(false);
                  }
                }}
                autoComplete="off"
                defaultValue={
                  session[0].is_group_work ? "Groupe" : "Individuel"
                }
              >
                <option value="Groupe">Groupe</option>
                <option value="Individuel">Individuel</option>
              </select>
            </label>
            <label
              htmlFor="comments"
              className="block mb-2 text-sm font-medium text-white tablet:text-xs"
            >
              Remarques
              <textarea
                id="comments-update"
                name="comments"
                placeholder="Ecrivez vos commentaire"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 tablet:text-xs overflow-hidden"
                autoComplete="off"
                defaultValue={session[0].comments}
              />
            </label>
            <label
              htmlFor="equipment"
              className="block mb-2 text-sm font-medium text-white tablet:text-xs"
            >
              Matériel
              <div className="flex flex-row items-end">
                <div className="flex-grow">
                  <textarea
                    id="equipment-update"
                    name="equipment"
                    placeholder="Ecrivez vos matériels"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 tablet:text-xs overflow-hidden"
                    autoComplete="off"
                    defaultValue={session[0].equipment}
                  />
                </div>
                <button className="btn btn-sm ml-5">Valider</button>
              </div>
            </label>
          </form>
        </div>
      </dialog>
    )
  );
}
