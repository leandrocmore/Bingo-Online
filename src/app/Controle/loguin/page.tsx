
/**"use client";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoguiForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  useEffect(() => {
    if (error === "CredentialsSignin") {
      setTimeout(() => {
        router.push("/");
      }, 5000); // Redireciona após 5 segundos
    }
  }, [error, router]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      senha: formData.get("senha")
    };

    await signIn("credentials", {
      ...data,
      callbackUrl: "/api/",
    });
    console.log(data);
  }

  return (
    <form onSubmit={login}> 
      <h1>faça seu login</h1>
      <input name="email" type="email" placeholder="email" />
      <input name="senha" type="senha" placeholder="senha"/>
      <button type="submit">botão de login</button>
      {error === "CredentialsSignin" &&
        <div>
          Erro no login. Você será redirecionado para a página inicial em 5 segundos.
        </div>
      }
    </form>
  );
} */
"use client"
import { signIn } from "next-auth/react";

export default function Entrar(){
      return (
        <>
         <button onClick={()=>signIn()}> Entrar </button>
        </>
      )
}