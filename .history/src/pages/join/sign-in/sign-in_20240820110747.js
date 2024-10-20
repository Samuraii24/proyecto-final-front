import { JoinLayout } from "@/layouts";
import styles from "./sign-in.module.scss";
import Link from "next/link";
import { LoginForm } from "@/components/Auth/LoginForm/LoginForm";
import { Seo } from "@/components/Shared";

export default function SignInPage() {
  return (
    <>
      <Seo title="Inicia tu sesión" />
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>

          <LoginForm />

          <div className={styles.actions}>
            <Link href="/join/sign-up"> ¿Aún no tienes cuenta?</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
