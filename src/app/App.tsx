import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../commons/redux";

export default function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.logged);

  return (
    <main className="app">
      <div className="flex flex-col gap-y-5 shadow absolute p-5 rounded-lg left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-sm text-justify">
          Vous devez préparer un nouveau cours et vous aimeriez innover en
          intégrant des activités d’apprentissage, mais vous ne savez pas quoi
          et comment faire? Ou alors vous êtes responsable d’une formation, d’un
          module dont vous aimeriez repenser l’organisation avec les
          enseignants, mais vous ne savez pas comment vous y prendre ? Alors
          l’application en ligne « ABC Learning » peuvent vous aider.
        </p>
        <div className="flex justify-around">
          {user ? (
            <>
              <Link to={"/scenarios"} className="btn btn-sm">
                Créer un nouveau scénario
              </Link>
              <Link to={"/scenarios"} className="btn btn-sm">
                Voir les scénarios enregistrés
              </Link>
            </>
          ) : (
            <button className="btn btn-sm">Se connecter</button>
          )}
        </div>
      </div>
    </main>
  );
}
