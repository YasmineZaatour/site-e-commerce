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
    <div class="w-[522px] h-[640px] mt-32 ml-[600px] p-5 bg-pink-600 text-center rounded-lg signUpContainer">
      <h2 class="text-white text-[40px] mb-[50px]">Inscription</h2>
      <p class="text-white text-[20px] mb-[10px] font-semibold">
        Ajouter toutes les informations
      </p>
      <input
        class="block w-[380px] h-[45px] rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="text"
        placeholder="Nom Prenom"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        class="block w-[380px] h-[45px] rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        class="block w-[380px] h-[45px] rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="password"
        placeholder="Mot de Passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        class="block w-[380px] h-[45px] rounded-lg mb-4 border-none mx-auto px-3 text-black"
        type="tel"
        placeholder="Numero de telephone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div class="flex items-center text-white mx-[53px] my-[10px] signUp-divider">
        <hr class="flex-1 border-none h-px bg-white" />
        <span class="px-[20px]">Ou</span>
        <hr class="flex-1 border-none h-px bg-white" />
      </div>
      <div class="flex justify-center mt-[20px] mb-[40px] icons">
        <img
          class="w-[70px] h-[40px] mr-[4px] facebook-icon"
          className="facebook-icon"
          src={facebook}
          alt="Facebook logo"
          onClick={handleSignInWithFacebook}
        />
        <img
          class="w-[38px] h-[38px] mr-[6px] google-icon "
          className="google-icon"
          src={googleI}
          alt="Google logo"
          onClick={handleSignInWithGoogle}
        />
      </div>
      <button
        class="w-96 h-12 bg-customBlue rounded-lg border-none text-white text-lg font-bold signUp-btn"
        onClick={handleSignUp}
      >
        Continuer
      </button>
    </div>
  );
};

export default SignUp;
