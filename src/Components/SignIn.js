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
    <div className="w-[522px] h-[540px] ml-[600px] mt-[150px] p-[20px] bg-pink-600 text-center rounded-[15px] signInContainer">
      <h2 className="text-white text-[40px] mb-[50px]">Connectez vous</h2>
      <p className="text-white text-[20px]  mb-[10px] font-semibold">
        Saisissez votre e-mail et mot de passe
      </p>
      <input
        className="block w-[380px] h-[45px] rounded-lg mb-5 border-white mx-auto px-3 py-2 mt-2 text-black signIn-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative">
        <input
          className="block w-96 h-12 rounded-lg mb-5 border-white mx-auto px-3 py-2 mt-2 text-black signIn-password"
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-white text-sm text-right mr-[50px] ">
          mot de passe oublié?
        </div>
      </div>
      <div className="flex items-center text-white mx-[50px] my-55 signIn-divider">
        <hr className="flex-1 border-none h-px bg-white" />
        <span className="px-5">Ou</span>
        <hr className="flex-1 border-none h-px bg-white" />
      </div>
      <div className="flex justify-center my-[18px] icons">
        <img
          className="w-[70px] h-[40px] mr-[4px]  facebook-icon"
          src={facebook}
          alt="Facebook logo"
          onClick={handleSignInWithFacebook}
        />
        <img
          className="w-[38px] h-[38px] mr-[6px] google-icon"
          src={googleI}
          alt="Google logo"
          onClick={handleSignInWithGoogle}
        />
      </div>
      <button
        className="w-[380px] h-12 bg-customBlue rounded-lg border-none text-white text-lg font-bold mt-[3px] signIn-btn"
        onClick={handleSignIn}
      >
        Continuer
      </button>
    </div>
  );
};

export default SignIn;
