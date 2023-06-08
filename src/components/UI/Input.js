function Input({ type, required }) {
  return (
    <>
      <label htmlFor='email'>Email</label>
      <input id='email' type={type} name='email' required />
    </>
  );
}

export default Input;
