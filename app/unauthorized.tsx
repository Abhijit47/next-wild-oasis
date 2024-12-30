import LoginForm from './_components/forms/LoginForm';

export default function Unauthorized() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <LoginForm />
    </main>
  );
}
