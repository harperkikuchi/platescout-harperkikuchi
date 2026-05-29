import React, { useState } from 'react';
import toast from "react-hot-toast";

function Subscription() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();

      if (!email.includes("@")) {
        toast.error("Please enter a valid email address.");
        return;
      }

      toast.success(`Thanks! We'll send updates to ${email}.`);

      setEmail("");
    };

    return (
      <div className="w-full flex justify-center">
        <div className="w-full !py-10 shadow bg-[#1e2126] flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white">
            Get the Latest Eats
          </h2>

          <p className="mt-4 !py-2 max-w-xl text-med leading-8 text-gray-300">
            Subscribe to our newsletter for fresh restaurant recommendations delivered to your inbox.
          </p>

          
          <form
            className="mt-10 !py-4 flex w-full max-w-md justify-center gap-x-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email-address" className="sr-only">
            Subscribe
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full flex-auto rounded-md bg-white text-base text-black !px-4 shadow-sm focus:outline-none"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-none rounded-md bg-[#cca353] !px-4 !py-2 text-base font-semibold text-white shadow-sm hover:bg-[#a7874b]"
            >
              Notify me
            </button>
          </form>
        </div>
      </div>
    );
}

export default Subscription;
