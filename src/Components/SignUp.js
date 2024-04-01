import React, { useState } from "react";
import facebook from "../Assets/facebook.png";
import googleI from "../Assets/googleI.png";
import supabase from "../config/supabaseClient";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignInWithGoogle = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.log("Sign in with Google successful:", user);
    }
  };
  const handleSignInWithFacebook = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });

    if (error) {
      console.error("Error signing in with Facebook:", error.message);
    } else {
      console.log("Sign in with Facebook successful:", user);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Signed up successfully");
      if (user) {
        const { error: insertError } = await supabase
          .from("users")
          .upsert([{ id: user.id, full_name: fullName, phone: phone }]);

        if (insertError) {
          console.log(
            "Error inserting additional user data:",
            insertError.message
          );
        }
      } else {
        console.log(
          "User object is null. The user may need to confirm their email address."
        );
      }
    }
  };
  return (
    <div class="w-96 h-120 mt-32 ml-64 p-5 bg-pink-600 text-center rounded-lg signUpContainer">
      <h2 class="text-white text-4xl mb-10">Inscription</h2>
      <p class="text-white text-lg mb-4 font-semibold">
        Ajouter toutes les informations
      </p>
      <input
        class="block w-96 h-12 rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="text"
        placeholder="Nom Prenom"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        class="block w-96 h-12 rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        class="block w-96 h-12 rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="password"
        placeholder="Mot de Passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        class="block w-96 h-12 rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="tel"
        placeholder="Numero de telephone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div class="flex items-center text-white mx-16 my-2 signUp-divider">
        <hr class="flex-1 border-none h-px bg-white" />
        <span class="px-4">Ou</span>
        <hr class="flex-1 border-none h-px bg-white" />
      </div>
      <div class="flex justify-center my-4 icons">
        <img
          class="w-10 h-10 facebook-icon"
          className="facebook-icon"
          src={facebook}
          alt="Facebook logo"
          onClick={handleSignInWithFacebook}
        />
        <img
          class="w-10 h-10 google-icon"
          className="google-icon"
          src={googleI}
          alt="Google logo"
          onClick={handleSignInWithGoogle}
        />
      </div>
      <button class="w-96 h-12 bg-blue-500 rounded-lg border-none text-white text-lg font-bold signUp-btn" onClick={handleSignUp}>
        Continuer
      </button>
    </div>
  );
};

export default SignUp;
