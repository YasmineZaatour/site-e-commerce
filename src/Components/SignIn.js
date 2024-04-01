import React, { useState } from "react";
import facebook from "../Assets/facebook.png";
import googleI from "../Assets/googleI.png";
import supabase from "../config/supabaseClient";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("Sign in successful:", user);
    }
  };
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

  return (
    <div class="w-522 h-400 mt-150 ml-550 p-20 bg-pink-600 text-center rounded-lg signInContainer">
      <h2 class="text-white text-4xl mb-50">Connectez vous</h2>
      <p class="text-white text-2xl mb-10 font-semibold">
        Saisissez votre e-mail et mot de passe
      </p>
      <input
        class="block w-380 h-45 rounded-lg mb-15 border-none mx-auto px-3 text-black signIn-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        class="block w-380 h-45 rounded-lg mb-15 border-none mx-auto px-3 text-black signIn-password"
        type="password"
        placeholder="Mot de Passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div class="text-white text-sm float-right mr-60 mt-2">
        mot de passe oublié?
      </div>
      <div class="flex items-center text-white mx-68 my-55 signIn-divider">
        <hr class="flex-1 border-none h-px bg-white" />
        <span class="px-20">Ou</span>
        <hr class="flex-1 border-none h-px bg-white" />
      </div>
      <div class="flex justify-center my-4 icons">
        <img
          class="w-70 h-41 facebook-icon"
          src={facebook}
          alt="Facebook logo"
          onClick={handleSignInWithFacebook}
        />
        <img
          class="w-40 h-40 google-icon"
          src={googleI}
          alt="Google logo"
          onClick={handleSignInWithGoogle}
        />
      </div>
      <button
        class="w-380 h-50 bg-blue-500 rounded-lg border-none text-white text-lg font-bold signIn-btn"
        onClick={handleSignIn}
      >
        Continuer
      </button>
    </div>
  );
};

export default SignIn;
