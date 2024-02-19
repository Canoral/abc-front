import { Link } from "react-router-dom";
import { useAppSelector } from "../../commons/redux";
import { openModal } from "../../commons/functions";
import { useEffect } from "react";

export default function App() {
  const modal = document.getElementById("my_modal_5");
  const user = useAppSelector((state) => state.user.logged);

  useEffect(() => {
    if (modal) {
      return;
    }
  }, []);

  return (
    <main className="app">
      <div className="flex flex-col gap-y-5 shadow p-5 rounded-lg w-[50%] m-auto mt-5 max-sm:overflow-y-auto">
        <p className="text-sm text-justify">
          Vous devez préparer un nouveau cours et vous aimeriez innover en
          intégrant des activités d’apprentissage, mais vous ne savez pas quoi
          et comment faire? Ou alors vous êtes responsable d’une formation, d’un
          module dont vous aimeriez repenser l’organisation avec les
          enseignants, mais vous ne savez pas comment vous y prendre ? Alors
          l’application en ligne « ABC Learning » peuvent vous aider.
        </p>
        <div className="flex justify-around gap-5">
          {user ? (
            <>
              <Link to={"/scenarios"} className="btn btn-sm  max-lg:w-1/2">
                Créer un nouveau scénario
              </Link>
              <Link to={"/scenarios"} className="btn btn-sm max-lg:w-1/2">
                Voir les scénarios enregistrés
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-sm"
                onClick={() => {
                  openModal();
                }}
              >
                Se connecter
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
