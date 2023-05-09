"use client"; // this is a client component 👈🏽
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Table from "../table/page";
import Form from "../form/page";
import { BiX, BiCheck } from 'react-icons/bi';




export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
      router.push("/"); // Replace with your desired login page
    }
  }, []);

  return (
    <section>
      <main className="py-5">
        <h1 className="bg- text-xl md:text-5xl text-center font-bold py-10">
          Labo Management
        </h1>
        {/* collapsable form */}
        <div className="container mx-auto">
       

          <Form></Form>
        </div>

        {/* table */}
        <div className="mx-auto">
          <Table></Table>
        </div>
      </main>
    </section>
  );
}
