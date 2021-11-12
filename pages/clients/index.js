import Link from "next/link";
function ClientsPage() {
  const clients = [
    {
      id: "max",
      name: "Maximilian",
    },
    { id: "manu", name: "Manuel" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
    </div>
  );
}

export default ClientsPage;
