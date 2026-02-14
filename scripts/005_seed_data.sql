-- Seed data for MEDLearn
-- Module 101: Foundations of Medicine (Anatomy, Physiology)
-- Module 102: Molecular Medicine (Biochemistry, Pharmacology)

-- ============================================
-- MODULES
-- ============================================
INSERT INTO modules (id, name, code, description, order_index) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Foundations of Medicine', '101', 'Core anatomy and physiology concepts for Year 1 medical students.', 1),
  ('a1000000-0000-0000-0000-000000000002', 'Molecular Medicine', '102', 'Biochemistry and pharmacology fundamentals for understanding disease mechanisms.', 2)
ON CONFLICT DO NOTHING;

-- ============================================
-- SUBJECTS
-- ============================================
-- Module 101 subjects
INSERT INTO subjects (id, module_id, name, description, order_index) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Anatomy', 'Study of the human body structure including musculoskeletal, cardiovascular, and nervous systems.', 1),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Physiology', 'Study of body functions from cellular to organ system level.', 2)
ON CONFLICT DO NOTHING;

-- Module 102 subjects
INSERT INTO subjects (id, module_id, name, description, order_index) VALUES
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'Biochemistry', 'Molecular basis of life: proteins, enzymes, and metabolic pathways.', 1),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'Pharmacology', 'Drug actions, mechanisms, and therapeutic applications.', 2)
ON CONFLICT DO NOTHING;

-- ============================================
-- LECTURES
-- ============================================
-- Anatomy lectures
INSERT INTO lectures (id, subject_id, title, description, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Upper Limb Anatomy', 'Muscles, nerves, and vessels of the upper limb including brachial plexus.', 1),
  ('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Lower Limb Anatomy', 'Hip, knee, ankle joints, and the lumbar and sacral plexus.', 2),
  ('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'Thorax Anatomy', 'Heart, lungs, mediastinum, and thoracic wall structures.', 3)
ON CONFLICT DO NOTHING;

-- Physiology lectures
INSERT INTO lectures (id, subject_id, title, description, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000002', 'Cell Physiology', 'Cell membrane, transport mechanisms, and cellular signaling.', 1),
  ('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', 'Cardiac Physiology', 'Heart electrical conduction, cardiac cycle, and ECG basics.', 2),
  ('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002', 'Renal Physiology', 'Nephron function, filtration, reabsorption, and acid-base balance.', 3)
ON CONFLICT DO NOTHING;

-- Biochemistry lectures
INSERT INTO lectures (id, subject_id, title, description, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000003', 'Amino Acids & Proteins', 'Structure, classification, and clinical significance of amino acids.', 1),
  ('c1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000003', 'Enzymes', 'Enzyme kinetics, inhibition, and regulation in metabolic pathways.', 2),
  ('c1000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000003', 'Metabolism', 'Glycolysis, TCA cycle, oxidative phosphorylation, and gluconeogenesis.', 3)
ON CONFLICT DO NOTHING;

-- Pharmacology lectures
INSERT INTO lectures (id, subject_id, title, description, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000004', 'Pharmacokinetics', 'ADME: Absorption, Distribution, Metabolism, and Excretion of drugs.', 1),
  ('c1000000-0000-0000-0000-000000000011', 'b1000000-0000-0000-0000-000000000004', 'Autonomic Pharmacology', 'Sympathetic and parasympathetic drug actions and clinical uses.', 2),
  ('c1000000-0000-0000-0000-000000000012', 'b1000000-0000-0000-0000-000000000004', 'Analgesics', 'Opioid and non-opioid analgesics, NSAIDs, and pain management.', 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- FLASHCARDS (4 per lecture, 48 total)
-- ============================================
-- Upper Limb Anatomy
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'What are the 5 roots of the brachial plexus?', 'C5, C6, C7, C8, T1 - these ventral rami form the trunks, divisions, cords, and terminal branches.', 1),
  ('c1000000-0000-0000-0000-000000000001', 'What nerve is most commonly injured in a midshaft humerus fracture?', 'The radial nerve, which runs in the spiral groove of the humerus. Leads to wrist drop.', 2),
  ('c1000000-0000-0000-0000-000000000001', 'What is the carpal tunnel and what passes through it?', 'A fibro-osseous tunnel formed by the carpal bones and flexor retinaculum. Contains the median nerve and 9 flexor tendons.', 3),
  ('c1000000-0000-0000-0000-000000000001', 'What is Erb-Duchenne palsy?', 'Upper brachial plexus injury (C5-C6). Results in "waiter''s tip" position - arm adducted, medially rotated, forearm pronated.', 4);

-- Lower Limb Anatomy
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000002', 'What is the femoral triangle and its boundaries?', 'Inguinal ligament (superior), sartorius (lateral), adductor longus (medial). Contains femoral nerve, artery, vein (lateral to medial).', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Which nerve is at risk during knee surgery?', 'The common peroneal (fibular) nerve as it wraps around the fibular neck. Damage causes foot drop.', 2),
  ('c1000000-0000-0000-0000-000000000002', 'What are the cruciate ligaments and their functions?', 'ACL prevents anterior tibial displacement; PCL prevents posterior displacement. They cross within the knee joint cavity.', 3),
  ('c1000000-0000-0000-0000-000000000002', 'What is the sciatic nerve and its clinical significance?', 'Largest nerve in the body (L4-S3). Exits through the greater sciatic foramen. Intramuscular injections must avoid it.', 4);

-- Thorax Anatomy
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000003', 'What are the layers of the pericardium?', 'Fibrous pericardium (outer), serous pericardium with parietal layer (lines fibrous) and visceral layer (epicardium on heart surface).', 1),
  ('c1000000-0000-0000-0000-000000000003', 'What structures are found in the superior mediastinum?', 'Great vessels (aortic arch, SVC), trachea, esophagus, thoracic duct, vagus and phrenic nerves, thymus remnants.', 2),
  ('c1000000-0000-0000-0000-000000000003', 'What is the blood supply to the lungs?', 'Dual supply: pulmonary arteries (deoxygenated blood for gas exchange) and bronchial arteries (oxygenated, from aorta, for lung tissue nutrition).', 3),
  ('c1000000-0000-0000-0000-000000000003', 'What is a tension pneumothorax?', 'Air enters pleural space through a one-way valve mechanism. Causes mediastinal shift, cardiovascular collapse. Emergency needle decompression at 2nd ICS MCL.', 4);

-- Cell Physiology
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000004', 'What is the Na+/K+ ATPase pump?', 'Active transporter that pumps 3 Na+ out and 2 K+ into the cell per ATP. Maintains resting membrane potential (~-70mV).', 1),
  ('c1000000-0000-0000-0000-000000000004', 'What is the difference between facilitated diffusion and active transport?', 'Facilitated diffusion: down concentration gradient, no energy. Active transport: against gradient, requires ATP (primary) or ion gradient (secondary).', 2),
  ('c1000000-0000-0000-0000-000000000004', 'What are second messengers? Give examples.', 'Intracellular signaling molecules activated by receptors. Examples: cAMP (via adenylyl cyclase), IP3/DAG (via phospholipase C), Ca2+.', 3),
  ('c1000000-0000-0000-0000-000000000004', 'What is osmosis?', 'Movement of water across a semi-permeable membrane from low solute concentration to high solute concentration. Driven by osmotic pressure.', 4);

-- Cardiac Physiology
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000005', 'What is the cardiac conduction system in order?', 'SA node -> Atrial conduction -> AV node (delay) -> Bundle of His -> Left & Right bundle branches -> Purkinje fibers.', 1),
  ('c1000000-0000-0000-0000-000000000005', 'What does the P wave represent on an ECG?', 'Atrial depolarization. The P wave should be upright in leads I, II, aVF. Duration <120ms.', 2),
  ('c1000000-0000-0000-0000-000000000005', 'What is the Frank-Starling law?', 'The heart pumps out whatever volume it receives. Increased preload (venous return) stretches myocardium, increasing force of contraction.', 3),
  ('c1000000-0000-0000-0000-000000000005', 'What is cardiac output and how is it calculated?', 'CO = HR x SV. Normal: ~5L/min. Heart rate (beats/min) multiplied by stroke volume (mL/beat).', 4);

-- Renal Physiology
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000006', 'What is the GFR and its normal value?', 'Glomerular filtration rate: volume of fluid filtered by kidneys per minute. Normal: ~125 mL/min or 180 L/day.', 1),
  ('c1000000-0000-0000-0000-000000000006', 'What is the countercurrent multiplier system?', 'Loop of Henle creates an osmotic gradient in the renal medulla. Descending limb permeable to water, ascending limb actively pumps NaCl.', 2),
  ('c1000000-0000-0000-0000-000000000006', 'What role does ADH play in the kidney?', 'ADH (vasopressin) increases water permeability of collecting ducts by inserting aquaporin-2 channels. Concentrates urine.', 3),
  ('c1000000-0000-0000-0000-000000000006', 'What is the renin-angiotensin-aldosterone system?', 'Renin -> Angiotensinogen to Angiotensin I -> ACE converts to Angiotensin II -> Aldosterone release -> Na+ retention, K+ excretion.', 4);

-- Amino Acids & Proteins
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000007', 'What are the essential amino acids?', 'PVT TIM HALL: Phenylalanine, Valine, Tryptophan, Threonine, Isoleucine, Methionine, Histidine, Arginine (conditionally), Leucine, Lysine.', 1),
  ('c1000000-0000-0000-0000-000000000007', 'What are the 4 levels of protein structure?', 'Primary (amino acid sequence), Secondary (alpha helix, beta sheet), Tertiary (3D folding), Quaternary (multi-subunit assembly).', 2),
  ('c1000000-0000-0000-0000-000000000007', 'What is phenylketonuria (PKU)?', 'Deficiency of phenylalanine hydroxylase. Phenylalanine accumulates causing intellectual disability if untreated. Detected by newborn screening.', 3),
  ('c1000000-0000-0000-0000-000000000007', 'What is a disulfide bond?', 'Covalent bond between two cysteine residues (-S-S-). Important for stabilizing tertiary/quaternary protein structure. Found in secreted proteins.', 4);

-- Enzymes
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000008', 'What is the Michaelis-Menten equation?', 'V = Vmax[S]/(Km + [S]). Km = substrate concentration at half Vmax. Low Km = high affinity.', 1),
  ('c1000000-0000-0000-0000-000000000008', 'What is competitive inhibition?', 'Inhibitor competes with substrate for the active site. Increases apparent Km but Vmax unchanged. Overcome by increasing [S].', 2),
  ('c1000000-0000-0000-0000-000000000008', 'What are allosteric enzymes?', 'Enzymes with regulatory sites separate from active site. Binding of effectors changes enzyme conformation and activity. Show sigmoidal kinetics.', 3),
  ('c1000000-0000-0000-0000-000000000008', 'What is the difference between coenzymes and cofactors?', 'Cofactors are inorganic ions (Mg2+, Zn2+). Coenzymes are organic molecules often derived from vitamins (NAD+ from niacin, FAD from riboflavin).', 4);

-- Metabolism
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000009', 'How many ATP does complete glucose oxidation produce?', 'Approximately 30-32 ATP per glucose: 2 from glycolysis, 2 from TCA, 26-28 from oxidative phosphorylation via NADH and FADH2.', 1),
  ('c1000000-0000-0000-0000-000000000009', 'What is the rate-limiting enzyme of glycolysis?', 'Phosphofructokinase-1 (PFK-1). Activated by AMP, fructose-2,6-bisphosphate. Inhibited by ATP, citrate.', 2),
  ('c1000000-0000-0000-0000-000000000009', 'What is the Cori cycle?', 'Lactate from anaerobic glycolysis in muscle is transported to liver, converted to glucose via gluconeogenesis, and returned to muscle.', 3),
  ('c1000000-0000-0000-0000-000000000009', 'What is beta-oxidation?', 'Mitochondrial breakdown of fatty acids into acetyl-CoA units. Each cycle removes 2 carbons, producing NADH, FADH2, and acetyl-CoA for the TCA cycle.', 4);

-- Pharmacokinetics
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000010', 'What is bioavailability?', 'Fraction of administered drug that reaches systemic circulation unchanged. IV = 100%. Oral is less due to first-pass metabolism.', 1),
  ('c1000000-0000-0000-0000-000000000010', 'What is the first-pass effect?', 'Drug absorbed from GI tract passes through portal circulation to liver before systemic circulation. Hepatic metabolism reduces bioavailability.', 2),
  ('c1000000-0000-0000-0000-000000000010', 'What is the half-life (t1/2) of a drug?', 'Time required for plasma drug concentration to decrease by 50%. t1/2 = 0.693 x Vd / CL. Determines dosing frequency.', 3),
  ('c1000000-0000-0000-0000-000000000010', 'What is the volume of distribution (Vd)?', 'Theoretical volume needed to contain total drug at plasma concentration. High Vd = drug distributed to tissues. Low Vd = drug stays in plasma.', 4);

-- Autonomic Pharmacology
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000011', 'What is the difference between muscarinic and nicotinic receptors?', 'Both are cholinergic. Muscarinic: G-protein coupled (M1-M5), found on effector organs. Nicotinic: Ligand-gated ion channels at NMJ and ganglia.', 1),
  ('c1000000-0000-0000-0000-000000000011', 'What does atropine do?', 'Muscarinic antagonist. Increases HR (blocks vagal tone), dilates pupils, reduces secretions. Used in bradycardia, premedication.', 2),
  ('c1000000-0000-0000-0000-000000000011', 'What are beta-1 and beta-2 receptor effects?', 'Beta-1 (heart): increases HR and contractility. Beta-2 (lungs/vessels): bronchodilation, vasodilation, uterine relaxation.', 3),
  ('c1000000-0000-0000-0000-000000000011', 'What is the fight-or-flight response?', 'Sympathetic activation: pupil dilation, bronchodilation, increased HR, blood redirected to muscles, glycogenolysis. Mediated by adrenaline/noradrenaline.', 4);

-- Analgesics
INSERT INTO flashcards (lecture_id, front, back, order_index) VALUES
  ('c1000000-0000-0000-0000-000000000012', 'What is the WHO analgesic ladder?', 'Step 1: Non-opioid (paracetamol, NSAIDs). Step 2: Weak opioid (codeine, tramadol). Step 3: Strong opioid (morphine, fentanyl). +/- adjuvants at each step.', 1),
  ('c1000000-0000-0000-0000-000000000012', 'How do NSAIDs work?', 'Inhibit cyclooxygenase (COX-1 and COX-2), reducing prostaglandin synthesis. Anti-inflammatory, analgesic, antipyretic. Side effects: GI, renal, cardiovascular.', 2),
  ('c1000000-0000-0000-0000-000000000012', 'What are the side effects of opioids?', 'Respiratory depression, constipation, nausea, sedation, miosis, tolerance, dependence. Constipation does NOT develop tolerance.', 3),
  ('c1000000-0000-0000-0000-000000000012', 'What is naloxone?', 'Opioid antagonist used for opioid overdose reversal. Competitive antagonist at mu, kappa, delta receptors. Short half-life (30-90 min) - may need repeat dosing.', 4);

-- ============================================
-- MCQs (4 per lecture, 48 total)
-- ============================================
-- Upper Limb
INSERT INTO mcqs (lecture_id, question, options, correct_answer, explanation) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'A patient cannot extend the wrist after a midshaft humerus fracture. Which nerve is most likely injured?', '["Median nerve", "Ulnar nerve", "Radial nerve", "Musculocutaneous nerve"]', 2, 'The radial nerve runs in the spiral groove of the humerus. Damage results in wrist drop (inability to extend wrist/fingers).'),
  ('c1000000-0000-0000-0000-000000000001', 'Which structure passes through the carpal tunnel?', '["Ulnar nerve", "Radial artery", "Median nerve", "Radial nerve"]', 2, 'The median nerve and 9 flexor tendons (4 FDS, 4 FDP, 1 FPL) pass through the carpal tunnel.'),
  ('c1000000-0000-0000-0000-000000000001', 'Erb-Duchenne palsy involves injury to which nerve roots?', '["C3-C4", "C5-C6", "C7-C8", "C8-T1"]', 1, 'Erb-Duchenne palsy is an upper brachial plexus injury affecting C5-C6, causing waiter''s tip position.'),
  ('c1000000-0000-0000-0000-000000000001', 'The "anatomical snuffbox" contains which artery?', '["Ulnar artery", "Brachial artery", "Radial artery", "Anterior interosseous artery"]', 2, 'The radial artery passes through the anatomical snuffbox, bounded by EPL, EPB, and APL tendons.');

-- Cardiac Physiology
INSERT INTO mcqs (lecture_id, question, options, correct_answer, explanation) VALUES
  ('c1000000-0000-0000-0000-000000000005', 'The P wave on an ECG represents:', '["Ventricular depolarization", "Atrial depolarization", "Ventricular repolarization", "Atrial repolarization"]', 1, 'The P wave represents atrial depolarization. The QRS complex represents ventricular depolarization, and the T wave represents ventricular repolarization.'),
  ('c1000000-0000-0000-0000-000000000005', 'Which ion is most responsible for the rapid depolarization phase of the ventricular action potential?', '["K+", "Cl-", "Na+", "Ca2+"]', 2, 'Phase 0 of the ventricular action potential is caused by rapid Na+ influx through voltage-gated Na+ channels.'),
  ('c1000000-0000-0000-0000-000000000005', 'The Frank-Starling mechanism states that:', '["Heart rate increases with exercise", "Stroke volume increases with increased preload", "Blood pressure is inversely proportional to heart rate", "Cardiac output equals blood pressure"]', 1, 'The Frank-Starling law states that increased preload (end-diastolic volume) leads to increased stretch and thus increased contractile force and stroke volume.'),
  ('c1000000-0000-0000-0000-000000000005', 'What is the normal cardiac output at rest?', '["2 L/min", "5 L/min", "8 L/min", "10 L/min"]', 1, 'Normal resting cardiac output is approximately 5 L/min (HR ~70 bpm x SV ~70 mL).');

-- Enzymes
INSERT INTO mcqs (lecture_id, question, options, correct_answer, explanation) VALUES
  ('c1000000-0000-0000-0000-000000000008', 'In competitive inhibition, which parameter changes?', '["Vmax increases", "Km increases (apparent)", "Vmax decreases", "Km decreases"]', 1, 'Competitive inhibitors increase the apparent Km (reduce apparent affinity) but do not change Vmax, as the inhibition can be overcome by excess substrate.'),
  ('c1000000-0000-0000-0000-000000000008', 'A Lineweaver-Burk plot shows lines intersecting on the y-axis. This indicates:', '["Competitive inhibition", "Uncompetitive inhibition", "Non-competitive inhibition", "No inhibition"]', 0, 'Lines intersecting on the y-axis (same 1/Vmax) with different x-intercepts (-1/Km) indicates competitive inhibition.'),
  ('c1000000-0000-0000-0000-000000000008', 'Which vitamin is NAD+ derived from?', '["Riboflavin (B2)", "Niacin (B3)", "Pyridoxine (B6)", "Thiamine (B1)"]', 1, 'NAD+ (nicotinamide adenine dinucleotide) is derived from niacin (vitamin B3).'),
  ('c1000000-0000-0000-0000-000000000008', 'An enzyme with a low Km has:', '["Low affinity for substrate", "High affinity for substrate", "High Vmax", "Low Vmax"]', 1, 'Km is the substrate concentration at half Vmax. A low Km means the enzyme reaches half-maximal velocity at a low substrate concentration, indicating high affinity.');

-- Pharmacokinetics
INSERT INTO mcqs (lecture_id, question, options, correct_answer, explanation) VALUES
  ('c1000000-0000-0000-0000-000000000010', 'A drug with a high volume of distribution (Vd) is likely:', '["Remaining in plasma", "Extensively bound to plasma proteins", "Distributed widely into tissues", "Rapidly excreted by kidneys"]', 2, 'High Vd indicates the drug distributes extensively into tissues rather than remaining in the plasma compartment.'),
  ('c1000000-0000-0000-0000-000000000010', 'The first-pass effect primarily occurs in:', '["Kidneys", "Lungs", "Liver", "Spleen"]', 2, 'The first-pass effect occurs in the liver. Oral drugs absorbed from the GI tract enter the portal vein and pass through the liver before reaching systemic circulation.'),
  ('c1000000-0000-0000-0000-000000000010', 'After 3 half-lives, what percentage of a drug remains?', '["50%", "25%", "12.5%", "6.25%"]', 2, 'After each half-life, 50% remains. After 3 half-lives: 100% -> 50% -> 25% -> 12.5%.'),
  ('c1000000-0000-0000-0000-000000000010', 'Which route of administration provides 100% bioavailability?', '["Oral", "Sublingual", "Intravenous", "Intramuscular"]', 2, 'IV administration delivers the drug directly into the bloodstream, bypassing absorption barriers, giving 100% bioavailability.');

-- ============================================
-- WRITTEN QUESTIONS (2 per lecture for selected lectures)
-- ============================================
INSERT INTO written_questions (lecture_id, question, model_answer) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Describe the course and clinical significance of the brachial plexus.', 'The brachial plexus originates from ventral rami of C5-T1. It passes between the anterior and middle scalene muscles, through the posterior triangle of the neck, and into the axilla. Organization: 5 roots -> 3 trunks (upper C5-C6, middle C7, lower C8-T1) -> 6 divisions -> 3 cords (lateral, posterior, medial) -> terminal branches. Clinical significance: Upper trunk injuries (Erb''s palsy) from shoulder dystocia cause waiter''s tip; lower trunk injuries (Klumpke''s) from upward arm traction cause claw hand; posterior cord damage affects the radial and axillary nerves.'),
  ('c1000000-0000-0000-0000-000000000001', 'Explain the anatomy and clinical relevance of the rotator cuff.', 'The rotator cuff consists of 4 muscles: Supraspinatus (initiates abduction, most commonly torn), Infraspinatus (external rotation), Teres Minor (external rotation), and Subscapularis (internal rotation) - remembered as SITS. These muscles arise from the scapula and insert onto the greater and lesser tubercles of the humerus. They stabilize the glenohumeral joint, a highly mobile but unstable ball-and-socket joint. Clinically, supraspinatus tears are most common (impingement under the acromion), diagnosed by the empty can test and confirmed by MRI. Degenerative tears increase with age.'),
  ('c1000000-0000-0000-0000-000000000005', 'Explain the cardiac conduction system and how abnormalities manifest on an ECG.', 'The cardiac conduction system consists of: SA node (primary pacemaker, 60-100 bpm) -> atrial conduction (P wave on ECG) -> AV node (introduces 0.1s delay for atrial contraction, PR interval) -> Bundle of His -> left and right bundle branches (QRS complex) -> Purkinje fibers for rapid ventricular depolarization. Abnormalities: SA node failure = no P waves/junctional rhythm. AV block: 1st degree = prolonged PR; 2nd degree = dropped QRS complexes; 3rd degree = complete dissociation. Bundle branch block = wide QRS >120ms. Atrial fibrillation = irregular rhythm, no discrete P waves.'),
  ('c1000000-0000-0000-0000-000000000008', 'Compare and contrast competitive and non-competitive enzyme inhibition.', 'Competitive inhibition: The inhibitor resembles the substrate and binds to the enzyme''s active site, competing directly with the substrate. Effect on kinetics: Km increases (apparent lower affinity), Vmax unchanged (can be overcome by excess substrate). Lineweaver-Burk: lines intersect on y-axis. Example: Methotrexate competing with folic acid for DHFR. Non-competitive inhibition: The inhibitor binds to an allosteric site (not the active site), changing enzyme conformation. Substrate can still bind but catalysis is impaired. Effect: Km unchanged, Vmax decreases. Cannot be overcome by adding more substrate. Lineweaver-Burk: lines intersect on x-axis. Example: Heavy metals binding to enzyme thiol groups.'),
  ('c1000000-0000-0000-0000-000000000010', 'Discuss the factors affecting drug absorption and bioavailability.', 'Drug absorption depends on: 1) Route of administration (oral, sublingual, IV, IM, etc.) - IV gives 100% bioavailability. 2) Drug properties: lipophilicity (lipid-soluble drugs cross membranes better), molecular size, ionization state (Henderson-Hasselbalch: weak acids absorbed in stomach pH, weak bases in intestine). 3) Formulation: tablet, capsule, sustained-release affect dissolution rate. 4) First-pass metabolism: oral drugs pass through liver via portal circulation, reducing bioavailability (e.g., morphine, propranolol). 5) GI factors: blood flow, motility, food interactions, pH, surface area (small intestine has largest). 6) Drug interactions: P-glycoprotein efflux, enzyme induction/inhibition. Bioavailability (F) = AUC(oral) / AUC(IV) x 100%.'),
  ('c1000000-0000-0000-0000-000000000009', 'Describe glycolysis, its regulation, and clinical significance.', 'Glycolysis is the metabolic pathway converting glucose to 2 pyruvate molecules in the cytoplasm (10 steps). Net yield: 2 ATP, 2 NADH per glucose. Three irreversible regulatory steps: 1) Hexokinase (glucose -> G6P), inhibited by G6P. 2) PFK-1 (F6P -> F1,6BP) - rate-limiting step, activated by AMP and F2,6BP, inhibited by ATP and citrate. 3) Pyruvate kinase (PEP -> pyruvate), activated by F1,6BP. In aerobic conditions, pyruvate enters mitochondria for TCA cycle. In anaerobic conditions, pyruvate -> lactate (via LDH) to regenerate NAD+. Clinical significance: Cancer cells preferentially use glycolysis even with oxygen (Warburg effect). Pyruvate kinase deficiency causes hemolytic anemia. Lactic acidosis occurs in tissue hypoxia.');

-- ============================================
-- NOTES (1 per lecture for first 4 lectures)
-- ============================================
INSERT INTO notes (lecture_id, title, content) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Upper Limb Anatomy - Lecture Notes', '{"blocks":[{"type":"heading","content":"Brachial Plexus Overview"},{"type":"paragraph","content":"The brachial plexus is formed by the ventral rami of C5-T1. It provides motor and sensory innervation to the entire upper limb."},{"type":"heading","content":"Key Clinical Correlations"},{"type":"paragraph","content":"Erb-Duchenne palsy (C5-C6): waiter''s tip position. Klumpke palsy (C8-T1): claw hand. Radial nerve injury: wrist drop. Median nerve compression at carpal tunnel: thenar wasting."},{"type":"heading","content":"Important Muscles"},{"type":"paragraph","content":"Rotator cuff (SITS): Supraspinatus, Infraspinatus, Teres Minor, Subscapularis. These stabilize the glenohumeral joint."}]}'),
  ('c1000000-0000-0000-0000-000000000005', 'Cardiac Physiology - Lecture Notes', '{"blocks":[{"type":"heading","content":"Cardiac Conduction System"},{"type":"paragraph","content":"SA node -> AV node -> Bundle of His -> Bundle branches -> Purkinje fibers. The SA node is the primary pacemaker at 60-100 bpm."},{"type":"heading","content":"ECG Basics"},{"type":"paragraph","content":"P wave: atrial depolarization. QRS complex: ventricular depolarization. T wave: ventricular repolarization. PR interval: AV conduction time."},{"type":"heading","content":"Frank-Starling Law"},{"type":"paragraph","content":"Increased preload leads to increased stroke volume. The heart pumps out what it receives, within physiological limits."}]}'),
  ('c1000000-0000-0000-0000-000000000008', 'Enzymes - Lecture Notes', '{"blocks":[{"type":"heading","content":"Enzyme Kinetics"},{"type":"paragraph","content":"Michaelis-Menten: V = Vmax[S]/(Km + [S]). Km represents substrate affinity. Low Km = high affinity."},{"type":"heading","content":"Inhibition Types"},{"type":"paragraph","content":"Competitive: binds active site, increases Km, Vmax unchanged. Non-competitive: binds allosteric site, Km unchanged, Vmax decreased. Uncompetitive: binds ES complex, both Km and Vmax decrease."},{"type":"heading","content":"Coenzymes and Vitamins"},{"type":"paragraph","content":"NAD+ from niacin (B3), FAD from riboflavin (B2), TPP from thiamine (B1), CoA from pantothenic acid (B5), PLP from pyridoxine (B6)."}]}'),
  ('c1000000-0000-0000-0000-000000000010', 'Pharmacokinetics - Lecture Notes', '{"blocks":[{"type":"heading","content":"ADME Overview"},{"type":"paragraph","content":"Absorption: how drug enters body. Distribution: how it spreads to tissues. Metabolism: biotransformation (mainly liver). Excretion: elimination (mainly kidneys)."},{"type":"heading","content":"Key Parameters"},{"type":"paragraph","content":"Bioavailability (F): fraction reaching systemic circulation. Volume of distribution (Vd): theoretical volume. Half-life: time for 50% elimination. Clearance: volume cleared per time."},{"type":"heading","content":"First-Pass Metabolism"},{"type":"paragraph","content":"Oral drugs pass through liver before systemic circulation. Drugs with high first-pass metabolism (e.g., morphine, propranolol) have low oral bioavailability."}]}');

-- ============================================
-- YOUTUBE VIDEOS (1-2 per selected lectures)
-- ============================================
INSERT INTO youtube_videos (lecture_id, title, youtube_url, topic) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Brachial Plexus Made Easy', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Brachial Plexus'),
  ('c1000000-0000-0000-0000-000000000001', 'Upper Limb Nerve Injuries', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Clinical Correlations'),
  ('c1000000-0000-0000-0000-000000000005', 'Cardiac Action Potential Explained', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Electrophysiology'),
  ('c1000000-0000-0000-0000-000000000005', 'ECG Interpretation for Beginners', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ECG'),
  ('c1000000-0000-0000-0000-000000000008', 'Enzyme Kinetics Simplified', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Kinetics'),
  ('c1000000-0000-0000-0000-000000000010', 'Pharmacokinetics Made Simple', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ADME');
