"use client";

import { useEffect } from "react";

export default function LymphomaDiagnosisTreatment() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scale-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".card-hover-effect").forEach((card) => {
      observer.observe(card);
    });

    document.querySelectorAll(".animate-fade-in-up").forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      el.classList.add("animate-fade-in-up");
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans antialiased bg-dark-bg text-dark-text p-6 md:p-12">
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="hero-background absolute inset-0 -z-10"></div>

        {/* HEADER */}
        <header className="relative z-10 w-full max-w-6xl mx-auto text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 gradient-text animate-fade-in-up">
            Lymphoma: Diagnosis and Treatment
          </h1>
          <p className="text-lg md:text-xl text-dark-secondary-text animate-fade-in-up">
            An In-depth Overview of Hematologic Malignancies
          </p>
        </header>

        <main className="relative z-10 w-full max-w-6xl mx-auto space-y-16">

          {/* ========================= */}
          {/* DEFINITION & EPIDEMIOLOGY */}
          {/* ========================= */}
          <section className="bg-dark-card-bg rounded-2xl p-8 md:p-12 shadow-xl card-hover-effect">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-gradient-start">
              Definition and Epidemiology
            </h2>

            <p className="mb-6 text-dark-secondary-text">
              Lymphoma is a group of lymphoid neoplasms arising from the malignant
              transformation of lymphocytes (B-cells, T-cells, or NK-cells).
              It is broadly classified into Hodgkin Lymphoma (HL) and
              Non-Hodgkin Lymphoma (NHL).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-gradient-start">
                  Hodgkin Lymphoma (HL)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                  <li>Characterized by Reed-Sternberg cells.</li>
                  <li>Accounts for ~10% of all lymphomas.</li>
                  <li>Incidence peaks in young adults (15–35) and adults over 55.</li>
                  <li>Overall incidence: ~2.5 per 100,000 person-years.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-accent-gradient-end">
                  Non-Hodgkin Lymphoma (NHL)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                  <li>More diverse group, ~90% of lymphomas.</li>
                  <li>Arises from B-cells (~85%), T-cells (~15%), or NK-cells.</li>
                  <li>Incidence increases with age (median diagnosis ~67 years).</li>
                  <li>Overall incidence: ~19.3 per 100,000 person-years.</li>
                  <li>Common subtypes: DLBCL (aggressive), FL (indolent).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ========================= */}
          {/* PATHOPHYSIOLOGY */}
          {/* ========================= */}
          <section className="bg-dark-card-bg rounded-2xl p-8 md:p-12 shadow-xl card-hover-effect">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-gradient-start">
              Pathophysiology
            </h2>

            <p className="mb-6 text-dark-secondary-text">
              Lymphomas arise from acquired genetic mutations disrupting normal
              lymphocyte development, leading to uncontrolled growth.
              Triggers include viral infections (EBV, HTLV-1, HIV),
              immunodeficiency, autoimmune diseases, environmental exposures,
              and genetic predispositions.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-gradient-start">
                  Hodgkin Lymphoma (HL)
                </h3>
                <p className="text-dark-secondary-text">
                  Malignant cells are a small fraction of the tumor mass;
                  majority are reactive inflammatory cells. Genetic aberrations
                  often involve NF-κB signaling activation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-accent-gradient-end">
                  Non-Hodgkin Lymphoma (NHL)
                </h3>
                <p className="text-dark-secondary-text">
                  Diverse genetic alterations including chromosomal
                  translocations (t(14;18), MYC, BCL6),
                  BCL2 overexpression, and cyclin D1 activation in MCL.
                </p>
              </div>
            </div>
          </section>

          {/* ========================= */}
          {/* CLINICAL PRESENTATION */}
          {/* ========================= */}
          <section
            id="clinical-presentation"
            className="bg-dark-card-bg rounded-2xl p-8 md:p-12 shadow-xl card-hover-effect"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-gradient-start">
              Clinical Presentation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-accent-gradient-end">
                  Systemic "B" Symptoms
                </h3>
                <p className="text-dark-secondary-text">
                  Common in HL and aggressive NHL: unexplained fever (&gt;38°C),
                  drenching night sweats, and unexplained weight loss (&gt;10% in 6 months).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-accent-gradient-end">
                  Lymphadenopathy
                </h3>
                <p className="text-dark-secondary-text">
                  Most common sign. HL: painless, firm, rubbery nodes (often cervical/mediastinal).
                  NHL: any region, extranodal involvement more common.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-gradient-start">
                  Extranodal Disease
                </h3>
                <p className="text-dark-secondary-text">
                  More frequent in NHL, affecting GI tract, skin, bone marrow, CNS, spleen, liver.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-gradient-start">
                  Specific Symptoms
                </h3>
                <p className="text-dark-secondary-text">
                  Pruritus and alcohol-induced pain (HL). Often asymptomatic (indolent FL).
                  Rapid growth, B symptoms (aggressive DLBCL).
                </p>
              </div>
            </div>
          </section>

          {/* ========================= */}
          {/* DIAGNOSTIC CRITERIA */}
          {/* ========================= */}
          <section
            id="diagnostic-criteria"
            className="bg-dark-card-bg rounded-2xl p-8 md:p-12 shadow-xl card-hover-effect"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-gradient-start">
              Diagnostic Criteria
            </h2>

            <p className="mb-6 text-dark-secondary-text">
              Diagnosis relies on a multidisciplinary approach:
              clinical findings, histopathology, immunophenotyping,
              and molecular genetics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border-l-4 border-primary-gradient-start bg-dark-bg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-white">1. Biopsy</h3>
                <p className="text-dark-secondary-text text-sm">
                  Excisional lymph node biopsy is gold standard.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-gradient-start bg-dark-bg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-white">2. Histopathology</h3>
                <p className="text-dark-secondary-text text-sm">
                  Expert review of morphology and architecture.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-gradient-start bg-dark-bg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-white">
                  3. IHC &amp; Flow Cytometry
                </h3>
                <p className="text-dark-secondary-text text-sm">
                  Immunophenotyping for lineage and specific markers.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-gradient-start bg-dark-bg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-white">
                  4. Molecular/Cytogenetics
                </h3>
                <p className="text-dark-secondary-text text-sm">
                  Detect chromosomal translocations, mutations.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-gradient-start bg-dark-bg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-white">
                  5. Staging Workup
                </h3>
                <p className="text-dark-secondary-text text-sm">
                  Physical exam, labs (LDH, CBC), PET-CT, CT scans.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-gradient-start bg-dark-bg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-white">
                  6. Bone Marrow Biopsy
                </h3>
                <p className="text-dark-secondary-text text-sm">
                  Detects marrow involvement, esp. in NHL.
                </p>
              </div>
            </div>
          </section>

          {/* ========================= */}
          {/* MANAGEMENT PRINCIPLES */}
          {/* ========================= */}
          <section
            id="management"
            className="bg-dark-card-bg rounded-2xl p-8 md:p-12 shadow-xl card-hover-effect"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-gradient-start">
              Management Principles
            </h2>

            <p className="mb-6 text-dark-secondary-text">
              Treatment depends on subtype, stage, and prognostic factors.
              Key modalities include chemotherapy, immunotherapy,
              radiation therapy, and stem cell transplantation.
            </p>

            <div className="space-y-12">

              {/* HL */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent-gradient-end">
                  Hodgkin Lymphoma (HL)
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-dark-text">
                      First-line Treatment
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                      <li><strong>Early Stage:</strong> ABVD (2–4 cycles) + ISRT.</li>
                      <li>
                        <strong>Advanced Stage:</strong> ABVD (6–8 cycles) or
                        Brentuximab Vedotin + AVD (preferred).
                        Escalated BEACOPP for high-risk.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-dark-text">
                      Relapsed/Refractory
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                      <li>High-dose chemo + ASCT.</li>
                      <li>Brentuximab Vedotin.</li>
                      <li>PD-1 inhibitors (Nivolumab, Pembrolizumab).</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* NHL */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-gradient-start">
                  Non-Hodgkin Lymphoma (NHL)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-dark-text">
                      Diffuse Large B-cell Lymphoma (DLBCL)
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                      <li>
                        <strong>First-line:</strong> R-CHOP (6 cycles).
                        Polatuzumab Vedotin + R-CHP preferred for higher risk.
                      </li>
                      <li>
                        <strong>Relapsed/Refractory:</strong> ASCT, CAR T-cell therapy,
                        Tafasitamab + lenalidomide, Loncastuximab tesirine.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-dark-text">
                      Follicular Lymphoma (FL)
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                      <li>
                        <strong>First-line:</strong> R-Bendamustine (BR) or R-CHOP.
                        Watch and Wait for low burden.
                      </li>
                      <li>
                        <strong>Relapsed/Refractory:</strong> BR, R², PI3K inhibitors,
                        CAR T-cell therapy.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3 text-dark-text">
                    Mantle Cell Lymphoma (MCL)
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-dark-secondary-text pl-4">
                    <li>
                      <strong>First-line:</strong> Intensive chemo + ASCT (young/fit),
                      R-Bendamustine (older/less fit).
                    </li>
                    <li>
                      <strong>Relapsed/Refractory:</strong> BTK inhibitors
                      (Ibrutinib, Acalabrutinib, Zanubrutinib),
                      CAR T-cell therapy.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= */}
          {/* SPECIAL POPULATIONS */}
          {/* ========================= */}
          <section
            id="updates"
            className="bg-dark-card-bg rounded-2xl p-8 md:p-12 shadow-xl card-hover-effect"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-gradient-start">
              Special Populations &amp; Landmark Updates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-accent-gradient-end">
                  Special Populations
                </h3>
                <p className="text-dark-secondary-text">
                  Management tailored for pregnant patients, elderly,
                  HIV-associated lymphoma, and Primary CNS Lymphoma
                  (high-dose methotrexate-based regimens).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-accent-gradient-end">
                  Recent Updates &amp; Trials
                </h3>
                <p className="text-dark-secondary-text">
                  <strong>HL:</strong> ECHELON-1 (BV+AVD preferred).
                  <strong>DLBCL:</strong> POLARIX (Polatu+R-CHP preferred).
                  CAR T superior in relapsed/refractory.
                  <strong>FL:</strong> Watch and Wait valid.
                  <strong>MCL:</strong> BTK inhibitors revolutionized treatment.
                </p>
              </div>
            </div>
          </section>


        </main>
      </div>

      {/* ========================= */}
      {/* GLOBAL STYLES (Converted) */}
      {/* ========================= */}
      <style jsx global>{`
        .hero-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 50%,
            rgba(236, 72, 153, 0.1) 100%
          );
          filter: blur(120px);
          opacity: 0.7;
        }

        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-hover-effect {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .card-hover-effect:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2),
                      0 10px 20px rgba(0,0,0,0.1);
        }

        @keyframes scaleUp {
          0% { transform: scale(0.95); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-scale-up {
          animation: scaleUp 0.5s ease-out forwards;
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
