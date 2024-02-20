import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../commons/redux";
import { closeModal } from "../../commons/functions";
import { createOneSequence } from "../../redux/reducers/sequences";
import { useNavigate } from "react-router-dom";

export default function CreateSequenceModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sequenceName, setSequenceName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(createOneSequence(formData));
    setSequenceName("");
    closeModal("my_modal_6");
    navigate("/scenarios");
  };

  return (
    <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form
          method="post"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              Nouveau scénario
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Entrez le nom du scénario"
                autoComplete="name"
                value={sequenceName}
                onChange={(e) => setSequenceName(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="text-white bg-green-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full m-auto block sm:w-auto px-5 py-2.5 text-center">
            Valider
          </button>
        </form>
      </div>
    </dialog>
  );
}
