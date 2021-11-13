import { useRouter } from "next/router";

function ClientsProjectsPage() {
  const router = useRouter();
  function loadProjectHandler() {
    router.push("/clients/masx/projecta");
  }
  return (
    <div>
      <h1>The proect of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientsProjectsPage;
