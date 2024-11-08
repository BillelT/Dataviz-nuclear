import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../stylesheets/App.scss";

// Enregistrer le plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

const NumberData = ({
  sub = "Charbon",
  number = 850,
  under = "de CO2",
  unit = "g",
  color = "coal-color",
}) => {
  const refCompteurs = useRef([]); // Référence pour chaque compteur

  useEffect(() => {
    // Sélectionner toutes les div.number pour l'animation
    const numberDivs = document.querySelectorAll(".number");

    // Appliquer l'animation GSAP avec ScrollTrigger
    numberDivs.forEach((numberDiv) => {
      gsap.fromTo(
        numberDiv,
        {
          opacity: 0, // Démarre avec une opacité de 0
        },
        {
          opacity: 1, // Se termine avec une opacité de 1
          duration: 1.5, // Durée de l'animation
          ease: "power2.out", // Type de transition
          scrollTrigger: {
            trigger: numberDiv,
            start: "top 80%", // Déclenche l'animation quand l'élément entre à 80% dans la fenêtre
            toggleActions: "play none none none", // Actions de l'animation
          },
        }
      );

      // Animation des chiffres partant de zéro
      const targetValue = numberDiv
        .querySelector("span")
        ?.getAttribute("data-target");
      if (targetValue) {
        gsap.fromTo(
          numberDiv.querySelector("span"),
          {
            innerText: 0, // Débute l'animation à 0
          },
          {
            innerText: targetValue, // La valeur finale (ex: 850)
            duration: 2, // Durée de l'animation
            ease: "power2.out", // Type de transition
            snap: { innerText: 1 }, // Arrondir le chiffre à l'entier
            scrollTrigger: {
              trigger: numberDiv.querySelector("span"),
              start: "top 80%", // Déclenche quand l'élément est à 80% dans la fenêtre
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="value grid-col-sm-12-ls-11-13">
      <div className="number">
        <h2>{sub}</h2>
        <h1 className={color}>
          <span
            ref={(el) => (refCompteurs.current[0] = el)}
            data-target={number}
          >
            {number}
          </span>
          {unit}
        </h1>
        <h3>{under}</h3>
      </div>
    </div>
  );
};

export default NumberData;
