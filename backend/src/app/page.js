import Link from "next/link";

export default function HomePage() {

  return (

    <div>

      <h1>Home</h1>

      <div>

        <Link href="/register">
          Registrar
        </Link>

      </div>

      <div>

        <Link href="/login">
          Login
        </Link>

      </div>

      <div>

        <Link href="/dashboard">
          Dashboard
        </Link>

      </div>

    </div>

  );

}