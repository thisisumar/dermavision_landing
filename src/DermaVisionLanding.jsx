import React, { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------
   Derma Vision — Landing Page
   Design language mirrors the reference screenshots:
   pink / yellow / purple flat-illustration style, soft blobs,
   generous whitespace, rounded geometric sans.
------------------------------------------------------------------- */

const C = {
  // pulled from the DermaVision+ app itself
  pink: "#E8492F",      // primary orange-red (app accent)
  pinkDeep: "#C62B1B",  // gradient end on the app's cards
  pinkSoft: "#FBDDD3",
  yellow: "#F5A623",
  yellowSoft: "#FDEBD6",
  purple: "#8B7BD1",
  purpleSoft: "#E3DEF6",
  ink: "#2C2C33",
  grey: "#8A8A93",
  wash: "#FEF6F3",      // the app's warm cream background
  teal: "#4FD1D9",
};

/* ---------------------------- Fonts + base ---------------------------- */
function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Nunito+Sans:wght@400;600;700&display=swap');
      .dv { font-family: 'Nunito Sans', system-ui, sans-serif; }
      .dv h1, .dv h2, .dv h3, .dv h4, .dv .display { font-family: 'Poppins', system-ui, sans-serif; }
      @keyframes dv-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
      @keyframes dv-rise { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
      @keyframes dv-sweep { 0% { transform: translateY(-4%) } 100% { transform: translateY(104%) } }
      .dv-float { animation: dv-float 6s ease-in-out infinite; }
      .dv-rise { animation: dv-rise .7s cubic-bezier(.2,.7,.3,1) both; }
      .dv-sweep { animation: dv-sweep 2.4s ease-in-out infinite alternate; }
      .dv-scroll::-webkit-scrollbar { display: none; }
      .dv-scroll { scrollbar-width: none; }
      @media (prefers-reduced-motion: reduce) {
        .dv-float, .dv-rise, .dv-sweep { animation: none !important; }
        .dv * { transition: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------- Logo -------------------------------- */
function Logo({ dark = true }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-[11px]"
        style={{
          background: `linear-gradient(145deg, ${C.pink}, ${C.pinkDeep})`,
          boxShadow: "0 6px 14px rgba(232,73,47,.32)",
        }}
      >
        <span className="display text-[13px] font-extrabold leading-none text-white">
          DV<span className="align-super text-[8px]">+</span>
        </span>
      </div>
      <span className="leading-none">
        <span
          className="display block text-lg font-extrabold tracking-tight"
          style={{ color: dark ? C.ink : "#fff" }}
        >
          DermaVision<span style={{ color: C.pink }}>+</span>
        </span>
        <span className="mt-0.5 block text-[10px]" style={{ color: dark ? "#C08872" : "rgba(255,255,255,.8)" }}>
          AI Skin Care
        </span>
      </span>
    </div>
  );
}

/* -------------------------------- Nav -------------------------------- */
const NAV = [
  { label: "home", href: "#home" },
  { label: "how it works", href: "#how-it-works" },
  { label: "why derma vision", href: "#why" },
  { label: "faq", href: "#faq" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "rgba(255,255,255,.92)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        boxShadow: solid ? "0 4px 24px rgba(58,58,72,.06)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" aria-label="Derma Vision home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: C.grey }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.pink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.grey)}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: C.pink, boxShadow: "0 10px 22px rgba(232,73,47,.35)" }}
          >
            download
          </a>
        </nav>

        <button
          className="md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round">
            {open ? <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-6 py-4 md:hidden" style={{ borderColor: "#EEE" }}>
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm"
              style={{ color: C.grey }}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full py-3 text-center text-sm font-bold text-white"
            style={{ background: C.pink }}
          >
            download
          </a>
        </div>
      )}
    </header>
  );
}

/* --------------------------- Phone mockup ---------------------------- */
/* PREVIEW BUILD — screenshot inlined as a data URI so this renders standalone.
   The shippable file uses /assets/dermavision-home.jpg instead. */
const APP_HOME =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wgARCAR5AjwDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAEEAgMFBgf/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAUG/9oADAMBAAIQAxAAAAH6KJoAIAAAACgAAAAAAAAAAAAAAAAAAgAAAAAKAAAEEwiWYx5eN9aOBjw9HoXnIr0rzfT6c+kxy68JCABQAQAAFBAUEABQAAAAAiJAAAAAAIJFAAIJYxnXLwuXq6vxfuV9HtuF7PH5nH13jvJ9SY71Tpe/1fFey+h8XZNXxHfw/QXkuodlxdJ6BwNB6Z5jvlh5e0d55nQesny+R6WfN3zqvMdQ6by3pTY4PdJCgAABEGK5Y8rhcPX7J4aOfo908JFe8eChffPARX0B8+ivoT54r6G+d77PfzxOx1+dmidYARMS46N2jO/E9nh9n4/3/Ved7Ff63wqnD6e3z/Q87csU8ep7bw/t+3l1cP0PlfV8nXy/Y19Z87d62+XhX7280eH+kctLPmbfQOTu6fQl8vU9Ny65uHo95PiPQdM3cT1NKPEe16OyglAAAERHPv8AneXp48Hy/wBBEdmn281GLllvkx2q+88yOiuubHVW8mOjnXKjrcl1e58L6Lp5fU5YZ+n4IWImJca+/Rnfg+3wbvyP0nZ5tPd6fL36nmM7r2XhuhzXo63uPCe77/O2ZYcvv8rsKepOg5O6XoqFmzc5uwvOfidJy+oBZMAAAFAAAABGHA79Tl6PIRs1fM/QdXDmR28+y5zonXp6+fG89XXzY1Orjy4t6+HKjU7XERO0em4PuOnjtbMM/R8QLETEuOndrzrx+XV8j4vs9LZxseXt7mvi4dJ3K/Jubvb9ZTven4MV7mW/LpwsrKa4XTO0lSbRaeywKtoAsAAAAAAAACMde2JaHI9Fjy9PmHpmO/mHp1eXj1KvLR6ovlY9WPJvWK8lv9NNzVuTn08cya5gBEYZwumtdwz05OPWjHbkutJy+htnWGbLXGRYAAAAAAAAAAAAAAAABCREZDFkMWQxZCEjFkISExKBQACCWIygwauNjt3Z8tjz7+rnyY9bPkSeunyCz17yEHsHjx7B48ewePHsHjx7B4+D2LxyvYvHD2Lxo9k8aPZPGj2Txo9k8aPZPGD2bxg9m8ZB7R4se0eLHtHix7R4se0eLHtHih7V4oe1eJ3V7Bx+vvyyLEwJFiJiUEcWz4jz/Qy1ni+0IUAQABQEAEAUiYAETAAFIAAQAQAKQAUAgAEAIAp1+QuPqO7wPvfX+fkb4JiSAInFPF8vPD5n6cM9ESIZya42LNbYXW2LNTYNbZBhGwa2yDW2YmIagIAFQBEiAImAKRMAAUIBJAIAiYoAQPofzz1vXwerRPq+IAA17NcfOUT8v9UIMrevfvkL2+FBcqLC/XudDZvKa9glNcqNwv6LiuuYLWWq01XqdGljvrGegCJigETAAgAqABQA2pEzFzqxyxmwIFAIB6jy/qOnl9fMT6/z4AEYZ4R85Hy/1SBbW6ld3w29ngx181ivt1Z6dnDkt8NvR5MTfdrctrHU52DPTpRzVz2K1BZ3eVXiVTtUOXsDPURYAAgBAFImAAKGaTkXMTBMNe/FrVlsk0Rt1KIUB6jy/qOnk9fMT6/gAAkYZ4TXzlD5f6kFZYrLCsubKsLCvBZVhZivBZVlWYrwWVYWcdEEwTQCChBMTAIAApABQDdr2XIhkRbLHIEDVtg0CbAeo8v6fp5fYTE+v8+ACRhnhNfOB8v9SAgAoCAAIFRMWAAQAALYCCABEwAImLQQKEG3LHK4QgahqNmOJvjHK4A0RMToBHqPL+o6eX2ExPr/AD4AJGGeE184Hy/1IgdLfo7eTXR7VJaT0WhOG69pfPL3VmuRW9d5XXOtO7u56+bdubnhx1c5rjx6Ojc8t6vTrnx9F7avFenptcR2955x2+JjtDP0lx5jo7+/04eHeo4mO1J6bfrl5J3M5vz7oXmuLn6GzvhyOL6GjNczb6vys6Ojz/TfPnM0egr+bh5zC1T+p7dI10RMD1Hl/UdPJ7CYn1/AABIwzwmvm8xPy/1KA7/Mq9zv4rWzm8ffCx2tNKb6fnLnSmr/ACeX17jZxu1wZ16l/wAz3ri5W59S59BHNoS9nbhyNY7VTToz06znNY19bhXMdup5vtbOnDPzPrObN8j0nmPQZ66rfKz1yz6vnomtfpquOuTdwLM6ep5Ffi652PS04N/G35zW3i9zh565+g87n5d+s10Lnw/PzeD0Ob9r2iPR1Aeo8v6jp5PYTE+r4AUCRhnhNfN5h8z9SEBQhQBCBSABUAAFIABBXQ6XnY35rNdGO4LAAApAAQCYBnrWbcMRGeCAtQAU9R5f1G/J7CYn1fACgSMM8Jr5uPmfqQErNzoWFzXWBWWVVlgV4swV1gVlkVllVZYFZZFZYVWWRWi0K0WSVlkVotQVlkVlmLayyKyyKyyKqySqtQVlkVVkVsba2isV5sFeo8v6jfk9hMT6/gAAkYZ4TXzcfM/Ugb9mvZvkFgCJs3NVdw1zqxbiWsyty0WzfVSOlquKS3LVNdwKi/sueYspqtHS0WVFrZFKLs2UJsTNVVzZZz4vYrTbtq1HQxuaMdWiaJtbFoRdJSbLbXPbNc2EqldptYidI9T5b1O/J7CYn1/AABIwzwmvm4+Z+pBd+zXs3xWqvR3wUN8XNfPWx2vb+VG+HSnmS1stUE1u3U4t6ezkLytxVTpa2UYOg58XN1TS9LXQWX9tXDXOwoJ0sZ001f11IOtTrQXd/LXPS00xd283ak7qRu/qqE32udC7tJNg0p3Kc1jExOj1PlvU78nsJifX8AAEjDPCa+bTE/M/UomCxs17N8m7SuOzxZjXNZrXJrRrtZa55c/scezbley1zoYWsc9KcXIbrWtNq45+fVrM08t+63m4XKeOwTYgBQEAAFIAQkwALAAoBTuU5rATo9T5X1W/J7CYn1/AAAjDPCX5tMPmfqQN+2tZ1yDUgDLEmWelZt1C79WJNmOAyYrdmOBNmWkbsMITbrgoKgAVEwABQgBETAAgAUKBFKzUnQJuPVeV9TvyexmJ9XwAoCMNmJ81i5T+Z+oCaZYK3tCzerje0DerksK4sRoVvVxYVxvVxYjQN7RFWFeCzFcWFcWFdW9XLYjRBYVyWI0QWFdVhXgsqwsK4sKwsK4sY6QgaRMD1flPddfF6CYn0fCCgGOUJ57yn0rxnl+tyB5fqwKRMACJgACkTAAIAEAFIAKARMACJgAgUAgABAAFImAQDam36Xzur6vgzMT08gBMAJGOcL5/g+9cfZ82x+ksej5s+kj5q+lSfNH0sfM30sfNH0sfNH0sfNI+mTXzJ9NHzF9Og+ZR9PHzB9Pg+Yvpw+Yvpw+YPp4+YPp6vl76gPl76gPl76gj5dH1MfLX1KD5a+pD5bH1NXyx9THyx9THyt9UHyt9UHyvd9PJ4f1d2enkZRO/OAJAshMSomBEwAAoAAAAQSqEiARIAAAQkQkIkRIAEiEwQkQkRIAARIAiYkkAkCwIgLBAjZKam0am0am0am0am0am0ap2YmM4ysoEwgmM5TXG4aW0am0am1WptGqdiNc54hjKygTCCYzlNTaNTaNTaNTaNTaNU7Fa5zxE4ZRMwWRYiYlROI3YZ3IWAACCQAAAY6t+iWUJW/XsuQoAAQSAAADDXvrzWSErfr2XIWAACCUSAAAYa9+iXNEypibUTERE4ptywzuQoAQTy9tXl26Njg925kdOYADRv0SwRNb8sM7gKAEJhyqfc5ejC5xb+sWxvmAA0b9EsETW7PDO4CgBgczyvI0eX7vrvV/OvS9PF6VE9vnAoDRvry5zjlKmJtCMccsU25Y5XIUAiRy9V7ieX19Lp8bsdeGQ68wAGjfolxImt+eGdwFANW3GONpyz4+u3Sm7c9AdvMAAr2NEuMTE1vzwzuAoBo3o+XeiseT8/wBrR67j+5vO2PR8kABXsV5csscpZFoRjjlim3LHK5CgAAIkAAAGjfolxiYmt+eGdwFAAAAAAAK9ivLETE1vzwzuAoACIyEFQuAAAV7FeXLLHKWRaEY45YptyxyuQoBjljJyt+dDh6c7uFauwO/nAAaN+iXGJia354Z3AUAIhydvB5er0NvidrfHaN8wAFexXliJia354Z3AUBw4v8PHp9Nx6uuO1yp71z57r8vvm0b4AK9ivLlljlLItCMccsU25Y5XIUAiR5fp9Rx7+W7d4kjtxAAaN+iXGJia354Z3AUAiR5/X6Ny7+W9Nm1iRvmAAr2K8sRMTW/PDO4CgPJbPUTjv5vne0g816Wh0Ljzno03IXICvYry5ZY5SyLQjHHLFNuWOVyFNG+gW9nE3J1XGg7Tl6zsOJsOur2FAaN+iXETW7PHK4CmndzDo5cfYnUcSV7Tkazt4cyundnDNQFexXliJia354Z3AUwz86eiUKqdnRS0nZw5ug7blaztqV1QFexXlyyxylkWomIjHKE2Za9lyFK1kacbA0TuJWWS1st4xyABo3aJUSmtuevZcBTDMYa94r5bhXz2jRrtiJABXsVpZiU1tz1bdYAa9gr7NgrzvFZZFed417AAV7FeXLKJllE2omJGOUGO7TBYalm1qG1qJtahtahtahtai7WqDLWylhJcd+mEsNM2bWobWom1qG1qG1qG1qG1qxXLBMpIwsacastEpuaSbmkbmkbmkbmkbmkbmnFcojKWZFSWAQJYxzgxjImDIYshiyGLIYshjMiJkJSqJgRlCYxlBiyGLIYshiyGLIYzIiZCQmJLikYMoSIyGLIYshiyGLIYzIiZkjIUSBYAiYlARIhIhIhIhIhIhIiQAAAhIhIhIhIhIhIhIhIAAAhIhIhIhIhIhIhIAAkUCCJQEPK469/m+Ujy/U9S8sz09S8tFepeWg9U8qX1TysHq3lB6qfKQeseTWereTHrHk4PWPJj1jyY9Y8kPWvJRXrXkh615EeueRHrnkFeveQHr3kIPYPHj17x49g8ePXvHq9g8fB7F44exeOHsZ8YT33Y+U298Ppzm9Lt8sLJFQIEJ5/y9it839GGPSiYQBBQCJgARMCJigETAAFqBBAAgBFBQCJgARMAVAETAAiYAAqx9L+V+37fL9GPR8gFAYZ64+cj5f6oCJ22NZpR0Fzz18UI6EHPW6s3Alhs7u+Pno69rXPzzo1M99Mehp648p09jXIWZm6huzvTHf1dPPxWe7Haq37KqRNtabt478/Gd+q1yo3s9dCxklRnvWrExNhSJgAQAUIHqvK+p35PYTE+v4AAEYZ4R85Hy/1TLHdZZHTzomAyxQFV9+LVEc+6/V9L28fJ1ZdnfHjUbGnl6uxXtVu3j73GsVtcrNLLlZ72r1Gtjvpy7etN+Giz081rl58nPX0nM27dc92vDRc3dOVVq60wzY11NDV63y7tx5lMef64CAZb7N50cehFnNXKc6IFep8t6nfk9hMT6/gAAkYZ4TXzkfL/AFLfo33NgdOCJ62udilutd/D50ef6UY5Yy0JRz9AipgBCggVAAqBBBQsgACJihBJAIAtEI36L1xthO+MR0MNcaVazjnvzhj0PU+V9VvyewmJ9XwAoEjDPCa+cj5f6lu07rmyOnCO/wAC/wBPNrn0/J6+bhRnh5/oscsZqgOfoy6HNt74xnlY3xq0ujTnS1qy2a50s8rOd1W/PWNWzPK557cnTCc7bHEt1b07bdFyjvhX6VK5ndPZjd1jnxcma06rCqudnYzz9F6rOteJjHpXqNm4s2azfn7OPM1b4InRj1UyMeh6ryvqd+T2MxPq+AFAkYZ4TXzkfL/Uxv0bEuDr54tVVzbVFznrJ0Y5aZagx6EZDHbrysjBmYLGq5wi3oNZm1sr26lwiYnQBEwoWAQAQAIKAgAF3bzNuuV2amNzZoxE6hNR6ny3qd+T2MxPq+AFARhnhL84Hy/1ILY38/LXO8qLm2pqtqkFmnETYia39Ljbt8L+3k7dcq3R5tjPfrV+flvzbrPOyb6PP07Jrfz9+jPSExnqFQAKAgCAEAUIAAIAFQBEwPU+W9Vvy+wmJ9X58KAYZwfO9Pe4Xzf0kDHeABYiYAEFohAEAChZAVEwgEACoAFImABEwCAKRMACJgCgIBAHsvIfTO3zrcxPf4wUAiRp8V7rDl6PnD1vN8v1+G7MZ3x3YHHjsjjOwOM7KuNHaHFdkcV2hxXaVxXag4rtDix24OK7Q4jtq4jtwcR2xxHbHEjuDhu2rhu4OHHdHCdxXDjujhO7BwndHCd0cKO9BwndHBy9R6DfDnehjL0fHC4EkJJAVEjFIxSWEoxZKxZDGZEJGLIQkQkQkRGQxZDFkMZlEJEJGLIYshiyViyRikQkQkQkQkAQkEiJTYmJAJFgEJiUSkBQAAQAFAAABAUAEJgBQAAAIicYRz+Px9XqI8lGO3rnkC+weOg9i8dGnsnjYPZvFl9o8VB7Z4mK9xPhrOs+xy593p4cxcyLAAjDT4+/Z6lxeSewef5lvs54vHk9Nh5LfXr63jurHqnkekdx4frnoXkOwvR2+bqJ6uPJY17aPH9iOpVo889ZPjdx6vTwPN19KjzlePVvO1z0m/537osiaEJjzuh5nj6+djOz5n3tMdqr283OXd03y3Rnblruc1zoubreZHR1aUlzfXLidrtoixXrb7r5/wCl6+D0+WvPv8ORqABHh+51OfZwO52eTXj/AGV7OPn3e7lWvM2fS5HmqPq7B5zR6G8eXx9NB4nv375HzP6lRPDd3uXT5r2e50zja+zyo4nD+oUbPI2fWVV8Vj7/AFnmOv1tJ5319XdG8Kxyxl1+Y9PyfP7PPZYPnfc7enlx6PHuuctnt09/Db59m35qN47uHDlruZefizuWvMNI26Y5+63TmKj0XnvbdPJ0tmvZ6fgSLAAgAKACAoIAAATAAAAABAUAAKRMRhpsYTfA5PsMPN7/ABr2Ln38bHs1eLj2qvEx7ceHe4V4aPdK8JHvC+Dx98rwNj22VzyuzG3r86c4b4yLAADlSnUVaR12qkdJz8y6oC+5G46OFTIuY0qx2HJzOnFCudPPgdMvKsFty7hYjm7S7HO0nZc2xFqebNdBzq52XPwOm524t41dctjLm2l3TSFvPnZF9s5kt9Viy25+Zbjl3jfPJtlxV0nQnn2C1kCRAoAI5ud9ZzNPZDmdMcyzaHNnojj27opTcHP19QcG70RT19AcW10K5jhdHK6kjj7ukOXHVHGvWxSxvjmbL45GHT0lS5cFHHoCllbHHz6o49q8I5fVHPjoinT7A5Fu4ORs6Y5224OXPTAShQAAQAAFAAABAAUAAEABQAAACYSBaAAAAAAAAAAAAAAAENOOnHTODOwoITAlE0ACCSNuuEtq1jpzlGgyra852ISygszBJQJQJAmIMkCUCUElEgBIiYEgjKJstTz795yGYxr7sa3DpkAARFHLDLj6RzM76OHmnn9np3mps9PPF7PfyyNcwEwJAmJswuVLGuefO6HN1dkIz1Y87zmfX7GfGZTt7LPxt28/TMMt+OUSJgSgSgkgAlAkIAmBKBM4yZsTF3RursNurZjW4deQUAiYihnrz4+qPK+p8p5fdlY1+ix042HXodONTtcXsTd0q+v59p4ztax2XEoS+rjkVj0MxMuO/RvuM+Z0+ZvWZGenj6+zDh9/Lf0e508PkJ26senvdPkdft8ow8VeHuHK0128fJZM+tjzm9e84HQW+8ztZ9C8/kveng1bPUPG9iO04WJ3cvLXq7ihfzqQlyvYrzlG3VtzrcOvIKARMRQyxy4+rHynrPKeX377FC7y7areNXfOexx+zc3PMenj2/N8Rd9U1ngPQJr51s+grmZicbx36N9xnzOnzNaziTp4rHZp8/3+73vEbunz9ukx6+11+V1e3yuDxfbzvz+V6HZHluZ7yE4Vf0w8l3ejMeUtegV87s+8JwOf7DGXx1j1SzyWj2g8TZ9aOP2onOpBcr2K85Rt1bc63DryCgESjnZ4Z8fS4vajHTys+hw83u4k9ubnl91l38gdOQkACxMSY2K1vWHM6fO1ZTGevF4HuK+PZ5HP0qejzm/vWryx3RPTwAAgCQAATEgAIASIkJSZt17Gic8durbnW4deQUAEU8blbn1wRGembAZsBmwkynAZsCZsJMpwg2RGVkWk75RUuRpzp26M95nWa2NY2NcmbAmbAZsJMpwg2MBnOsbGAzYQbGAzYEznWNjWNk6ski7jtvNGS4p78see9w6cwoABMIEpAAACYoIAAABQqYJAoAAAIACgAgKAAAmAAACAqYIC0AAiYVojHREzNYzIhIhMmLIYspMYzJhOQWK+NzaQ3jGtqznWGSaxZDGZmsWQxZTGEzKYshizVlYqZ3nYRgy1RPPoJliMlQkQyEJEAMiYshnnW3bxmRZIqBKISnnrz5eiQiUEomkwJQJCASgThnib9OzVvnqmE75IJKJAEwSQASgSCcMsLLujdonMMdAJQJAAmFTASgmSADO4dMgCBCIqZ68+folBJmBKFSjn510VHMuIaxKBMwJxmDdp26dc9cwnaUDJjJKFksK63GJMhCYVKBOGetLujdomJQxuRQEoEoispwlMoACUCUGd6J3mUTZEMzHLNc6p2DW2E1s5NbYXRXvpacXUa2xrOtsGtsGtsGOOwamwa20a2wam0VN+wuhvGtsJrbC62wa2wmOOwa2wa2wYMxrbBhqsIrbsy4M1mDMYMxhGwa8d0LqmE1O3HK4CgCOLne/d4LPyfV+kOV1fX8kNZAAAAAw4HU0Jz4Wq2djz/oIBQAAAAMPO93hpnOu3W7p+e9DAKAAAAAiaRQ7PnOgnWCgAY692qXaLAAI8t6nicvR5zX6LR5fp7/Q8vqev5QdOIAAAAFGn0uAmTDbWfoPO+igFAAAAAr+f9F5Oye1xrpl6Hgd+AUAAAABxev5hM7UV69LNazKAAiQAAxypS3Io5S3JpajpTS1nRYZ3IUAAAa9BbVMiyo7iwp5llz+gAAAAFMXFPMstGstquovqtoAAAAHOOio7C0q0zrKeRaAAAAA5fUjOvN7+6z08tf7UHJ4vsJWpcN8QsAAAw4/bHG227KcKx1RxtfdHI64AoAAHOr9knnbfWrnNy7I5+PSHC7ooAAADk9YcvLpE5WrtDiYd4AoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//EADgQAAEEAAQGAQMDAwMEAgMAAAIAAQMEBRESExAUFSAwMjEhIkAzNFAGIzUkQXAWJUJgNoBERUb/2gAIAQEAAQUC/wCXM1JejB+orqTrqTrqbpsUUFuOf/0G7YfVHCcz8jYR1Zw7GdxenZ5iLz58M8vxc1ms+OazWazWazWaz4Z+J3RPqLDP3D/VFbOrZtVAnjf5oVdRXquyWGFlbU75VsOqWbtKras1cQuYpXplUxWtcOfGa1axLjFeGIMepnJJj1MJAnjkgf8AqCnrjvRYk2CWTmqWZZLGPUWh6xJj1MJMRlr2cGjnhrYcGP0yO3ejp13/AKgp6gMZAsXJIcV8jqxcaNHYlNaiWolqJaiWolqJaiWslrJaiWslrJayUduaN6t8Z/CXwsL/AHGeaxGCWQMKlcob0e3brylDYtVdoMO/esrH7X+n/wDEYgTTY9Xe4+LyR3SxaGMZP6qxoBPEMejF8IpwR9JAj/6XpRxNQwNgHEiJsO/qHAweV6OXW4AtU4Jirn/TF3IliARFhs7kf9KzQh0vC4eb/p6zhgRYtSoDSbx2ptqH8BncXqT78Dd5fCwv9cXdXy00sJZW4d+PC4NcuIz79vDv3zKQNyKLBJ4o6eGw0lbwoZ7FTCgrzx0dvE7dDmrV6rztOKLar1MMCvTbA3BYfhY4fNiWGjiMVaAa1avQaG8+B6XPCo+ly4fFYo9Dc1dw4bdM49UFCpyNRwBz8brEH+7hHLvFHNpjtsLWSPaqgAlK0Akw1mOaSs23y8QycoO9yzSTnVHaerGI8MJdN3l6rCf3F28UEvMWrrGceHVMKsalO4UKKw7983bms/zXWIDxI67xQHBHHJp1a4TgayDTRyxs/Ns1iSw228tc5nniey9xmsnZHaiswxjwwoMgbvP4zVa3yqOwMk3UJBAicyjleGa5dK46w3983CIn3Y/3Ewu8pmIg7np1SkUZ7kUYNMLuUIapRmGaTZGw+r8V1LG0gGBRl54oSmkijaOPvdNGUb7MJLbhZ+WicyCIE8AmEleNSQwM+HwDzrIx1hysekQ0mUeZcuOnY+0Q0vGG3Hs/XYHa2f7gxM0QxZP+M7KSIZGOi65GVcjKuQlXISrkJVyEq5CVdPlXT5l06ZdOmXTpl06ZBhj5xQhELeB1dqb7ELg/bBVksnXgGvG38Lkslkslkslkslkslkslkslksll4ziCRcjXXI11yFdchWQ0a4oRZm/iMlkslkslkslksuGSyWXlyWSyWSyWX/Bkk0cTSYqDLqsq6rMuqzLqsy6rMuqzLq0y6tMurTLq0y6tMurTLq0y6tMurTLq0y6tMurTLq0y6tOurTrq866vOurzrq866vOurzrq866vOurzrq866vOurzrq866xOusTrrE66xOusTrrE66xOusTrrE66xOusTrrE66xOusTrrM66zOuszrrM66zOuszrrM6HGjUGJQTPn5Ll5oUZkZfzVTEJKzxSDKHhuWOXhd3d/wCcw629ebw4hLuWv57D5t+n3v8ABPmXboJaCWgloJaCWgloJaCWgloJaCWgloJaCWgloJaCWl2/iMFL7e8vXsZs3YWH8Mwz/KZuD/PiwX9TvL17I2+nCSsQQtKHLKGvuRRx6xjDckKOLSUGbvF/aerKPB4Yo0cTtJysqaCR4xrymLtk6Nsj/HZsuL/PiwT37y9eyP1UchRHLd/sbUjxpzjhWlgOP9Q2faJ9ddvpAL/9zzykkieaSLRFYrxFG8r/AOjd2kewWudSe/4zN2E3HT4ME9+8vXsEsn47hbfnItLfjN3ZcXbvwT37y9e1icVurdW6t1bq3VurdW6t1bq3VurdW6t1bq3U75/wL92Ce/eXr/HD3Z9r/Hbgnv3l6/xzfHHPLiz+LBPfvL1/jm+OD/Ti7cBfPs/37ME9+8vXtjoWJGmpzwt31q72ZTHRJ4qsHMzTR7M3hnpvBB4G+FWp8xE/zxGmJxTVWZgFrJm2k+7BPfvL17MNhaSaxblnlrW5Yltb9soqNdWKcexUptKAjh0hWKpQWHq1KoUoq+7Y/cxRFNKcNCs9ipHsT1onoUK7WLEdUbN12w0CuVOXRU6gVxq07Y0YWkuxV4yxSWHD68lumAQ1KYHC0eHzliVaOuSFtRSV6NRXagQhNHCVAK1G2MVU5bRx4dA/IVuU5eOTCsMphYZ63/cLFUCxAosPrONGs9ejAEtesVRo+Xp8mm+Q+rMmhELFkNEz/Hbgnv3l69mFyM0n30rNO3YsTxyieMWmcLVL+3hzNrwMWcitkI28VEmt4QJb1j9zhZM12zZrx2N//t+GE0kQC9HDcIdtD26rPfkd6WJfssK/fVP81X/zl798H+BlZ5MEiEjlxn3QM7nJbZXa0YQYh/jcK/yFR2bF7AkFikBDhOFFrGR3oYdsM9/DpWkxO0JR2sPEmw3DP2lGrzU+I2WkkQ55xSbnD/e632P3YJ795evYz5OOJZjLiJEAk4E2Js7Wbh2GrWjrF1MGUkpyyR4l/bDFdJyFrlZ3F2xNiGzdOw0EzwT3bvNKGY4JOpxurFk7J2bbWIalhq08Vto70dtgvTybs422HD6Z2IK/UdR4gO7dxSbXZZ8nHE2Ibd0rSs3GnrVJ+WsHO/N9VEm6q5Q15uXsXbfNyNiLtQAyjPqokLYs7x1rbV4KV8asL3apCmdxfcfOC00jO6tT7hd2Ce/eXr+dWuSVX6oIorEhzO+b/g6lqTvnw1Pl34J795ev8/gnv3l692h1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWh1odaHWl27sE9+8vXsZs1ll/KmPbgnv3l69gfH8Y7O3if544J795evYHr3V9LyykenbAG2H3dsCERci2Y3Mx0SNGLRyR/2tqNzCJniGINp4QYSh+9oY3OIAZhjF2KNtEwblvbAh2xEHhYH2s5AAGsT6d4I2eMoRaAoIo3GvnPtAQGGkNh3IIYpJW+lM42kmCPMKzC9kx3rG0BC8IDAIuZtBEUhtpk7C9uOCe/eXr2B68IYmNMNaVyFwJRsLm7sFd5nkTT/AOoKQmjjPblYY2mlfOZ9MsbyBGt3ItTcrqblCJuWaVgYRjGcSHcHS8ROMcJSBzA6YWfTNGekWYm3zMGlnZt0HE4H0DUskxSbg81CTM32ywvKASwjHHY1Ny8smUtrSDQOw2AMWkHRA0pM8MJ7U0YRhPL9Zuwvbjgnv3l69gfHCFt2tDE8ktg2ksfjDKO3JJrfyN8yybsnjL244J795evYHrwiN45ZXMIuEEW7KQvqydxaEd9bZ6dH+nYHZ2iMk7OLszk5AQKWuQyszu5RmCGMzaIGJaX0/nF7ccE9+8vXsD17q368X1gD9k37z/bNzlgy5eLPM3flJ/rFH+3+/YsmXOZC1jMOWsamOL9xY1bv5xe3HBPfvL17A+O4ScXEnF3lMm3D1Lek06n07hu7k7i5O7CTg5yHIiJyLWWs5TkQzSAzETLcJmd83/Nf544J795evYL5P/KkWTdmCe/e/wAfHaxZLcW4y1sta1stbLcZbjLWta1stbLWtbLWta1sta1rWtxluMtxluMtxluMtxluMtxluLcZbjLcZbjLcZbjLcZbi3GW4y3GW4y3GW4y3GW4y3FuLcZbjLcZPJ3YI318FqPatfz2ERaKfgxOvqD+drwFYnAWAPA7ZtcpFCX83HGUp0abVI/E7ZtYwwTUlOeNaCZZOsnWTrJ1k6ydZOsnWTrJ1k6ydZOsnWTrJ1k6ydZOsnWTrJ1k6ydZOsnWTrJ1k6ydZOsnWTrJ1k6ydaXWTrJ1k6ydZOsnWTrJ1k6ydZOsnWTrJ1pdaXWl0MExqHCJjVepFWH/AOiOfjzWfmyzWllkyyZZMsmWTLJlkyyZZMsmWTLJlkyyZae5md1pZaWWllpZaWWllpZaWWllpZaWWllpZaWWllp7mZyWhlpZaRWkVpFaRWkVpFaRWkVpFaRWkVpFaBWhZ+LLN/wXbPsZs3/BJs03Fm1P+CTZsz5t4B+Pwv8Ay4D6/hfBcA9fwv8Ay8A+vgt2CgaGXei8D+3AfXvImBixOuzwWorHhf34B699m/DAEeM2AahiuZgYyD3/APn4B+O+zO8IHHK5Ya5aPAXtwH17nTM+IWGCOMQnCSxHOEr95e6f4H17jJhGwQnZEXMrVLlYMGkB6ne/v4B+O+5GRM2IR5R3IzPwF7cB9e6TPRhn7PEY55Hq12rw1P3/AHl78A9e6aIZoWyqXnmpVmllOaTBq47fe/v4B9e+Z5WGWG1LIJW2dvjvL24D69zrkpQk5a4uWuKrX5cO8vbgPr32sJA0FSxI1DDnsnXrhWi739/APr+EXtwH1/CL3T/A+vgy8T+/gH1/CL24D6/hF7p/gfXwv8QWI7A97+/gH17ztluwWN1ubMignaYO8vbgPr4K90Z5rVjlom+rd5e6f4H17bV54Zq94pJ3fS1XERtWLkm1Tq7tXCiv2wGpM9mv2v7+AfXvYI641G3JP7dWCgL6O8vbgPr33ZdqrtcosUf/AEoeneXun+B9e3l4xsAXN4zdkK1PUjGLGMXLOAB0hihPI4AwB2v7+AfXvmklmkhnzRHJLLBNueAvbgPr33QOxZlw1tqbclwwPTvL3T/A+vbiViwUlSy0SfB43OLD36lN/fxtUwOa/wBz+/gH1/CL24D6/hF7p/gfXwx1Rjt+B/fwD69hTxgTyCweQvbgPr2HNHG7ExN3ETALPm3YXuv9h9exzFi4tMD8HMWMiYRYmdu1/fwD8dg/vTfQM2vcKQjl3Jdl2KKyzmMmuQyd5TGAtUPYXtwH17JdTXNJxM7EM28ZOUkm2JSMeqQKQFIMxsRYeHp2F7cA9OyaUHlM9E2o3iyeO5G7kwapI2zNFmD6jzrOb9r+/gH47CrxmezHtnBHI5Qxm2zHttXjEuXiYyrxGRwRmhFgHsf24D69mgdZAJiEIRrYj0vEDxjBGC2w2whjjd6sLr47X9+AevYMYgDwRlEUYkIwRiTQgyevERPXicRgjEShjIQjGNux/fwD+H/vwD4/C+X4B8fhfL+D4f8ABJ+z4fP8En7Ph/wSLyalrWta1rWta1rWta1rWta1rWtZu/d8LWta1rWta1rWta1rWta1rWta1rU793wta1rcW4txbi3FuLcW4txbi3FrWtZu6y/+lktqGFPisS6sC6sC6sC6sC6sC6uC6uC6uC6uC6uC6uC6uC6uC6uC6uC6uC6wC6wC6wC6wC6wC6wC6wC6wC6wC6wC6wC6wC6xGusRrrMa6zGusxrrMa6zGusxrrMa6zGusxrrMa61GusxrrMa6zGusxrrMa61GutRrrUa61GutRrrUa61GutRrrUa61Go8WrG4kxt4nfJreIOT/zcFmWsVO4FuPw4lYcW/nYJyrzRSNLF4Jz3J/57BpNVbvL1/n8Ef7+8vXsEM0zM3eUfYAPJJI1Ksdmnt2pGpVpLtZq00UbyylDRikOs0N65CzXq0Oiy0RSHys+lRRFNKUFGu81MHgACkeSvNEMcMkq5WfSmqzuM8IBhlmNiG3h7xsbB0yOGSVSQyRIYJTjOtNGIgRlJXmibz4J795evEWzLwyN9ODO7PWrlalvWN2zVrlalvztPYikeGUjp3DesVa/a01Hw0nkv4a+mSvene3fBo7uE5b5Z6hI2YC5XCqNuWSxQFobUF6d7bVw63NfsPPiEm9hmIu4w4nLIKk/wVuUqdenKVuGpKUOD4dZlms0ZI4LR83DB35O62yTi7d2Ce/eXrxj+exhd27C9eETA8pzVCgKKq0sktQoLAQAoZNqY+QmOa2M10sQHm6xwVr1SeONQkwz3pRmtwTFBMb0LLyWoYoK1mLlwlp1FSsiBQvpmnuMOJn0+Y71mGanfnjmhllq24TmjfCRsV7Vd7FerBHPG2E0JQhuQzwNYCapUDuCPsKPPtwT37y9eMXz2UjGMb0eifiXr/Dxjm/bK3Zgnv3l68YvnjtBFS5reWI6Xh4l6/wAPH6LLNV5NCsV3hdF9R44J795evGP54uPN0uVnXLT9j+vAS0lNJlC0LMBVtJcuOt2cSlCNq2wzNJG8ZhFmDxMzlA4CVcQaCJ47oRahOHS0sG0fLjqf6PsMwxw7N3/8KMHkOtCHNZFyr1mZwiZ4ygdiasLyNB9xQPr5cScIReMw2z4x+iisSQtDPanO5b3WT/HHBPfvL14x/PGGGwo9zl3552IXEuD+vGV2eEm3gfTrKEXsSnuTH99WQWsFYNjOKTOvK7mpzGWKePWgMGtDlLWPTHDMbDf1vuE+opG31qBrmbcnXNo5a0TRWc25L6Eo5NVZ59EwRCNln/1GuOGxrIHhctufRvcYn4tIQhwkf7eOCe/eXrxj+eLWZhbmp1zU6IyMuBevbGWiUn1H3zG0j/kiersImFO+b8cD9+8vXiD5F4ZH+3gzO75O7ZPloLJMJO00e2TgQs8BtAwEXBwIUUBjD+U0hMt1PK/dgfv3l69gH4HJhRPm/CI9uYR2kDNuCY8y/wA2TKOd/rfAwdjIuRkcAj+j2hklIZTflP4LA/fvL17dTstwluEtZLWS1ktZdxymZGZSHzMrsmnkYSlMjKeQhaUhjCeQB3C3DnkMd09v+CwT38Eo6Jf57BY8ovBicGmT+dAHM68LQQeAwaQLVQ65fzbC5Fh+H8v43ZnabDIzcsLmXTJ10uddLsLpdhdLsLpdhdLsLpdhdLsLpdhdLsLpdhdLsLpdhdLsLpdhdKsLpVhdKsLpVhdKsLpVhdKsLpVhdKsLpVhdKsLpNhdJsrpNldJsrpNldJsrpNldJsLpNldJsrpNldJsrpNldJsrpFldIsrpFldIsrpFldIsrpFldIsrpFldHsro9ldHsro9ldIsro9lR4K6r04a3/JGazWfHNZrNZrNZrNZrNZrP+WmtDEiuykuamXNTLmplzU65qdc1OubnXNzrm51zc65ywucnXOWFzlhc5YXOWFzthR4lKKgtBO3hImFgsQyP3DahKzBcgtKOUJRgtw2S7pJo4kTsIxyBKIzRlJwMxjFrtZ34jLGZdjyxtL3WptqN/q/4cchRHBK00Xg23xjFbWBVyi5g6GGc9irxvibSYRFiGJ2K9TEY7NEMRxG02GTPZ/qClNKdTAXuNFhU4lI2JXrb4fiPNvXxTELaw/EZLE3U7tmTDb3P18eh3cMxK3uYBgRvAGDOzQhiGJWhw6+16PGv8PUwijPh+HkdHFSxK1Znq4jNLPRLEGxK3iMo2o8SswWruJHFZDE7MFm2V3/AKirvK9fsdXizmUencEgsIZgihtgwTR6ApkMc0EkUkkklZwjaoWQVpCl5J9AVHIBrGUktZwDkT4R6NUsRRFwwovtbwQSDhWMW8VrVoMVea1gg4pT5StGTf07hf8Ai6kRS4ZheIVum4ZMFj+osE/S/p6aMaOHgUkWDXa44dSLm/6g/p79u3/yxhqzz4Nclt15o2lhw/XZt4uRUcROoQ/03ShhlqYEEevGv8PSuV48NpO+IY3QrDroxRPjWHyhDjdiFmx+atBzm4NP+prGJ12sXCGP+phITHsdXWynQA8hSQSRQ1qz6Z2k3Y4ykw/Ty1Us+YmBmryZynubxwQnFBCJHDFoYpneOq0bm/8AvFHuHPNrbhhTJvBNBFYCLCqUJ5M7dJo7kkEcsEcYxRQVYaykwulLJHTrwzwVYaybDag2YakNcpsNp2JI4Y4Y69WGqPKw81NhtOwccQQgo6UEM9inBadSYXSmkCMYxmhCeIcGw8XABjGxQrWnhrQ1gnw2pZknqwWQr0a1VT1obIV6Faq9inXttDCEEXY6uRaw4anWbr5Wb92br44fKz7WZ3epDswN/Iuynp6kUZh+FHXlkVWk0Kb+TdlktK0rStK0rStK0rStK0rStK0rStK0rJM345EIMtTauOa3AcGJiHtd2ZmdiZyZn8moXLJPkzfKZxJZLJZLJZLJZJ8hbMdT5MLfVslksll4wBrRsPLWq8jyx8zJycevTb/uqublUqfs3lkOXfIIJZrMMMksu/FKe9ZLTEcsjzxEXPtYmKM7JOgllaam0muQjkw5pDCcJHOeeVwd5p45ZiIIJrTg5yFub7tDI8vMPNIckEu6EssrWTlk3Qmle1HPZkgKy7xHLNEZTGUsEu40spNIEsjS0GPbsSvGpHkepDKUj7zhXKWaLg0s8gnMSCSQZgksSrmv9NZeZo835qvuDReYmAZJBmCWxKntPysTyuXi0SwSAEkkwNLCggkakngKS1HCUUtcXCtpkhmKKWavPzE1fQXNaC56yBHEQyR2AjkK01ZwB4naUwJ7UInHK0EnIXP0K4OEM8ZOZtNLN8qKsWiKOTl9qQYyaaWcq+mWvG8cbgXOmMgWYxle5WjKOnsyDXmKU5Dr5T143jCUDaYBkksVQKOGdjcRhPYhikru8MnLWgKSsg5iGKSOTUIySz1gIBaCTl5mnmFgLnACRqzxSMwjJLPXAgYI5QrV4yGX8+aLdHzSxNMI133P+MykYVrN1qNapFqkWqRZyLVItUi1SLORZyLORZyLORZms5FqNDIz9pysC3ZHWqVa5VqlWqVa5VqlWqVapVqlWqVapVqlWqVapVqlWqVapVqlWqVapVqlWqVapVqlWqVapVnKs5VnKs5VqlW87JnzbjnkhPV4ZDyTNl+E7ZoC4yHoZh/gv03b68c9bh4W+pcXJmW4K1itY+UuLvqm4uTMt0FuAtY/mwv9FJ8IPCHrwsWNCd8+yKZwf5bxF6j6oONqzssRkb8YZyjcSYx/Kj/VR+yDwh6cCfUSjiOVHXkiYoyDhXfOHxF6h6oONktdhZIgYWy4Uizj7mdiZZtn5HJh7Y/1Ufsg8IeiL1UY65JpxrR8zDPHO5uCrfoqzM1erg8ksdizfKOxXvvIosVszV5MRiCk2IzRScC9Q9UHGX9Zmd3p13snJh0BAe47qj8IiYBw6xK1+3d5c4b8hS4VLZKWvaGrhT4nMAyuD4yWISnLUtjbhxGdq+I045bU3UJpTPEx6aGIu1Y8UsRQX7M5xy3zgijvyNYlxCXft2YbNWe9I1qnaa3X4R/qo/ZB4Q9EXqoC0TSM8Mwl9k32Qqt+isZ1ytaG5XmKVqOLR2+bWFf4VoCkwLbqWJOBeoeqDjL+sJOJUrPLnJehACKRuFH4WLyO1O3XuxVZpdq/Bda1bw2YIbP/APP4l/hP/wBrUshhypTHYixSAbGIU7BxyRR166ki2/6fxKE5cNu4pDPh9n7cMtTNzU844nZtnAN2Y5pcOvvBz+FyzS0+Ef6qP2QeEPROnbIkE7iO+Ip31Oq36SybPJnbJf7ZMzM2SyZuJeoeiDjO2mws3diIXZ3d+FFvtWTPwybJZNnpbLLNZNnlwy+uTOvoss+GTLJZZNlkvlOzOsmfsj/VR+yDwh6cLMD6uyON5HZtLeIvUfRBxu1nPtjjKQowaOP8qP8AVUnsg8I/TsKvGS5WNctEuWjTMzN4z+G+F8ScTrxSPyUC5KFcnChAQb8uH68JOAeGQcnzz/DBtRcJQd0z5/wTvqcWyZO309XDxPF9fuZZus3WbrN1m6zdZus3WbrN1m6zdZus3Wbr7k0busuw4c3ykZZksyWbrMlmSzdZus3WbrN1m6zdZus3WbrN1m6zdZus3WbrU61OtTrU61OtTrU61OtTrMlokJCGluLjmgFx/wCGnkzWZL7l9y+5fcvuX3L7l9y+5fcvuX3L7l9y+5a3bsI2FnkN196+9fevvX3r7196+9fevvX3r7196+9feszQyfXiRZLUTr7l9V9V9V9V9V9V9y+5fcvuX3L6r6r6rMkxZ+I31F+EP2lw9y/Bds2jLgT5N+GL5t4B+Pwi9W+Jv0/w/iVH7fhh8+AfX8J/gfSf0/Df3Rfqfhj7eAfX8J/gfWf0/Df3Rfqfhj7eAfXwHcjF4rQykNgCk73+B9ZvTwa21TlIKd2ZmJibvf3RfqeHPxD7d2S0rQK0MtArQK0MtDLQy0MiiAh5OBDWhBNVhEtDLSy0stDLQy0MtDLQy0snBiW2K2xWgVtitsVoFbYrQK5ePd0CjhAxGIAHQy0MtDLQy0CtDLQy0CsloZaGWhloZaGWllpZaGWhlpZFCBoYIwWllpZaWWllpZaWWllpZaWWntZv/RMuLeC1dCs1a0FkPMZMAPi4II78w79ijJXxGOeXymWgAu3Zh5jEVzGIqnaeyPmd8mfFYGMCYx7n4N33bzQIicijkKI6lwbI+W5+ypEwYaBXLqrWJhsWP8v5bH7amEh4Vy11VobATYZ+p5rYkdSG5WChhokFLvf578UiAFWqlaexA9eXDIg2PLd/ZVw3cJp3Y4IYy53ErP8Al/LY/bV2iLCNrDVXowwnhf6nmlxBmN+aIxxDSTfVvNiMBzR4bXkhfEKs0tmhEUVbyzhuwRdQgjPnZEJ4gLRRWprvllbVDDZGGtzFVNigi2GCXmL4rDerR72IKbnp4qwkNb/1S1K8NexO8VeWzHCuai2WvwOorUUxHdhA2dn8RvpDdflOYAWCYJWjnblY5glXNQ6t+NomssdnwzyGBRyk8jWonc54wIJQkEbMJEU8YnFZaSUbMRH4nllecbQbT2I2DfB4o7BHAErvMNmIy8eIfWnZqRx1nLl7kgu9e2H2zN/r9JRhVB46/hNtQbn+iP8At2xfdtAzjD+vajNgqgziGpjxDw2Rc5o4y05aoXNo8QICnaY2nhBv9dG+mxG+kvE0W5cliYSk/t2x++XJ+SOMjX6vkyWSyWSyWSy8rx52Pwmjysf8Wf/EADIRAAEDAgUDAgYBBQEBAQAAAAEAAhEDEgQUITFREBMgMEEVIjIzQGFQBSNSYIFxYqH/2gAIAQMBAT8B/hmsL/pWUq8LJ1eE/D1GauH8DGXoS1U8bWcYCw2IFdsoYmm6p2li6PaqED8OlhH1NV8Pdyvh7uV8Pdyvh7uV8OdyvhzuUf6e/wBinscwwfALFj+w5UCW1BCa8UcU7hE34q2n/wBX9S+7/wAR/Bw7L3gLYIV3bQjWNoIG6zTfdZmnMLMsWZp6KnVbU+lY+mDTu8GrEsL6Ra3dMwxY0Ws+blZH+26fqKwNA0mXP3K/qf3f+KJUaq0oiFHsrURHp0X2PBQIcNFlRESnUZAE7LLMIhZSnMrKt5WUp6KnRbT2WOqgNs8AqH9/UOgrLP8A80MI/wDzRoup6uqKvU7jpUnpJ6SVJ9WnWczYrOVFnKiztRZ2os7UWdqI4ypynOnfxDoXefyu8/lOeXblH+BZTe/6QsnV4WTrcLJ1eFkq3CyVbhZKtwslW4WSrcLJVuFkq3CyVbhZKtwslW4WSrcLJVuFkq3CyVbhZKtwslW4WSrcLJVuFkqvCydXhZOrwsnV4WTq8LJ1eEcHV4TmOafm8sJhu587tkABoPzalNtQQ5V6JoujxpNsYB1kKQpCkKQpCkKQpH4mObNOePNxTnhuhTXErut1TqjWmEKrSg8O2QqtK7jOUHg7Jh/Dxf2T5uGqfRa8yU273XY/afSuMoUP2m04XaMWyhR1kqnRsdKYPWlSgeuL+yfM6q0K0K0K0K0K0K0K0K0eofEdcX9k/wAJi/snwHV9R5f26fsqdVwJFRNxTSYTsU0GAJTsQwAEayqNbuVCFUrhht3KzLTCdXa1xafZMxLXGNlnGnWEa1tQ8AJmKa4jTdOxTQYjZU6gqNuCq1xTICqYn6XNTcQ10+0LON4KOJaGlx9l32g//qOLbwm1SHO91TrirMKq4t2Qem6jri/snwHV9NzXlzRIKbhS+TEItq1Gim4QgKlIuDRMptF9G1wEqiH90vcIVei41LwJTcM7tEe6FB76TrtyqdBxeCREIUnZctjVGk/5tPZVKZLGabQg51O5rRKwtSGtYsSxziCBKbSf8l3Kq0S97v2FUFao0Mt2T6BNb/5VPDvLXB3/AIFUFZ7Ay1FtRt5aN1hwWttiE9hcVZBVMQOuL+yfxH4am8yUGgbejHSPDF/ZPmTCuVyuVyuVyuVyuVyuVyuVxVxVyuVyuVyuVxVxVyuVyGvTF/ZPmd+rjaJQq6SV3Wpzw3dF4Ald5sarutQqtRrD2XcEwhVHuu4F3QrxbcV3WruNV7V3R7JtUEIvh0LuBOeGoGdejemL+yfM7qqSG6JnyutBlETouyF2AnMn3VmgA9l2ArF2xsu1yV2td12l2zdHsu1rKs+WJQpwZXbEQjSldrWSV2/mCLLkKespzLjKAgR0b0xf2T5ndESIVKn2wqhIaYV8aKkZKNYwr3TorzbKudK7xlGobZTHXD12dMX9k+bt/C0HVQArQoAUBWhWhWhAAeu3pi/snxY65oPW0K0K0K0K0K0K1Wq0K0K0K0K0K0K0K0K0K0K0K0K0K0K0K0K0K3rjXRSjxweIA/tu/OJAElYqv3XabeVPF1GaL4geF8QPC+IHhfEDwviB4XxA8L4geF8QPC+IHhfEDwviB4XxA8L4geFnzws+eFnzws+eFnzwviB4XxA8LPnhZ88LPnhZ88LPnhZ88LPnhZ93Cq131fqP8XKlSpUqVKnwlSpUqVKlT4SpUqVKlSp8j6I9MdD6I9Gm3UOdsqrbHkDwHla1mjtSntjbwHlSwdNrfnWJost7tPwHo0Q1wh6qAA6eA8g4dzuApztHEmSfAeMwgadcXE/+rGV229pngPWHpjz/AH4D0YYWkgIhpaSB4DypUg5uv/EWgMB8B4tDHDZNpCwk7r6aY/afbYNNeo9F1UOEQn1A4RHgPIV3NADfZPfdp4Dx7otthDEPAKqODoAT3Xmeo9YemPTHrD0x6Y8oUKFChQoUdYUKPGFHhChQoUKFCj/TqVJ1Uw1MwDB9SyNJZGksjSWRpLI0lkaSyNJZGksjSWRpLI0lkaSyNJZGksjSWRpLI0lkaSyNJZGkslSWSpLI0lkaSyNJZGkslSWRpKpgP8EWlpg+OGpdtg/Px9MRf4joXQr1er0DPSpWsNoElHEiBaJlNqNcy/2TcS1yNdtly7rfcouAEoYlhKvaDBKNRo0JTntbuU3EtdCGIa4AhXtmJXcbtKLgDE+hjPsnyOg6z0G/TEVC3RoTqljAymFTjtQAmXbNBiExhbTc1w1QpSXyFY5+Ht90KxcLQ3VObFzS2SUKMufeE0RBqCdFRYflke5TG/K1sbFW/LZb83K7MtqSNVUabpjjwL1egZ6Yv7J8B0dt0e+xNuZWBPv+M49O4LrSgemL+yfJ23SuJgzCbiXuPsht1e0FwXcdyqTiSg4gbpznhgKD36K9xar3XIveIT3HRAkkE/pVydQr3ASu4+5Xu9ijUfoqbiX69H7ItDt0KAvuQ36Yv7J8jt0cwO3XaZwgIQ6SiWnRaN3TXNIlB7SpCp2xp6pYrSg2OmL+yfMsVhVhVhQbHSpTLjKdQcnNJIKy7tEaLk2kQqTS0QfwcX9k+NCp3GA/n46pDLPGhXdRKZjKbtyszS5WZpcrM0uVmaXKzNLlZmlyszS5WZpcrM0v8lmaXKzNLlZmlyszS5WZpcrM0uVmaXKzNLlZmlyszS5WZpcrM0uVmaXKzNLlZmlyszS5WZpcrM0uVmaX+SqY1jfp1VR7qhud/PU8M+pssi9ZF6yNRZGoshUWQqLIVFkKidgagTmluh8p8ZU+U9Z8MNTvfCPyhd88ao1/kDgN1mB76LMU4mUa9Me679PXVd+nEynOgSmuDhIWOpAsv4/Jwr7X6o7aLsVLS2d06k4tAHsjhp1JWTMbrKkC1pWUmdVk9IlEfLATWhggLGvAZbyj+QFTxbmiCs9+lnv0s9+lnv0s9+lnv0s9+ln/ANI48+wT6heZP5VyuVylSrlKlSp/05reVaFAUKAoUKFChHRboMCtCgKArQoCgKAoCgKAoUBQoUKAiI6Rp5MYXmAsp+1lf2nsLDr5OTB0pYY1BKyf7TsKRt6xCG6dt5YMalV6xaQxm6p1qhNr1ifp6XK5T0dsmdGaNCqYxrHWlNMqt9ZRMKVcrlIVyuCuVyuV3Q7Ju6O3lg/dVWG64aoNc50xCxP0IiVaoVvR2yZ0bqwKphA91xTWwFW+sotUK1FqAVusq1FqtUK1BHZN3TtvJjywyFm2rNNVSoankdkzpRxNgtcs2xPxQj5Vv6p2Td07bxa7n0ZRMoGEHA/gudPQmR/EtaoUKFCjrCI6BoUeMKFCLekKPQI9cb+m3f0j6IYXbIscNx4jfxifJu/pHwlSVKlSg5w2KvdypKnwlSpUqSpKlSpU9JKlT0kqT4Sp8WMNQ2tR/p4s0Oqc0sNrvzh4YZwbVBKGK/vkT8qrm6oT/AgTorCrHcK0/wAC11pld3SCu6UK0CETJn/Qv//EAC8RAAICAQMDAgYCAgIDAAAAAAABAhETAxIgECExMEAUIjJBUFEEYUJgIzNScKH/2gAIAQIBAT8B/DSnGH1HxWn+z4nT/ZHVhLw/wKefV+Yl/E00ami9Ni0ZKO40pboiK60V1r0p68Y9j4n+j4j+j4j+j4hGZGYyid8Gfxv+xGot0HZtc9FEVWl8xofSfYsssvrfB8tWW2PTYv2bO7RjZjkY2bGOLRpvvwZofLNNj1Nz7vsZvm7eDVnufY0fBZZYmWX6mpHdGjwzK/Ip0ZGZJCmzIxysgvvxn8nahTj+jev0J39iKorpXSivVlpqXkwRMMTDExIxIxo2IS4tGxG1CX4KUlHyZYmaBmgZoGaJmiZomaJmiZomaJliZomWJliZYmWJliZYmWJliZYmSJkiZImSJkiZIid8tXU29l75OvBGW5cZO3fv9J9+aQlfTaKNm1jRtNrKH7PT+rmhScewzeKVG8cjcbxysfs9P6vQssssssssv2mn9X4TT+rmoqrkSiv8TExabFptko1EjByMbFBtWPTaMTNvYek0LTZKO10RjuI6fkcGjGzY7o2MxscfA47T+VqOFUQ/lyUHFmnLdFPrp/Vzi01TMlCcYvdZ8sqs3qVpk2ttIhP5aHNbjelLsOaoclvs3L/6Jq2NKVGou7ZpuhyXeiMkkLandinURzVoW1O7LTon3dmtorVj/ZOEoumfxYuOn366fn2im16nbhDzzRRRRRRRRRRRRRRRRRXCulFFFdYfVzXVdzb+jaxIo2m1m1m1lG02m0o2s2so2lFFMrq+kPq9CPkfi+m83MTLN5ZuNxuNxZuLLLNxZfYXYsT6vpD6ua6SdkfI1ZJCgUiu52NptQ/XfSH1c1wvpZfS+l+wfSHni1TrrZZZZZZZZZZZZZfOy+emu/HW0/8AJe/hHauUtJMwGAwGAwGAwmEwmEwmEwmEwmIxGIxGIxGIxGIxGIxGIUUv9iftJy+0TTlujfB8rcvAnwfKWo2+xCTunwfo6jce8SDtcHyrttaEvHb0u8DTi7t8H6z9N+m/RuSkK1KuD5TlTE+/B8XaN3c8sV31forTad2Rg07vg+WNPyKNcHx297NqEhLq/Wfpv03/AOlZTUO7Hrv7GaRmkZpGaRmkZpGaRmkZpGaRmkZpGaRlkZZGWRmkZZGWRlkZZGWRlkZWZWZZGVmRi1f3y1Jbn7/Sl9uaRtNpXWMbMb+5tp0PTaNjuja+j02UbWJWbDY0UymV6EPq5LnpxvyKNu2P6u46G7kmbqotKZt+9ifimOXii/8AxJPyN92X9zd3Qn24UV1h9XJdIxs7OHtl0rt1h55Lz0gPTS4J9ikSrokrNqKRSEkKukSkUqKRSH46Lpu7dYeeS6J0bny8lFdH6tll9IeeaZZZZfSLo3CZvQpI3EnfsYeeM47X7/TX34z01MelJGORjkbJGORjkY5GyRskbJGyRskbJGyRskbJGyRskbGbGbGbGbGbGbGbGbGbGbGLTf3Eq/PS1oxPiInxETPEzxM8TMjKjKjIuVFFFFFFFFFFFdKKKKGuurLbEXdmNfsUO9GM2M2SNrNjEUQffm2WWWX1TLL6WWXx1o3ERkjd0KSsWoZTIn3ZkMgvJ5Ie6loJnw/9mD+zAYTCYjEYzYJV7uiiiiiiiiv9ObO/C+Fiftd1vlKSirZ8QZyE1LkurlRvN3ry8EfPFH8g09NNbpE9OKVxNHz02m0p9F56sUL7ngQlZRRXSiiiiiusvAvPFH8j7EH2oulRo+ROjcWb+i8j6MU+i8CdFllll9jcWWWbusvAvPKUdyowMwshDbyXVxs2MUPXl4I+eLXpJe1Sp/iW/RT9W/RT91Lx7NyS8m5ewl61FdaHFM2oooor1aKKKKRRRRRRXGUlHyfEfMJ33X4LVVxHpf8AHf3NPtH8DdFo3ItfgWrVGw2DgL/Qv//EAEQQAAIBAgMECQIEAwYEBwEBAAECAAMREiExBBMyQRAgIjAzQlFxkUBhI1CBoRRScgU0YGKxwUNwc/AkU2OAgpLRFfH/2gAIAQEABj8C/wCbth2p4f7zw/3nh/vPD/eZ0/3mRsfT/AO7U5c4cAvacH7zOmepcGxmfEuv+ACfWP8A09G7rdpDo0x0+L7c+hapKlfSF8S2ZtJb1HRUI/lMFf8A/oV0JJFoNi2xt5j8Op6wI5LOfKouZu0LLU/lYWlSjUxBk+2soVHDha2Yy0gU7xL6My5Qr+IwGrKuU3yuN3a95YbwqPOFylejQLAqOKNSrMTVothN5R2am7KlMYqljNsKNVNTzBtBCv4j21ZVyjVcb7o2N01lOoz2phRm2sAO8QHRmXKCs92Um3Zn/Ew/zYcoHQ3U5gzZtmUDBVGfr32Fc2mbn9JxH5nEfmcR+ZxH5nEfmcR+ZxH5nEfmcR+ZxH5nEfmcR+ZxN8zJz+swt2X7k9D/ANMygqWHZ5CNTPkj+hziui4jpaGvVbt1Dkoi+x6Kv9B/0if1NNhpIe0hu1uU2xtnSk1TF/xPT7TZqm0fw9OoD5TYkTaCwvhS4n9noR2S9v3jm3CRb7ZylTw9k08/iVgNN7b9JSWmBgKCbcKfADl8mFj2aO0rf9ZtG3PrWbL2n9pXyEcbLudt2Qk6HOVTs9M01vwk3zvP7JSp4JAvKy1AMIU/pNnx/wDmRqeEYd3p+kWkzst+a66zZtnFeqRUBzLZiMFq1KmL+c94SNTkPobg2Igbnz7g9FT+mDMX9eUfO0qGVnGZU5Q1DoukIHCmUX2PQy6YhaYE/tGqqeiwst3qNq7azf0qr7PW/mTnN/UqvXrfzPylXa8fiC2G02etjw7k3tbWPQxYMXOJSvfCuG8qbM53qOSTcTBT22ulE+SVWRyVfl6RVL4Cpve0SiuiC02jaMeLf+W2kYUNsq0abaoIdipsUB80TZ6ueAZMNYFr7bWq0h5DE2dW3aqQRYQ0/VbRaGPHbnAxUFhoe9QdGcdbAUQvpFSkO2TnlrGwyhamhxDO4lCogw4zYiVKjsbBrdkRgr3Rc7iY6eLWxDC0FJ6p3n2GUrAs2Gn6DOKlJ7gi/wBxHZC90zIZbRcVQgstwbdnpqDuD0VP6ZuqIW/Mzc2GfoJh1fl9zHovmeIRsH6e/QvsfyVW6M4Kau6r7aziYVDztpOwxYfeUldmBT0EpYRanTMbN0JN8Sx2AIVhbLWYUeo5ve7TfPjxakCVX7QxaMuoiOAWwixJ1MYB6rlv5jpB4gyzp8j0s/r3B6Gw0wxP3hqNRuT/AJphpU0pTE7FiYtRdVi9nAq8r9C+x6RU5VZV/SXKl0ty5Si1yQG5xC9rlx+kqAEdk+kDesxvc3/aBQcRJsLxENiGjVWtYXi3ZWv6DT6cqZhP0GFYFHLua6hAzgi1xKjX0Pl5ZRsmOELz1vMr2DMDnraOdRQv+vpC1ziAB+0c3J4u1yWcRWz4Sf0lR0OJFyv0Fb2vBYWI5x2/mmIOVMQfym/vAuI2U3EY/wAxvAvpDgcreYc/W8Vy5JWGnqDBd2OHl9RZhOy3zNVmqzy/M1WarNVmqzVfmar8zVfmap8zVPmap8ztv8TCot3WJeMSzCx61lGXMwImn+Ae0oM8MTw54c8OeEJkLf8ANPtsBOwhb3nAs4UnCk4UnCk4EnAk4EnAk4EnAk4EnAk4EnAk4EnAk4EnCk4EnAk4EnAk4EnAk4EnBTnBTnBTnBTnAk4EnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnBTnapD9DLXwH0bvcCZv8A6S7G5/O7N2qfpA6G4PdXHEdJc6n89CMfw2/buiOS5fn6k6jI9yT6nraTSaTSaTSaTSaTSaTSaTSaTSaTMflFVfY9wfqbj8nrew7g9W/Sr556wpg7V+hmvb0jn+UXgUc42GpmvIxAnNbmIRxFrQ3XT79FqlQ4vsNJhXt30tNP3ge3Z1mILlLH8orew7g9fEusXDbEdYatsr9FJSWumeUr20K3EHaw/ePvsF/KRrFpKbOVv7ygP88/WX9DDUpkEN99JbHfK1/QypiIzU89ZQHvEZUQi2pOkYj8orew7g9zgvl+b1vYdwevpNJpNJpNJpNJpNJpNJpNJpNJpMvyit7DuD/gCt7DuD/gCt7DuD+b27mt7DuD1rhLD7y7Jl6juMANsrxl9D3eDFhyjU73w8+6p1cV8fLu6j48OHqq6n3m8pC9uUtfTWEenXrew7g9Uu2YTOHCxC8gIRVV6iekwUlKhuR5TBULM3Ob/Z2unMQ1apw0xMAxAnQzd8WLT7wfxBLOfSb3Z2OliplT+owU11MwVSzvztP4jZmunMRK9IW/mlm4FFzHWn2aa85gOI25wOhxU20iVal1FvmH+HJVx6zd1OV41IjsXMKuWJ9PSCvQbFTMNeu2GnMFNmRuV5TFMWuM+gL65QJXxs5EWrRa6NKDV2IRQDl7QrQLK4m55jWbt8TNzlWqp3gtdT6TfIv4i6x2qC6jIT+H/wA0Gz0BbLObtyzPzlSovbFrj7SszDhE/HRmb7Q192VFsr9HrAVFj6S6/qIXXmM4fv163sO4PVemfOJ6FfWWsuAa5Rv6cMqBvWVmfhOksuo1gVdTNlDHMHOYjwkZRm8trSp/UYL8wYyvst29fWOU2fBTI9ZV2ZvMLyozcbm0qrqdZY7HnEU0d2vLObP/AN8p+hj/APyj+5lX+qP7/wC8p4PLrFCa3lL2PQAvFygp7ds+frEr0ScDcjNm/T/SL7GbQOZjhtbyvi5g2+JW2c6OspLo5a5i7V5cF5Uc6ve0qB9bysTodPibR7f7QDyDNpuk8NOi45T0cdIPXrew7g9W4NjLVqS1PvMFJBSH2gZTYifi0Fc+sw2wJ6CZZg6gy6bMob1hdzczBWpCpPCAT0EZvU3lwbEQb6grsOcw2wIOQi1PSKAuECB0OcxNsql/WYn/AEEpoFtgm8IvlGr4Sb3yh2jCc+Uepa2I3jbNhNzzhqqoejzF4F2fZ1V25zZ6fPnN2vDTylxrAK9AVCOcC2CoNBKVLARggqEXyhrJ2Te8/F2ZWYc5UR04hYW5RamtorWsANJ/D4TitbFAymxEG92dWYc46tT4tLcpUXDixwpuy1zDbZAD0XEvpb0ljk3RZdB163sO4P1/ZzU8jLpsyh5vcXb9RLnX6bXuK3sO4P8AgCt7DuD/AIArew7g/ndx1a3sO4P5ln31b2HcHvM7aZX9ZaqmfI2g3jkE55DSFL5AXv8AaE02Jw6giBRqZu952tNMoy+htA1RrYtAJQRTive03a1O37ZQuzYbG03jOQMVoHx9g/bOIEOIPwzdir2vbKbQGJ7I9IzlsKD95jRsS3t7RuQAuTGNNySudiIGqMRi0AEpFXvj5yqXY2Q5nmZT7eJTGw315wu7YV095vVe4vaAPVOYB0jUy1sIJvCabklcyCJTN+ISkqnNxeBFqm/tKw/ziKt7Hdi0dibYREDesazGwzJblCaTk4cyCIlQvxDSBRqYKYq9q/plGX0NuqepW9h3B7gs5woupmFcaHkTCp1HR28hGXeB76W5RSKqpYZgxjiNiMOK0a9cNfksVvQwNvRgvf7xyPWJ2wrLlnKBU4sGsxfxAw/YZxhfMveYb547ymL5gmUCNVveB96MF7/eVxiAx6GNSZgDe4PKbsMGLG5tpKlz2XFrxjvFZiLDDE/ECsow5zZrHIc/1lQirgN8jyMptcEjiK6QkMGBN8puywUg3F4yYwzYr5QEG/ZEqHELGnb9pUubXSIMYQpl2pRIOJQljaKxrLYHK0qi4uXvKbqeFRAiebtmUydLyqG4XuLxjvA7EWGGUQDey5xX9DFffLhvf7xyPXqnqVvYdwe4ekOO+IfeW0tmT6R2GhP04V0xW0INoLDCBoO9z0hbvD1K3sO4PcKw1Bj/AIdJcWXZPTbO3O0bsFQP2ha2QiJnYrfoxYTb1gfnitGDI1wL+0FlJvLEWMsBedpSIwRGKiWAznaUiXVSRHv5VvMVsvrz1K3sO4PefoZWHO0qn7iUv6P9ujzU6tv0g/nxHBf1lfFrgMpC/rKDcyv+8q4eLL4n+S810tNp1/8AjrKlt4R9+UTDe2EYZU338valuXlt6fXnqVvYdwe8uDaXBsYQWJBga+Y6MOM2mG+WsJxaixgF8hpACchpLqbGdpiZiJuZjxdr1naYmWViBDnrrAL5DSXP5FW9h3B/wBW9h3B6+n5dpNOpl1qx9u5dfv8An+P+c37ner5dfz5aY56wKNB3NoXQXT/T88wotzPVzqe7zmKl2D6cp4ZPtM1PxNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDNDND8TQ/E0PxNDNDNDNDND8TQ/E0PxND8TQ/E0PxND8TQ/E0PxOzTY/pPxDuxOwv6/wDs70mXcaTSaTSaTSaTSaTSaTSaTSZdb0HRoJoJoJoJoJoJoJoJoJoJoJoJoJpMj+b/AGH0X3/Mz9Me5HcrhF7wOOfeDuLsbCak/pDu207wdw34ilhyhxBWjLtLgX0MxKwYfbuD9CMIuzZCFybph4Y45d4O4JbwUNresyUKJg2dR/meME8hse7HXuTYCVGXhJgAFyeUQtU/Fbyzdg9pTn3B7kdwrpmUN52lYGYVU3P27wdc29J+sUUwSnO0C8+c2ojS/djrtTfRpmN4EaHaaIBqPovpC7m5M/iPMcvbuD9D+EoJgY0xlPCW3eDuGNCtgVs7T+9ftP71+0OeJjmT3Y7h3plg+vvCVotlG3mJFWbtNO4P14+mH0Z+vH0w7stTNwDbuD9CUpU8eHWNcYWXUQ7qliUc5e1jzHdjuWp2taY8N87QHux1hRpU97VPKbitS3VTUfeXOkemq5LneVX+0pmnS3jnO0LNsVgP80Wqy4b8usfoWbS+ZlWrbJtIeQEZzljN+7HcMeZyE2at/wDaL/VB7d2Os20W7ZGsDpwURa8Gx0f/AJt6SqiiwVBKdEa1HgX0FpS2RNahz9oFGgy6x+h7VN92OQmHcsgAmKpScqNFEtuylvXux3FOjY4NSYxFR2I0BlPsHEDaDux1jQp03wc2A1iUU2Oqg9TGYVqgLehjLiqYVzDespJypC56Ku01FIt2Uv1z9ePph3T17ks/cnvsLOAfSY79n1+gHVs7hfeXU3HXLHQdyOqFuLnQdRbHj06At820hJ0EBGh6x76r/Qv+82rdmwFtPWE4mwAeQ6RVGNlwYuxleWJI/Ew4jraUVFRiDfIwF3bNtRmp+0qH8XsmwwkWEpk34e0EOcU4sX37gdVMK4jgPO0C3w72pnblNyHYh0JzOaym97BAMf65QEYvxKnL0jDt4cN+2cwZTfGzNUw3PpNKmG2jmNVNVrlb/aD27gdWpVxdqkQFH+sR8X4bC0p9orvn+BKabxipU5EzZSTc4j/vHqmqym5yGgmyXcglTnzlWljLDd4s+UpUxjtu79iMGvkcr69U99iYZ+83eEYfSXZc4LrppMGEYfSBguY5zFgz1l2XODEumkwqLAdwOrjt2gLSzC4nZW144w5PxfeYMPZ9IcK66zd4ezpaXVc4exr3I6uEDKbor2PSYSLiYgucWy8GkJK6xRgyXIQqFybWAFeHSWUWHVP5lfpt9GT9ff6Kw6l/orD6rTuNJoZpNJoZoZoZoZoZoZoZoZoZoZpPTrZTSaGaGaGaGaGaGaGaGaGaGaGaGaGaGen/ALLe04v6TJGM8Jp4TTwmnhNPCaeE08Jp4TTwmnhNPCaeE3zPCb5nhNPCaeE08Jp4TTwmnhNPCaeE08Jp4TTwmnhNPCaeE08Jp4TTwWngtPBeeC88F54LzwnnhPPCeeC88F54LzwXngvPBeeC/wAzwXngvPBeeC88F/meC/zPBf5ngvPBeeE8zJT3l1Nx3mCkbD1/PL02/TlLjJhqO63S89fz4VF5fvFddD3LN9/z9k/kPcH/AABWHt3B73LqBBq2U3TUi5GrRKdM9mppN09MuRq0svCwuItMeabp2fHzMSnfErGGnSX2AmGtRLZaR92hy/aYt01vboCLqZgqu7vzwzf7M+NBqDqJZQWP2l3psBDgUtbW0xbprdGLdNb2lF8FnJzlAU6BRmHzENFCcu1EO5Ia/HPw0LTtoV95jVCyzE9JgPWYUGI/aXemyj6Ct7DuD31+m4mfCOJjLockyEueEcTGdnhXIRag1Eu+KlUPPlKSk4gSLGVNqC4nbIfaFmNyRNqb0iYnuGNrSoBprH9cOUN9ecOEsB9oKlPjqG14KVRsaP6za1GixcTkhjpGFsh27Rir4QDkJQqHmZshBsQv/wCSjhdhdc85S/qlGlROG63JlajW7VluDKrrqGm6qtjVhzlamzYCclaVMRG1Uz99O50mnWrew7g9zkNOqelQ5svObpK+7X7DWUwtYlTxQUUr7tP8o1i7moX9Yr2vab0uy31WUm0RI6scdB/2hYVL07ZTaMTWx6Smx0DCM6G4MFReU3hZqTHUQ0dmXXVzDs+0DsciOUL0i1Wpy+02hqrZuIhOgIm/pHELTel2W+ZWU0pZYTwzZ1RrlVsZTL1CjotrSnSxdsHSLT2klWTRhHp7NdmfVjKlHF2y2QgdzYSsKy4kc6+kqbqo9QuLW69z1MurW9h3B6h6uF1IL8zzlxo3UP5RfrYupW9h3B6h6mNuN9JTpkBRfMxPW+XUP5WVqJiptrlP5kOh6D1K3sO4PUPUTDxJynhNPDbqHpvl+sp9hO2ufZgapUwYtMrykMQO89Jg3wx+loQdRKRDZ2/l1g3lQIW5WmEzGzBF0inHdG80cvlhyH3il6oGIXGURTmDmPvC7NgS9rxWDBkbK8wY8T30mDfDeelv95nBvKgQtmBKIJxYs43/AFIFXWLgqhyNRa0vfs49Jh3o3lr4bTeO+BdBzvFCnGH4SJuxWGP0tKmJ8K09TaKqMHx6QqlUM45WmN6mAE2GV5hvf7jqDosjWlg+XM20m7U3Uc/XrVvYdweoepjpAidvxJaEMLHpPUofZf8AeIVZQVXCQTabIA2K3/7C29XBivrnGb1Mp2I7F7i8Dq6jLO50gw5hRhvN2uDED54lLGn3wiwEsp8LIX5iU7OoOAXBMoqGuKa2vBSxBWVr584tPEGbFiNuUL6gNMeOhg1vYXhPrA6uuliCdJs1muqqM4w/9SdrQgiKzVEtyzhH/qf7T8R6dSnbU8UVF3eJeTjWUbsrYDc4RkIrmqu7xXveVsFQKb6HRpSfs38+HSFi9ALyKqLzsuhuc0eNu+HqW6SoNg2vTb16lb2HcHqHqWFQ2E8Vp4rS7G56T1lb0N4T6nuFy0UD6r79W/Urew7g/Q5C8uBpL8pfCbetui4U29otuagzNSP0gqWOf2nZUn26M1IivZu19tPrNJ6dat7DuD1bHvFb0MNL/wA1iP0mz0m92mdWo3quHowoSFAGGLjyO79PtH/EqVAVzBWU+0dTKQ3roMPlExKDiCXzHOOOMWzvKAxHnz/I63sO4Pea9YFjmukxse1LYv2z6LX0+0Dk9oc5YnI+ghQcJ+0wg5fcXmPEcXrLE5fYTBfs+35HW9h3LL6H8/qP6nud6NDr+fBVFyYtMcu5KsMjPVPX88souZvKniH9u7sReXQ4DMmUzyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzPJ8zyfM8nzP8Ah/M/4fzPJ8z8Sr/9Z2Fz9f8A2G21aZG08QzxDPEM8QzxDPEM8QzxDPEM8UzxTPFM8UzxTPFM8UzxTO1Zp2Tn6d1diAPvLJVRj6Buu2zh/wARBciPunxYDYzFTcOPtHWk+I0zZuuN44W+l4WY2AmJGDL6iGmrqXXUX06cTsFUczLDaKf/ANuoyq4LLqBy6oplxjOi8+v9zL/SBl1EVxz7mstRiNm2c2wjnP8Awq7iqNCDN5trBnXLs+ab8bEm61tftWj7ZQ1UaNyMFajslPBbmdY20MMGDjHpDV2XZE3PLEczK9QoUJp5qeWk23+HoUlqK9ssrxQlOn/DYziN85tp3VOkKb5lRrrGbYdmU0h5nPFHpVKe6r0+JY60NnpuUPETYSps20Ut1Xp+mhlX+C2dGp0jYlzrC5XA6nCyxmHFSOIRCvFtFlm07NUyNFrza9vq5B2Of2m92XZE3PLGczGum7qUzZ1m0e0os+zriZMzKn9nly9O2KnflHp/2fQWotPIu5yj7LtFEUtpAuo5NNq3VOlvC34lzpP4TZKO9r2ub6LEo7fs6095krqcoNl2WlvdoOdjoJTpbfQWmKmSuhyiYadPeAHd55ERd+AKnMDrW9B0Lj4ecqJu1CqLgiLhQO51vOyLXF7TeGmHOK2capTXAyaiUk7NyvKYw6uNMoMTojHQGGnaxXW/KM4qIyqOUUl1TFoDzjLkMGpPKYwyuvqstjTHa+Ho/E0PP0lj+h9el19O52hK/YpVziV+UxiotRuSqdZTrtSwkMHKa5QVt+lraXzm21CLLVN1E2f+gT+06aa49JTVqqU2pixDG02mrT4WXL9pt3/UM3ZdQ+8PZvnP7WROJmIH7xaT1FpvTyYMbSvtNHwgmHF6zaP+qY3/AEZWqbNtT7BWDdoMcjH3tmKNbGPNHpnRhabLsbjs7MzMZVqIP7zSw/rDs6DtbuKx/tSrRI1THbDNoq02quCbYn5zaPaUcdemLJ/NKm2ICKKLhU+sq0au3VNlqIeHFYGDd7RX2hqQzc5rP7QFR1S7ZYjaVlq7S+zCrmrqbXlGiNtr7U5bKxxASq1fsrWXssZSooBtDufLnabK7kKuDUy6kMDzHWv6joCrqZuqaXvxNN8Vxeiy9UZtCqC5xypitjqZWmz4WCnBqYXemKTX5HigdKNN1PmPKbRTDDEwyPrK+Ps3XSUxhWsnwVm0UVs+eWLnGVqdOliPCIN4qsmHxQbdGbBRzMVFFqaadNQ/p3OCqgdfvMabOgI6Mf8ADJihpOt0OVotNBZV0EfdJhxm5m8fZ0LQ1qdMK5FriPukw4zcwVxRAqA3vHNJMJc3b7zHUoIW9ZgpoEX0EYUUwhjcz+Jwfi2timOrQVm9YEpqFUch0PWSmBUfUxTWp48GnRjfZ0LQKihVHIQ0qi4kbUS/8Mv6wKgCgchL1qKufWYaNNUH2m8q0Qz+swVqauPvPwaKp95hrU1cfeXo0VQ+sAr0g9tItOmMKLoOtiGo6dTNejXra9S3VsIF58/zO6a+kzU/RZIZiPaf/D92Nh0Yb5+nVx4hh9ZcG4PWuZcZgwXOvelQQSNei5Nh0HCQbZdxmbTDfPW0uTkJcad+71RiUNhVeURU8Or5fQzEf5iItWwLFrW/WfiWv9omz/8AmHP2ljxJdTKX9MZKOHsaloz1admXKw5xqjKh+w5RKaBe0t7nlGpVQuIC915y9ge0NYadEL2eJmlTeCxFMae83qinh1wk5yhugDvfWbqrhuRdSsq3KYd4b5SmwwLdsxb7xKb4bMOXrKi5YUy/WKiC7vpeUkcJ22tcRmTUC8pYc1bNvsJVWwwol/1lEIgx1BkOQmzrVC8eq+0daWABMiWhuLMpsYtKmFOJSc5uqYXEBdidBNy6qLLfLnN6Fp+3rKZRbtV0BlNWCEO1riMlLAMGpaMGFmQ2NotOmAXOeegE3VTDiIupGhjFsObHlnrEC4bubXbQSuKii4XIjQxEp2wqO00r1Aq3RyPeK9RUwE2sNR0bymqYOQOplNVT8R+R5QU6wXtaMsfAKfZYjPnFcL22OEL94oqBCC65r7x1ULfBrGY4CoDZWlJUUY3H6CCnVC9rRlj4AnZYjPnFqBbEnDnoIRUCkcmXTu2NNN4jm9r2tBVqjDh4VjItPECbg3lJCvaD3Pz0M5Z0AGFcMqjNlcXufWIrCxAjslPeLUz1sQYwqWDE3H2jJusJPO8R7ZBLTeW7O7tf9ZZRc4gY1RFxh9RfOVHqLZWTDN3/AAtN2HnymzWGSXvb2lJwMgDeVFKdlmLYrxKeHtBr2/WbzzUziEF+I9oxKtMXZOXrKLbvCqNfXPoqLU9MC+0qYx+I/KUGUXemLFfWUWNPCqN6x2/h1rBzf7iZqik8livbs4CIaqLjDCxE3jrhXBaBGFmzlAi28p8jzlDGm7G80veO+4WsHz+4huipfksWtTGIgYSsFWouAKLAXhDCxxE/vBhRag5qecrjBgDjspe8UKL021H8pm0LhzZyRMKi5uP9ejdLTDW0a8p1BZ3XIjS8V3TdhNBe8fELXcmDk61C4+Yo3WGzAnOM9uyVAlSiafJrG+souguyLhK+sSpUTAE0F7mPiFruTLBQTiJwtzF4zbvdIRw3/IApOV7n79/Y3HMEcoHqVGqFdL8v+WnqZoBNR8TUTUTUTUTUTUTUfE1E1E1E1E1E1E1E5GW062S295xL8TiHxOIfE4h8TiHxOIfE4h8TiHxOIfE4h8TiHxOIfE4h8TiX4nEvxOJficQ+JxD4nEPicQ+JxD4nEPicQ+JxD4nEPicQ+JxD4nEPicQ+JxD4nlM7a27+w1+kwnXp+5lzmfyK44efU+3dFupmZxCcQmo72/p0k+mXUzNpxr8zjX5nEPn60r6dHv3Y6cK6zPqWJy7wwdDe/TZeI/tLsSeprcekuND9W/QO7HST0dlbztCC4170wdB9+lz9+jSLZsVxf26SPQ9fI39ui1xf073MgdVugd2Og9Cr6zClsUs5wmKxYMumXUqVT5ReNRrsSaqCqt5/D7PRNata5F7ASrTq0jSrUhiKnnN+mwlkHEcUTaAC284F5kxBteymirmwa9+kwdB9+l/eWAvLVCcNPlLKuE+sOK5wZdD9BY6DOK9UnBtd8MSlTpmrWfRRDQrUN1Xw3UXyaVQ1K6GocRxcP2lWvTpcNQ5YotWrshSg3mxTZuxdihs1467Js2+FPIte0xAFSDZlPIzZHdiqDFin8ZXuo/4dP0HrG/hdkNZENi17XjbUiZqbFW5R9or0GpUxbD6tN7U2Iqh0OL/WbFUSnYOQeLn6SnvKH/iKmlJTFo7Vs5ol+E3uDKtPZtmNbc8ZvabJW3ZYNVAte1jG2fZ9n3zoLtna03gUqb2I9D0t0L3Y6D0K3oY2Vw2l4Vte8p0zrqepR2OnxVmv+k2fa626w0jh/D9JVrVQdzXUWcC8rlKVqKplUIzMT+kzZKgDMKTksF1tKabKNorMTc4mNl6TB0H36X95dTYy9W+Gpzlw4b2hvcY8/fofo3S8dY4BKbNusOzZjBrKO3EE0Hp2uBwwCjSxUlGdQi3xNo2ep2ar1iQLTaP+r/vH/pE2H/oytQ2nEpxlgbXxQ1Go7oE9n1Imx0n4WDT+B2rxAOw/8wj0tsNenUU5YSbNKzbtqeNgbMbmJuxiNPC9vWVKdNXLsuYw8M/s+pbsoVJmzf2hTBqUFupsNJs9PZgzLTfGz2taVWqb3ZKvldM8c2Fq47e+HKHfirszW7NZPNMVa57RwsRmR0t0L3Y6SOjCyh1+8/DpKp9Zc5nqXtnLGfbotMspp0mDoPv0uPv0C50i4Vw2Gf3gub26GPRp0W5dF7Zy1hbo0mnTmOjPPo0HTl0ZiZjqN0DoPcjpxqMufVylu7MHQffp3iDPmOrZRAo+rfoHQe5I9OpwzT95pNJYd5b16WH69S7LOE/M4T8zh/eWUW+sZvXov3eIfSYj+nTiGo/I8Ky3TY93dcpms4WnC04WnC04WnC04WnCZwmcJnCZwmcJnCZwtOEztdW65GZrf2nht8Tw2+JwN8Tgb4nA3xOBvicDfE4G+J4bfE8NvieG3xOBvicDfE4G+JwN8Tgb4nA3xOBvicDfE4G+JwN8Tw2+JwNOBp4bTgacDfE4GnA3xOBpwNP5Zl1T/wAmuzOKcU4pxTinFOKcU4pxTinFOOcU4pxTtdS5mXZnHPEM8QzxDPEM8QzxDPEM8QzxDPEniH4niGeIfieIZxXlmFj1fScU4pxTinFOKcU4pxTinFOKcU4pxT17u3L6P7dOI/p9HhOo+vv+Ur8dA+kPcj6MwT9fpF9+j9PpD3I+jME/X6Rff6Y9yO5trLWIhS/cGCfr3OG4v6RN2t885cy4zHcL7/THudJpNJpNJpNJpLFbieGJ2UEuKYvNJpNJpNJpNJp0ZiaTSaTSaTSaTSbzAMXrNJhZbgwKFsBNJpNJpNJpNJp0aTSaTSaTSaTSaTSdpbzJZpNJpNJpNJpNP8LW4n9Jca8x35Y6CZUnM3m/3eLyy1e9ZG5iCnhZWOl++LegvMdLZ1Kz+7L/AN/rP7sv/f6xsa4WQ2Pf3lrMV/mtlAym4P0GBM3/ANJdjcmYkNjLaP6d9V/piMdAIXpuKVPlP4faOLkfWbN7d9U/pMApVN22LWf30S9Tad4vpNp/r/8A3v6irxETA2oFitouLnn9ArKoBY5xgrAYfWYGIJ1ym8wjFc599V/pgT1Uzc1+wyRaqA7unzmze3fVP6TAKzFUxaj3njv/AN/pBVpljlzm0/19/go0zVb7TH/A07/vMO0Umpffl9Am7FyDHNRcN5iRMQtMLixv3zoPMIKa0UIX/v1nb2Sk3v8A/wCyy7NTA/7+8p1q6KmD0751GpBm4rbMz2M/uH7Sw2epaVnZSodri/fGYV2dTfO5M/uy/MNNtmWx+8pq3EFz/wAKlxqJjGZnbOZ5Te4uwJx29xMKnOYS2kuO6J9BN9bPBitFxnCWW8OBr2iVahAvDhbMcpbHBULdk6REQgqQb91TVACXPONTqABgL5SweYWaxmJWyEsH10mAt2vSOmYsbaTCH17uoiKlktqYHfsXNorFsm0jOpuFiPdRiYDhMrK1rUyP9JYNrp3jj2/1mNcV8ucd6gOFwLEC82mphIVyLCbPl5xKJHo0am71Af5QusRTyHdEeom4wNvcOG1pRupbDTP6TeqDgCWvbWbK5UlU1ForoDhVSC1puWQ4wLYbazZahBKqtjlpKbKpthPatr3VAXIzOY9pXpm5q24zzHKLSLVr6YMIy/WMzA8Az9JtDUwQGUAcrzdIjY8uXDKpt5RKyG92Nx98pTSmGIvwOvD+vd17lxw6G02dVXsh/wDaCqwODBhuOUrVQCEKW95s32KTbFUZm3+kRcdZs9MNrfXipfRbfRtUvqLf8rf/xAAsEAEAAgECAwgDAQEBAQEAAAABABEhMVFBYXEQIDCBkaHw8UCx0VDB4XBg/9oACAEBAAE/If8A4rcuXLly5f8A+BaaszJfKL4COQjloT4Iy8HlGC56g/7zGKdQaoYXNRfYQF0eWY45RZcE1jRnligl+MBUvJ2IFqY/EvuC5fggF9i/AZUMtHiue3fuGiWnMnJD0pOsYVFbHRFijrxmveJW/EUeEXNw/tBiNERhOGGYVQDJjzh7qLogOVXMMxDOcldMji2XAgA1s4HOVlDqgUB1vVofOHEFqcVLG7KbE1XY1wZ0SKIQqtfmZopxVfGn2gxI85cIDaHVgIovWjROVaXLH7gtr1QeqFIXGrXjAUpxzUlocSXwKWjTp4qj7zbYit9Jh3JSl9yn3Kfcu2Qvt0+/T7dPt0++SzO5ZEYC5HB6Qe+z20vE9u/cDew1iWIshS8bxGLth5MqwU1IzbSXq7jU3dygWfGbdj5HdPmt5ci5bLgZuh4i0IqdozlnHGDLrWGjRLS1ocqRDC2+UIQgpo3vKGfaaPCxcTj4Rhxm5pjg6YJrYp4A+veBhnnKIxZOKvCHyiJibzVDHgNSZjSk8LxDIKrGqsVMkloC7W1H4ZrhFV0kuoVaIYgfSEucEdSq8NiSENra57j4HHsewQjIElzcnVNHeZ7Zl4mdWtf3E04OwauNRmiTgRpj3w2iId9XUZgG+e3l4OH68YvicOxkPJt1KgLX+qj9x7j4tqYNTTJhP9H6kzrUdppx8pkL6uLmwN0XVN/8mkgXMxU0mZg1lskLS/8AZRKUGcHPzmKRw2mgKbbxVbyC/L7yTMTlBqLVvWXxkDACFWQ4THxE1glg04TJVa3yqVpkrhWs1Ushk8V5UXsKs4OMyJFh0ecXjGDaAGoYut6gsRTVcYF7eAGXNNrY9ZQElytrpvMiVBYWYmhsDonaHmkIvKGVHqnqkVRxqIcoIfr5S49i8vD3zPaMvEXpf3KRwyxi5rRFmQsthhBLCy03vWVgpVDzTIZbd94/mcO9QausQav5xarwYewpTghkFqHvRU6IrfySvrIc3EdoRycYTpeZ1ectmhSXZskrCmnDqg7w2P7VBwC4EVfWIxN2z2IGa0c5sAPGjEf1FAaK6jeccvYqxhgeXZO6z2T2FSwCrSNvTdaf1MNrcyxJxBM1oC63NpYXWDO8ufObdlaLeEExbkratJveP6TYuh6ukt7dnJ0ZWx0BXxcCylRerExHVLqWjRNF4yqZjf8Aw9Zd24tCoTgvBq0ypWmka/xzjMR2Of33XuPdewsXV2hb0Qd5nHKYWjBVxrD0Ey+TEU2tgZUjQ3iTluGJoygN7z/pmsItdaIxrGSEsNBOcoIImZu7WQGUk83YysoqyNATBBwqZQXC/SPjyprIzIFpMt28AWgN3DlBGbkEFs4osUdWgCTEKKacV7wbfmq+cSjkXfOOoXQq/Gewr4f+S1rkfYT7Cc2H2k+0n3v/AJPvf/J8V/J8l/OwXwH8nyH87KMti2klTQQO8wTgsWOZtHLS1HsYxDPONcYQocToQasOO/YP8NIw+N//AJJAd9iRJ75JFn/szl/VnJ+rOV9WIWW88wUADgECBD/EqV4QAruCpXgsTsPdAED/APAJKlSvxbly5cuXLly5cuXLly5cuXLly5cuXLly5cuXLly5cuX49i67MBzzCPA9+fTM+nf7Ppn+z6d/s+tZ9Kz6V/s+lf7PpX+z6V/s+lf7PpX+z6Vn1rPrWfWv9n1r/Z9e/wBn1L/Z9S/2fQv9n0L/AGfQv9n1L/Z9S/2fUP8AZ9A/2fQP9n0D/Z9S/wBn1L/Z9Q/2fUP9n0D/AGfQP9n0D/Z9I/2fSP8AZ9A/2fSP9n0D/Z9A/wBn1D/Z9Q/2fUP9n1D/AGfUP9n0j/Z9I/2fSP8AZ9I/2fSP9n0j/Z9I/wBhHPIDM7yPeASxs8Rd/wCdCJ7cX/bIs+06QeHFeFe7HKNLyL/u5iDnm3g34K3XDf76pv8AleAqTNzke70ln4IACACSCAR1R+ZT4l1rRgd/27OB3KAJpB5/h0OJ+VT2anh/IbvgexYaHczOwFtBbK/rgVpAJKrXfZZNxg7wmFI0TUrWXJnWGr6RgtuedIFA2r3hhSDkBcpcTAZxl0Ak90mvjQW4Yglyja5rkNLauIwUnZcV+PVvji+J3Yd/2LDQ7jy69mMHVMhdptopD4mOxbVSqUrKGv3yeffLLldsVmDQMW/SZhhHZL03i/HhU9UPeZ8lZAwMOS9lIiGBVn1Rcjhh5wZeF0WRdHlp2K1+PR3Ml9gW4jDjv/E7vgewYadzpbrOHaCrbt1NOy+25fghYxVbfxjx71NoFdl+Tv8AxO7Dv+xYad3SGEabvWU3espu9ZT7Sm71nwuU+0pu9ZTd6ym71lN3rK7vWV3esru9ZXd6ym71iuCoitb/ABgtrwzTfe+J3Yd/2LOH+dqvurUC9033nxO7Dv8AsWGn+lNEW+zhvdcPd+J3Yd/2LDQ/ztLtWqLeWBbKefYiwt7jq7vxO7Dv+xYaHd5Llep5rwsPArVeokzzdxfh9di5jbdVOPhNYmtA0xfh1wHZqK1AuBU4RAK8ELVmq8EWiMqy7ecyjdq7Hu/E7sO/7FnDuD7Rw5zLBKbUeUpqLYZhSzgo3yTXiZ3FqcJuOfvL34TIQ91mKl50tLui3AdgNZx9IBJNXBM6OOcJYfcFynNwGRP51YjxGwStTn97aXagLTqgCOacXlBpOFs8SWPxguMSLdLYfrwDmo9YOG8vWmq1MyYVq7FO1YJaywKXVTasNbSUcly1gVTWDf6nCFEW1cZf0eotqUZEbmyXmY53zlm8GSsxijGny+pvjbrUqOWotqIHmLezSL6XBTXCV6+Ydkaw1qG3bsxONWm8ZWmZUFu9DEJoJyHkR13nzO7Dv+zYaHca+nBEZZlBTDAz1BkVi4KOprMdCtt4wOFXZdImoridcy/hbAT2xiRGWHaKPeqd3sZsdR1gKwbVXmiG30XQ9popIIRVVH6JjrRpuVFhQYTFy6JI3H6ioeFDGI5y9xHwO0ymzu4L9IxmyiTlrM5zFV2USpqWn1QJp+6zTR+zSPDygn4Wk0rWV6zCvfa8cxMCDQ7QPEAP1P8AnP5uPU3c/qaYIvVMBFrbxgJoK27BEROKf8gpa2NF7DuucEU/90xrxi5c4G7Go773zO74HsWGh3ENgZElO8IcrOrqiUFWMD1HkmNQSXNZllufJLkLxihBmBZoRZzrldlXQZcixIURQbrmiCXfJvMuLbS6soZD3ljyAS7hRgNCOdfGuuIBSbFEqSFqbyx0Jd2YZiGAy8kt+u5xpWcucAgNUUvn+n/kDgh6ogJQyO00aFYwLgVYHk1FXXFQ1UiKOcWsvXyle8hk4hNwYqMGNuTclCOuEzqldiaj5iQ4UEjCKFHSKjrdFWOmKj8ZYowQQGuOwylMwzT2Kl3aODBC1AhB1rv/ABO74HsWGh+cwKazSmue44xGrYuRUREtNr4412Dmc0pF7F9FPn4HxO74HsWcD/f+Z3fA9iw0O6C6Tozoes6PrOh6zo+s6frOj6zo+s6frOn6zo+s6PrOj6zp+s6PrOn6zp+s6frOn6zo+s6PrOn6zp+s6frOn6zp+s6frOj6zo+s6frOn6zp+s6frOn6zp+s6frOj6zo+s6frOn6zp+s6frOn6zp+s6frOn6zp+s6frOn6zp+s6frHXHp3vmd3wPZsNDuWKgBR/q4OJx7vzO74Hs2Gh3Dk/gI0c/CSnPbStBEprj4dNXURNcdqFBOvhCkdz5nd8D2bDQ8MHMzYeCWfLmn6jWB8LKc5khyPDzSx9F0GNyajJRAUPODMN3QuXWBb1jJC2w6wzR0bjtF/m+VFcICFrE23TrU6RygXKB0ZUv/SaGSWBxesdiurrK2qHLshZSpSRAEcConklqVm5DXJFk1vEMWYBpmI0hwLySq0srGb2SEg1ldK4yuKugtXKNEVAJT5wjFMq9XvH0eI5ERdXALNyDnSznhmZINW4R05vGg9IOQD+4yUjczWks8HrO0uUpOk4rYNoIvwjArNyKjF0pzmuu0Ri+grk6Mphu7uvcdz5nd8D2bOB3P2dovnrOhLjpwmxecMmkp7KIlOOzEGxlMuqAUQATFbYzDENTLI51tDKi0Ae+Jxhzdn1AnFi0lGpdzSlwXNqxdd6APLVS7TrR10jRozU8owosk2iHDhPOXyx7yLaAommtxgVb6iUDV0KlIw2vNYmWyQtx4s4qaGInBIsws2sQi9DeEXxlhllbLMArkLc5kWbaHGSMoiEf8QXQD9o65AG+MFhWAveOp1Iws1xM2OrzR1znDz2nDYAbmYNpuSbksBh9K9CKUAKrHqoaGazhmR0y5uLAuJjkzOKRdEshIrm4kQwsW2de77jufM7vgezZwO5+/tuOFAQUOGa4Jslj8fBO4wTSi62PFQCl2yRF8XobHie47nzO74Hs2Gh3P3dtV7gDpFasbNr2sVUMwvhqE1gMFxHaL4wmeU4T9d0pgZr2R1bBHuha4Yo1l4QcGXlLYj9Mu5KgwZ14QEhXAJxndyc2HBKWW080RKY9H8/3Xc+Z3fA9mw0O5+zv6fwxA6hQ+8DhYa+es9p/aEAZeBrV4h4bRNGE461963DHoK2scZkGWW7xcbmK13S3nyr35QyRl6V0gEwQxscalAlVZrSiCQ0iJdHnhLijTjo2VOv53uO58zu+B7Nhodz9/fsaW8s+5E1+4DKrmqh5dgFWDVTC0LhzixK7itSJHYtpb4GhtLZNwiA1Okt6XjF3Zle6UWM0ucpkRRDE0t4G7FvkiMlrlfznb7nzu74HsWGh3PPv9brb3fmd3wPbRLJtjupFN05DOUyuzOUzlM5DOQyuzK7M5TOUyuzOUyuzK7M5TK7MrsyuzOQzkM5DOQzkM5DOQzkM5DKbM5DOQzkM5DOQzkM5DKbM5DOQzkM5DOQzkM5DOQym6U3TkM5DOQxOCusVW3u+lX78Bm0WR5/7+Ya+k08BjEWcBy/3iRvibHGGvQ0eCCIsYzBc/wC4CMfgTLa8JzAYFjvFlPdItkG+cdEY+on0E+gn0E+gn0E+gn1E+on0E+on1E+on1E+on1E+on0E+sn1E+on1E+on1E+on1E+on1E+on1k+sn1E+on1E+sn1E+mn1ncxjH10+un10+u8KGMc5xjGOV0aMyWxqyrVLqtXxquV41eLUqVKld2pXcqVKlSpXbUqVKlSpX/AMfuWSyWbyzeec855zznnPOec85ZvLPBs3lm8s3lm8s3lm8s3lm8s3lm8s3lm8s3lm/g03lm5LNyWbks3JZuSzclm5LNyWbks3JTclNyWeIwXKTcnKJyiconKJyiconKJyiconKJyiconKJykelM3Th7i4uchJvFzkpyU5KclOSnJTkpyU5KclOSnJTkpyUd6oLdOHuLRb2AA8L6z66fVT6qfVT6qfVT6qfVT6qfVT6qfVT6qchMOF7wypw+EdB+FUhnt1PQ/Coc4rPxROjNJkPAfCr8Jwuy4cOfg34Tgdox558C5cvwdD8B8EOkUspm4Qytng/r7HSew8B6QOLKUcyRrIdQlJ4P6ux0nsu+zBgsFtWBSLpZVRNchVQcpbEOKvwH2jwGaPfZmA1M43c89bSwRC45eGuk9h4BTHGbsrYXlEXJo4bR3m8hDTv/AKOzU8DItcFmqm0iRsQGsAu4h4EZAso6w7/sjvsfBQ3aM3gacZFQJ4ehdJ7Dv4HVaMqcR3K9ywXHnOMzl7s6AvWGnf8A0djpPZd8kLKmJlNEjxhsl+ThEH8VDtKqnkh3/ZHYd1jNDwDFqeLpATXYwDe+pqWp4H6ex0nsPANsI0NOxFNYCJuebhp3/wBfY6M9t32HKG6XYo6oasVOBFHFKzOnO8t+B7I7DusZoeDUrwf09jpPYeBUqVK8D9XZqT23gVKGkqtPB9kdh3WM0Pw/09jpPYfh/q7NSe28LBTKjg1x8D2R2HdYzQ79xKvQV1DJx4TPfFylS0Gk4eB+nsdJ7DwFAh8eoN6wSSvgI+eZ8D9XZqT23eQeC8qqXFoUXZAKgDKxu4FL65qbujqZhra9ax2GcroltHvX3vZHYd1jNDvpDMUyFjsoeuiVSapy8ZRfgXgfp7HSew76yvsesRZDF480Jr0r+me3eB+rs1J7bvHDBlPCa03LhWLE5yXBtKGyg9I2gAeUE7QoUjXUjAuYO97I7DusZod9lQuGlrHx3FmG1FYMecZtPp8B+nsdJ7DvusM1LQ4IYlVouVdpaKziWLNjwP1dmpPbd4gA1rXIQxUtP7mMUxXBCPEyz6Lm56NzjpBWOFs7/sjsO6xmh4NSvB/T2Ok9h4FdlHg/q7NSe271dldmkKLfA7KO/wCyOw7rGaHd4lvsyzi6qZly+7fe/T2Ok9h3QCJ0FD5W4jcs7z00FrABNHPd/V2Oqe27qELjGXuAvVJjr2KLUPNUROgtjNWFne9kdh3maPdzu+DDagQ2cX/JXrklFvdOMfao0FNGVQUELpx4RiN2W7xNMlRjIxThGjhbRKOrNafYctvzJQiuail7v6Ox0nsO6qn0F3CNCWytJrQ9JlzAWJvfnCwtIbqtfTWWqoxkWcFX0jLDfgPkGaEYWDltKEXGols0rMuHus+ip7F3f09jpPYd2kLekh/1b6TKbKZwOowcOYXxqsD0gKNHOeEU8mV10gGAgJVLtHr0bjYI86fltWkWMxmIFdNYJiq2xpzru+yPAZo91k1ZVjMeUycrqJlvpV2lkNC4aYr0lCzuu6bUDSqQoILdF71GRVa51mBLWkYr0hwGgDv7pPYd2w8AHlGR24MbW5qdVmgdqiADCACCTRWldr5zFoSeRHFJFXasyA1qLx6QAUaHd1unY6T2XdwTZ46w6NGCKP8AZg+kcXawM0CXluEFXVnXyiBCNO0D2bi785auBWWSUX8ru+yPAY8Vt+Fxi23h2rTt+Ey7e0+sfhjzSHgDkgifg8E1gdvAecLFn4PXIFHbfIcYIln4Nm9x5QKPBSZNGD4kpsymzKbMpsymzKbMpsymzKbMpsymzKbMpszqR5SB3cqxluPolYV3Su6VhWFYVhWFYVhWFYVh1I4GiBUO2pTkqgjX09uVJU7JUlSVJUlSVO5LZ5JCnhJKlSuypUqVKlSpUqVKlSu7XZUqVKlSpUqVKlSpUqV4FeLUqV49fjV4x3q8SpX/AMf0SeYw38Ofek+9J96T70n3pPtSfak+3J9qT7Un2pPpU+lT70n35Pvyfbk+3J9uT7cn25Ptyfbk+3J9uT78n35Pvyfdk+7J9iT7En2BPsCfYE+4J90T7on3RPuCfYE+4J9wT7gn3BPqE+wJ9gT7An2BPrE+oT6hPuCfeEL8l5kJHRMGlTRG/DBFaCJqTh3xc5y/7ZmocXqmwEPw8I29OfTt/vayuo2bRIrGzwHSO/x/3mkVXkdHwHT8prnvU7Mp2lO0p2lO0r/UbYUv34HsmGh3Na6TRA72usBzgxKae3WEKTca6haIDfhNyWrSEUXMeEZnKqPGxgNBiiBiO5MK/Hko99865TnLcw1TZEbue7BL3OgMdAi5kAOReBOaKqmgs3sTz7adlPTDeKZ8eM158nlIcGzV3TKZd6LEUo9aImF9sio8as3nRo6E0roC5zTwmPwPmd2Hf9izh20RKrweudoJETiS+J1oNJRXkvq3XJkKzlSDfZcWNqvElwcW8XLAK+1L1lVWcnC+7Lkz09Mwy6seonS80kebqh4413RjQXWyMmuCRoquPViyLR4MyxQhyLjkawdIgCm59GO+sROGINIum1aaz5POUJtW1YndbJqTgNQfQihr2JDRZZwzBSN5TLm8A0gvYtSXe+Z3Yd/2DOHbr9O6mUTVRp3fbdtiPcoUZxZGwM2TQj0Q1INcLeRpMErdHjHeboCFkXlXE1JB6IBNXbblF61Cc2WMzSj6yqwinymorwbkQ5HEcYxauey1S7cRtUFWIHAY/NzBx5J9Zo2Ia4nGWi/AnGL5byBVTyQBGCaRYBqw22uvmgiuoUrp6uCiOpc8wlS/HMGCslbYdqmGYO/g9me3aWWDETDr3Pmd2Hf9iw08AkmJgMbCY8oL8+57D/IzDh3sPu7nzO74HsWGnfDVt+ilSMhl2iyF6g7nsPy+Hiihz7BaBehAbuDxjnD6Lk7/AGChy7nzu74HsWGnfiiZp80+gjxazSJSjqdvtO1CIk2WSwgqKDvAuahyJ/yKvwl0a1EGxtRoesMKkpJmq1pqXCmoWZMc9onrs4miQGvmjVq8iVuroBp1I+mTQ18vKCheJGI6AUNBTKUwyC7dgl26UOM8yVgCUCTQ105qvaAoCk1lvEMFcc9o4fgw0hr8n6lPVt9DnMlJegcN5k7JhxrWJHSsVD1gkbtlWXIgSupEFP3psryYOoKsq/KUtOqY9dpkDzWB6MAD1S2YyoU6D3FfK7ElI8rlcwMqKEquO9dXYqby7nzu74HsWGnflUKPG6uY20wPWL2qJgDUe32ncMLMgwZ6TAFcYgX0VIwCVi4M6VCD0sIBGGsUdZaEiGrAgUqcbqlWhW0Ckdll1I3dBHWdRmPO6wVWOEoZlR8K0xEEQXoDFZYzVkCVCHHGNkFan63eO+2pYaO40qxLwZDLrDJS6NeUvqpy7WVcoJl4XvHtNQF5VygqazjVTGOcd8HcDB2uFU+gMs23lSCA1HO0Sxa6pquNSEjTMQDcXkDyiK8EKHXMBuDyaX3NXttP0Q49te53Hzu74HsWGnb7TuFSwoO2IuXbi9vsu8bZYShh8R7fLuMUhGo8vDru8fBGmyENu4At12j3O58bu+B7Fhp20d8fCqpv20pFygwhNTWk4G8F8IjePkOxSyNUgCJfeYUSniwI3E3sDjM2HyX2FCU8U1mNcFfyzYHrPncSYqFtt17vxu74HsWcO51TwCMxbnt2jydJmODM8lHvB6ffnL/5L3U04s21lb1pDldwaOIRooCGWeSEqkaJ11xBDRj1eUANUQwrvdy3oN0a11qWsVw5Vz5TNRZfdn/D+N3Yd/2LOB3TQM5ntOZ7Tne053tOd7RbZ0l257ti0AW1RTYXEiihkpaW8+wETWiwp0YiGgCGReJQX1jxGwhrpKE+IApFeKbyzFxxagF9YE6lcENf4fzu7DvuRIr+qH++zpwjyh32KJ8Pq/3rNjomm+cu7x8G+JrERNWaf3/uFmPoEq4EMBJ4LFQA8GJEbHCC/hT5v/M5vx6TmfHpPg/8zmfHpOZ8ek5nx6TmfHpPg/8AM5kedHnR5/x6Tn/HpOd8ek53x6TmfPpOb8+k5vz6TmT5k+b8+k+L/wAz5v8AzPm/8z5v/M+b/wAz4v8AzOZ8ek5nz6TmfPpOZ8+k5nz6T4f/ADOf8+k53z6TnfPpOd8+k53z6TnfPpOd8+k5nz6TmfPpOZ8+k5nz6TmfPpOZ8+k5vz6Tn/PpOf8APpOb8+k5vz6Tm/PpOb8ek5/x6Qsyn55SzZBsITxuryv+VUqVK8SvEqV2V/8Avbly+4Ll+IAC5f8AprPbwRrAeXYnxDsT5RPlk+WT4ZPnk+eT5pPgk+KR+hnySfJJ88lH8SJ4j6Mu+JqtSDfg0eriqJyX+l74C3lGQhn5JmTi1bsh+6gqq7+oz1ZVsHCC1dCCXriWTQco5dpfrASghZFeSCJY2djHabTLe6FpO7Mu8s0faIlE2urOHhPgo1UNAEQ8DUnhqvzlu1G8F84kAmzxuE4f+jyeqH4fyQxag5NLvQmuUxOIj4F+DjWfZqEIiO2QCm5ZfOLnDFugYCl5PpG6+hS8ksa1L+yX21GkHA6wmGUmg3lOxxiqB0BEMfQY5W8sNYEddZV/ZzlWf1H6s3QzE+eZ0DLXLS8Gey/slQAkVG940a3tXJHMhhCdiOMnYg4qxOLLhBwNcq60H8LIrSqbbJh5xM+5BaARtReI5ecSafm2D3HsUPD2AZKreiOXeiZIWalxcotAeRLn9O6cM7dwm8IRkjRjnKkm2eGYTjasylzU9EOVQFftONntzDb3UxAaw6sumCaB6vNdmnDpU90wNRyGg7GW3dQ+sXgaoRbij7gf6qUqZJwjDCb9JpUX+yzbsIFit0OMxUp4hJrmW2+cpkJx/Qxprygeie68JN769yNYFmb3gXwgIWLnxRGISpRd6mkYcKBvNRhvzhRuUOswiHw904vCo4urAqrX6lcrms6885J7L+yXaJWIs8opwbzVVRGX9HVY8Ii2aGlxIBdQtmAKjGHIsQI8g8nVzLBB+kOHHylKXgM6stRvko4wxpySx7j2OmjsyVQsYWf/ABg9OaTqwqYZpqeDXlMI6VQ3RGMStaENQTjF5JU+Rmz1RFMWBpThF02wpiWmFXqoSv3jEkuK9ZwdkvDEdXHnAoIlpwIHCLePXtXk47A7/JLgg/Rkua9YsCCOEi9+RfGvSFtHbSVK8WrYJhFxHqy9kNrVXLzLux0nWVfVlcfk7wll1Dq+M9MdLhAx0CoASojizN1Oq4S9mdCzS4oGDsurLz4KpK78IFS+9auk0OgBRND0NyUm6blmjRIKCDzHRGZyhGZ6BMsFBelNJarLwGfWbK7DpLMhwZfWb5DuEoaitjuPYrQ/n2XU+2gWiPOK6lZQUI8478Yq6q1FXVXrLQoWppOYzzguhTpNItrcy1ZNbd0EFrglhc3V/oklnCWHHBSieUp2ZTsynaU7Mp2ZTszMzsynZlO0plOz6SnZ9JTt7RHZmZSuBivrHBE/PNoIf6DE7FnonRKbSk6J0dp0Sm06J0TolNpTaU2nRDsgQ8CwLZfcaNWjss4PerDuq3sz6Kl7q7lN4VLr+IWNkCd5ElBlYZcBYnGBgCqL4+JUNPUxw7F0INV4QACNjxmukWrg7eAAdghdZgzrqW4qicQyLtKGgrIndAJXg3yCRorj1gJqsOIDNkT0joNhmL8sbURaY7dMJlcjs1jPROrJ7RD0JQvJe2I38TYPhUCnBxL694JOV4SGhBDoDSV2jlCzWX7AGzRfCiKcbs6HLJNjLZEl0Jv7LgMLqyrHCZPsEK7/AJCUAzQbZk1Ok1hw9IdNFbfig63UFg3WMPGs6qtnjCmGsuUBKDdEv3lIpYWcXD0ls0nACs+UtAORpasRSHLHV2xL4SBjZczqReFGLx23foRxqh8zhC9IDld1vSAe1UwYzfSDaRXceUp8sF6uwEUgrFWdSFnHLziUWLLP0JYZGj1OaL01BtECMTwbUElHu3rQlbQABjRrMcCJHLNNZV+yy6f+QWjN6NTW5acFzKU4TCEG56JZsuTN81KQhjzS44IRmbvjyjtVgs1t15RB2+GgVll44XhGuFMSqwlvFKluHlureUrqi9W5eHqEBzF/IBUhLbS9VleLteBe8wROV8Lt9h/lKjPFYOXPGXOP46RtcAgNBUYquJpVsveaG9mlvpDjzW87hd4B1soT0wujKX/KqBOMKGWAbrLiHdGB4dU1jweu4Bo0mABq2uXcDpFZ4VAuw6twz/UNMaL+c/uVXMCxfyxR1I8stCHQ5iApyMadWu8zfvLnWbduVEqHtw6EyXM8DEQums3+spZtnhKA7WjgjtPNedkpRjbpK0SZRSgu6zxlUwMPNgBRx7i1IhDSysWnaZ4tqq3zl4e7r0P+w+bCmrNcMtPllnOqzTTGvgqZgTyjlKbxHTse0oKobs1Z8orSu71FI8zjroGIIjow8FXXCuFkDTm6IXaUzm6ori8QVxHzwWYwAxdHL9kJtNgKtMJpxHncf5sar3/YaW2DVELz5TLw9oRcXDbATpEt2zQZTHVBr278v8AGgJDk4eOdeh4gt4TgloDmo/8AmmM8gnCA59iPoJ9BPoJ9VPoZ9H2E+rn1c+rn1U+rn1s+qlbk6EVtls9y4Fly6BrHSw/PYVLStSlqUpSAAAhCEIQhCFKUpVcfIqHvQZINw2dxotgJrhx8FOLUHq4y5cuXLly/BuDBOY98Fx37a+s4glSpbqy+y5cuXLly5cuXLly5cuXLly5cuXLly+y+7njTREAexaLjqPLvOLwV1ijuaCHnPtZ9/PsvFxowNnZtFil9lwHB1M+kT6hL9PzNqU8YljjrsekiqKnF4Do9O4nV/M7RXaXr2kOWv1g0Ph+yntuxat328evkZYC82HSFbEIOy3UAfl57Y7NL2a3wHR6T2HY4F5RVeLfY9Tc0vgg7M0lUshKjljw/ZT2XZp68ezyUdlgFReS+MZxyleyWKsS8nZ5RnfvBHdWdlRdzS2XxarONFtX3Ce3Oz9/s1vgOjPYdnsOzn6qBuWH9jYY89GaDsejj2fuezihfm4S/kIL6wDwiQebLWWpWDcZwSDPXW8E9VB8hKCvnUOz2+ynsuzT1/wBx7PfZcgngFyzZj/iIw8MQAcStYIT9bsQ2hV5SqomFwI4moorqxuxLNjPeZM9yXq7JVbALTedYpWA1kvjU1KSx6OkVI61VexGXHuiBiSVHWbHndRuI5jEOZyhm6HFKuoMlcrdsbHzjMxpoA6Wv1llSiXF+c0zD9xtKVTUe1EAHCskvozToDASfwOHYT252fvdmt8B07R7DsF/TJMEiZZWRAJ3azBbsb5Vwn7nsVN5jam8DGj1rtjMKpx0BKxFz8CiWtDlBw/J6xoLLVc8JQ4mmDuw7PZT2XZp6/wC+332FmHokZQGe/wC41YVg4o1j8pBP1OzgffQ4wf7pnYEO/wCe9Zmy2DjtDGKD6jrD3MHg7ftMurrz5RceVaAwJ2CeoYzSCKcImSqHA/tH0K6IcqmmV1tF6sUrVR4A0lDPjrqWO0VuhoVEjMbmteagTAMYBwlBvbUg71HGXuuinBqCcAL69CS5C0UXBrCE9udn73ZrfAdO0CxOURjg9gAy4cEMzzUiK9mbYQ0eb2cAc1RoAR4MQlUOyUYVjaFAANggGgDYxDQA6Hb7Kew7NPX7XW3wicRMDlCUVQt0yqoovgQiHDLXY0LDWjWkQSksYBgOThAAoAOU4Ad1ZnskrEQKQTZJgNLMDUQ6h6mk4xCFBTRrSLBBTRTSIqsGtyIFEHM1mk1tB1xrABVFbVAUABtADAOkQpYNTRBrOY6AevaT252fv9mvwDo9wEdxdghCUUY4sMRw8P2U9p2aOv2sZg8yf8hCEyCbu04aX5ftjsw7HX4DhMm67auJ25cpzUc56wHj9ZWijxFpa4QVTsrn+HcrBvcwz7DPtMB4vVKARy/L0gtu8dhwDgzWa3wU9WIAWZ7teKoCriLwA7VRGE2a8T/Cbizq7QTBg7AUPGF+hTW+DUzMiPGXmT6afTT66fXT66fVT6qfVz6ufRz6OfVz6ufVz6qW9POigq64Q7VTIXM3j7lfjpS9a3ve1rXve973ve8r6efRT6SfT9jvp+x308u09KGqx94dQgdpmmMWbP8A4JcuXLl/gqBbGVDG7Oi6Evf9Je/6Evf9CXv+hL3/AEJe96Evf9Je/wCkvf8ASXu+hOr6Tqek6/oTr+hL+qGkY3IIlnbcipoMG7rL3/Ql/wDkJf8A5CX/AOQl/wDkJ8gT5AnwBPkCX/5CXuehPgE+AJ8AnwBAeHqJb/Qu4OOrtN1F7npOt6Trek63pOt6Trek63pOp6Tqek6npOp6Tqek63pOt6Treko4gh9e3hYDo1lfhKo4/bsWi3SX7E2/CChjZ/8AA7OvwOLl/CTiaky/gcJnzM/hi1yjsMdPniGn4ep3y7Mi2z+Jo/PwHj+JvbT2s0ej/KIe2PAePh65fge2nt5o9H4xfo/EfpHgOnd19xQLWiUsPTKJRV5hMGNG9fA9tPbzS6PB5PbyzOLJXlIqSg1WEXE4nhF+jwmmsEdG/B9kd8TKcYEUd5gEuSnJREZOE+cxxRWVK5MclOWnLTkJyE5CchLeCAFViFVYdwm8j2mcjOVnLDXYCcGqGGS0B4CyQSWS9GkptFW6XOS7yS25Cch2YqghiyOzctOW70kkLrCo007tmfEqVK8O/wDLbRKa7Bb4HGA0vNIJ6p46r0NsSPLnGZanFC4TOoGOCzZwx18YF9GUsA60/HtsY5GkDTxwRNBEAG1EB4CsTvizs0d5gipEmZqFgRgywKLXxnvUUelr6syyrHeKa2tnHyOvjfDbTIsXvn3EHGoqfnc/HaqpqAMV05LDgpZA8DwB3zA3G3OMcBgYw4jLRHC8S3eN7tHH1N7sBXY+TWYFDV+LPgdZw8X4baX0l6kfKYcrOFsU+U+NzfHSm+vAQXPNNf8AUc2riCARse+nfYWWwpMHhAzBWMTWF85NeM6qlAmi+QrAe3twMByLgUECDCmWvvDxX04R6QjchRMaznpEhDQhSlAeb++NbFtEFsWBf7nz39lXTiAx7wGaEDn4rfDsqVKlV49fi1+BUrxhHFDD1lSywK6sQCnMAtiDz4FOESr1AuIMNmkpi7LwUFDzholjp4WE7sYMabajlcaS4TMgjWVSeUdU3nrFhdqIpPKIJmxpaaPOIwmq3iCB8ERKr9+EpOBmgYuAhdmsSBy2tDTS9dIuoJdUsejdbhXWC8zDBB6Mw9YaN9JV1KmWcQMJcDDT0fCdIvdqHLsj1MrPc1/Uo6bFt8tZvqyjJ5RZtoECnh15xlAQPLKFL7sJfTfxBhLt0dEqjl4rxlj/AEDFcIXLrxlyZqA7PgcJhSsF+ULza6088sfvia+FzTCFdFa/rVXelSrSAKF8GZcjKbRe4fQWqyXxqXRREIu9DMyW6rcusVmGiy2s1DjRepweEYOrki4qaQlmVQVD2OEaSKql6mWhVIymr/yCxU4LMXWdGkfWEBFGrApKYIb0ncg8K9i1qw4mxsOvFHeBYC73cKRiNlXLzUaGm7WNImxbXnhDK+BWrHzr9eI2jbsVY27avDqbrqvVP5K7KlSpXh1Kj6COu1X2VKlSvFqVK/8AjP8A/9oADAMBAAIAAwAAABAEHKMNOIEEEEEEEEEEEEEEEEEEE444444kEEEVZxLtXAY4EE444g4Q44EEEEEEfLLLLLKcEEF7pb4cKb3EFPnPQ81X3UAEEEPpUFUgwwlQUkFZwUoxEOC3aJd1aIZZa0AEEEeQ266KFoMqKIFZmq73YmlxLJ3nap5aoEEEEEMYW99LljQ7GoFY/X5ejMvHEMCAAEEEEEEEEEOtuuH1w4z3AEEMlU3ORFb7777777777777777yxzzzwzxwsEEF63iZ4e0U000MMEE000EE0EU00MMMsMRP64FbuB8Xkf8AhD7HxVhXrBd5Hj/Bd9Ceqbv9S62q8h19VqdoB5lbn/A/jB9z/XpV/qG7D3VhF+c+839l4LykL748809rDV7Xbfh/9ABWSj5Bcow+8/QcL02yFoyK+22CF/DPHpV/qDzve+DE8BA+9+MoRcA0IX4XznrDdvXn/Bd8BtH4IE58iEA+9+0jfpD/AAzleQ/wwPR7161v4BKngCHY1gvAPvfkB/bA/Tg6JkviHoiK91vul+5GxW8SIlvQPvfqn8dexFxOk1h5v0lRCurqytaDohucRvlwvvfrPwxIB+XQnqgHKnHdgffAHIPA6Qf43qFwvvflITXwcTRz/oDMLeMHSVaxOAAL97//ADkBcD735AFygBQxYdN6kDUbR8uqN+lzCBWTT4MCcD734ALANZ+eq9w/Fd6K5LFm7YHcvG8Z2gJTMD736lcANZrPnwpyQPzz2X6J4IByd+L7yALwsD7z63+MLaNyhKvA2KfelypaoATtb5/6gESi8P7zD6NzjzL8NG0u9OEV3sHxTvfmU0E3PNhTEb7zUQOVWFf8FX0et+l3yBSBBn0FyoboBSTtzz7bkCrwzgDzy5iCRDQw/wDNpNOSHPdtP/8AwPiPugdlFaQAAAADsIHLAAAMMFLPAFPMIAAINflugQ+pkrjjjjjovvtHkvvvPPvtPkhsvvvvoMJ5gVtNvPPPNPPPBfZ/PONPPPPJKHvPPNPPPPGX6FpX/POEffPPEJHvPKTltPPAYHvPKFG3fPLC6AgV/PKBz/PPALPvPL2UlPPEfP8AzyuAtTzxQMAIFfzzgDTzzwDz7zywgDzzxX7/AM804VQ88UDACBX88rPM888A8+88+mc888V+/wDPKM88PPFAwAgV/PKPr/PPAPPvPKJxPPPFfv8Azzr+23zxQMAIFfwQk0GfzwCjbywkwrXzxX7fygc8N9TxwMBZl/zww3yxzwzzfyxzzxzzxWh3wyxzyxzzKEhds7b7/wD/AP8A7hsIJrLPPPPO5cPR7/8A/wD/AP8Aq/2hBq2L/wD/AP8A/v1qWDH/AP8A/wD/AL970qv3/wD/AP8A744ugQVqkoggggkogggsgggggksgggsoggggkglgARvtlyxdaBipifR+87zefezaBCLsvNPACQUvgPJxtFa3YV619aV6wHR835fY1qloaVOFogK9fvD/AD2xox7APp+h6AT5qvxXe5kPleFSh6gQvz7z930tX8MgPdhoY6WIvF+r9DK03EFyuYZwED735SENLwH6eRsakH2GM4H3p6Ue7wSlhfEwsL735BUP+z0L/dCmBdlGnN2xvlvnd9TksUWy8L734DoP7J4OFA7wBmjV2lTwD4f50DzK28Cj8L7z72j7IzD0143yCmDfen+oLpq/kXwKoDxRIP7xBmj4FWFiWl+oHxcv8H+hSJaelXpagAjh5774Bcjc9s/tM/OEWte/kX0ZIjBMxCTwJa7ClTrO4Imw7zywzwwwxzzy447773/3/wB//P8AX+fPAQdu/HLDTTDDDDTDDRTDDDDOyneBtdevtgJdAQRqu8J1GsfdBjDfx5X+R/vdEQqzYz8awNDhgQVruGiptJHNDPMmt2PoFwVimUUQQu++fw1rQQUvuMMsPsturvsstv8Ar74FfiyIDFOEHJBcsQEEQaeE2X/8ePzCFWti+3UkV7jCSb0Exji02MEFa23332X0t33410l103lKw1133112+d82oEEEY44wwww44whG44Qwwgy+gAAQwwwwwwEEwEEFYJLHe8gDHus0pj/6Mf7KYII8sfO4LlPn+EEFYbJxXjP+/LCnmPiVFXiwzzDQwHGEWhtwcoEFY1EG1VDEtIH/AIvGw1JO4+qAX6tLNVWC3KqBBWVACMWx9wCJ/q4QbdBA8mtzpzGRltLCTqqBBC9WeRf+6CV8g9ibmnpc99gE8oABBxsjjqqBBSHyGOKmNZmWzJPsMMN95kwsAEAxh8vOsWqBBFu7/wDv5f8A8/8A+caQAAByCEd/t99xRx9/dfoBBaGZtNb+6T3OqFBTpA6rHUx91rVNwAMBxdnB+pc3n5vO3/OW78BIQtB9NyNv1/PCykcfGru+hrMeiAW0P+iCHvfOdwBykM36PxwCMtRzery5RIsJp8gi919pT/8Az/6hv/vq3fcw7X7jRTVWeb/PKBX/ADzzzzxtGvzzzzzzO1fzzzzzyyvzzydzzw7/AG888888voB888888Z5f888888bU0888888qhme88884s88088888ooc0888800Mw88888KylYU8888Y5hTV8888JvTBE8888IhTx888888888888888888888888888888888888888/8QAKxEAAwABAgQFBQEBAQEAAAAAAAERMRAhIEFRYTBxkbHwQIGhwfHh0VBg/9oACAEDAQE/ENHq/wDwX0Si0PX7FfTQhCEFwpUbszJEkJvoMibNZQ9t8fQRhWUN7lKUulKUpS8aLZF3Ox9DtfRna+h2vozsfQ7H0FlsMmuMzqtZLyF7j/zqI9ls/uQNiLd5chNnk92ZEJ4HMnElqObCGblXfC7m4c+T7UWROX3tk/A1IzyZ3vJcd4NTS57Y5bj9rkOoqHrkKzrQQNU5uT6j2z3cvdDx1JmHye7E6uHIHKjQ9/UVKNy8TmjcVd49zc0urn0HmC2/drEhd+35HFps9p5I3G6f0et22yB5eR51yEad+L0HlTUQw1+f6I3MkPfdS2XkiGGb2ncHXk7g2cxtt1+FBOaPdxeh3l6HcXodxeh3F6HdXoPqbPJDHrF1THNU4LqfVnf+rMsP7jX6SlLwXiTH+4yv+kfA0P8AuR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8DR8TR8zR8zR8zR8zR8zQir7iCScSH5L8i2EX1rAilDw8cHkJQ8lr3DuHcO4dw7x3juHe+kX1LcCyhY0e3ENkzdjl1SD2HTYSXyxAo/nxCquOGvyJ3IO49aK7PxG4Wixw+19+BZFjSVIU8y/IiJr7PIU+bPrRy0cIprqvudflJehWmzkTt5rl0TQtyukd34beqDFNfa+6HoxCxoi0XbO2do7Z2/ofk1aa+190PRi5Cx9O86JdSVDzBa+190PRnILGj3BczZEGJWrAnsmk8N4HdyMzkVE5CWRq6pJLZqOiMibOSEtKy55PucmBW/15iGydYqyJB0nNzZFm3aIIhslg2hiRnzNLYUsbGZTbfJZO3G2mpv5C6k2yT6DQk2q7LbZidHukGsTw19iEkm3jwzMcNRJdUbQNTqJFRfOVgaT19r7oejOQWNJZDuvIoe6ol/0gtKV3p0I5TNp3r1G1Yk015u7D82aUEhxGo0nGUJRnV12wYSPvphDRKZV3lyFW+ZPUebcyr7iLW5q/FFSxK3atvMchWU2+2+xECXRxryJ5YZ+S5Un2ER96MJFK7+xHTdu/NKG2c59hD0RGufsOtyhL03KDtdeZtbBUmPTdfa+6HoxchY8eB9+fcx5Ll9vAg6JCHkzr7X3Q9GLkLGmMUUUUUUUUUUUUVrVlFFFFa1ZQmQ0Vae190PRi5Cxpk1quISc37kWlc/sbfoIDc8CVXd+GNFzsxj50yKqo/jg+edPuMpdQ3uL/D1ZRSA0ra8/PYanN/6SSbfX8FNsts9ygfb8i7VslRNXO4NmdIF1aZvT2vuh6MXIWNMxdNN1v0XUprCTny/pI6G7e759R1W+O3QtqjaMe8Iw28yFvedHmPm360aNdieg63UrX5kpRNzbbqVRKkv5J3nyhbRtyk+wql9fz/BKasxeglt3tvt5m7cMfgSJPJL+C6beUiFHXb+IXEcqhK6NM3p7X3Q9GLkLTMLc3MSxZbHFscE6Nsppeo1ld2X7N6fJr9mBubntSXXs/MG1I1Y/wBDmi6fktf2tya29x+A+LJ6e190PVZFok1NJqMb1LcTFSEvCFiI2pNhIwjfTmDfsRuiQy8dKXgXnp7X3XAnGIQ81o0nnjAAgj6IAIACoEhNEObm1wqKeX1zFgNjwcKyKd1Xc+Nnxs+Nnxs+Nnxs+Nnxs+Nnxs+Nnxs+Nnzs+dnzs+dnzs+Nnxs+dnzs+dnzs+dnzs+djctvzOjHTwKUpSlKUpSlKUpSlKUpSlKUvgdyCSSSSSSNfMgkkkkkkh6sgkkkkknQuFt/B6NG6+C8LcjI1fg7tuDmPPAtQau3UXgS4M9HnVjmp0FyGs2jS78uDMQ865LHdd3eQxyFnbzFrmLXmPPAnTSVjsZ/3S8GfCnGmIx9996IX+hN4MhDzqmarInMqRbsitvSzHBmLXmPPg5+HkIfDG0+TgzFrzHnVjlglI+bZPsk1H14M+Jneb28yVZzitv8TgyEPV5WCVb7iPIVXb+lVyyv2QtShvPC1zFrzHngQduC1szHBnxbcC/IihRVv14MhD1bV5fcTDdqhyAJJftjaFOWuYuB58HPR58HIQ8+DmLgefDvPhnnwcuFqlFFFFFFFE2mjopFEZGRkZRTJBjVKKKKKKKKJNuKeFNJxTw5/wCVGwk3Nnmep5vqeb6nm+p5vqeb6nm+p2X6nZfqdl+p5vqdl+p5vqeb6nm+p5vqeb6nZfqdl+p2X6nbfqdt+p5vqeb6nm+p5vqdt+o+i/UVK+/RjguNcDELLLz9dnYaVVus8CyJElovYX0L6HlFpVohDDOS6FIxksWdiAvClCJrZtVZS6CHk2c4NLiExyZ7CxU0nhtbDkRMfwJmAlSgS2ba9Dehrnln/hyVehu7FEx0r8BL9n34FkWB6PVI3FnR4mk95t85YhrYslj2XMTlqNR5Zk3gqfJzaMZQtbPt07QS7ZxT05CRc5fkQGcM4RuKa2ftv2FMUcW/23/JS9SUtrGJtWzmrqjaUNN28y8jf7s3yFSrTj5/Y2czb6P3yFjVCcQm5iU209r7oej0LBk0XHNtxDoCb6tFlHM2McFMLTA9i8jZbl1i1khuKsTvTdyTEe190PRi5CwZNEpAydVHCtJ82GqNOiytHC1z/T/Y0NbrvV02cI5uqb7YYjJslXX06CyrfasyDzn129Slu3s/8HgPevbt1Fe7Kv36COcXM+HCsbdIpt3ICOb/APBJdct/8HvbmyfluQw+X5GxNolCiLRWiSSxBbGntfdD0YhYFraI4tL5UQkQlaWjRc9zeDztkqEmglJzEDaeHPuNErQzTijnSbQe5FpnJSIiWDndegK0YrR7X3Q9ULGlnVxFWKY5/r8jCUzN/O1iwKy/n/hBU+XpucpybfnfsM1Unss8oxqRzf5+h9r7oetEJc8/Fn0SlJl/rhqFunlCbAdududududududqdudsdudududududududqdqdqdududududqdqduduLohY1vDSyvjpSlKUpSlKUpSlKUv/AIiQiqRdzuoXXR3kd5HcR3Ed5HeQmqjGkI+G6KUpSCClKUb0UuhPVC2xkZNaWyE1NXhteTVEJkeCXmKySc1vKKmwxeQ0Sab/ALE7ZgNSQ3KUWChiZBc/sPV6QhCaQhCEIQhCEFohC35CmyfcW1O6tzIw5JsnjbYY2Q7dtt1Ft2GxU96vWRjYoRzl0g3Z3ljztGzVN1be3ljmPdcfUXcXynWb6keGbCK/sv8Asv8Asv8Asv8Asv8Asv8Asr+yXAxyfWPfgpRspSlKUpSlKUpSlKJi2C4jUZ028MIQhCEIQhCEIQhCDQkQhCEIQhCE8CopSlKXSGClKUpdKUpSoqKioqLxsS9x2DtE9DtE9CehHQjoNXkRtBJtEIdzsHaO0jsHaO0do7R2jtE9DtEdCOhHQfOR9to5p8DEoIBrbuH0me4UE2RZtiWxaXENF/kWV6NTbgfgQsn2F2GXheWIbfIVhWFFEdj7iVX3G4qxJKyCdTFiEXkkKORdMdiO+wiSkLZImwVqjRic4ZQgNVuRRoiBO7mTQz8HMeWNGvkRFYRr8ig8E73uB59xBDbgvnwTFiFSD3TX6F3mZmNiEp6DUKOl3JbRR0ankYFIx4Y2G75jaZEihk0MvDbvpuTlumNuEx5vsuLEPlCGyKh9JjGxuNtq9IY8Jtw03GXgYmQVdSopUUpdGiW7Ki6iDZm3U2KupUVdSrqVFRUVGxTbWpZZgLBeYvx1D0qNjYq4YRERCaReAxErI6EdCOhHQjoRERHQW91oktyOhF0IuhF0ItSOgpboSrglRBERERERERESxwtR+DBC/AaGtmJ4CaYawm486TR3Fo0awZJqhODBO0Jz4U4jWsMGTRuDZncK6ldSuplRfc7j1O4V1K+pX1K+pXUrqV1K6jdlm1KV1K6ldSuom1zO4V1K6lfUhhjZu2V9SvqV9Suon5lQ3dV1FbIa/RH1Ea+hpfAvA/A5SLmXZxbESdV28C+A8kF47XScy6Tmf1/ROWzCvEjGz/8AActeTom21W/5n/DeTmHfwl+hyox+m3+yg3P/AOC//8QAJxEAAwACAgMBAAICAgMAAAAAAAERITEQIEFRYTBAcVCBYLGRodH/2gAIAQIBAT8Q6X/AtiytDKEwPIF/ntzZgdGKa20TD09CIo9DYlVKsI7CMoomScIyTY1O1GHkyBPsJB8C3gn0JHtCUx01YhqQ0g6TaG2/0MIFHDEmhoRg9ypeRtQSFRUsFwxqs9qLEq4ycYSUPQrY8iYm4IUcGkY6ajLC0hTX/SE8REwInojAuIaVE0oLCk2CaevzpBpyfgyKFUMZtJZEl0WoQ8CyjESY+8mNXBGa0MYZTgnBFaREPaIoQQgSISS/NoyydGJ8ulMh0ZTDH6T5CVoS/iQhCEITvth9yHni+x9z6H0PofQ+vR37n1PqfQ+nSqh9j7H2PsfYRI0fZ6eUbb2/4y7u3GY6Uv8AKMjIyMjIyMjI/wA1+Mp99HziGpUhpLTKc+jEqGganBsfAbJViefzZnvo7tULIGVUNNEkH5wpCLYPDCJ4P4/FcTloS6aO6xoooosTlFlFfous50fyZ1prro7q+9pIaj/8BpQ0k20qMmniE5iC1JDRfmf7EhPJkE05shi5E7VJZsELdsGlW5RlA/L0McP0NlM09T0Jyex5Pon+UUUY2Y6bFWmn+hxiFrtXOjulsjWhrKtzWxgSqNpZo1sdYieiE6wUquEV+sDV+CLCTtINYQsQSf7KBuMWFCNNn+iISfjLXkor6LQsxa2yx5hRW9UiB09cQg7IjrfnT0fOOq6TiEEUTG29voutmijTZa6a+j5SkkEEEkEEEEEEEEECQghCIghBBHCTjV0fOnEEpIdODYNYn0N/HA0IQXKNqyiqXYuQvSEw5Faq4k7yh46NXR8rQqeRnRRicyUvBijIbQnt9lFiZM0kF6Iv/Y1l8ijAsqZ44/0MdG76MHjEQUG67xpxq6PnQTadRWmJUTEtggv9iEyirJUCUO/CYKkEjx/Bauj5bHSpCtjZlFY2eyuQor/duNfWxwpRXJRXCiiiuFCYrKylZWVlFFZWVlfNuvJ3FxOy/dJtxFC77ZPRHsj2R7I9keyPZPsn2T7J9k+yfZPsj2R7J9k+yfZPsn2T7J9k+yPZPsn2T7IXk1BP8FO8IQjIyMjIycwhGRkZGQhOkZGRkZGRkJ2X4vhfmX4voxa6Oj2DENvsXTewRdZf5IbqL06MWujN7X8HZP8AqdNOFy9DZ3BjaKEuj6tVRjVkkJfii1+OnC/MutWvxLXLIFeX/wCh1Gdu/nTThcsatLS2Mbr+uxcswbRNDy/DMzr8C10cvIbUdNOF0dD8iy9i5XkGZErSH4Fr8dOF0ncu0506rX4vhfi+F+L6plRUVFRUVFRT7wmUpSlKUo+EylKUpSlH/wANUA6Puv5n/qAFRAAo7gmmquiGNzj+Gv0Y3fR65rsgji1OI27BUdSDavfIUnaQk24IqoTNVITMpDNEN0Oi+DBYJ3gTNVL8NXVGT4ZHLOGscIybCKbf9DvMeRtWrQhA8UeKn5Mx4o1TbClYF4MCN7/7HVqZFaPwhVG8Nf8AwhvLE0YZcClFHymIGpxq6o24yfg00rrh64gs55XbYuL1SsSG6pDRDX+A7rUoq85Go5wh1IUsr0IiuhpPS9GB8FbCDpggxaI1MRwRRMyUmF6BZhVkuNizRWHsbxxr7NHeGaM+4226xucRtYFbV4M0N08+BsvArtCtPJRcQn4IQOuNfeOySSR0+E7E5QlW+TYVUaTcKE/4Ovqxq/n3fUojPGHwPgfI+B8D4HyPkfI+R8j5HyF6j5HyPkL1nxPifE+Z8z4nxPifE+I8EJF/HhOUUvF4v6TtPzcxvPFTpBfnU4TuV1SLYmYnaKPUe42RSVGyVFSQxSElKbQWGSpRMyE5e1rZ5AqLwKO70UtZ1BPcgnZh89irILXBw4yUC5Zh5ZbsoNGPgi1eS7G6iCg8EO0VSGZlxqexu8uckJGqU9QUZvTEJRLAktnoTEM5FrgSV4GlDbasXNF/IayO6sckvo/uL6MfIo8n9xKtsSmBdIJCIQg0QhCEIQhIqQhCEGs869uR/j1KJwpSlKUpSmylKUon5G6UpSlKUpSl/wAVniL5Mr9lfsr9leyv2Jv2X6JkUGxsrKysrKysrKUrKylKUonRuCwF0ej7wAyeEf0EGOz5Hwsf0Fbz+yGaGgXLNENhIcmRIZGUZlKuDZOITPpT4yZBA1RqQNoTs3nFppU0onLLLZaGeuLWLl6NEIE07nkauR1vhspns+R9UbLGJRDd4ouDUUjRniMiV4JFOjYbrp54NQuXoWELsIvYl7Ypfvbej4qq4Gef2W+DJBcsenVxemeY3okNEIyMjI+IQjI/wSGrgb+ZCfzfCvxg+G/xQ3MjZ/jTD6PQvyuPyQ35FtdHoWumRYT0mnvr4X5tjro3rotrlZ4QQhBsEL1kEEEcY5iIiLpgaTI9EeiCBuw0JVhIggggjicoKE3hgWvcWuH3WuGs/g0l0nSikhiREEgp3WuH3Whp+B77pfg0SvxxNL2fYX+Asew0tRMaEtt32JFP+Bf/xAArEAEAAgECBAYDAQEBAQEAAAABABEhEDEgQVFhcYGRofDxMLHRweFAUGD/2gAIAQEAAT8Q4DR4n/79y9Lly5cvS/8A5NSpUqVKlSpUqVK/HcWU6xjx6fHDvgGXD/45/wCVlxgBaA3ekc0Fp2nrLbYO/wDxH/vv5Ev7v5P6m/kbCrqs/wAm25Lcb/2WwZelR4qlSpUqPFUqVK/LcuDLly5cuXLly5cuXLl/gUVbzlChNK9LgZD3QEHnKDYeSO3hzP8AiNSIowiTqSm97x3ibByMa+ogZzxh84saNt7l+3BvpdS9LnKcoBQ7gNp46IBDJVoCDZZkeehrZ1/G6puriB0U6afDPBPNqUlOnAQXUBL41UuXQWJkCijhFFSm5SS7ZkVDusNnxhgA5OO8sAoXR5PSChMKy3ZCBHYRUqoTPSkTrumIjzXwpQwkbd2FvKu2BHijo9r+pR40QB1a2hqFc3hzOsHtqNJgSh3zEU3ULLet43JmeZJ10ZvB3l6SWrDDuzKP+uIDdelQJttGHe+krVPZhuIHqSqgepLYq75pKZr5ug+DeN5AtBcHPntz2LhuN3b+ebzGzsYFK20+4xJc94CEs55QhErO3tuwRsQMS1FPBRB4Vaq/cuTvDeKRs6ke7xOw0WujaFgDdvX8azZzKYzx/p7xuEPMoR5jeb+xs/0R/wCgjX8j1j84/ekDf/sj/wBdH4J+58m/2N3xvWPyb9xHYPl1goCc/wDdChfEr/JaQccCTYmRF6n9TY8IrnBrelU7JyiAZ1tIn7REdM9KPKqj0mnYsthdRYXbh4S+FKVgVFehE1r9uK5sYGHM8yUcObhpKPkPrFLjbc5RkYoLmexvb8wrgMrxxSRBvMF8tsxVpLbrGt2w8mYDvHh3J6trLnVoTlQdiNIAaGXJ1c95XJi3YFFdiEO5C72/tCpR8eadvP8AUacIGUDFsESFkJMFO3SMSZvFWpatktrgpuqS/wBeceTcUAC8DNbRze6pUis9o2ycNgqx53BNXdFiKfKvCWmNLVqZ8rl0iJv1Vjpv+N4joFngLziUhWV6sW9o7XWJyvfsT1VvUU5J6x2/m83joy8PPRvouIODmA9YONHEch8uK8oasdpsnynSYDwiR02F7XsnMy0pdmnNfjDZsbgExcKs/wAO3/YjcFryAAgNXH1Hz8iIuttOzz/8hPa/b05F7DXVlveGky8xt8dUq8tO5ankdoebLNs7lme8Qm1ltHZ1h5+t0KgvqgmW18l6UvltDUdmO+jsggqiUrDJUDSU8kpjyqI9JILmZQko5uKXxQhZO2aSkTvDUszssbtd3PnKFmllQcy+cFa2odVWT9R6xAbOFbZZ7d3+QLbaNKSXbQ2FvaFTxyABCnnOZWY9ryVAVDf89rqptrgV8N3IFfivMVDF6f1lhHaC4GqIN0mbPSQxMPNdwuopEfIBd4hdhsNhRcfIarbVIP1U5RjtfLEKtpDuvcciCdPtAuVPZBWyksOxItfUIo6orCTjPUMCDUxQANzkMSt58D3UtBeG9VigUpjy2l7XiZytK76tj+orCG2rHabZ8p0ikeEsocQugLmwWao5/wBiQhhVOzzbxDbsZcpu9gmXcKOxNfK/eZsgDd/jB3JNq3XNYT8PPQQRgm0sGokACqLatlBSW0Zq3ppRLrbPhBHZnPgarTCZjUqHXn+Z2m2JDuW8aqO0BSS5aZQjewslt1S35RdAmkot2XW1QNWBkgoGj0GG07rEM+BkyNqueY+sm8LHIagppnF524u5VBOhgDdA52iNcxDFeKsS2FQgne1JH1tqiu+Gyf5My/lB8By5QKwmJVVd2ryjsQC1aOUd4kocep/1BR58BjtNrNn8KjQDZrrD4+JaBsVUulIX5VXdyhlk8iv5vPvHqFl7f+eVR1xArV1Ld5YZbR5V/EeUjX5+egHxAt8I38bW3S+IMagpMOcGMEDtRIg2tEu8U8qhebHQQrxvHlOc886uxfMdYDv1oqo05ir3irXTzIvqvjBFQBOkeoJ1paWN6B7xuv8ArLBdVCVq5Oym16RYHM4TqPM6y9bl63+V2guEOUcPR6xiYHDyHWLTUXpo5myJGrwRmyMd5vMdJulxlWXbwerDaDorn3mIQdWO02wiW22ZklYUkrq65VnlDxd1wEBXA2ZBtDfSKKwGsYq78pboYjQBKOa9pSiRlbot+qUPlFqgRg8VyDm1w1tBoOgvI7ovZByO1qAqGwKlzaZtktLg60c4Zz4s3ghSKJ5SsgCsaCbVSH0TbAcsPPvLUhwZXtfuWVIdFLBt3EcxQQ8mgx6RhJaFvuv+x2CrIHmXsxs5Z7ZveTzmwD0AIKrEVHsJvZf9nJ1tAeKZf/MZY7RyE5PNdYN0cgFJ5kv281/yN/8Ar/k+zfyKf1/yP/Z/yfeYX/pjp+ohT+qPtX8n2yLf7Iz7Hm/kEDOgy+bBRc15r1Xno4OFgnag1hRftJsxQFfZGq26c4C7ze8B5RTYvm7wq6Xe9/71j87cDze7Kno2rdO6wQTlriq4igA2JiY/89k3JZy0eH8ADw+3AOxKHbQOFguMzvwShDbNUYL5Qf7Pl3+y/wCd7y7f5/eeJWW/ZgBOoAFTt1CqbJb/APFW34P5Tg5SeCGUo40gmGOo+GEg1QKIbf8A1b42VegwzQlSu0rtA7aD1hkly5cuXLly5cuXLl6Kd5TvKd5TvKd5TvKd5TvKd5TvKd5ToynRlOjKd5TvKd5TvKd5TvKd5TvKd5TvKd5TvKd5TvKd5TvKd5TvKSkpN9n8K6u0ajXpEWXwIm8kCV/sv4p3tPhv+8BC1Sq+D7yj4PvoKeEUKFCpXyX/AGfBf9nwX/ZTwK0OhVX5FatUo0aBQoUIUK6X5JcmSJkSJcqXLkydWTJlXwSJEjVGurVrNNbo1zhrwYuFtgovbZCYk2Ru+N4FozAQFMt+r3i9+ytzLvKI8Lo8To6N6OudHgdHbjzo8Dw50eBnLwjp/Qtyeqgu1sH+9+3AaXrcBQbE9eb5EdeyxuvXV2156P4HR24HbW9XV1vR34L0duB1vgdtXfR12yjLzMA86uVr5Oz1g3retxW4FbYflfNjrel6Ot63w3o6Xq76P4Lrhd9L4L4XS9FrR21uNJTswDCeDrhBxxM5UULHRWwX3WXwUqAVeRAF3PGd/wCpG/f6k7/1J3/qTu/ad/6k7/1I37/Und+pHq/Und+pO/8AUnd+pO/9SPX+pO79SbaPL+S4ut6u2t6Ol6P4V0QNnhdL4PGMhgAeIj+ps4mG/hYh7RwJvJ59IRRLz6taUvc6zHb0mO3pL5eWhmM5Y0rsekorl6S5d9J6TaXDQQ5zkz1Ozpn8DtwumeMFaIAtyxyQVB0eF15TaYbcLNiZ/Kwz2RrzlSt3BogITYDLFQ02NquRrw3gcIC7pv48qhmC0W+qhbEFjiubdQ8lFblAOlrsCsONCbBllXlHMShm42qYKJahTrW9QRQtUAOcol4GlW6vOCPGT3+I5RATckEob3UHOjKzBCy6NqvAO8SiqkSkYpUAoocn4Hgd9Hb8IqCCOrru8Lvq6O2jhTnwMZ810nsDR0uA3MtAT0FULGUnA0mSu7XjtG0HkKNvMOkBWgV2olKYVMJzdsQKssJsrqAbbtnV5MYYI/WI5eMKzeiqJveYny4SzPOXHdmrQbMeEyQDbTliGNvYQKyIzNkJyxgGHToAW1ySo3vJeeyyBmQVYb2XtHmRau9scrle8Opywx34ngvW9Hfgd9OdHOVe+pvEadtEqC9e0UMNzJTvq63o4NuFjtPnuk2PAjrmtsUCIRE5JFmLvdgBojtzMTsai9/eeL3jL75JazLjBmWea+LLbu89b0utsTG2Jff3l9/eY7eml1Mux1iHIueBdHbW9HgWuBdd9eWl6Mvz7RVukDYB4QhDmENL/E4Mdp8V0ZseBHTOnNo6O0wZS9mfRJ9Uj/yk730T6pK9fone+iP/ACk+qfyfVP5Pqn8jZ/kn0SfRJ9Ei3yfqP2fFmWJLqx4HgdHXno8DpQdUCgDY4HgdMY2Zn8bgx2nxXRht8DS9Xi5y4ul63wXo8D+G9HbgdRa0OjtDNsQrbW9LQPHV0duPwY7T4roxWfA0dHbW9b0eBxN9L0Wpvpd8F6Xo6Xq76XwXqTzRxN9CsfSM7YyzrcmO2i1HMFpFrW+PwY7T4roz2RHW5twul6N6Ol6ujwO34V4r1XROgi3kRXzIlARCPNoCCTYCOFHCYR3NfeR/F4Mdp8V0Z7IjrtvCoELQtOoS35OXzEraVt3nOucR89GcrMxx4dY7GlYNU1/sZm/vKnTlcd9HaNl3itLzTPXQQRNmi7rkTHgwzHdo7wy1p5R0si0Xy5wW7qhbDd5zLzlQztmeT6TvylZiN1tOV3GqK2ahbcDZXDDbV32iA6NYiKghmiOUblZJfLw9cvJKVIsGL3EyMNyZbgFZdcqvtBOoS3WPOK1euufweDHafFdGG3wNWH7FC5u6fKoXh0kwObWVjtVCoHsvKWlS4532+xyh8iC1h5DadRAC0dTnHyqRDTXfPIgJ3CEF2MuN4EHIVlUWga5zJXyxUeBFPd1hYo3nJH8znDVMC3YbqwkBChfMG0XUa7OaO/XyjNcaDd8N9KYxWwN1d4C/fylqVBZYGMXzamSKklueTEENi37tV0vO4hloPbG1S58q9Qd1yuIDAwMTBuRuxUvvBZneZE0iBeWJRqgUtbmPjFWGgGmvNel7SxBsUJ0p3lCAjI2iekZTCJDsK1/szHimjYtGAuLNqhkAs71MFwIF0K6xhOkRfm3JU5jTuqp/iAqFCrHesHhL1rNO6be9MD0KhLNUceGYkoJWtuXHlG4UScZu3vA2qhdbHKvkkX0qEWK51gl9dRZU3K7nOZPRK0zeW+YpW2paKYMMs700ybUL5s6Nb9YlZcBP1RC2I1WeH+wKDG4/cKC9AbLd3E6hlacmXpejtxuTHafBdGL0jRajtCUWrXCl2e8ahUmwWwTqVGFLKKByL6sqqtre6X/qX2i+Ci4TqVA8Ssjfbg7sqe9QWL28oDIws3d+0F5QUuzAL5xyQCu2DJfjAKBoNrMT4LrCRAu3wP6GdV8kgwL6xVdtRWlX1bVKAc09HCeuYcljPnn+hZaxbuLhXrfrHVDYwJ2i4AcpqnFMkoPd5g/6iQji132YKPYhgbM2z1HoEw+VA7SZGQpytkc8wGl1Zs3dv7mFrdXPmRNwl9cQcVCC63Y/UaAiqha68vQZf1wHOQ0l56xKjhvrnRqAG97/AHRR1uPsLgXtmiskj6Qii+UlhdeOYIZaN61b9kq/SVvKx/kq8JbO1QB9T6RgashzVMHlDgXOlUXD4QqKsKxgvmz5ffHPAHIVy8TDKJoMB8zsSqzKJiwum2d/DrDXVPQ9nmQooAW9c2ZLcBGYnsEvAbGrpejk4WO0+K6M9kR1fUNhSPWVYvQwF8kYMSaoeiqDxlYUAcjCUzK53qYgywrNp8eTDt5nKe9nOIAC3Up64MxGibdlHIOgQ7y4K67iNxTGoFIuq9oNIDDpbtB/EQpGDWyipnyRqBhVY1292M4zAdjhPMjZxoBsxeO37nMCUdh0SBQKZvk+NXCwguDH+wpEUgeRCQKzA58YgGIAWeLaKcOimxW8R8EbhcSSAAlFn/Es3J2y3kFe0HD/ABCitXQS71mQcii+GFKcAQA1fO+WImxoDCjafHXIs3iLb2nntawwSkiUOFRdutqWlc484fNy5PU7SgxKLIvrks8InupBA6ueucy+gVDTRSR6R1BytrK2oI0YX/I4dhuxMLbIJS9cmICew4CqU3vmPTqgjd2PjFXWKmKCokRABVPWPtFjnsn6iajViHsIEBjOw9yPzjNrRFqtfMx30eHycLHafFdGeyI8fjFnjFs1dUFm2rMaMuOdWBK31zqnRlNInP8AoJtW4TBVUdIn5pDarzZzjpz05cbtotujohY3gXY3GvF30mA2IYbFHlGgs4ymY1dM6+ThY7T4row9o1vW9HbW9HS9XfR4H8LvpfBfC50vS9HbidL4nJwsdp8V0YvSOFWgrHnA85jk2S7+tRMq7jiKqonWiJo4YqonUiLuaROtVTC7nFFRFTwURUSn8FUVFXFYSI5HXKc3to8Dk4WO0+C6M9kaOj1sdWEhCba26ui8N6Ojrbqy2WxdWW62y3jeB1tlunhDaFcg5x2vhcnCx2nwXRnsjR0DuGo8ShZzJZ1uco78DvoBEQ2KbzOld5zrnpWe+jthue70iUBHGEqMzABCrQHNiIhA0iVTLM5qtP1PCX3I+k8x4MyyjC1g84gUbF5KxFKlPSWoqWAqzro7p046vedjHV0cnCx2nwXRnsiOv7njOGa00wN195VMWxFQ3BwSpQeWmCbKXn2gYjzVwX6sYjVy6TewdoT1nLqrL3MUoLXSDe8MRCwd2modmsLQGrZ2iasGANirOUv1vTYMzBu+XOHrHlXa6O9+UTlaAcCyjr4y+jZUuNzKivGEPEVKXNInUj2dbCJ5haZIBsABKZ3gsol2ZsLVcdKaPPbJtnrHBUosM2zKWqyG9DKa3TGRhWmGZDL9uhL5yyaJYhpdeNy7QJBrbCGoPuMdo2wVyjrqtmQuhZBNgohY2DOYC7SLCM9JbDfOhLHIL2ZR82M2VaOTxloSSDFKYqXIFXOM2/ICUwQqYTe95895VCu+eAzKHICXTa3jUACZVA2tGXnME/KA28jLtDeoyIuN1TtyJUM+B8yhb8IVuz3VEeRiHDdQ5XEdWCIl0ll30shoAEXdpq9b4WrRycLHafBdGHtEvX9jRjDTCRaXYOrNux2cmw2lm5i7mlE5oHyF7Q30j00c2dmuUy0UXIVeTYRkrAHYoK2RGzufDvalFcpcYgGHMIg0BAXz3ScqXeBIfhsixBHlNMgIyyHpgit5adpaCNbidOQrrcvgZjZF8+qTnUBfNY2+cTAsRmyV+oxhELkH+LjjEAFvMBKx3iq9r3hFssyzdqVSKfuXGyLpDQKZcsZQHm60p8Lgz0pwMBsMY5SuofYgOQHtF7l0RrJ8Lixlg3iaVPjkl6FFAhaw5vci/NC6hVD0YhaG3CaImzNlWeCUmXPxqJhDo2WVT1lE1GcFErxuVOR6q1WPaWwaQIRormwTYRlNNHHXNwvnGxt02YQpmZVkNx2zCZLRdgbI9hHqrCelbNoGuADHQnu8NvAxL/VzKHMiY8IakyHKugnhLXEBHU2fZZbSOT2CjFc2HMHksRVcPuml6uThY7T4Low9o4P2o6b7wnVQyeMbW2IUA5WUbbh1AoY3Decp2nzynP2jLavkmm+jK0dNoPSXndnPTmRC5K1aOUWslykhT9sG7fVvVm+lvWW9YvfW5eYloQQaUvJDjy7mxgPQOBf+xn6n67aN6+6au2nk4WO0+C6M9kcH7EdAKKcyvGXlvDBnjiL0vMeVaIsk8xQf7tDOwFXA4Le8ckUOUna4hsLztrfTEGw9S5dXj3yKmNK2l2UBKPOLGTYpHX27Q6eFVhTDH+8waSDGPYLYQIlhVc5ZIR5C55zG2wQr5Sk6Gaj1jko3sEQIDy6Qcn1i7ppShTePA6vA8Lo6O+jwuvvEeDycLHafBdGeyNL03vFwXLvRplQ5HPODgWec0BbDNwNVyZV6k5RxC2PAmxzRlQ9gh4RZJReM69/epd0oeoLuKqECyTDaO8tnt6IL8iOyKI7rsi4ZC6zqvm/yVt6XVRS5uyzUUSbnPMKhyB5nDjKwJAfPTjNVzuZttwINUX5wGloC3+4vn3iIoERpvfV1dtL43S9L1vgeD3zWtPJwsdp8F0Z7I0dFaOluB1GENgOiUkpamyqfqNAAwKU2wQAKlWMUqvdm2OW0Wl7A8ul7+8c1FEeXV4zbgNF8wfQirm6yt28bMlQMFt92BQrmfLjgnENAeARMsLVVuKlaV2HFpQAcwgB64I25eBKPDpH9A3iHe7lXMdRn1I1B6jdeK9HfS+B4Gb8d63UJBsul66ThYz5rpPZEdd02we0sSzbRmdM8C6umdXR1dpnV4XR4XRW9HXPA8BYO0dJy4Lzk24WO0Nl1R7RFeZ9H1HTnofVidGHRIpw1eZ/DJ8Mj9fPnEW/5T4RPnE+GSnT/AOWT5xH66fOOAjP4RPlE+ET4RPhE+ET4xqZuhH8InwiYP5T45pfyifKI/RT4RPhHAZ780nyyfLJ8siih7ovZd6OrYTSX8sW/2HE4nRHoau6dZf3S9b4L4XW5ejpejLZb1024Lm+jtx3o63p56ulzy4LrgZrbuRyFISuFgzFmI1jdu/ky/fM30dtF0db0Xgdb0d9L0XR4HW9F0eBl8K6PFejpfpEPW2Gw7vSDQBIxQbQ4mJcBFgI7MeS7jl6zwliWNjtpnR43V4XR4HbgduF4W70fxPC7ac6mz+8L83pGu1WnPgdiVcMH4BZtDjkpBdyzyZVlO3SMDlLFfTMZSl6o/wAj/wBbPvs++z7rPusf+9n3WP8A0s+wz7rPss+2z7bPts+2z7bH/rZ91n2WU/2x/wCtn22fbZ9tn22fbZ9tn32ffZm/2z7LH/r59tn22fZ59/ln9Mf+3n3afdp90n3Gfc4/9nPuc+2T7tPu0+5T7lPuU+xT7FLcDvS0Ep3q/tj5uLzflylI4qzvHYLdVDw/EkTMeYXKOUJRKJRKJRKJRKJRKJRKJRoolEqUSpRKlSiUSiUSkpKSnSUlEolEolNFEqUaKdJTpKdJTpKSiUSkpKSkp0iKgOkqVggZ0Na4mJpRElSpUqVKlSpUqVA4kxKlSpUqVKlSpUqVKlSoHFUqVKlSpUqVKlSpUolQJWhrXA6sf/AVUqYlSv8AxBcqYlSo7/nNT8K40ocyd49Z3D1nYes7D1lnR6yzo9ZZ0ess6PWWdHrLOj1lnR6yzo9Z2HrBmhHwZ4Q20s1UqKBa4nbesbtvrO19Z2/rO39Z2/rO39Z2/rO19Z2/rO39Z2/rCvZ6wbYPnBJjSzRlRQ3aj0XrPvp99Pvp99Pvp99Pvp99Pvp99D/rT7yDbI+DLxcOvKDpfAx0VFwK76HWAmFvVZ9NPop9FoX0U+in0c+jn0c+jn0c+jn0UX39CBurdHaCEVEuVNoAkgEAve9YG7rqz6OfRz6OfRz6OfRz6OfRz6OfRz6ufVz6OP8AypUWvY5JgM6PWW6bQbCglkjZzrLBs2+afSJ9En0SfRJ9En0SfRJ9En0SfRJ9En0SfQIp/mVHdTtcIyzp3L37kDhdGK1MU7Mvdh/4bk58okF789LqWBly63Yf+EeiNmZRw8/GXoi3vbdWGD/wnYHMUqKVe50Yb6Gjo4Ipar1fwO2kbPwJcxfWmXUaCypudl47zUvtEnWDf4GCk2aZfKLRcITnk41qAY1haXxu0qg2sYPA6LFhntPwKoLakGGgK58nMqqLX0JuS/wb2jd8H8AKDMtHFKIlr26q8rg1gguWIN8bMV4NHT8J7Jx4FxHuXtglG0uDYu5463gSZj+hQYwqCCHE7R/A6wcwdXRmye3413g0FqNr7zOelWb3w6r59oMsPIq1ZKmb42LLwlxWvB/U9g41WbxLXqBaP4QYeclAIRmFJoU5OrcYSYYqmbHE7ze8P7lxehPbcZNBW9gOssvFtKUefnGDEC2li4jXSe5e+MQw7nNpWM28TtPgO8IQ1dGyey43faMTwDuWr/UCc0Xax/VNjb3YcuNm94S2LLwf1PbONLdFXjTA2wLHRuLyFBAyw9RKsFPwmxDdBgY7m5kPDidyYp7f3Fbjz8J7Jxvkwk0wkTBODt6kw5tLvrOOW94jQ7U7HQOkEcx7AOfFZseJ2nzHeHCdGye1/Ae5mYgSp5eCppvMu/igWE8YkiUtWdONn6mm/wCf6nsnGBc8yPKdTuJjd8v1Dqsvp/xHXvoKUzY4ncm74f3Oc9tDXhuMWSr+K7jms7QQWttysIXvKPJ+kXJAokLfFd8w4nafMd4cJ0bJ7XjqJPFK3crjZ+ppv+f6nsnGltylVKdJSU43cm54f3Oc9h+DkuJebAlCvCBzFO73lvSDfE7T5jvDhOjZPa8dyyWSz8DP1NN/z/U9k/DZLl8buTc8P7nOew4+slmqELQGWXGeuApmi994Ms4XafMd4cJ0bJ7XjpaO8XGqzQPQiBV1ynyo2pRWO66S5brVONn6mm/5/qeycaxArRW8VEBVYI0wpCYSsot+0wpVSnS8w24ncm54f3Oc9hx9jAS6B3Y12WRnZ67+kPYtnYOsSjlAanI5SuGrZ3cH7mwLXvp3d9iDvNp4PSDZuoaKHCPffhdp8x3hwnRsnteOxXEGc9tFvnK7Trrlf+Tn7hLFXL1gLScdBxs/U03/AD/U9k46na46dBVzV/yWbU5x7s+Sxkysj2hsOn6CG3E7k3PD+5znsOPiYixmgduUpFWtdi8HXf2hj2Gy9130dys5Ag+oc/uEnQjwColAN0R3/wBg30ZOhtwu0+Y7w4To2T2vHgLW06hojb1louorjHKXjVEF4ucd5oKMPY42fqab/n+p7Jx/ogplhsjx6xyYaCU7R5F6XAJdecIYp2nwhtxO5Nzw/uc57Dj7KPhSKWpsQkIiAt54JRYSjc3XhGHjxWxG3MY2iwl7UwK0v1PSbzcUflDSDdB5f1gdOF2nzHeHCdGye1/AhKZKKZToSi9uNn6mm/5/qeycbvEN4iCbS7cJR043cm54f3Oc9hx9SqqUVtAGxEM4g7HgbSqg9JXaDN0XKOnC7T5jvDhOjZPa8C0MKqoUY07PtHJCcjTqVdwCDe8A7NxSCcpZ1lkQcLP1NN/z/U9s4TVHdAp29ZtQIrHzJ3JiYmHMEZZLX/VloN3EROwA9ngd5+j+5zntJ7dwi3NUoBvRzqWSw5yzaYJFgRYFTJjZ3gq9iVLiBWwC/slhQnq6AtcShgDVViWMEeB2nzXeHCYzZPZ8FQ1hZRSYhb1eroXl6dUeDJo2Yr8hx6MZEbjUWrVSjsc2XWM30VqpC12e0ziVd0vd1tCd7jpKKGXsbbktwsfBYUC7u28VH4pSUXKHmYHfrALbocNZOTy4HVbvgz27hxvIaYN+6Y/l01qvY1loX1WbBcpCgDdTyPSAnMXwh6BBFYy7z0sAXn74zHeisMNqUaS9+kM+KBBGUtA8s9YSqnjgtUTm0cVFCDtNbPC7dbgQ3c/RwM3/AAfuc5v+DPYuBa5XGbugLO69cCEth1+wVvEEi+9FfIVlsoPVjWMNASgrum+8v8QrawZ8pUynSGAeZoLvrDcZ2cl2F2WpdczczqXzHcvox2Lbhdkkwb0MG/OAiBqxyPnwO0+a7whwMYMT2fA7QKkXYxdCIHdi1Y21Q+NZ5SvjMhHQaSzsx54NjWegoa7QBQtwYtvffvNyyZkCt1cVyhkVqpfUKvvUqCqKx5wafOZOVgLHQaNY2gWGrYHBeZveGhy8I74YsQUXciRT1Cb6Qgg3KWRobFqtdoCELCOSZX/kXtwMgG1eHWFRzAgdFKzMBEPIDYgvCE6DpatETvbcq97uVXnpDOIKDpwMz8AaZvwnsnAlys/fXu7K3fVWAQcStFbZ3mw0c9itoT8aGimrLXtD6AC3O1/tnUDnB4w0+kXdOw4pWIKgEukUptN+8FSYlgarCN7Qnbi0N13Xq93gdpl4B+4Ql6MY7aMl7r/xO6VZ2Eqolks7mv8AxYEehlo8tExNy3ah/wCFSoAHNjwNRo6MTE2RZzIaTZh+e5UXFt+0AKlEol84Nh1gEljzh+e5kEywvQgAGxKJUtXzsPaG0sf/AAXN4ZYXRCACgxAzocKSyCux25QRXos+in1c+qn1E+on1E+on1E+on1E+on1E+rlHmwzFH3lDuwKlSombnKJ6O0Acr3U+qn0M+pn1E+on1E+on1E+on1E+on1E+qme3nzah6jKXV6wcpUqOVy0qTydmBFz3dyo/4kp/xn0M+hlP+M+hn0M+hn0M+hn0Mp/xnzhLO13eiY9ROjbCNG3vAhwuuCMOWiu2jzTzTzTzTzTzTzTzTzaCDsgQG5UTQkdBy/GABhCAgdpUqJiVE0VElSpUqVKlSpUqEGgGalVD8KRJWipUqVKlSpUqVKgQJUrRLgSokrRUqVKlSpUqVKlSpUETVJWipUqVKlSpUqVK1AlSq0JXG6YlSpUqVKlSpUqVKlSocTUqVKlSpUqVKlSpUqVKhpfFUqVKlSpUqVKlSpUAmIfgvR4LJZLJZLJZLJZLJZLJZLPwWSyWSyWSyWSyWSyWSyWSyWS+OyWSyWSyWSyWSyWSyWSyXqa3wOq0XL53RLAMF0fYIm1Bs4t6z4n/v5E00810wiij3fnP+wDg/fc6jj66557554Pnnlu9/+CuGGDDjDLrrjLjjz+Z/7PmP+z5n/s+b/wC677/Cf9nxH/Z8d/3V+/FDdZpGnG2X47Q/X3TE8pzr8QBMhXYjrr1LPh7d4ilKbrlfPS5erwrN5fbR0uVHS9HV1o6ETtwOlSpUdHR8JUTRc6Mo6E8tGeUrTymTnHIk2y+ynLxI4LfhldTqS81+B3lRsXDk5PNNo6Ojo8LwOrwurpnR4HhdHR4HgdHTOjq3apRviwXM9BuHExUnoTm7wZ5GI63o8Dvq8bwOrtwO2jo7aO+rwv4HhduAVWLjOJ0kfsyH+zfiZRG432ltFVufWPAdN59AzuPRncejO49GPUejFHJ9I7aXoyo7ynesMdtLO+jLDfHjo7cF6OjtozwzOtcozfVa0vR0vS9HbgeB2Yqx+2sf5DbiY/jcp7IjqvJ8vVgNGlz19Znq+sz1fWL3iAwHxIHSJy5MRsCbx02BSnS8XBhmMkpe1xfiO5pWm+tXEFTAd557wf4CyR0uD4ClTbq+hHBSJZhecY3mPMmMjkajPLUAt4XH70hVQ6Li6BxpbGjuykVW3Ah3N9LI8o6BzXwjDDIHL0naotjm9b7QC+5yH/kWGOV4niyos1Q2N/xjkzrl09a3niN88c4IfZYm48N4sxaxFWx6bEwl+iFuRS3vdy8L+2oOvnB0Nqw3Xnd5ieTexHnEZSxsL2dpdAJG/BiVIDdYnj0mRTNoe8FNvavF5R3rgdHRdHW9XK4nafFdGG3wNbZ25+EAKCqK1zq6MtpMMOqE2sSkYnMoQvByt3YJIGaps3TzxEBQkNg5W7sXtQv1rd9YFKGGx3sitEMlpXp61AUALj/I3LcbQl4Kt6GN5zYL/bTCF4mukOlhklVjwuC0QAcqGC+gtbdbzXtH/KFdV5ubZVaQ8VTHcKbRnB6QH8UFpq8QWbw68hQj/QvWKqg7RtDKpyOkXnMGgDVJzcSmj4BQNC14/uPuYtSt4lnWYYL5Yb7sOMaK588RVVGWY591Y7J4PJnn26x3y7QwLU+8vBd1NJ/m8qZGopiP56RQrvyAbp8qAABty4HVGvDJgv3pBbMdasm/A7cfkx2nz3SG3wNTn6Q6sIb1uwHePALPuZyPDR2WBTIQDr2NfYrmGTYrKjFY5wcAU4I6LUtXTJYVXKKEUVKwcyNaXLtKHh+oJZ9nKDaxNFEpfIXwg/MaW0pl/ek3jRItvA7y5Qi6AFgFTIiXQGLIXtpwm5GBrko9Rj9R73blM50ObiH3d4p377xmRL4Ld6omaupTny/cWO3XQLMBUMYJiQZjX/2jPNyxccELkImhftANNCCWprPgx4PhfQBWa7e8Gvg+7WeneW3rKbNunQ5xw6tKAcc667EBsE0bQy35MIUPVeLgc+gba5MXtLcJUGDfapv4862jvo6UwaDlydEACgAcjEomM2WQ+s7ezEaKG5L0ePyY7T4rpFj4GvsD9y9L095rnIhvitooOY/XB7pOWqt3c9NXRbnKrajy7S+1eejtNpz/AORqtpvOe3tPm0vE3td3eCmz7z/Jc22it7+05Twr00vv7Qx+45O2jo6WIY293VOflPCLiHQG2P61vTycLHafFdGbHgaLF6JqyzIYVM2yV5Zlj6aXL2V0uo8VeyLxRf8Ak8NtfdJylx2l+E20Z48LpynbrLjMTnWjwVfh4TqrGw8pvFrnLvR0u9HS9CXXM6WWO6jUDJZkdkYmH8bNjyejLndVcOk4WO0+K6M2PA0Z7Q/ervAXiEnkK99yJtLO2xH3iwwGrZDyuIapKTo9JzjPeIbGiCdwH0sjFP6wFRlmMYhuENkE1aGyNkMgWDBzzZTBHVMTbkO0U5Sx6FXZOXeZTFgo8ova4ng1yYtmnNGddCLaCxHow6YuVUWgfuX+S5HNImROkoSxqsbnkwb7wob6G1mcGwbWzK4wNGY9IVLIte9Q3j0EFGg3EyOYZjhldOyux4Sywj/xMWKkSgdxN4nc9DbbKNjF+QWnNdHeEahdV9rwfu5UBlXYMwyqAisCtTsJg+LHLzaMzvWgmLo23XaOCGhib0bh1j2srAHdIjsnObOjaWukXC+kdW2tSS0UMtxHPernpA8kBE5VqO4m7EOKCwG91sRxlsSwqxPXgDyCZgOH2icvOMPEqkHaBg1WAS59jTtUpy78Gk4WO0+K6M2PA19oaOiMAypHjHchrVR0t+UrMApsH1jRK6nRnvkvGjtAAyUHbugyIHZDQvcb5QK3mPPfjx9pQXZRKLPNW8Q2kcD05S1jKQF2sOcFPFs3Q4dyukUmxHSpYwTxS8GAjAbmyQ2MjDiB1Casu3g72OXKNhhYKVhF3O0chA8KvrtbUIBLgEBztZUMtu1DoAvm7wXgVQgAuo3FTFQ3DG4tLGtBdt7bEVYpwRKXO5XSWEwdrHN0gjXclmr5mETX5W9C5Y5oR22rbZ1uZri60XmPh3g3ppA2wBuvGYm+dVsXaFCO5GFjIEWRHRKWtuHeBzDnMfYJIrDCuPWVXGFyrBOrTaQAqpS/IBkerLo5Gkex/wAQ0uJVrwZp6XfBmdq8mjKKsbLDvptvMca/Vw6ThY7T4rozY8COjKOdNHQRWAJQGxtPvz+T7Y/kYEIHca0u5gsVt4aXGr2MyhbcxywIN0GEdQTZktXfznKJm5R0eedGkpBPDQCf65YJZYOoVZ2iYpyTFVy6TlXKV0K8MR6/5PCOd81OuC3tMdD0m0AX37RC9jatpu3i/CcqoqeT6zGVF9YUFBOY9JQbAeE8c+OZyrlL0Woptk2lfUDcY6fMS1trYc43XLy6au2ik4WO0+K6M2PAjoFpgU6PC62/Ph5a3LEWhbC05ZJB3mKrq4d3S+sFpOyQvOb58pu4GZDzlkya85NoTYCIoHzgjfwOqlW6NwhCN1aekpugbuq530myiRYeqOtrlYUaFe43wP4HV4HhdLRsUe0MpR9UvW2+sJgA9MsREVbq3DV0UnCx2nxXRht8DXnAq2hi3nDbGTrPeVwbxgrPTmxGVdDW8CwU6rCejLojAbk/ZEFWsIuL1HoIoTXaTnU2eNQESllB3AcXHRHLoUKpztlHhcwFpXMnSWD8Ro1hNsGU4ysqsMBzt2j2lnuN0BbeK7RPkbgrDvVMl2G1N92UawwxaqGueaNM6Omb1dHbgeB4XV1dHTP4FJ2nxXRhgnei9HTlN6Q6TsHyTsPTO09Mek9M7T0z/IARSKt6sdXInJKmHYCVRWfO0vsEUK22rwm1BRAO9LZWKrbbtHfCpkPcLI/sIMONnxgv2xR8YLY+Gyt4O6kwy1kWhC6lmJdiYG0et/5tMhUvSGMy9LFFFt6UxN/wOjo78DvwO+jpejrejo7QoyNVX34ww2nMSDjWWeP8rR4HV4HV4F4L0d47aLWjtotarWt6PA8Do6O+l3wLUu5eiGKN3mDPuuiuFg95alpXpyvmGjwOjwOi6Ojvo6urHR0dHV4HgeB4WPC6p2BMLywtGiJvzHrAoxxMcwcRKSIRMxGxyOhm3A6Ojo6PA6PC8DwOrwPA8DwPG6Mdmh2svCxpYLyvr1gx/nG6C4fIqQsfKNneQZv4RfF9Vf8ADO/6kK7eoj7BHc9SPsEfYIbP9Ufao7/rR96/k+1fyfav5PuUfco+9Rf/AFR94j7BH2CPtn8n2z+RbZPNHf8AWju+tHd9aO/60d/1o7vrQp/VH3CPsMfYY+4x3vVj7TH2GH/oY+xx97j73H3uPtcfa4+1w/8Adx9+j73H3OPscfY4+xx9jj7HDZ/pj7zDwDdRMPPMGyvmy24ik+q/kDMOCuFMRKi9ZUQqV4yu7K7srxlHeV4yvGV4yu7K7sruyu7K7sruyu7PNnmzzZXdld2V4ypUqVK4QqVKlEolSpRKJRKlJRKlSpUqVKlSpRAXARAYYQMwJXC8KZlSmU9P/i4iY/8ABWhoa1q8FSpUqVKlSpUqVKlSpUqVKlSpUqVKlSpUr8dSouIjrpr1PWUlOsp1lXWpPjM+MynxlO3rPJ6ynU9Z5PWeD3gunvCSB/FX/ruOZUqVKlSpUqVNotwDeFc1dNt4xy9JC31j/wAs/kf+f/E+vP5H/g/xH/mfxPrP4jT/AJfxKP5fxPrv4j/zP4jR/h/Er29D+J/xH8T6D+J9d/Ef+D/Evbz0f4QUd5nuTBpRtvEm+5QfwLtwRQ83EahX8CGCPBvtNv3MLClbqMuO8OHstIMvOdzDntG16q2w3L6yu+QK2057lj6cZaHxX2he7LWHnoDdWWVsAyJvNj2PPjHKBe2m0eTOQyswYeAzeGYLAhYjYnjKnizKy+ko6JyzN+C4bCECnIeTErgZUS8Wn3sVE+05scKpYtr7xQcqeeJTWHxjh33inp1lf2LGc9DtcWLN5cWLeYxz7OWLOYxcqtJ0eZFx746xGYRXmuUeD6SgnIIByyfUlyUTL2NhlN5vRLV5gay27QjrKOwEEDlneZJOqUcyusYjrhvlVtPPlDRxDqI5TJmWG8PaiL59oqbCo6fE1fnFJKChuYF5p7Qt1d9DzGk+MzJbqw074nVdkJ7ht6x9cLFrWRLwgEgHl6FfjBMFUBLuizoxTr1qw+j0ZvlXG9Gl6PtFow9d8K+yRHWxNhbPa7ecuyyvk/qyxRpoZAxYWe0YrilnrF5rDDU6QIuZEd1DLJSzsKHyUxOy65O+QmaWtLBZTcAMyjG378xhAGGCXl5zyZWjBy86N+cFBiUdQveeUmAGuXrCGFDGxrdlOUbd+ekdn0lStS5x3XArxf8Ak2mBE7e6K2iYKNle8ZXCtUOQeVSjZT6iZJT4DulGXKEhpKizkuVl5UU7l2iW4VVX0RigMycY7X4zmaIMHVY1mpotnRE217jxMSvx5KLuxO5zzoBgwqBN7V14xEUTJh7RPHbJyuVOZDdb33aI6eC466QUvYt/poDxGMxgzZ1FlpeTlIomlctcYuo+9sZZS3B+ucw4AkCwO/fLaEIginML8GArOafubwlSNC0DwInPopUzTV3viCtbQFVB8jWIW0KMx5UUbSHi+5t25QIFCOqcPO6lMHZENsL38szG4YG3Ap8z5S5oD/hiYQbV4sSWGDIc5cjE1sMfrk8t4aY2oXVE/dSp0d56sD5484+AaUxtH2HrLWZL3movGsS1vg0IdhDHgSsMQakpQVd92Gz54pF593cDna4nOyxdse7GFNKuGM1BX/Y8pMQCizVd+UCe8NwEq3okNAyimjeGJVkQpIbFUYzUB9qXS0KtgtRKtyy2Zk5r/koRzrG0crjmQf5WUDqJh4W2WKwIHrWI84FAqgWiMxdlmeztLVXmZYbL0BjhWoPTp4EQhtjpzZ8ZsnLuRLUQBNBu3MfWEinHOe1y95ZppaKPFipmo9UTcFh+EwS2udECP8ZafMuCDfFwBk6odQQRUHvoDPpGYpZYewcxjQ0tpbpbnzlkrn9jejmxI1gfK6t6sqoubuoYryS8rf8AZtOMR93O1dzmTNrYDd1BMJO9gsTpURXa1rJ1yqUBKnyBW20PKGRUDlH0rj07pefFiWnwoLqggsNNG4CtYNhsTCJYpPfzGL0TSnu1dc5dnGByreXqouW3NFeKt2FomqYf2KUWgtvPMAICysvEKrbkRG/rWPiKYZb6rtDF/ZLd23wzG8UZJdq9vAgGjAbHSKGktKF6oIMIltFB5EP0ASoAb5dyHdgwGeS1MAUivCBOVr0qeJU6xpo34u7C5tXMlbXTmbZN2Twu5G8XSpfmtlFj5h5Hcic+UiqdLWkFVbhz2CZgR6JK06Z8eEMRrytfHml+sEhFE2RpjbfvYPQRgBErMRtbdQbBb0UmTbK3XeOHQFt1D6JCgV1BUBbgoRVCYSXW7KnLJLa1qst5fIo9ecRFU83MpdB7hx6ResXRimngG6yyQvNW6ywMNj8V6XL/APHf5kxLiZg2Jc8bKsC9ujMQzzyPWIb+gz6CNG70j/wI8j0J9RK6H0Yn/AxT+Eeo9GNGz6Mf+gn2SPXeqUP8GV0PpMQh7EDlZ5dHrDqiFWMeH+zx4ahxmj+A4nQ1eI4TV4TjTBvG8x9ZTo9JTo9J2npOx7SvR6SvR6SvQlehKdHpOw9JR5PSV+kr0ek7X0naekq2Ep0PlMRiUugMcZGwAOdtVAvMznfTnmVENhzFagiXBAQR2Rsm2l4lysQWyArRa0EEq9oIFwO2CaGulmt+0EFA001yjxwi4cRpz5QlzW1idZWvnKgnzqGgDdh+yJWB5krC6VSquiYeem3Bz0x1lETEQwzJCq2/WOXKUeDaKBzWESBYMjCcl7V0brvr+OZbZnjJ840hH4WVFrQQDOcDh1V0gjaUpQN1ZWaohYjs6H5qHLCm5MsASuM3lvKNKNRRzT1j+COlAUs2ssqCAXD4sh7ECsJoERimcNBmJs1VsUHIt3TmxS6CqVId+poiA2AeKe5UwaDdctIZdTK6TMbhk5aEE+ivlLCkd0NVk0DnUfFoFsEy1lO0vwDZdXY5ESb3Xm8EuupMiT0OWFCqZ3gRPmWYuTNSl0xWG/G7oUtplRtVLlGJx0d4hvTWbS0Oee8ulQAyxtFa8DAJllC20B2stOcvOX6i+0C4OTwg67Ljali+gV6xfOqQQXzFEt44EMhSyyxvtVx3HgzGsu3a4oDKGVGh5+yO3v8AawUXanvLeotvgprk6Qt5i/FuIcnjLslaOO0CKq94lApWBWR5iOI+MsBAgtTlnYg5TAGGwAZVR5xiSjdRUBtsVuQDBFwhDY0bc5SKQoNwl07I8oYABFRTv0bjBrCpFLsLwVbN/TSjVidEYtTrRBNKrLnYiQ72KirFZEs5xdl4WEUK7KxiBs3ZTeZr0CDLlTkPIOSuYwKJJVGms+/V5RpBr7Qi8srcH3TKlAVcOUMRAKqDL2CJ0SzKRq7MWrEqjFB0AFV3pxjeLNoVW4IcjWYPcXtiqABx49Y5j2OOQRehS3K1fVK9EE3GNyN/u+0kAufZEEYnchGy5VMFX59iBQOQtVGuUEogtVlNZmQraWDgAceLKjJsMgk3onvBBUvPdoq33lc9Dj5QCRQIX3pcKg+ZkWbhtfICLnNsK7oucK7bzBWYiiwHk3G7UzA1rjJcqx50eUKF8pYER23K5SrUG6plO5FADmwiB3gNMFXQAu4yynzQsR2KE3vvUVjLomGGvaWM7ltvfSvCVqbIBgV37R04MAvQLwlbkHrAvqTq030zAwUv7Qwc0qtotCpAXak8UtY3wMgV47Rb9IwYZWu8eEY7Qo4Dvd11S3YITi0c+YahPv1Or29MHlFETnUPQPJwTmtxSCtWALqu8UgApHmO8CfbNXYQ7Mj0mTPpBzjXdcr8443ICoANglS8Yj82y1Yo2reBeJlCoLXPYvEeoTVD5C83vD8k0phMHXYZSm7i5Kpw70kfnROW6tLmu+JUZM3OaHrZLdNUcCEt6pT5QBAEDuxeFEJcpozRB7hqXWVoQ5Qpu7wqsQW7RTFjeHe4Y1tw7WwYMGxL4WbJaA46jBmyscaMWcWd4VUwwJ3F3qy7DGK0YcFYVynfndw2rHBnV79Big3FYMIewwUdwYKClrzzGzjtvUtzWTzJbYR2uZJyYDhJwALxEgoyhu4MMC9nhUBTayNxNxqLRWK525iqRdUyEp7wf5CFmaCrse6UbLLwANgjAhTMgayTABfrGtotY20Rx4TCH0ikUOw0lQXMVQzbamMMY3lfhuXrzvS+03ly450xLmJiYd5fWNaYmIGFGF0V27XDaWRyQwS5iY0xMekuXMfDRugaFF2DLw4ZDVXUNc2YrPKXLmJjTEc6YhgnOYly5iYmIgzExMGxpiX/AO8/PUMf/EqVKnlPKeU8p5TynlPKeWlTynlPKVKdblSpWJ5TynlPKeU8p5TynlPKZmZ5TynlPKeU8p5TynlPKeU8p5TynlPKeU8tK4q/AS4/m+YRdfniztvx3/Fe55lSqMThjOPRmOfyMAegkEdnXZdwtm7iSge5lvoS7NHa39nwf9nzf9nwf9nwf9ny/wDZ8X/Z83/Z8H/Z8/8A2fP/ANnz/wDZ8/8A2fM/2fMf2fM/2fP/ANnx/wDZ8f8A2fP/ANnz/wDZ9/8A7Pv/APZ9/wD7Pi/7Pi/7Pn/7Pl/7Pl/7Pl/7LHvFDVIOvAsZNq4CSgO8CLoDZQxb/AgByfY6wpd22urwDu4BZ0l+Evwl+Evwl9iXBztoyRoDuJuS7bBZ0JczMI3Mrd6wOYyT9Ryl6PFqeOEeHX+MT4xPjH5ADW0XMJfeX5y5Y4QqCO1S+j3IZGxLHqaCywEZGwMH7IQpWx+Ba9IjWb8gRc6XXhDr8XEH/lgn8MHaG8kG3GTrLly+Dzly5cGpY4yvaVKOHaLEYyZ2HnHCLmYbywFdQP3PhX+wX4XvB1J8A/7BHakm0uXLg1Lly5cuXwXLl6Wy2Wy5cuXBlCUJgw2UanhylxQtSqgKmxM3wn4L+Ynqsx0Zkxzcks1equAdvSAdvSWEr9xYDNNv7QyWxMfiMkz8ZF6aLLDnJYsuoY1DsvYdU7iZugOj0g/4IA2K8IfZHKWeXSPcIWSpUqVXHcvSpUPwXUILHQ92GZm7qsZ+rHj980ZjENhRRLWgVxKYQc7A84JcFFDb0gdojdsj/s2ZiW21Pu05XL/7HTnwE9wnskZ8b10HP0ir3hC+hsQ7ROgOElOsa4GI3XSpTQhsRLOp2hfLeKvtd4E1r/ulzled6q5TDFKIPTHPRFAa0QuocFbemtgad523nnpYBcRWdC+cN9DgM+F2nI8J7Ujx+2f1pjMF7/1DEchqtPQ5wvkAB5d4Ioai2dwSFNCraloWvmwL20rlGVoMOtKHm1LhgWoG6enKUWVGUdnqMVwFRZs5g2lJVL0Lk7gN4pHBNu/zm2HL8TZ2Hkw8vKE9wnskeBp8L1hvH4cnyI3HWXCL6iEDBkN31es5FdCROTWCbp7z9NDzLl5AtjxyK21gOV7ecyt5QdN25H8hHQmxZscuYaG1+texzLxC8EjCSNuXhBG0qNmF0Q5UNiGZ2YbuI/0Lc73bsaKDY1ud5ddKigVVhvnEzDpl7DZ5rvnrEtOFCDkLvGIKdZhFnjF7UK4cgcsy23XaOQG4MKgerdSeDnCLOduHfoIu9EA6wTZi8AAQjV0d2PzOfmLut6raOl2EGdg5rtN3MI+87tyGpjPgdp08J7cjx73g/qe2jNj3/qBctYqeTZhGuSLIzY9Y0iZWQeEG4KQ82w8Yv9nQkbS0U226DeXS/wBQSFlTpQO5Vw+QKoTJW20tzV8u+BLgDbN6YbsP5rlZRaZxKnhg+N5CrIAKMhgYT3CeyR0adPjesXeOXSTatZXKe4i4TbOV/kcllSoB/ej3X6aCso8XdnLGxtMPRIpoHfc5su6gw8gU3DP7l6Q1ToiTMTzCjbUeTMLVSuzTfkl1OBickZbJci8x94gdl9pdVzjln2lC2OsLMXTT3Yj5NYl09qWzob6B27RY2IIxsdi4xYngQIXbLGUczIqxKlDiAiWErHKI/WktRyhnlFqHAQXdc9+xOueHcYebEIpQjGECr2gZ9soNbBspEYHHgM0CrI2FKAVVLq59OEZ8DtHl4T25Hj3vB/U9nGcxLR7TAQoJ0zAKp2m2Qo7fA8oT3FKzwvaJARZLVgi2uYkNosWowMWeDHWCyFjArI5zHpAMKuMMTEW6oB6Q6WbGA8iXub3oLhgxp7h+p7FGfG9Y7xrn4wA0RNtxbndDD7St06EDgMjeTLBwNk19g0KQwQ9UM6KJp2gVdoiBgIljKDLsns2goQ2AB7S4sTZinnvA3nm0m3lEr7hAieE5ZTAWHQeUDMBtQ+6bh7Ud5uRTAvgeU2ovAvgeUVTuxBr1jdI3ATxDC6VhMEvDyk19XWUWdQwVRtidvcgD0leF6AD2nZmLBrwuUORUpdPU6QgARsANOhwGfG7R2ntiPHc8Bm05hGVntEpZYNx6w2zMtoHrKPeHWF+yH9hE4FfgNffJ7VGYjzLfWOlgBKItHJO8ClKRwR3JsHUBoXkdz0m2QcvV/Aan5yei0Mn3Y4J7YjxpaO07l9iO85xAqETnUkZT/dPu8ZuzxTBwy2ArhOA1wMiAgkNgjMtwLxL3ju6V1zLE3We4QlFEhAbq6pCJLyFQKNMVwmlSvyVKhN4ULXbeJySnwGIRd2/2jWRtD6JHj5QAC0V1jrLkgYGMwK035TwSu0uXDMqVrU2m8phMAbrKFJiHXvAoiR012odTpGaWMJuMTMqXetSmVKeCpUDMMa7ypUrgqVKYGOAxCTdC5JU+GiVMiAKYPUTqR+iR47iEpI9iplKwwNXmDeta0a0pT8TSrfOY9ryUwg88amZMYJiU0BQE8pUX0guznjbxENpa83fyiDXGgONZWPvk+8T7xPtGvvffp9+h/wBtPsUq/u4PSt9g/CV+0oSAJgWu9IiVOiZX8mLHq82Ub6VG4H8mQOClM/hN55xzKmZmZlszrmes9Z6z109dKeejwO+/F6z1nr+N1rTMzCeemZmZnKtGXMavHU2lyy+LyZ66X2fSX4+kvx9Jfj6S/GXfWHnL4Kl9ouJmZ7y/lz19Zfy5fy5fy5fy5fjPWes9dVIcL4y5cuXLnmnmngngnggy5epq8fKKUA7zLEPD8pbuvAT63xaCKLHfU4f8XPpeil9N5J8wlylygezfEf5Omrf+MFJY8yXLzMHT9+EtbTybXlMt0+HBZZRCSrgrgrlr1MEtcAMlcBckuJQ5GX6SsvGDOPAyyXLmyOiIouh6BbL/AOCX/wAyX/zJf/Ml/wDMl/8AMl/86fEJ8AnwCfCJ8YnzCfOIJ/kg23uBTEqyDdb6PC6XHu65Pm9IA2A8NK4zaXpVyjUiDdkQFy0HVLgslAtZdsBebk6+cOAm0M6kvQ0qVKjI7P1KD1yC8+Rl9pfIbqDvM61uVeGtQ1vjazHtfyUB57nRiy+JaT0JkWy1aEzMwl6Glst1zM6XoWRVLPKdHEuOccs9bAAAoCg4iZluudSWy2ZhLoed8DebxKnIxz1zBly2WwWWzMrW5eqWRIXawHjpXE8eCP0uLz0vgN+DznnDaP1k6jkmXy86ecueely9Tfgvg84eM+P2hNr43hxXL4Ll6XCeelz5zvw3Flx48DH6UuXwYly5daly+CtF6yL0kV/GzLl62SyYgy56w7zEslksgy5cI6+PZlx/HvLl8GOG5cuXLlwSXLlHzN4Nmly4xZceXgx+nLly3touXLiIAbrESs7a9WMzpXJVHflLeCl2D7aX2mZmWy2ZnukVeEi+Vz1vS9Lgy1CjZyHWYIV7C+qwCB1RQHWBBGxLHW5cuXBj+PpLxF8e8uXLlzfTMzC4BWgdVqC2QejczDwl9pcuXLlz5TvBxvLg6LLnYTvChLMGBowFs7P1Z2vqztPVnZTttUbfxAlzOmZ4/wBRCvYq8nTeEhhsS8PrwFEfEZ8RnxGfEYkRYdzMJAAwEODJunrOqPVnZerO29WfaM7L1Z2vqz7RiX9GKi+Kc7rpO39WBNyrVJARVQbB0nberOy9Wdt6s7b1Z2nqzt/Vnbe8URV2ujK+SWW1KvRuwnYTsJVuJ2U+Iz4jAuSEgxtd/wBjJa70v9nYahHZTsvWdl6zsp2UCrBw1E3L8ZVNO+l6b55QKJUqVKlS4ZlSpUpoMpUqV3lSpUqVouZUg2nFUqVKlfhrWu8rvKesp6ymVKlSpUqVK0qVKlQK0I0+sS5z03g2hwrUvEA0NgbO68pYOoWbv8l/mvoK/QDMpiU2qdGBuGThJDZ5csRzg4bJcsh7wAlWgVXpUGz8oirUHQL/AMhgZDNrT4f1Pto+8i6Rzbtnb0fzgiFauwRg8UMj/Zye6mTj8Ql5ziGvHDhWYmBniX5veIta1ZWO9HCc+z2h2g87v3OpDY/L830lrpcvIgAUkIZr4Fwym0ugRpnd/OTb8vxvXBIM48UGZ5zreog9u0Vyuz5Tz0HP8x9tATC86jZjCD2dRyDumTYrlx85nQK4iLkuOXNFTiOWNYAUW7s5eEPVFoJRXGfCJ4EWYGMXDY/L8P0iigJ8WiME41VDd8vGOCm0KxNfue6SZ/K+N65b7I2XyDA8+0TyhCrWBgrsUdAef5VrrHmfVLd4yw3upXq5/KOvajFt41tBjCsRwnHa3x7LjbSwQwh1Yv8Ao1DdL0XrGVK1AUi9XvM/H9xoa6fmEw6nYUlSIIRXK3dOvSHAYoSesbPGBB5EDIOIddFC6+02flOixruoJRkVGzkYekaka3cp/IV5QAKA8oajQNNWvzO9Fh41iWrVsJ41PQ9HLIMmScjJcIuYxFAZ2/I7R8znOy3Ou+Upy5wDygEoVeg/kQd4A2JR0lHSAH5naVnn6ypXj6yl3+ZBlHSU6SjygAY/I4IHtE2Gyf7EOfEusA/uUzRZmOtBcCwQANpapNzeXVbViCOymYylLLsdS9yURUtp9EFEJQO0Nific+wkvei/8lJAGZV7FxCEBYuMXXXKY3jUeEyRXNUyuOKgoU4A6zBGygR2bA1LClGRjlhV+crGOoN32A3YAJLeUgaTdy/Fb040h0B6QSqBd9qxQSkSNYWIHQFbPnKHhMsRuqAzs7S1Jg27Tejk84S5SxY9EKfJlJttbFyrYS20aohAqqUZesQaTaCm4hT5MNvw7kHst1VpooTlB8mndg6CzllmVQbY9Lp+kK5A1Sw5NLPSPzuAHI3v6E2xbCpBKvdgDVVYnjIHk/G7RTFQIG/Ihhg1iLJ5XBCIncKnC0iXhmQAHoXC4sBatVM3FLQWk2NhEausV13K8+/WLNjEqjs1+Jz2kl6WVK47h6HoHuXcTwMG6JxMvTHWHZGCkCAJaAOesGpCwgUc7D55lri0EyUYLTmXMwKhU5KUjvbC12aAqOl4pO0DaJqArqZOVc5z/CIqucGRzpqWiWKrYNh2KukNoVyd+KrshS7G2oSnrW+oDNPaXaHnTFoS6RMpWOUK0FSlFAmJma3ib81MtMzTwRp23KjjhCi5ro4rll3mw/C7QAHgbi723lWdTQQc18+bFzPgc2lDJZRZ0lkXD3aN2dkM5ikXgVXSrs5QkXbNY3A7OyQWqZhmrFpAKqk3+QBVwd+Yl5x3GfGVwvI2NXKWN5IlrtCjd/j7GPhxg+9i7+MyhKxvClZZlPE/jJZU8Ue6ZAMO8xXfnKm7dmW8pPE+sPxBUS52TZVs3SpXd/8AfVf+MA//AEv/2Q==";

function PhoneScan({ className = "" }) {
  return (
    <div className={"relative mx-auto w-[248px] sm:w-[286px] " + className}>
      <div
        className="relative rounded-[40px] p-[10px]"
        style={{
          background: "linear-gradient(160deg,#3A3A46,#1B1B22)",
          boxShadow: "0 44px 80px rgba(44,44,51,.34), 0 0 0 1px rgba(255,255,255,.06) inset",
        }}
      >
        {/* screen */}
        <div className="relative overflow-hidden rounded-[31px] bg-white">
          <img
            src={APP_HOME}
            alt="The DermaVision+ home screen: a greeting card, quick stats, and the list of the 22 skin conditions the app detects."
            className="block w-full"
            style={{ aspectRatio: "720 / 1441", objectFit: "cover" }}
            loading="lazy"
            decoding="async"
          />
          {/* notch */}
          <div
            className="absolute left-1/2 top-0 h-[18px] w-[92px] -translate-x-1/2 rounded-b-[12px]"
            style={{ background: "#1B1B22" }}
          />
          {/* glass sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 42%)",
            }}
          />
        </div>

        {/* side buttons */}
        <span className="absolute -left-[2px] top-[112px] h-9 w-[3px] rounded-l" style={{ background: "#2C2C36" }} />
        <span className="absolute -left-[2px] top-[158px] h-9 w-[3px] rounded-l" style={{ background: "#2C2C36" }} />
        <span className="absolute -right-[2px] top-[130px] h-14 w-[3px] rounded-r" style={{ background: "#2C2C36" }} />
      </div>
    </div>
  );
}

/* -------------------------------- Hero -------------------------------- */
/* Composition: phone centred, seated figure lower-left, standing figure
   pointing in from the right, soft blobs and confetti behind. */

function SeatedFigure({ className = "" }) {
  return (
    <svg viewBox="0 0 300 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dvSeatHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A091E4" />
          <stop offset="100%" stopColor="#6F5FBC" />
        </linearGradient>
        <linearGradient id="dvSeatTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8CF62" />
          <stop offset="100%" stopColor="#EDA92B" />
        </linearGradient>
        <linearGradient id="dvSeatLeg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9384DB" />
          <stop offset="100%" stopColor="#7466C4" />
        </linearGradient>
      </defs>

      {/* legs stretched to the right, feet toward the phone */}
      <path d="M96 196 C 140 176, 206 178, 246 190 L 250 212 C 200 226, 132 224, 96 214 Z" fill="url(#dvSeatLeg)" />
      <path d="M240 186 q22 -4 30 8 q6 12 -10 16 q-18 4 -26 -8 z" fill="#EFEFF5" />
      <path d="M236 206 q22 -2 28 10 q4 10 -12 12 q-18 2 -22 -10 z" fill="#E2E2EC" />

      {/* seat / hip */}
      <path d="M62 176 C 60 148, 84 132, 112 136 C 140 140, 152 166, 142 196 C 116 212, 74 208, 62 176 Z" fill="url(#dvSeatLeg)" />

      {/* torso, leaning forward over the phone */}
      <path d="M76 148 C 70 112, 92 88, 122 88 C 154 88, 172 114, 166 150 C 144 168, 100 168, 76 148 Z" fill="url(#dvSeatTop)" />

      {/* head + hair */}
      <path d="M84 96 C 66 62, 84 26, 120 22 C 158 18, 182 48, 174 84 C 170 104, 174 122, 166 142 C 158 122, 156 108, 154 96 C 138 108, 112 110, 98 100 C 94 122, 90 140, 84 158 C 74 138, 82 116, 84 96 Z" fill="url(#dvSeatHair)" />
      <path d="M118 52 C 152 48, 168 74, 162 104 C 156 130, 132 140, 114 130 C 104 106, 106 74, 118 52 Z" fill="#F6D2B4" />
      <path d="M110 48 C 142 32, 176 52, 176 88 C 168 62, 142 50, 116 60 Z" fill="#7E6EC9" />

      {/* arm reaching down to her own phone */}
      <path d="M140 150 C 164 160, 180 176, 178 190" fill="none" stroke="#F6D2B4" strokeWidth="15" strokeLinecap="round" />
      <g transform="rotate(24 180 192)">
        <rect x="168" y="176" width="24" height="34" rx="5" fill={C.pink} />
        <rect x="171" y="180" width="18" height="24" rx="2" fill="#fff" opacity=".4" />
      </g>

      {/* ground shadow */}
      <ellipse cx="150" cy="228" rx="104" ry="10" fill="#2C2C33" opacity=".07" />
    </svg>
  );
}

function StandingFigure({ className = "" }) {
  return (
    <svg viewBox="0 0 260 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dvStandTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8CF62" />
          <stop offset="100%" stopColor="#EDA92B" />
        </linearGradient>
        <linearGradient id="dvStandLeg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9384DB" />
          <stop offset="100%" stopColor="#6F5FBC" />
        </linearGradient>
      </defs>

      {/* legs */}
      <path d="M92 210 C 128 202, 172 204, 196 212 L 190 330 q-2 42 -10 62 h-30 q4 -50 2 -92 q-14 44 -24 92 h-30 q6 -56 4 -100 z" fill="url(#dvStandLeg)" />
      <path d="M116 388 q24 -6 34 6 q6 12 -14 14 h-30 q-6 -14 10 -20 z" fill="#EFEFF5" />
      <path d="M158 388 q24 -6 34 6 q6 12 -14 14 h-30 q-6 -14 10 -20 z" fill="#E2E2EC" />

      {/* sweater */}
      <path d="M84 118 C 96 92, 130 80, 164 88 C 196 96, 208 124, 204 164 L 200 220 C 160 234, 116 232, 88 218 Z" fill="url(#dvStandTop)" />

      {/* arm pointing left, toward the phone */}
      <path d="M96 138 C 60 146, 26 152, 8 146" fill="none" stroke="url(#dvStandTop)" strokeWidth="26" strokeLinecap="round" />
      <path d="M14 146 q-14 -2 -12 6 q2 8 16 6 q12 -2 10 -8 z" fill="#F6D2B4" />
      <circle cx="10" cy="150" r="9" fill="#F6D2B4" />

      {/* head */}
      <circle cx="138" cy="52" r="30" fill="#F6D2B4" />
      <path d="M108 46 C 106 14, 148 4, 170 24 C 182 36, 178 54, 172 62 C 170 40, 150 30, 128 38 q-12 4 -20 8 z" fill="#6F5FBC" />
      <path d="M108 44 q-10 6 -6 16 q4 8 10 4 z" fill="#6F5FBC" />
      <path d="M132 82 q12 8 24 0 l0 12 q-14 8 -24 0 z" fill="#EFC49E" />

      {/* ground shadow */}
      <ellipse cx="150" cy="410" rx="72" ry="9" fill="#2C2C33" opacity=".07" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg,${C.yellow},${C.pink},${C.purple})` }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h1 className="dv-rise display mx-auto max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ color: C.ink }}>
          With DermaVision+ you
          <br />
          <span style={{ color: C.pink }}>know your skin sooner</span>
        </h1>

        <p className="dv-rise mx-auto mt-5 max-w-lg text-sm sm:text-base lg:text-lg" style={{ color: C.grey, animationDelay: ".08s" }}>
          Point your camera at a spot, mole or rash. Get a clear read on what it
          looks like, how it's changing, and whether it's worth a doctor's time.
        </p>

        <div className="dv-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: ".16s" }}>
          <a
            href="#download"
            className="rounded-full px-8 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.pink, boxShadow: "0 12px 26px rgba(232,73,47,.35)" }}
          >
            download the app
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border-2 px-8 py-3 text-sm font-bold transition-colors"
            style={{ borderColor: C.pinkSoft, color: C.pink }}
          >
            see how it works
          </a>
        </div>

        <div className="dv-rise mt-7 flex flex-wrap items-center justify-center gap-2 text-xs" style={{ color: C.grey, animationDelay: ".22s" }}>
          <span>Detects 22 skin conditions, across every skin tone</span>
          <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: C.pink }}>
            22 Diseases
          </span>
        </div>

        {/* ---------------- illustration stage ---------------- */}
        <div className="relative mx-auto mt-12 w-full max-w-3xl" style={{ minHeight: 420 }}>
          {/* blobs */}
          <svg viewBox="0 0 800 520" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="dvBlobA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FBC9B8" stopOpacity=".85" />
                <stop offset="100%" stopColor="#FDE7DE" stopOpacity=".5" />
              </linearGradient>
              <linearGradient id="dvBlobB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F8CF62" />
                <stop offset="100%" stopColor="#EDA92B" />
              </linearGradient>
            </defs>
            {/* big soft blob behind the phone, left */}
            <path
              d="M112 306 C 84 216, 158 130, 268 118 C 372 106, 430 168, 424 254 C 418 344, 340 418, 236 414 C 152 410, 138 372, 112 306 Z"
              fill="url(#dvBlobA)"
            />
            {/* yellow blob, upper right */}
            <path
              d="M556 96 C 604 66, 664 84, 668 132 C 672 182, 622 210, 578 196 C 534 182, 514 122, 556 96 Z"
              fill="url(#dvBlobB)"
            />
          </svg>

          {/* confetti */}
          <svg viewBox="0 0 800 520" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {/* dashed curve, left */}
            <path d="M104 176 q42 -44 88 -6" fill="none" stroke={C.yellow} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 10" />
            {/* dashed curve, right */}
            <path d="M600 172 q56 22 44 76" fill="none" stroke={C.purple} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 10" />
            {/* teal dot, left */}
            <circle cx="150" cy="132" r="10" fill="#5AC8E8" />
            <circle cx="150" cy="132" r="3.5" fill="#fff" />
            {/* pink bar, far left */}
            <rect x="0" y="284" width="72" height="5" rx="2.5" fill={C.pink} />
            {/* leaves, bottom left */}
            <path d="M92 468 C 108 436, 108 402, 96 372 C 74 402, 72 440, 92 468 Z" fill="#5AC8E8" />
            <path d="M126 476 C 148 448, 156 412, 148 380 C 120 406, 112 446, 126 476 Z" fill={C.yellow} />
            {/* leaves, bottom right */}
            <path d="M700 462 C 718 428, 720 392, 708 362 C 684 392, 682 432, 700 462 Z" fill={C.purple} />
            <path d="M742 470 C 766 438, 774 398, 764 366 C 734 396, 726 438, 742 470 Z" fill={C.yellow} />
            <path d="M664 472 C 678 446, 680 418, 672 394 C 654 418, 652 450, 664 472 Z" fill="#5AC8E8" />
          </svg>

          {/* seated figure, lower left — desktop only */}
          <SeatedFigure className="pointer-events-none absolute bottom-0 left-0 hidden w-56 lg:block xl:w-64" />

          {/* phone, centre */}
          <div className="dv-float relative z-10 flex justify-center pb-6 pt-4">
            <PhoneScan />
          </div>

          {/* standing figure, right — desktop only */}
          <StandingFigure className="pointer-events-none absolute bottom-0 right-0 hidden w-40 lg:block xl:w-48" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Testimonials ---------------------------- */
const QUOTES = [
  {
    role: "Practice Nurse",
    city: "MANCHESTER",
    text: "Half my walk-ins are skin questions. When someone arrives with four weeks of Derma Vision scans, I can see the change over time instead of guessing from one look.",
  },
  {
    role: "Living with psoriasis",
    city: "LEEDS",
    text: "I stopped photographing my arms in bad bathroom light and hoping I'd remember. The app tracks flare-ups for me and tells me when a patch is genuinely spreading.",
  },
  {
    role: "New parent",
    city: "BRISTOL",
    text: "A rash on a baby at 11pm is terrifying. Getting a calm read on whether this needs A&E tonight or a GP on Monday is worth everything.",
  },
  {
    role: "Outdoor guide",
    city: "GLASGOW",
    text: "I'm in the sun 200 days a year. Derma Vision flagged a mole that had changed shape. It turned out to be nothing, but I'd never have caught it myself.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 6000);
    return () => clearInterval(timer.current);
  }, []);

  const prev = (i - 1 + QUOTES.length) % QUOTES.length;
  const next = (i + 1) % QUOTES.length;

  return (
    <section className="relative overflow-hidden py-16" style={{ background: C.yellow }}>
      <h2 className="display text-center text-2xl font-extrabold md:text-3xl text-white">
        What people say about Derma Vision
      </h2>

      <div className="relative mx-auto mt-8 flex max-w-6xl items-stretch justify-center gap-4 px-6">
        {[prev, i, next].map((idx, pos) => {
          const active = pos === 1;
          return (
            <article
              key={`${idx}-${pos}`}
              className={
                "min-w-0 rounded-lg p-6 transition-all duration-500 " +
                (active ? "w-full max-w-2xl flex-none" : "hidden w-14 flex-none self-center md:block")
              }
              style={{
                background: active ? "#fff" : "rgba(255,255,255,.35)",
                boxShadow: active ? "0 22px 44px rgba(58,58,72,.14)" : "none",
                height: active ? "auto" : 150,
                overflow: "hidden",
              }}
              aria-hidden={!active}
            >
              <p className="display text-sm font-bold" style={{ color: C.ink }}>
                {QUOTES[idx].role}
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-widest" style={{ color: C.purple }}>
                {QUOTES[idx].city}
              </p>
              <p className="mt-4 text-sm leading-relaxed lg:text-base" style={{ color: C.ink }}>
                <span className="mr-1 text-lg font-bold" style={{ color: C.pink }}>
                  “
                </span>
                {QUOTES[idx].text}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {QUOTES.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Show testimonial ${n + 1}`}
            className="h-2 rounded-full transition-all"
            style={{ width: n === i ? 22 : 8, background: n === i ? "#fff" : "rgba(255,255,255,.5)" }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Welcome ------------------------------ */
function Welcome() {
  return (
    <section id="why" className="relative overflow-hidden py-20 md:py-28" style={{ background: C.wash }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <div className="mb-4 h-1 w-12 rounded-full" style={{ background: C.pink }} />
          <h2 className="display text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: C.ink }}>
            Welcome to Derma Vision
          </h2>
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: C.grey }}>
            Your skin is the only organ you can actually see. We help you catch changes early.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 4px 24px rgba(58,58,72,.08)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.pinkSoft }}>
              <span style={{ color: C.pink, fontSize: "24px" }}>📱</span>
            </div>
            <h3 className="display text-lg font-bold mb-3" style={{ color: C.ink }}>
              Turn your phone into a dermatologist's tool
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
              Your phone camera becomes a record of what your skin is doing, week by week. Track changes others miss.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 4px 24px rgba(58,58,72,.08)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.purpleSoft }}>
              <span style={{ color: C.purple, fontSize: "24px" }}>🧠</span>
            </div>
            <h3 className="display text-lg font-bold mb-3" style={{ color: C.ink }}>
              AI trained on dermatology expertise
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
              Computer vision trained on reviewed imagery and your history. Spots changes your eyes can filter out.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 4px 24px rgba(58,58,72,.08)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.yellowSoft }}>
              <span style={{ color: C.yellow, fontSize: "24px" }}>✓</span>
            </div>
            <h3 className="display text-lg font-bold mb-3" style={{ color: C.ink }}>
              A clear next step, every time
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
              Get a plain-language read and confidence score. Know whether to watch, treat at home, or see a doctor.
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-8 md:p-10" style={{ background: "#fff", border: `2px solid ${C.pinkSoft}` }}>
          <p className="text-center text-base md:text-lg leading-relaxed" style={{ color: C.ink }}>
            <span style={{ fontWeight: 700 }}>Derma Vision doesn't diagnose.</span> It helps you decide when a real doctor needs to.
          </p>
        </div>

        <div className="relative mt-10 hidden">
          <svg viewBox="0 0 640 420" className="w-full" aria-hidden="true">
            <defs>
              <radialGradient id="dvNeb" cx="62%" cy="46%" r="72%">
                <stop offset="0%" stopColor="#4A3F86" />
                <stop offset="55%" stopColor="#241E46" />
                <stop offset="100%" stopColor="#14102B" />
              </radialGradient>
              <linearGradient id="dvBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.pink} stopOpacity=".85" />
                <stop offset="100%" stopColor="#241E46" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="dvHair" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9B8BDD" />
                <stop offset="100%" stopColor="#6F5FBC" />
              </linearGradient>
              <linearGradient id="dvTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F8CF62" />
                <stop offset="100%" stopColor="#EDAF2E" />
              </linearGradient>
              <clipPath id="dvNebClip">
                <path d="M212 258 C 214 214, 262 176, 322 158 C 372 100, 452 92, 496 128 C 566 116, 624 152, 622 208 C 634 262, 588 316, 522 326 C 468 372, 386 368, 344 330 C 272 336, 210 306, 212 258 Z" />
              </clipPath>
            </defs>

            {/* nebula of everything the scan sees */}
            <path
              d="M212 258 C 214 214, 262 176, 322 158 C 372 100, 452 92, 496 128 C 566 116, 624 152, 622 208 C 634 262, 588 316, 522 326 C 468 372, 386 368, 344 330 C 272 336, 210 306, 212 258 Z"
              fill="url(#dvNeb)"
            />

            <g clipPath="url(#dvNebClip)">
              {/* beam entering from the phone */}
              <path d="M206 268 L 340 190 L 340 330 Z" fill="url(#dvBeam)" opacity=".5" />

              {/* stars */}
              {[[268,214,1.6],[300,182,1.2],[352,146,2],[404,124,1.4],[470,138,1.8],[532,152,1.2],[588,190,1.6],[560,254,1.3],[498,296,1.9],[430,318,1.2],[368,300,1.7],[286,286,1.4],[330,248,1.1],[452,214,1.5],[600,244,1.3],[248,246,1.2]].map(([x, y, r], n) => (
                <circle key={n} cx={x} cy={y} r={r} fill="#fff" opacity={0.5 + (n % 3) * 0.2} />
              ))}

              {/* orbit / atom motif */}
              <g stroke="#8E7ED6" strokeWidth="1.6" fill="none" opacity=".5">
                <ellipse cx="404" cy="212" rx="44" ry="17" />
                <ellipse cx="404" cy="212" rx="44" ry="17" transform="rotate(60 404 212)" />
                <ellipse cx="404" cy="212" rx="44" ry="17" transform="rotate(-60 404 212)" />
              </g>
              <circle cx="404" cy="212" r="4" fill={C.pink} />

              {/* skin patches under observation, floating in the cloud */}
              {[
                { x: 470, y: 178, r: 24, tone: "#E7B394", spot: "#B4705A" },
                { x: 352, y: 268, r: 19, tone: "#8D5A3C", spot: "#5E3524" },
                { x: 548, y: 244, r: 16, tone: "#F2D3B8", spot: "#C08A6A" },
              ].map((s, n) => (
                <g key={n}>
                  <circle cx={s.x} cy={s.y} r={s.r + 5} fill="none" stroke={C.pink} strokeWidth="1.6" opacity=".7" />
                  <circle cx={s.x} cy={s.y} r={s.r} fill={s.tone} opacity=".95" />
                  <ellipse cx={s.x + 2} cy={s.y - 1} rx={s.r * 0.42} ry={s.r * 0.34} fill={s.spot} opacity=".85" transform={`rotate(${20 + n * 30} ${s.x} ${s.y})`} />
                </g>
              ))}

              {/* faint measurement rings + data ticks */}
              <circle cx="300" cy="222" r="26" fill="none" stroke={C.teal} strokeWidth="1.4" opacity=".55" />
              <circle cx="588" cy="212" r="18" fill="none" stroke="#8E7ED6" strokeWidth="1.4" opacity=".5" />
              <path d="M250 300 l16 -14 l14 10 l20 -22" fill="none" stroke={C.pink} strokeWidth="2" opacity=".7" strokeLinecap="round" />
              <path d="M496 316 h44" stroke="#8E7ED6" strokeWidth="2" opacity=".5" strokeLinecap="round" />
              <path d="M496 306 h26" stroke={C.teal} strokeWidth="2" opacity=".5" strokeLinecap="round" />
            </g>

            {/* woman, seen from behind-left */}
            <g>
              {/* hair */}
              <path
                d="M60 214 C 46 150, 78 96, 132 94 C 186 92, 214 138, 206 190 C 202 224, 210 250, 200 286 C 190 260, 186 240, 184 220 C 168 236, 140 240, 120 228 C 110 262, 104 300, 96 336 C 74 300, 62 258, 60 214 Z"
                fill="url(#dvHair)"
              />
              {/* face */}
              <path d="M126 130 C 166 126, 186 156, 182 192 C 178 226, 152 244, 128 238 C 116 210, 114 166, 126 130 Z" fill="#F6D2B4" />
              {/* front hair sweep */}
              <path d="M118 128 C 152 112, 190 130, 194 168 C 186 146, 160 134, 130 142 Z" fill="#7E6EC9" />
              {/* shoulders / top */}
              <path d="M78 420 C 74 356, 106 300, 148 292 C 196 284, 236 322, 240 420 Z" fill="url(#dvTop)" />
              {/* arm extended toward the nebula */}
              <path d="M172 336 C 196 328, 214 300, 206 272" fill="none" stroke="#F6D2B4" strokeWidth="17" strokeLinecap="round" />
              {/* phone in hand */}
              <g transform="rotate(-16 206 268)">
                <rect x="186" y="242" width="34" height="50" rx="7" fill={C.pink} />
                <rect x="191" y="248" width="24" height="34" rx="3" fill="#fff" opacity=".45" />
                <circle cx="203" cy="288" r="2.6" fill="#fff" opacity=".7" />
              </g>
              {/* glow where beam leaves the phone */}
              <circle cx="214" cy="262" r="9" fill={C.pink} opacity=".35" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- How AI helps --------------------------- */
function HowAI() {
  return (
    <section id="how-it-works" className="py-20 md:py-28" style={{ background: C.wash }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div className="relative">
          <div className="mb-6 h-1 w-12 rounded-full" style={{ background: C.pink }} />
          <svg viewBox="0 0 460 300" className="w-full" aria-hidden="true">
            <defs>
              <linearGradient id="dvFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B9B9C6" />
                <stop offset="100%" stopColor="#B9B9C6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="dvSkinArm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FBDCC4" />
                <stop offset="100%" stopColor="#F0BE9B" />
              </linearGradient>
              <clipPath id="dvScreen">
                <rect x="126" y="86" width="150" height="94" rx="7" />
              </clipPath>
            </defs>

            {/* thin construction frame, as in the reference */}
            <rect x="96" y="52" width="220" height="150" fill="none" stroke={C.pinkSoft} strokeWidth="1.6" />

            {/* the crowd, greyed and fading out — what you see unaided */}
            <g fill="url(#dvFade)">
              {/* left figure */}
              <circle cx="86" cy="96" r="15" />
              <path d="M66 128 q20 -12 40 0 l6 60 h-52 z" />
              <rect x="74" y="186" width="12" height="66" />
              <rect x="92" y="186" width="12" height="66" />
              {/* mid-right figure */}
              <circle cx="300" cy="88" r="15" />
              <path d="M280 120 q20 -12 40 0 l6 62 h-52 z" />
              <rect x="288" y="180" width="12" height="70" />
              <rect x="306" y="180" width="12" height="70" />
              {/* far right figure */}
              <circle cx="368" cy="98" r="16" />
              <path d="M346 132 q22 -13 44 0 l6 58 h-56 z" />
              <rect x="354" y="188" width="13" height="64" />
              <rect x="374" y="188" width="13" height="64" />
              {/* the one being scanned — grey outside the screen */}
              <circle cx="196" cy="92" r="15" />
              <path d="M176 124 q20 -12 40 0 l6 60 h-52 z" />
              <rect x="184" y="182" width="12" height="70" />
              <rect x="202" y="182" width="12" height="70" />
            </g>

            {/* phone body */}
            <rect x="114" y="74" width="174" height="118" rx="14" fill={C.pink} />
            <rect x="126" y="86" width="150" height="94" rx="7" fill="#FDFDFF" />
            <circle cx="299" cy="133" r="3.5" fill="#fff" opacity=".7" />

            {/* what the camera actually reveals — same person, in full colour */}
            <g clipPath="url(#dvScreen)">
              <rect x="126" y="86" width="150" height="94" fill="#FDFDFF" />
              <circle cx="196" cy="112" r="15" fill="#F6D2B4" />
              <path d="M182 100 q14 -12 28 0 q-14 -5 -28 0 z" fill={C.purple} />
              <path d="M176 144 q20 -12 40 0 l4 36 h-48 z" fill={C.yellow} />
              <rect x="184" y="176" width="10" height="8" fill={C.purple} />
              <rect x="202" y="176" width="10" height="8" fill={C.purple} />
              {/* the finding: a marked patch and its trend */}
              <circle cx="207" cy="150" r="6" fill="#C0785E" />
              <circle cx="207" cy="150" r="11" fill="none" stroke={C.pink} strokeWidth="1.8" />
              <path d="M138 168 l16 -14 l12 8 l14 -20 l12 10 l20 -30" fill="none" stroke={C.pink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="232" cy="122" r="2.5" fill={C.teal} />
              <circle cx="248" cy="140" r="2.5" fill={C.teal} />
              <path d="M232 122 L248 140" stroke={C.teal} strokeWidth="1.2" />
            </g>

            {/* hand holding the phone from below-left */}
            <g fill="url(#dvSkinArm)">
              <path d="M2 292 C 24 236, 62 202, 108 190 C 132 184, 152 192, 158 208 C 164 226, 150 242, 128 246 C 104 250, 82 266, 70 296 Z" />
              {/* fingers curling over the front edge */}
              <path d="M126 186 q26 -8 34 8 q6 14 -12 18 q-18 4 -26 -8 z" />
              <path d="M148 176 q24 -8 32 6 q6 12 -10 16 q-18 4 -24 -8 z" />
              <path d="M172 170 q22 -8 30 6 q5 12 -10 15 q-16 3 -22 -8 z" />
              {/* thumb across the back */}
              <path d="M96 214 q34 -22 64 -16 q14 4 8 16 q-8 14 -34 12 q-22 -2 -38 -12 z" />
            </g>

            {/* ground line */}
            <path d="M20 254 H 440" stroke={C.pinkSoft} strokeWidth="1.6" />
          </svg>
        </div>

        <div>
          <h2 className="display text-2xl font-extrabold md:text-3xl leading-snug" style={{ color: C.ink }}>
            How AI helps you
            <br />
            <span style={{ color: C.pink }}>catch it earlier</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: C.grey }}>
            Skin changes slowly enough that you stop noticing. Derma Vision's
            model was trained on reviewed dermatology imagery across every skin
            tone, then checked by consultant dermatologists. Each scan is
            measured against your own previous scans — so what you get isn't a
            verdict, it's a trend. Go Derma Vision, and stop waiting to see.
          </p>

          <div className="mt-6 space-y-3">
            {[
              ["Scan", "Ten seconds, any light, any skin tone."],
              ["Compare", "Matched against your history and reviewed imagery."],
              ["Act", "A clear next step, and a report your GP can read."],
            ].map(([t, d], n) => (
              <div key={t} className="flex gap-3">
                <span
                  className="display flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: n === 2 ? C.pink : C.purple }}
                >
                  {n + 1}
                </span>
                <p className="text-sm" style={{ color: C.grey }}>
                  <strong style={{ color: C.ink }}>{t}.</strong> {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Situations ---------------------------- */
const SITUATIONS = [
  { title: "To catch changes", sub: "in a mole you've had for years", a: C.purple, b: C.yellow },
  { title: "To calm the panic", sub: "over a rash that appeared overnight", a: C.pink, b: C.purpleSoft },
  { title: "To track a flare-up", sub: "of eczema, acne or psoriasis", a: C.yellow, b: C.purple },
  { title: "To help you explain", sub: "what's been happening, to a GP", a: C.teal, b: C.pink },
];

function SituationArt({ a, b }) {
  return (
    <svg viewBox="0 0 120 100" className="mx-auto w-32" aria-hidden="true">
      <ellipse cx="60" cy="82" rx="46" ry="10" fill="#F0F0F4" />
      <circle cx="42" cy="34" r="13" fill={a} />
      <path d="M24 78 q18 -34 36 0 z" fill={b} />
      <rect x="70" y="30" width="30" height="42" rx="6" fill="#fff" stroke={a} strokeWidth="2.5" />
      <circle cx="85" cy="48" r="7" fill={b} opacity=".8" />
      <path d="M76 62 h18" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Situations() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="display text-2xl font-extrabold md:text-3xl" style={{ color: C.ink }}>
          There for you in any situation
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: C.grey }}>
          A new spot, a rash on a child, a mole that looks different in the
          mirror — the moments you'd otherwise ignore for another six months.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {SITUATIONS.map((s) => (
            <div key={s.title} className="group">
              <div className="transition-transform duration-300 group-hover:-translate-y-1.5">
                <SituationArt a={s.a} b={s.b} />
              </div>
              <h3 className="display mt-3 text-sm font-bold" style={{ color: C.ink }}>
                {s.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: C.grey }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Secret weapon --------------------------- */
function Pocket() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: C.wash }}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-2">
        <div>
          <div className="mb-6 h-1 w-12 rounded-full" style={{ background: C.pink }} />
          <h2 className="display text-2xl font-extrabold md:text-3xl leading-snug" style={{ color: C.ink }}>
            A dermatologist's eye
            <br />
            <span style={{ color: C.pink }}>in your back pocket</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: C.grey }}>
            Waiting lists are long and mirrors are unreliable. Derma Vision
            gives you a second look whenever you want one — in the bathroom, on
            a hike, at 2am with a worried toddler. Scan it, log it, and stop
            carrying the question around. Go Derma Vision.
          </p>
        </div>

        <div className="relative flex justify-center">
          <svg viewBox="0 0 260 300" className="w-64" aria-hidden="true">
            <path d="M40 0 h180 v70 h-180 z" fill={C.yellow} />
            <path d="M40 65 h180 v170 q-90 40 -180 0 z" fill={C.purple} />
            <rect x="140" y="105" width="52" height="66" rx="7" fill={C.pink} />
            <text x="166" y="148" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800" fontFamily="Poppins, sans-serif">
              d
            </text>
            <path d="M70 150 q30 26 62 22" fill="none" stroke="#7A6BBE" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- In numbers ---------------------------- */
const STATS = [
  { n: "99%", t: "of melanoma cases are survivable when they're found at stage 1.", tint: C.purpleSoft },
  { n: "14", t: "weeks is the average wait for a routine dermatology referral.", tint: C.yellowSoft },
  { n: "1 in 4", t: "GP appointments involve a skin complaint that could start at home.", tint: C.pinkSoft },
  { n: "10s", t: "is all a Derma Vision scan takes, from camera to clear answer.", tint: "#D9F5F6" },
];

function Numbers() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="display text-center text-2xl font-extrabold md:text-3xl" style={{ color: C.ink }}>
          In numbers
        </h2>
        <p className="mt-2 text-center text-sm" style={{ color: C.grey }}>
          Why looking early matters more than looking hard.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {STATS.map((s) => (
            <div
              key={s.n}
              className="relative flex items-center gap-4 overflow-hidden rounded-lg bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 14px 34px rgba(58,58,72,.08)" }}
            >
              <div className="flex-1">
                <p className="display text-3xl font-extrabold" style={{ color: C.pink }}>
                  {s.n}
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: C.grey }}>
                  {s.t}
                </p>
              </div>
              <div className="h-16 w-16 flex-none rounded-full" style={{ background: s.tint }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FAQ -------------------------------- */
const FAQS = [
  ["Is this a diagnosis?", "No. Derma Vision is a screening and tracking tool. It tells you what a change looks like and how confident it is, then points you to a clinician when that's the right call. Only a doctor can diagnose."],
  ["Does it work on my skin tone?", "Yes. The model is trained and evaluated across the full Fitzpatrick range, and we publish accuracy per skin-tone group rather than a single headline number."],
  ["Where do my photos go?", "Scans are encrypted on your device and processed on our servers, then stored only in your private history. We never sell images and never use them for training without you opting in."],
  ["What if it misses something?", "It will sometimes. That's why every result includes a confidence score, and why anything ambiguous is routed to 'see a doctor' rather than 'looks fine'. If something worries you, go anyway."],
  ["Why an APK instead of the Play Store?", "We ship the APK direct so you always get the current build without waiting on store review. Download it from dermavision.app only — an APK from anywhere else isn't ours, and we can't vouch for what's in it."],
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="display text-center text-2xl font-extrabold md:text-3xl" style={{ color: C.ink }}>
          Questions people actually ask
        </h2>
        <div className="mt-10 space-y-3">
          {FAQS.map(([q, a], n) => {
            const isOpen = open === n;
            return (
              <div key={q} className="overflow-hidden rounded-lg" style={{ background: C.wash }}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : n)}
                  aria-expanded={isOpen}
                >
                  <span className="display text-sm font-bold" style={{ color: C.ink }}>
                    {q}
                  </span>
                  <span
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-white transition-transform"
                    style={{ background: C.pink, transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: C.grey }}>
                    {a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Team -------------------------------- */
const TEAM = [
  { name: "Dr. Aisha Rahman", role: "Dermatology" },
  { name: "Marcus Hale", role: "Machine Learning" },
  { name: "Priya Nair", role: "Management" },
  { name: "Tom Okafor", role: "User Experience" },
  { name: "Elena Vasquez", role: "Clinical Safety" },
];

function Team() {
  const [active, setActive] = useState(2);
  return (
    <section className="py-20 md:py-28" style={{ background: C.wash }}>
      <h2 className="display text-center text-xl font-extrabold" style={{ color: C.ink }}>
        Team and advisors
      </h2>

      <div className="dv-scroll mx-auto mt-10 flex max-w-5xl justify-start gap-6 overflow-x-auto px-6 md:justify-center">
        {TEAM.map((m, n) => {
          const on = active === n;
          return (
            <button
              key={m.name}
              onMouseEnter={() => setActive(n)}
              onFocus={() => setActive(n)}
              className="flex-none text-center transition-all"
              style={{ opacity: on ? 1 : 0.55 }}
            >
              <div
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-colors"
                style={{ background: on ? C.pink : C.pinkSoft }}
              >
                <svg viewBox="0 0 60 60" className="h-16 w-16" aria-hidden="true">
                  <circle cx="30" cy="22" r="11" fill="none" stroke={on ? "#fff" : C.pink} strokeWidth="1.6" />
                  <path d="M12 52 q18 -22 36 0" fill="none" stroke={on ? "#fff" : C.pink} strokeWidth="1.6" />
                </svg>
              </div>
              <p className="display mt-3 text-xs font-bold" style={{ color: on ? C.ink : C.grey }}>
                {m.name}
              </p>
              <p className="text-[11px]" style={{ color: on ? C.purple : C.grey }}>
                {m.role}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ Download ----------------------------- */
const APK = {
  href: "/downloads/derma-vision-latest.apk",
  version: "1.0.4",
  size: "24 MB",
  minAndroid: "Android 8.0+",
  updated: "July 2026",
};

function Download() {
  return (
    <section id="download" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
        <div className="relative flex justify-center">
          <div className="absolute -top-4 left-0 h-1 w-12 rounded-full" style={{ background: C.pink }} />
          <PhoneScan />
        </div>

        <div>
          <h2 className="display text-2xl font-extrabold leading-snug md:text-3xl" style={{ color: C.ink }}>
            Get Derma Vision.
            <br />
            It's free.
          </h2>
          <p className="mt-3 max-w-sm text-sm" style={{ color: C.grey }}>
            Download the Android app and let AI help you spot the changes that
            matter, before they become the ones that don't wait.
          </p>

          <a
            href={APK.href}
            download
            className="mt-6 inline-flex items-center gap-4 rounded-xl px-6 py-4 text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.pink, boxShadow: "0 14px 30px rgba(232,73,47,.35)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="M7 11l5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            <span className="text-left leading-tight">
              <span className="block text-[9px] uppercase tracking-widest opacity-90">Direct download</span>
              <span className="display block text-base font-bold">Download APK</span>
            </span>
          </a>

          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: C.grey }}>
            {[
              ["Version", APK.version],
              ["Size", APK.size],
              ["Requires", APK.minAndroid],
              ["Updated", APK.updated],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-1.5">
                <dt>{k}:</dt>
                <dd className="font-semibold" style={{ color: C.ink }}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-lg p-4" style={{ background: C.wash }}>
            <p className="display text-xs font-bold" style={{ color: C.ink }}>
              Installing an APK
            </p>
            <ol className="mt-2 space-y-1.5 text-xs leading-relaxed" style={{ color: C.grey }}>
              <li>1. Tap Download APK — the file lands in your Downloads folder.</li>
              <li>2. Open it. Android will ask permission to install from this source; allow it for your browser.</li>
              <li>3. Tap Install, then open Derma Vision and run your first scan.</li>
            </ol>
            <p className="mt-3 text-[11px]" style={{ color: C.grey }}>
              Only ever install this file from dermavision.app. If you got it
              anywhere else, delete it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Footer ------------------------------ */
function Footer() {
  return (
    <footer className="relative overflow-hidden pb-10 pt-14" style={{ background: C.wash }}>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <Logo />

        <div>
          <p className="display text-xs font-bold" style={{ color: C.ink }}>
            Visiting address
          </p>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: C.grey }}>
            Derma Vision Labs
            <br />
            18 Peter Street
            <br />
            Manchester M2 3NQ
          </p>
        </div>

        <div>
          <p className="display text-xs font-bold" style={{ color: C.ink }}>
            Contact
          </p>
          <p className="mt-3 text-xs" style={{ color: C.pink }}>
            Tel: +44 161 000 0000
          </p>
          <p className="mt-1 text-xs font-bold" style={{ color: C.pink }}>
            Mail: hello@dermavision.app
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xs" style={{ color: C.grey }}>
            © 2026 Derma Vision Labs.
          </p>
          <p className="text-xs" style={{ color: C.grey }}>
            All rights reserved.
          </p>
          <div className="mt-4 flex gap-2 md:justify-end">
            {["in", "f", "t", "ig"].map((s) => (
              <span
                key={s}
                className="flex h-6 w-6 items-center justify-center rounded text-[9px] font-bold text-white"
                style={{ background: C.pink }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-6 text-[10px]" style={{ color: C.grey }}>
        Derma Vision is a wellness and screening tool. It does not diagnose,
        treat or replace medical advice. If something concerns you, see a
        doctor.
      </p>

      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{ background: `linear-gradient(90deg,${C.yellow},${C.pink},${C.purple})` }}
      />
    </footer>
  );
}

/* -------------------------------- Page ------------------------------- */
export default function DermaVisionLanding() {
  return (
    <div className="dv min-h-screen bg-white antialiased">
      <Fonts />
      <Nav />
      <main>
        <Hero />
        <Testimonials />
        <Welcome />
        <HowAI />
        <Situations />
        <Pocket />
        <Numbers />
        <FAQ />
        <Team />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
