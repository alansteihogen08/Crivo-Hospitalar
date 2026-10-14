export interface DrugMechanismInfo {
  mechanism: string;
  pharmacologicalClass?: string;
  molecularTarget?: string;
}

export const DRUG_MECHANISMS: Record<string, DrugMechanismInfo> = {
  meropenem: {
    pharmacologicalClass: "Carbapen\u00eamico (Beta-lact\u00e2mico)",
    molecularTarget: "PBPs (Prote\u00ednas Ligadoras de Penicilina 2, 3 e 4)",
    mechanism: "Penetra atrav\u00e9s de porinas da membrana externa bacteriana e inibe irreversivelmente as PBPs, bloqueando a transpeptida\u00e7\u00e3o final da s\u00edntese da parede celular de peptideoglicano e ativando autolisinas bacterianas, conferindo efeito bactericida de amplo espectro."
  },
  ertapenem: {
    pharmacologicalClass: "Carbapen\u00eamico de a\u00e7\u00e3o prolongada",
    molecularTarget: "PBPs bacterianas (1a, 1b, 2 e 3)",
    mechanism: "Liga-se com alta afinidade \u00e0s PBPs bacterianas, inibindo a s\u00edntese da parede celular. Apresenta alta liga\u00e7\u00e3o a prote\u00ednas plasm\u00e1ticas (~95%), o que confere meia-vida prolongada e posologia c\u00f4moda uma vez ao dia, por\u00e9m sem atividade contra Pseudomonas e Acinetobacter."
  },
  linezolida: {
    pharmacologicalClass: "Oxazolidinona",
    molecularTarget: "Subunidade 50S do ribossomo bacteriano (RNA 23S)",
    mechanism: "Inibe a s\u00edntese proteica bacteriana ligando-se seletivamente ao s\u00edtio de liga\u00e7\u00e3o 23S da subunidade 50S, impedindo a forma\u00e7\u00e3o do complexo de inicia\u00e7\u00e3o funcional 70S com o tRNA formilmetionina. Inibe tamb\u00e9m a monoamina oxidase (MAO) humana reversivelmente."
  },
  vancomicina: {
    pharmacologicalClass: "Glicopept\u00eddeo",
    molecularTarget: "Termina\u00e7\u00e3o D-Alanil-D-Alanina do peptideoglicano",
    mechanism: "Liga-se com alta afinidade por pontes de hidrog\u00eanio ao terminal D-Ala-D-Ala dos precursores da parede celular bacteriana em crescimento, bloqueando estericamente a transglicosila\u00e7\u00e3o e a transpeptida\u00e7\u00e3o, enfraquecendo a parede e causando lise osm\u00f3tica bactericida em Gram-positivos."
  },
  polimixina_b: {
    pharmacologicalClass: "Polipept\u00eddeo lipopept\u00eddico cati\u00f4nico",
    molecularTarget: "Lipopolissacar\u00eddeo (LPS) e membrana externa Gram-negativa",
    mechanism: "Atua como detergente cati\u00f4nico interagindo eletrostaticamente com os \u00e2nions fosfato do l\u00edpido A no LPS, deslocando c\u00e1tions bivalentes (Ca2+ e Mg2+). Desestabiliza a membrana externa e interna bacteriana, aumentando a permeabilidade e causando extravasamento letal do conte\u00fado citoplasm\u00e1tico."
  },
  amicacina: {
    pharmacologicalClass: "Aminoglicos\u00eddeo",
    molecularTarget: "Subunidade ribossomal 30S (RNA 16S)",
    mechanism: "Liga-se irreversivelmente \u00e0 subunidade 30S do ribossomo bacteriano, induzindo leitura err\u00f4nea (misreading) do RNA mensageiro e interrup\u00e7\u00e3o prematura da s\u00edntese proteica. Prote\u00ednas an\u00f4malas inserem-se na membrana citoplasm\u00e1tica, rompendo sua integridade com efeito bactericida concentra\u00e7\u00e3o-dependente."
  },
  gentamicina: {
    pharmacologicalClass: "Aminoglicos\u00eddeo",
    molecularTarget: "Subunidade ribossomal 30S bacteriana",
    mechanism: "Inibe a s\u00edntese de prote\u00ednas por liga\u00e7\u00e3o direta \u00e0 subunidade 30S, provocando leitura incorreta dos c\u00f3dons do RNAm. Efeito bactericida concentra\u00e7\u00e3o-dependente com expressivo efeito p\u00f3s-antibi\u00f3tico contra bacilos Gram-negativos e sinergismo com beta-lact\u00e2micos contra estafilococos e enterococos."
  },
  cefepima: {
    pharmacologicalClass: "Cefalosporina de 4\u00aa gera\u00e7\u00e3o (Zwitterion)",
    molecularTarget: "PBPs bacterianas (PBP-2 e PBP-3)",
    mechanism: "Gra\u00e7as \u00e0 sua estrutura zwitteri\u00f4nica, penetra rapidamente atrav\u00e9s dos canais de porina da parede de bact\u00e9rias Gram-negativas e resiste \u00e0 hidr\u00f3lise por muitas beta-lactamases cromoss\u00f4micas (AmpC), ligando-se \u00e0s PBPs e inibindo a s\u00edntese de peptideoglicano com a\u00e7\u00e3o bactericida ampla (incluindo Pseudomonas)."
  },
  ceftriaxona: {
    pharmacologicalClass: "Cefalosporina de 3\u00aa gera\u00e7\u00e3o",
    molecularTarget: "PBPs bacterianas (PBP-1a, 1b e 3)",
    mechanism: "Inibe a s\u00edntese da parede bacteriana ligando-se \u00e0s PBPs com consequente aut\u00f3lise celular. Apresenta alta lipofilicidade e excelente penetra\u00e7\u00e3o men\u00edngea quando as meninges est\u00e3o inflamadas, al\u00e9m de elimina\u00e7\u00e3o dupla (biliar e renal)."
  },
  cefazolina: {
    pharmacologicalClass: "Cefalosporina de 1\u00aa gera\u00e7\u00e3o",
    molecularTarget: "PBPs bacterianas de Gram-positivos",
    mechanism: "Liga-se a PBPs espec\u00edficas em bact\u00e9rias Gram-positivas (especialmente Staphylococcus aureus sens\u00edvel a meticilina e Streptococcus spp.), inibindo a reticula\u00e7\u00e3o do peptideoglicano. Padr\u00e3o-ouro em profilaxia cir\u00fargica hospitalar."
  },
  ceftazidima: {
    pharmacologicalClass: "Cefalosporina de 3\u00aa gera\u00e7\u00e3o antipseudomonas",
    molecularTarget: "PBPs bacterianas (PBP-3 de Pseudomonas e enterobact\u00e9rias)",
    mechanism: "Inibe a transpeptida\u00e7\u00e3o da parede celular bacteriana atrav\u00e9s da inativa\u00e7\u00e3o de PBPs, com seletividade e pot\u00eancia contra Pseudomonas aeruginosa e bacilos Gram-negativos aer\u00f3bios."
  },
  ceftazidima_avibactam: {
    pharmacologicalClass: "Cefalosporina combinada a Inibidor n\u00e3o beta-lact\u00e2mico de beta-lactamase",
    molecularTarget: "PBPs + Beta-lactamases Classes A, C (AmpC) e algumas Classe D (OXA-48)",
    mechanism: "A ceftazidima inibe a s\u00edntese da parede celular por liga\u00e7\u00e3o \u00e0s PBPs, enquanto o avibactam inibe covalentemente e de modo revers\u00edvel as beta-lactamases de classes A (KPC), C (AmpC) e algumas D (OXA-48), restaurando o espectro da ceftazidima contra bact\u00e9rias multirresistentes."
  },
  aztreonam: {
    pharmacologicalClass: "Monobact\u00e2mico",
    molecularTarget: "PBP-3 de bact\u00e9rias Gram-negativas aer\u00f3bias",
    mechanism: "Liga-se especificamente \u00e0 PBP-3 de bastonetes Gram-negativos aer\u00f3bios (incluindo Pseudomonas), inibindo a s\u00edntese de peptideoglicano e induzindo filamenta\u00e7\u00e3o bacteriana com lise celular. N\u00e3o se liga a PBPs de Gram-positivos nem de anaer\u00f3bios e n\u00e3o apresenta reatividade cruzada al\u00e9rgica cl\u00e1ssica com penicilinas (exceto ceftazidima)."
  },
  ampicilina: {
    pharmacologicalClass: "Aminopenicilina (Beta-lact\u00e2mico)",
    molecularTarget: "PBPs bacterianas (PBP-1, 2 e 3)",
    mechanism: "Inibe a etapa final de transpeptida\u00e7\u00e3o na s\u00edntese do peptideoglicano da parede celular bacteriana por liga\u00e7\u00e3o covalente ao s\u00edtio ativo das PBPs. Provoca desequil\u00edbrio osm\u00f3tico e lise bacteriana mediada por autolisinas end\u00f3genas; eficaz contra Listeria monocytogenes e Enterococcus faecalis."
  },
  ampicilina_sulbactam: {
    pharmacologicalClass: "Aminopenicilina associada a Inibidor de beta-lactamase",
    molecularTarget: "PBPs bacterianas + Inativa\u00e7\u00e3o suicida de beta-lactamases",
    mechanism: "A ampicilina inibe a s\u00edntese da parede celular via PBPs, enquanto o sulbactam atua como inibidor irrevers\u00edvel de beta-lactamases produzidas por bact\u00e9rias resistentes, expandindo o espectro para anaer\u00f3bios (Bacteroides) e Acinetobacter baumannii (a\u00e7\u00e3o direta do sulbactam sobre PBP-2)."
  },
  amoxicilina_clavulanato: {
    pharmacologicalClass: "Aminopenicilina associada a Inibidor suicida de beta-lactamase",
    molecularTarget: "PBPs bacterianas + Inibi\u00e7\u00e3o de beta-lactamases plasmidiais",
    mechanism: "A amoxicilina bloqueia a s\u00edntese da parede celular bacteriana e o \u00e1cido clavul\u00e2nico inativa de forma irrevers\u00edvel as enzimas beta-lactamases de pat\u00f3genos produtores, restaurando a atividade contra estafilococos sens\u00edveis, Haemophilus e bact\u00e9rias orais."
  },
  piperacilina_tazobactam: {
    pharmacologicalClass: "Ureidopenicilina de espectro estendido + Inibidor de beta-lactamase",
    molecularTarget: "PBPs bacterianas (PBP-2 e 3) + Beta-lactamases plasmidiais e cromoss\u00f4micas",
    mechanism: "A piperacilina inibe a s\u00edntese da parede celular ligando-se \u00e0s PBPs com grande penetra\u00e7\u00e3o e espectro contra Pseudomonas aeruginosa e enterobact\u00e9rias; o tazobactam protege a mol\u00e9cula da hidr\u00f3lise enzim\u00e1tica, conferindo cobertura contra germes produtores de beta-lactamase e anaer\u00f3bios intra-abdominais."
  },
  levofloxacino: {
    pharmacologicalClass: "Fluoroquinolona respirat\u00f3ria de 3\u00aa gera\u00e7\u00e3o",
    molecularTarget: "DNA-girase (Topoisomerase II) e Topoisomerase IV bacterianas",
    mechanism: "Inibe a DNA-girase e a topoisomerase IV bacterianas, enzimas essenciais para o desenovelamento, replica\u00e7\u00e3o, transcri\u00e7\u00e3o e reparo do DNA cromoss\u00f4mico bacteriano. O aprisionamento do complexo quinolona-enzima-DNA gera quebras na dupla fita e morte celular r\u00e1pida bactericida."
  },
  ciprofloxacino: {
    pharmacologicalClass: "Fluoroquinolona de 2\u00aa gera\u00e7\u00e3o",
    molecularTarget: "DNA-girase (Gram-negativos) e Topoisomerase IV (Gram-positivos)",
    mechanism: "Bloqueia a s\u00edntese e a divis\u00e3o do DNA bacteriano por inibi\u00e7\u00e3o das topoisomerases tipo II (DNA-girase e topoisomerase IV), impedindo o superenrolamento negativo do DNA bacteriano durante a replica\u00e7\u00e3o e transcri\u00e7\u00e3o, com potente a\u00e7\u00e3o bactericida contra bacilos Gram-negativos ent\u00e9ricos e Pseudomonas."
  },
  smx_tmp: {
    pharmacologicalClass: "Sulfonamida associada a Inibidor de di-hidrofolato redutase",
    molecularTarget: "Di-hidropteroato sintase e Di-hidrofolato redutase (bloqueio sequencial de folato)",
    mechanism: "O sulfametoxazol compete com o PABA pela di-hidropteroato sintase, enquanto o trimetoprima inibe a di-hidrofolato redutase bacteriana. O duplo bloqueio sin\u00e9rgico e sequencial impede a bioss\u00edntese de tetraidrofolato, cofator cr\u00edtico para a s\u00edntese de timidina, purinas e DNA bacteriano."
  },
  metronidazol: {
    pharmacologicalClass: "Nitroimidazol",
    molecularTarget: "DNA bacteriano e prote\u00ednas citoplasm\u00e1ticas anaer\u00f3bias",
    mechanism: "Pr\u00f3-f\u00e1rmaco que penetra por difus\u00e3o passiva e sofre redu\u00e7\u00e3o do seu grupo nitro por prote\u00ednas de transporte de el\u00e9trons de baixo potencial de \u00f3xido-redu\u00e7\u00e3o (como ferredoxina em germes anaer\u00f3bios e protozo\u00e1rios). Os intermedi\u00e1rios reativos e radicais livres gerados causam fragmenta\u00e7\u00e3o e quebra das cadeias de DNA, com morte bactericida."
  },
  claritromicina: {
    pharmacologicalClass: "Macrol\u00eddeo semi-sint\u00e9tico (14 membros)",
    molecularTarget: "Subunidade 50S do ribossomo bacteriano (RNA 23S)",
    mechanism: "Liga-se reversivelmente ao s\u00edtio P da subunidade 50S ribossomal bacteriana, bloqueando a transloca\u00e7\u00e3o do peptidil-tRNA e impedindo o alongamento da cadeia pept\u00eddica em s\u00edntese. Confere efeito bacteriost\u00e1tico ou bactericida tempo-dependente contra pat\u00f3genos at\u00edpicos e respirat\u00f3rios."
  },
  azitromicina: {
    pharmacologicalClass: "Macrol\u00eddeo azal\u00eddeo (15 membros)",
    molecularTarget: "Subunidade ribossomal 50S",
    mechanism: "Inibe a s\u00edntese de prote\u00ednas ligando-se ao dom\u00ednio V do RNA riboss\u00f4mico 23S na subunidade 50S bacteriana. Apresenta ac\u00famulo intracelular maci\u00e7o em fag\u00f3citos e macr\u00f3fagos alveolares, garantindo transporte direcionado aos focos infecciosos e meia-vida tecidual ultra-longa (>60 horas)."
  },
  daptomicina: {
    pharmacologicalClass: "Lipopept\u00eddeo c\u00edclico c\u00e1lcio-dependente",
    molecularTarget: "Membrana celular de bact\u00e9rias Gram-positivas",
    mechanism: "Na presen\u00e7a de \u00edons c\u00e1lcio fisiol\u00f3gicos, liga-se \u00e0 membrana celular bacteriana e nela se insere, promovendo oligomeriza\u00e7\u00e3o em canais i\u00f4nicos. Causa r\u00e1pida despolariza\u00e7\u00e3o do potencial de membrana com efluxo maci\u00e7o de pot\u00e1ssio (K+), cessando a s\u00edntese de DNA, RNA e prote\u00ednas com morte celular bactericida r\u00e1pida sem lise."
  },
  tigeciclina: {
    pharmacologicalClass: "Glicilciclina (derivado de minociclina)",
    molecularTarget: "Subunidade ribossomal 30S bacteriana",
    mechanism: "Liga-se \u00e0 subunidade 30S do ribossomo bacteriano com afinidade 5 vezes superior \u00e0s tetraciclinas cl\u00e1ssicas, superando os dois principais mecanismos de resist\u00eancia (bombas de efluxo e prote\u00e7\u00e3o riboss\u00f4mica). Bloqueia a entrada do aminoacil-tRNA no s\u00edtio A ribossomal, inibindo a s\u00edntese proteica."
  },
  isoniazida: {
    pharmacologicalClass: "Antimicobacteriano antituberculose",
    molecularTarget: "InhA (Enol-ACP redutase micobacteriana)",
    mechanism: "Pr\u00f3-f\u00e1rmaco ativado pela enzima catalase-peroxidase micobacteriana (KatG). O aduto ativo liga-se covalentemente \u00e0 enzima InhA, inibindo a s\u00edntese de \u00e1cidos mic\u00f3licos de cadeia longa essenciais para a integridade da parede celular de Mycobacterium tuberculosis."
  },
  pirazinamida: {
    pharmacologicalClass: "Antimicobacteriano antituberculose",
    molecularTarget: "\u00c1cido pirazinoico (POA) e membrana citoplasm\u00e1tica micobacteriana",
    mechanism: "Convertida em \u00e1cido pirazinoico pela pirazinamidase de M. tuberculosis. O \u00e1cido acumulado desestabiliza a membrana celular, dissipa o potencial el\u00e9trico e a for\u00e7a pr\u00f3ton-motriz em pH \u00e1cido intrafagoss\u00f4mico, inibindo bacilos em estado de dorm\u00eancia intracelular."
  },
  etambutol: {
    pharmacologicalClass: "Antimicobacteriano antituberculose",
    molecularTarget: "Arabinosil transferase micobacteriana (EmbB)",
    mechanism: "Inibe especificamente as arabinosil transferases micobacterianas (codificadas pelos genes embCAB), bloqueando a polimeriza\u00e7\u00e3o da arabinose e a s\u00edntese do arabinogalactano, componente estrutural chave da parede celular de micobact\u00e9rias."
  },
  anfotericina_b: {
    pharmacologicalClass: "Antif\u00fangico poli\u00eanico lipossomal",
    molecularTarget: "Ergosterol da membrana f\u00fangica",
    mechanism: "Liga-se seletivamente ao ergosterol presente na membrana celular dos fungos suscept\u00edveis, formando poros transmembranares que alteram a permeabilidade i\u00f4nica. Provoca perda r\u00e1pida de c\u00e1tions intracelulares (K+ e Mg2+) e morte f\u00fangica fungicida."
  },
  anfotericina_desoxicolato: {
    pharmacologicalClass: "Antif\u00fangico poli\u00eanico convencional",
    molecularTarget: "Ergosterol da membrana celular f\u00fangica",
    mechanism: "Liga-se com alta afinidade ao ergosterol f\u00fangico criando poros na membrana e induzindo extravasamento de solutos intracelulares. Apresenta afinidade parcial pelo colesterol de membranas celulares humanas (especialmente c\u00e9lulas tubulares renais), explicando sua nefrotoxicidade dose-limitante."
  },
  anfotericina_complexo_lipidico: {
    pharmacologicalClass: "Antif\u00fangico poli\u00eanico carreador lip\u00eddico (ABLC)",
    molecularTarget: "Ergosterol da membrana f\u00fangica",
    mechanism: "Complexada a fosfolip\u00eddios em part\u00edculas em fita microsc\u00f3picas, \u00e9 captada preferencialmente pelo sistema fagoc\u00edtico mononuclear e liberada nos focos inflamat\u00f3rios f\u00fangicos, onde atua ligando-se ao ergosterol e formando canais l\u00edticos, com menor toxicidade tubular renal direta."
  },
  fluconazol: {
    pharmacologicalClass: "Triazol antif\u00fangico de 1\u00aa gera\u00e7\u00e3o",
    molecularTarget: "14-alfa-desmetilase do citocromo P450 f\u00fangico (CYP51)",
    mechanism: "Inibe seletivamente a enzima 14-alfa-desmetilase f\u00fangica dependente do citocromo P450, bloqueando a convers\u00e3o de lanosterol em ergosterol. O ac\u00famulo de ester\u00f3is an\u00f4malos 14-alfa-metilados desorganiza a bicamada lip\u00eddica f\u00fangica, inibindo o crescimento de Candida albicans e Cryptococcus."
  },
  itraconazol: {
    pharmacologicalClass: "Triazol antif\u00fangico",
    molecularTarget: "CYP51 (14-alfa-esterol desmetilase f\u00fangica)",
    mechanism: "Inibe a bioss\u00edntese de ergosterol na membrana f\u00fangica por inibi\u00e7\u00e3o de CYP51. Apresenta alta afinidade tecidual e lipofilicidade com espectro estendido para Aspergillus, Histoplasma e Paracoccidioides."
  },
  voriconazol: {
    pharmacologicalClass: "Triazol antif\u00fangico de 2\u00aa gera\u00e7\u00e3o",
    molecularTarget: "CYP51 f\u00fangico de leveduras e filamentosos",
    mechanism: "Inibidor potente da 14-alfa-esterol desmetilase f\u00fangica, com afinidade superior em Aspergillus spp. e Fusarium. Esgota o ergosterol e desestabiliza a membrana celular f\u00fangica; potente inibidor e substrato das enzimas CYP2C19, CYP2C9 e CYP3A4."
  },
  cetoconazol: {
    pharmacologicalClass: "Imidazol antif\u00fangico",
    molecularTarget: "14-alfa-desmetilase e esteroidog\u00eanese suprarrenal/gonadal",
    mechanism: "Inibe a s\u00edntese de ergosterol f\u00fangico e inibe fortemente enzimas do citocromo P450 humano envolvidas na s\u00edntese de esteroides (como 17-alfa-hidroxilase e clivagem da cadeia lateral do colesterol), reduzindo n\u00edveis de cortisol e andr\u00f3genos."
  },
  micafungina: {
    pharmacologicalClass: "Equinocandina",
    molecularTarget: "1,3-beta-D-glucano sintase f\u00fangica",
    mechanism: "Inibe n\u00e3o competitivamente a enzima 1,3-beta-D-glucano sintase na parede celular f\u00fangica, componente estrutural ausente em c\u00e9lulas de mam\u00edferos. Provoca enfraquecimento osm\u00f3tico da parede com lise e morte fungicida em Candida e fungist\u00e1tica em Aspergillus."
  },
  flucitosina: {
    pharmacologicalClass: "Antimetab\u00f3lito pirimid\u00ednico antif\u00fangico (5-FC)",
    molecularTarget: "Timidilato sintase e s\u00edntese de RNA f\u00fangico",
    mechanism: "Penetra nas c\u00e9lulas f\u00fangicas via citosina permease e \u00e9 convertida pela citosina desaminase f\u00fangica em 5-fluoruracila (5-FU). Esta \u00e9 incorporada ao RNA f\u00fangico, inibindo a s\u00edntese proteica, e inibe a timidilato sintase, bloqueando a s\u00edntese de DNA f\u00fangico."
  },
  aciclovir: {
    pharmacologicalClass: "Antiviral an\u00e1logo de nucleos\u00eddeo pur\u00ednico",
    molecularTarget: "DNA-polimerase do v\u00edrus Herpes simplex (HSV) e Varicela-z\u00f3ster (VZV)",
    mechanism: "\u00c9 seletivamente monofosforilado pela timidina quinase viral em c\u00e9lulas infectadas e subsequentemente convertido por quinases celulares em aciclovir-trifosfato. Este atua como inibidor competitivo e terminador de cadeia obrigat\u00f3rio da DNA-polimerase viral, interrompendo a replica\u00e7\u00e3o do DNA viral."
  },
  ganciclovir: {
    pharmacologicalClass: "Antiviral an\u00e1logo sint\u00e9tico de 2'-desoxiguanosina",
    molecularTarget: "DNA-polimerase viral de Citomegalov\u00edrus (CMV)",
    mechanism: "Fosforilado inicialmente pela prote\u00edna quinase viral UL97 do citomegalov\u00edrus (CMV) e depois por quinases celulares a ganciclovir-trifosfato. Inibe competitivamente a incorpora\u00e7\u00e3o de dGTP pela DNA-polimerase viral e atua como terminador da extens\u00e3o da cadeia de DNA viral. (Cymevir\u00ae: bolsa pronta para infus\u00e3o cont\u00ednua RTU)."
  },
  dolutegravir: {
    pharmacologicalClass: "Inibidor da integrase do HIV (INSTI de 2\u00aa gera\u00e7\u00e3o)",
    molecularTarget: "S\u00edtio catal\u00edtico da Integrase do HIV-1",
    mechanism: "Liga-se ao s\u00edtio ativo da enzima integrase do HIV e quela os \u00edons divalentes essenciais de magn\u00e9sio, bloqueando a etapa de transfer\u00eancia de fita (strand transfer) do DNA proviral viral para o genoma cromoss\u00f4mico da c\u00e9lula hospedeira humana."
  },
  abacavir: {
    pharmacologicalClass: "Inibidor de transcriptase reversa an\u00e1logo de nucleos\u00eddeo (ITRN)",
    molecularTarget: "Transcriptase reversa do HIV-1",
    mechanism: "An\u00e1logo de carbovir que, fosforilado intracelularmente em carbovir-trifosfato, compete com o dGTP natural pela transcriptase reversa do HIV-1 e causa o t\u00e9rmino prematuro da cadeia de DNA viral por aus\u00eancia do grupo 3'-OH."
  },
  zidovudina: {
    pharmacologicalClass: "ITRN (An\u00e1logo de timidina / AZT)",
    molecularTarget: "Transcriptase reversa do HIV",
    mechanism: "Fosforilada a zidovudina-trifosfato, atua como inibidor competitivo da transcriptase reversa viral do HIV e provoca termina\u00e7\u00e3o precoce da s\u00edntese do DNA proviral pela aus\u00eancia da hidroxila 3'."
  },
  efavirenz: {
    pharmacologicalClass: "Inibidor de transcriptase reversa n\u00e3o nucleos\u00eddeo (ITRNN)",
    molecularTarget: "Bols\u00e3o alost\u00e9rico da transcriptase reversa do HIV-1",
    mechanism: "Liga-se diretamente e de modo n\u00e3o competitivo a um bols\u00e3o hidrof\u00f3bico alost\u00e9rico adjacente ao s\u00edtio catal\u00edtico da transcriptase reversa do HIV-1, induzindo altera\u00e7\u00e3o conformacional que bloqueia a polimeriza\u00e7\u00e3o do DNA dependente de RNA e DNA."
  },
  nevirapina: {
    pharmacologicalClass: "ITRNN dipiridodiazepinona",
    molecularTarget: "S\u00edtio alost\u00e9rico da transcriptase reversa do HIV-1",
    mechanism: "Bloqueia a transcriptase reversa do HIV-1 ligando-se a um s\u00edtio n\u00e3o catal\u00edtico pr\u00f3ximo ao s\u00edtio ativo, inibindo a s\u00edntese de DNA viral por altera\u00e7\u00e3o da conforma\u00e7\u00e3o tridimensional da enzima."
  },
  atazanavir: {
    pharmacologicalClass: "Inibidor da protease do HIV (IP)",
    molecularTarget: "Protease do HIV-1",
    mechanism: "Inibe seletivamente a clivagem das poliprote\u00ednas precursoras Gag e Gag-Pol pela enzima protease do HIV-1, impedindo a matura\u00e7\u00e3o e empacotamento dos v\u00edrions e gerando part\u00edculas virais imaturas n\u00e3o infecciosas."
  },
  darunavir: {
    pharmacologicalClass: "Inibidor da protease do HIV de 2\u00aa gera\u00e7\u00e3o",
    molecularTarget: "S\u00edtio catal\u00edtico da protease do HIV-1",
    mechanism: "Liga-se com afinidade nanomolar e m\u00faltiplas pontes de hidrog\u00eanio ao esqueleto pept\u00eddico da protease do HIV-1, apresentando alta barreira gen\u00e9tica \u00e0 resist\u00eancia e impedindo a forma\u00e7\u00e3o de part\u00edculas virais maduras competentes para replica\u00e7\u00e3o."
  },
  ritonavir: {
    pharmacologicalClass: "Inibidor da protease e potente inibidor farmacocin\u00e9tico de CYP3A4",
    molecularTarget: "Citocromo P450 CYP3A4 / Protease do HIV",
    mechanism: "Inibidor suicida potente do citocromo CYP3A4 hep\u00e1tico e intestinal. Utilizado principalmente como 'booster' farmacocin\u00e9tico para elevar e prolongar as concentra\u00e7\u00f5es s\u00e9ricas de outros f\u00e1rmacos antirretrovirais (como atazanavir e lopinavir)."
  },
  lopinavir_ritonavir: {
    pharmacologicalClass: "Inibidor da protease associado a booster farmacocin\u00e9tico",
    molecularTarget: "Protease do HIV-1 + Inibi\u00e7\u00e3o metab\u00f3lica de CYP3A4",
    mechanism: "O lopinavir inibe seletivamente a clivagem de poliprote\u00ednas pela protease do HIV-1; o ritonavir atua como inibidor de CYP3A4 que desacelera o catabolismo de lopinavir, mantendo n\u00edveis plasm\u00e1ticos sustentados e suprimindo a carga viral."
  },
  tenofovir: {
    pharmacologicalClass: "Inibidor de transcriptase reversa an\u00e1logo de nucleot\u00eddeo (ITRNt)",
    molecularTarget: "Transcriptase reversa do HIV-1 e DNA-polimerase do HBV",
    mechanism: "An\u00e1logo ac\u00edclico de monofosfato de adenosina que, convertido em tenofovir-difosfato, compete com o dATP natural e incorpora-se ao DNA viral, atuando como terminador precoce da cadeia pela falta da hidroxila 3'."
  },
  lamivudina: {
    pharmacologicalClass: "ITRN (An\u00e1logo de citidina / 3TC)",
    molecularTarget: "Transcriptase reversa do HIV-1 e DNA-polimerase do v\u00edrus da Hepatite B",
    mechanism: "Fosforilada intracelularmente em seu metab\u00f3lito ativo trifosfato, compete com a desoxicitidina natural e bloqueia a replica\u00e7\u00e3o de DNA do HIV e HBV por t\u00e9rmino imediato da polimeriza\u00e7\u00e3o da fita de DNA."
  },
  noradrenalina: {
    pharmacologicalClass: "Catecolamina vasopressora simpatomim\u00e9tica",
    molecularTarget: "Receptores Alfa-1 adren\u00e9rgicos vasculares e Beta-1 mioc\u00e1rdicos",
    mechanism: "Potente agonista alfa-1 adren\u00e9rgico com a\u00e7\u00e3o moderada beta-1 mioc\u00e1rdica. Induz intensa vasoconstri\u00e7\u00e3o arteriolar sist\u00eamica aumentando a resist\u00eancia vascular sist\u00eamica (RVS) e a press\u00e3o arterial m\u00e9dia (PAM), com discreto efeito inotr\u00f3pico positivo sem taquicardia excessiva."
  },
  vasopressina: {
    pharmacologicalClass: "Horm\u00f4nio pept\u00eddico neuro-hipofis\u00e1rio (Arginina-vasopressina)",
    molecularTarget: "Receptores V1a vasculares e V2 renais",
    mechanism: "Estimula receptores V1a na musculatura lisa vascular ativando a via fosfolipase C/IP3/c\u00e1lcio, causando vasoconstri\u00e7\u00e3o perif\u00e9rica mesmo em estados de acidose metab\u00f3lica grave refrat\u00e1rios a catecolaminas. Em receptores V2 renais, promove inser\u00e7\u00e3o de canais de aquaporina-2 nos ductos coletores retendo \u00e1gua livre."
  },
  terlipressina: {
    pharmacologicalClass: "An\u00e1logo sint\u00e9tico vasopress\u00f3rico de a\u00e7\u00e3o espl\u00e2ncnica seletiva",
    molecularTarget: "Receptores V1a na circula\u00e7\u00e3o espl\u00e2ncnica e arterial",
    mechanism: "Pr\u00f3-f\u00e1rmaco que libera lisina-vasopressina lentamente no endot\u00e9lio. Atua seletivamente sobre receptores V1a vasculares do leito mesent\u00e9rico e espl\u00e2ncnico, reduzindo a hipertens\u00e3o portal e o fluxo sang\u00fc\u00edneo colateral e promovendo redistribui\u00e7\u00e3o vol\u00eamica com melhora da perfus\u00e3o arterial renal na S\u00edndrome Hepatorrenal."
  },
  milrinona: {
    pharmacologicalClass: "Inodilatador (Inibidor da Fosfodiesterase tipo 3 - PDE-3)",
    molecularTarget: "Enzima Fosfodiesterase-3 mioc\u00e1rdica e vascular lisa",
    mechanism: "Inibe seletivamente a quebra de AMP c\u00edclico (AMPc) nos mi\u00f3citos card\u00edacos e na musculatura lisa arterial e venosa. Aumenta a entrada de c\u00e1lcio durante a s\u00edstole mioc\u00e1rdica (efeito inotr\u00f3pico positivo) e acelera a recapta\u00e7\u00e3o de c\u00e1lcio na di\u00e1stole (efeito lusitr\u00f3pico positivo), associado \u00e0 potente redu\u00e7\u00e3o da p\u00f3s-carga biventricular e p\u00f3s-carga pulmonar."
  },
  efedrina: {
    pharmacologicalClass: "Amina simpatomim\u00e9tica de a\u00e7\u00e3o mista (direta e indireta)",
    molecularTarget: "Receptores Alfa-1, Beta-1 e libera\u00e7\u00e3o pr\u00e9-sin\u00e1ptica de noradrenalina",
    mechanism: "Estimula diretamente receptores alfa e beta-adren\u00e9rgicos e promove a libera\u00e7\u00e3o vesicular de noradrenalina end\u00f3gena das termina\u00e7\u00f5es nervosas simp\u00e1ticas. Aumenta a press\u00e3o arterial, d\u00e9bito card\u00edaco e frequ\u00eancia card\u00edaca; apresenta taquifilaxia com doses repetidas pelo esgotamento das reservas de neurotransmissor."
  },
  esmolol: {
    pharmacologicalClass: "Betabloqueador cardioseletivo (Beta-1) de a\u00e7\u00e3o ultracurta",
    molecularTarget: "Receptores Beta-1 adren\u00e9rgicos do n\u00f3 sinusal e mioc\u00e1rdio",
    mechanism: "Antagonista competitivo altamente seletivo de receptores beta-1 adren\u00e9rgicos. Reduz a frequ\u00eancia card\u00edaca (cronotr\u00f3pico negativo), a contratilidade mioc\u00e1rdica (inotr\u00f3pico negativo) e a velocidade de condu\u00e7\u00e3o atrioventricular (dromotr\u00f3pico negativo). Metabolizado rapidamente por esterases citoplasm\u00e1ticas de eritr\u00f3citos com meia-vida de ~9 minutos."
  },
  amiodarona: {
    pharmacologicalClass: "Antiarr\u00edtmico Classe III de Vaughan-Williams (m\u00faltiplas a\u00e7\u00f5es)",
    molecularTarget: "Canais de K+ (fase 3), canais de Na+ inativados, canais de Ca2+ e receptores adren\u00e9rgicos",
    mechanism: "Prolonga a dura\u00e7\u00e3o do potencial de a\u00e7\u00e3o e o per\u00edodo refrat\u00e1rio efetivo em todos os tecidos card\u00edacos por bloqueio de canais retificadores de pot\u00e1ssio (fase 3). Bloqueia tamb\u00e9m canais r\u00e1pidos de s\u00f3dio (efeito classe I), canais lentos de c\u00e1lcio (efeito classe IV) e apresenta antagonismo n\u00e3o competitivo alfa e beta-adren\u00e9rgico."
  },
  nitroprussiato: {
    pharmacologicalClass: "Vasodilatador direto arterial e venoso de a\u00e7\u00e3o r\u00e1pida",
    molecularTarget: "\u00d3xido n\u00edtrico endotelial / Guanilato ciclase sol\u00favel (GMPc)",
    mechanism: "Libera \u00f3xido n\u00edtrico (NO) espontaneamente no plasma e endot\u00e9lio por rea\u00e7\u00e3o com grupos sulfidrila e hemoglobina, estimulando a guanilato ciclase e elevando o GMP c\u00edclico (GMPc) na musculatura lisa. Promove relaxamento potente e balanceado de arter\u00edolas e v\u00eanulas, reduzindo tanto a pr\u00e9-carga quanto a p\u00f3s-carga em emerg\u00eancias hipertensivas."
  },
  nitroglicerina: {
    pharmacologicalClass: "Nitrato vasodilatador predominantemente venoso",
    molecularTarget: "Alde\u00eddo desidrogenase-2 mitocondrial (ALDH-2) e via do \u00d3xido N\u00edtrico",
    mechanism: "Biotransformada na musculatura lisa vascular por enzimas sulfidr\u00edlicas e ALDH-2, liberando \u00f3xido n\u00edtrico que ativa a guanilato ciclase e eleva o GMPc. Promove venodilata\u00e7\u00e3o coronariana e capacitiva sist\u00eamica, reduzindo a pr\u00e9-carga e a tens\u00e3o da parede do ventr\u00edculo esquerdo, aliviando a isquemia mioc\u00e1rdica e o edema pulmonar."
  },
  hidralazina: {
    pharmacologicalClass: "Vasodilatador perif\u00e9rico direto arteriolar",
    molecularTarget: "Canais de c\u00e1lcio e libera\u00e7\u00e3o de c\u00e1lcio do ret\u00edculo sarcoplasm\u00e1tico arteriolar",
    mechanism: "Atua diretamente na musculatura lisa arteriolar pr\u00e9-capilar inibindo a fosforila\u00e7\u00e3o da cadeia leve de miosina e interferindo no influxo e libera\u00e7\u00e3o intracelular de c\u00e1lcio, causando expressiva queda da resist\u00eancia vascular perif\u00e9rica com m\u00ednima dilata\u00e7\u00e3o do leito capacitivo venoso."
  },
  clonidina: {
    pharmacologicalClass: "Agonista adren\u00e9rgico Alfa-2 central",
    molecularTarget: "Receptores Alfa-2 adren\u00e9rgicos pr\u00e9-sin\u00e1pticos no tronco encef\u00e1lico",
    mechanism: "Estimula receptores alfa-2 adren\u00e9rgicos no centro vasomotor do bulbo e trato solit\u00e1rio, inibindo o efluxo simp\u00e1tico central para o cora\u00e7\u00e3o e vasos perif\u00e9ricos. Reduz os n\u00edveis plasm\u00e1ticos de catecolaminas, promovendo bradicardia, redu\u00e7\u00e3o da PA e efeito ansiol\u00edtico/sedativo."
  },
  furosemida: {
    pharmacologicalClass: "Diur\u00e9tico de al\u00e7a",
    molecularTarget: "Cotransportador Na+/K+/2Cl- (NKCC2) no ramo ascendente espesso da al\u00e7a de Henle",
    mechanism: "Inibe seletivamente o cotransportador apical Na+/K+/2Cl- na membrana luminal das c\u00e9lulas da al\u00e7a ascendente espessa de Henle, impedindo a reabsor\u00e7\u00e3o tubular de s\u00f3dio, cloreto, pot\u00e1ssio, magn\u00e9sio e c\u00e1lcio. Aumenta o volume urin\u00e1rio e reduz a volemia e as press\u00f5es de enchimento card\u00edaco."
  },
  espironolactona: {
    pharmacologicalClass: "Antagonista competitivo do receptor de mineralocorticoide",
    molecularTarget: "Receptor citoplasm\u00e1tico de aldosterona no t\u00fabulo distal e ducto coletor",
    mechanism: "Bloqueia competitivamente o receptor de aldosterona nas c\u00e9lulas principais e intercaladas do n\u00e9fron distal, impedindo a s\u00edntese e inser\u00e7\u00e3o de canais epiteliais de s\u00f3dio (ENaC) e bombas de Na+/K+-ATPase. Poupa pot\u00e1ssio e \u00edons H+, induzindo natriurese moderada e antifibrose mioc\u00e1rdica e vascular."
  },
  hidroclorotiazida: {
    pharmacologicalClass: "Diur\u00e9tico tiaz\u00eddico",
    molecularTarget: "Cotransportador Na+/Cl- (NCC) no t\u00fabulo contorcido distal",
    mechanism: "Inibe a reabsor\u00e7\u00e3o de s\u00f3dio e cloreto ligando-se ao s\u00edtio de cloreto do cotransportador eletroneutro Na+/Cl- no t\u00fabulo contornado distal. Promove aumento da excre\u00e7\u00e3o urin\u00e1ria de s\u00f3dio, cloreto e \u00e1gua, al\u00e9m de redu\u00e7\u00e3o da resist\u00eancia vascular perif\u00e9rica a longo prazo."
  },
  indapamida: {
    pharmacologicalClass: "Diur\u00e9tico tiaz\u00eddico-like com propriedades vasodilatadoras",
    molecularTarget: "Cotransportador Na+/Cl- e canais de c\u00e1lcio da musculatura lisa vascular",
    mechanism: "Bloqueia o transporte de Na+/Cl- no t\u00fabulo distal renal e reduz a reatividade vascular a est\u00edmulos vasoconstritores por bloqueio do influxo transmembranar de c\u00e1lcio em c\u00e9lulas musculares lisas arteriolares."
  },
  clortalidona: {
    pharmacologicalClass: "Diur\u00e9tico tiaz\u00eddico-like de longa dura\u00e7\u00e3o",
    molecularTarget: "Cotransportador Na+/Cl- (NCC) e anidrase carb\u00f4nica eritrocit\u00e1ria",
    mechanism: "Inibe o cotransporte de Na+/Cl- no t\u00fabulo distal. Apresenta alta afinidade e ac\u00famulo nos eritr\u00f3citos com lenta libera\u00e7\u00e3o plasm\u00e1tica, conferindo meia-vida terminal de 40 a 60 horas e controle press\u00f3rico est\u00e1vel cont\u00ednuo."
  },
  losartana: {
    pharmacologicalClass: "Bloqueador do Receptor de Angiotensina II (BRA)",
    molecularTarget: "Receptor AT1 de Angiotensina II",
    mechanism: "Antagonista competitivo e seletivo do receptor AT1 da angiotensina II no m\u00fasculo liso vascular, c\u00f3rtex adrenal e rins. Bloqueia a vasoconstri\u00e7\u00e3o mediada por angiotensina II, a secre\u00e7\u00e3o de aldosterona e a hipertrofia celular sem inibir a degrada\u00e7\u00e3o de bradicinina."
  },
  olmesartana: {
    pharmacologicalClass: "Bloqueador do Receptor AT1 da Angiotensina II",
    molecularTarget: "Receptor AT1 de Angiotensina II",
    mechanism: "Bloqueia seletivamente e com alta afinidade insuper\u00e1vel o receptor AT1, inibindo as a\u00e7\u00f5es vasoconstritoras, pr\u00f3-fibr\u00f3ticas e de reten\u00e7\u00e3o hidrossalina da angiotensina II na cascata renina-angiotensina-aldosterona."
  },
  valsartana: {
    pharmacologicalClass: "Bloqueador do Receptor de Angiotensina II (BRA)",
    molecularTarget: "Receptor AT1",
    mechanism: "Antagonista potente, oralmente ativo e altamente espec\u00edfico dos receptores AT1, bloqueando a vasoconstri\u00e7\u00e3o perif\u00e9rica e libera\u00e7\u00e3o de aldosterona sem afetar receptores de outros horm\u00f4nios cardiovasculares."
  },
  telmisartana: {
    pharmacologicalClass: "BRA com atividade agonista parcial PPAR-gama",
    molecularTarget: "Receptor AT1 e receptor nuclear PPAR-gama",
    mechanism: "Bloqueia com alt\u00edssima afinidade e dissocia\u00e7\u00e3o extremamente lenta o receptor AT1 de angiotensina II. Atua tamb\u00e9m como modulador seletivo do receptor PPAR-gama, melhorando a sensibilidade \u00e0 insulina e o perfil lip\u00eddico."
  },
  candesartana: {
    pharmacologicalClass: "BRA de liga\u00e7\u00e3o insuper\u00e1vel",
    molecularTarget: "Receptor AT1 de Angiotensina II",
    mechanism: "Pr\u00f3-f\u00e1rmaco candesartana cilexetila que sofre hidr\u00f3lise completa durante a absor\u00e7\u00e3o gastrintestinal. Liga-se com for\u00e7a tenaz e dissocia\u00e7\u00e3o lenta ao receptor AT1, gerando bloqueio duradouro e cardioprote\u00e7\u00e3o na insufici\u00eancia card\u00edaca."
  },
  captopril: {
    pharmacologicalClass: "Inibidor da Enzima Conversora de Angiotensina (IECA)",
    molecularTarget: "Enzima Conversora de Angiotensina (ECA / Quininase II)",
    mechanism: "Inibe competitivamente a ECA, enzima que cliva a angiotensina I na potente subst\u00e2ncia vasoconstritora angiotensina II. Bloqueia simultaneamente a degrada\u00e7\u00e3o da bradicinina (vasodilatadora), promovendo queda sustentada da resist\u00eancia vascular perif\u00e9rica e redu\u00e7\u00e3o da p\u00f3s-carga card\u00edaca."
  },
  enalapril: {
    pharmacologicalClass: "IECA pr\u00f3-f\u00e1rmaco",
    molecularTarget: "ECA (Quininase II)",
    mechanism: "Pr\u00f3-f\u00e1rmaco bioativado no f\u00edgado em enalaprilato, um inibidor competitivo altamente potente da enzima conversora de angiotensina. Suprime a s\u00edntese de angiotensina II e aldosterona e eleva os n\u00edveis teciduais de bradicinina."
  },
  lisinopril: {
    pharmacologicalClass: "IECA hidrof\u00edlico de a\u00e7\u00e3o prolongada",
    molecularTarget: "ECA ativa",
    mechanism: "Inibe diretamente a enzima conversora de angiotensina sem necessitar de bioativa\u00e7\u00e3o hep\u00e1tica. Reduz a s\u00edntese de angiotensina II com meia-vida biol\u00f3gica longa de 12 horas e excre\u00e7\u00e3o renal exclusiva inalterada."
  },
  ramipril: {
    pharmacologicalClass: "IECA lipof\u00edlico de alta penetra\u00e7\u00e3o tecidual",
    molecularTarget: "ECA s\u00e9rica e ECA tecidual (vascular e mioc\u00e1rdica)",
    mechanism: "Convertido em ramiprilato, inibe fortemente a ECA circulante e tecidual. Apresenta potente a\u00e7\u00e3o anti-remodelamento ventricular p\u00f3s-infarto do mioc\u00e1rdio e nefroprote\u00e7\u00e3o demonstrada em ensaios cl\u00ednicos de alto risco vascular."
  },
  anlodipino: {
    pharmacologicalClass: "Bloqueador dos canais de c\u00e1lcio di-hidropirid\u00ednico",
    molecularTarget: "Canais de c\u00e1lcio dependentes de voltagem tipo L (Cav1.2)",
    mechanism: "Inibe o influxo transmembranar de \u00edons c\u00e1lcio atrav\u00e9s dos canais lentos dependentes de voltagem tipo L nas c\u00e9lulas da musculatura lisa arterial e mi\u00f3citos. Relaxa a musculatura lisa arteriolar coronariana e sist\u00eamica, reduzindo a p\u00f3s-carga sem deprimir a condu\u00e7\u00e3o atrioventricular."
  },
  nifedipino: {
    pharmacologicalClass: "Bloqueador dos canais de c\u00e1lcio di-hidropirid\u00ednico",
    molecularTarget: "Canais de c\u00e1lcio tipo L vasculares",
    mechanism: "Bloqueia a entrada de \u00edons c\u00e1lcio em c\u00e9lulas musculares lisas arteriais, provocando vasodilata\u00e7\u00e3o perif\u00e9rica e coronariana marcante e reduzindo o consumo mioc\u00e1rdico de oxig\u00eanio."
  },
  verapamil: {
    pharmacologicalClass: "Bloqueador dos canais de c\u00e1lcio n\u00e3o di-hidropirid\u00ednico (Fenilalquilamina)",
    molecularTarget: "Canais de c\u00e1lcio tipo L no n\u00f3 sinusal, n\u00f3 AV e mioc\u00e1rdio",
    mechanism: "Bloqueia os canais lentos de c\u00e1lcio ativados por voltagem, exercendo a\u00e7\u00e3o cardiodepressora direta: retarda a condu\u00e7\u00e3o no n\u00f3 atrioventricular (dromotr\u00f3pico negativo), diminui a frequ\u00eancia card\u00edaca (cronotr\u00f3pico negativo) e reduz a contratilidade (inotr\u00f3pico negativo)."
  },
  diltiazem: {
    pharmacologicalClass: "Bloqueador dos canais de c\u00e1lcio n\u00e3o di-hidropirid\u00ednico (Benzotiazepina)",
    molecularTarget: "Canais de c\u00e1lcio tipo L vasculares e card\u00edacos",
    mechanism: "Apresenta propriedades intermedi\u00e1rias entre a di-hidropiridina e o verapamil: promove vasodilata\u00e7\u00e3o coronariana e sist\u00eamica com modesta redu\u00e7\u00e3o da velocidade de condu\u00e7\u00e3o atrioventricular e contratilidade mioc\u00e1rdica."
  },
  atenolol: {
    pharmacologicalClass: "Betabloqueador cardioseletivo (Beta-1) hidrof\u00edlico",
    molecularTarget: "Receptores Beta-1 adren\u00e9rgicos",
    mechanism: "Bloqueia competitivamente os receptores beta-1 adren\u00e9rgicos no cora\u00e7\u00e3o, diminuindo a frequ\u00eancia card\u00edaca em repouso e exerc\u00edcio, o d\u00e9bito card\u00edaco e a press\u00e3o arterial sist\u00eamica e diast\u00f3lica, al\u00e9m de inibir a libera\u00e7\u00e3o renal de renina."
  },
  bisoprolol: {
    pharmacologicalClass: "Betabloqueador cardioseletivo Beta-1 de alta afinidade",
    molecularTarget: "Receptores Beta-1 adren\u00e9rgicos card\u00edacos",
    mechanism: "Apresenta alta seletividade para receptores beta-1 mioc\u00e1rdicos (rela\u00e7\u00e3o beta-1/beta-2 superior a 14:1), com longa meia-vida e benef\u00edcios consistentes de redu\u00e7\u00e3o de mortalidade na insufici\u00eancia card\u00edaca cr\u00f4nica com fra\u00e7\u00e3o de eje\u00e7\u00e3o reduzida."
  },
  nebivolol: {
    pharmacologicalClass: "Betabloqueador Beta-1 vasodilatador de 3\u00aa gera\u00e7\u00e3o",
    molecularTarget: "Receptores Beta-1 e via da \u00d3xido N\u00edtrico Sintase endotelial (eNOS)",
    mechanism: "Combina antagonismo seletivo altamente potente de receptores beta-1 adren\u00e9rgicos (pelo enanti\u00f4mero D) com vasodilata\u00e7\u00e3o endot\u00e9lio-dependente mediada pela ativa\u00e7\u00e3o da eNOS e libera\u00e7\u00e3o de \u00f3xido n\u00edtrico (pelo enanti\u00f4mero L)."
  },
  metoprolol: {
    pharmacologicalClass: "Betabloqueador cardioseletivo Beta-1",
    molecularTarget: "Receptores Beta-1 mioc\u00e1rdicos",
    mechanism: "Inibe competitivamente os receptores beta-1 adren\u00e9rgicos no cora\u00e7\u00e3o, reduzindo a frequ\u00eancia card\u00edaca, o consumo mioc\u00e1rdico de oxig\u00eanio e a contratilidade. Na formula\u00e7\u00e3o succinato de libera\u00e7\u00e3o controlada, confere redu\u00e7\u00e3o comprovada de mortalidade na ICFER."
  },
  carvedilol: {
    pharmacologicalClass: "Betabloqueador n\u00e3o seletivo vasodilatador (Alfa-1 + Beta-1 + Beta-2)",
    molecularTarget: "Receptores Alfa-1, Beta-1, Beta-2 adren\u00e9rgicos e a\u00e7\u00e3o antioxidante",
    mechanism: "Combina bloqueio competitivo de receptores adren\u00e9rgicos beta-1 e beta-2 com bloqueio de receptores vasculares alfa-1 perif\u00e9ricos, proporcionando redu\u00e7\u00e3o do consumo mioc\u00e1rdico de oxig\u00eanio acompanhada de vasodilata\u00e7\u00e3o sist\u00eamica sem taquicardia reflexa, al\u00e9m de efeitos antioxidantes e antiproliferativos comprovados na ICFER."
  },
  propranolol: {
    pharmacologicalClass: "Betabloqueador n\u00e3o seletivo cl\u00e1ssico (Beta-1 e Beta-2)",
    molecularTarget: "Receptores Beta-1 e Beta-2 adren\u00e9rgicos",
    mechanism: "Bloqueia competitivamente tanto receptores beta-1 quanto beta-2 adren\u00e9rgicos. Reduz frequ\u00eancia card\u00edaca, press\u00e3o arterial e contratilidade mioc\u00e1rdica, al\u00e9m de inibir a convers\u00e3o perif\u00e9rica de T4 em T3 e reduzir a press\u00e3o venosa portal por vasoconstri\u00e7\u00e3o espl\u00e2ncnica (a\u00e7\u00e3o beta-2)."
  },
  propafenona: {
    pharmacologicalClass: "Antiarr\u00edtmico Classe 1C com discreto efeito betabloqueador",
    molecularTarget: "Canais r\u00e1pidos de s\u00f3dio (fase 0) e receptores Beta-adren\u00e9rgicos",
    mechanism: "Bloqueia com cin\u00e9tica de dissocia\u00e7\u00e3o muito lenta os canais r\u00e1pidos de s\u00f3dio dependentes de voltagem no mioc\u00e1rdio de condu\u00e7\u00e3o, diminuindo drasticamente a velocidade de ascens\u00e3o da fase 0 do potencial de a\u00e7\u00e3o. Retarda a condu\u00e7\u00e3o intra-atrial e no sistema His-Purkinje (alargamento do QRS)."
  },
  sotalol: {
    pharmacologicalClass: "Antiarr\u00edtmico com a\u00e7\u00e3o mista Classe II (Betabloqueador) e Classe III",
    molecularTarget: "Receptores Beta-adren\u00e9rgicos e canais retificadores de K+ (IKr)",
    mechanism: "Mistura rac\u00eamica onde ambos os is\u00f4meros bloqueiam os canais de pot\u00e1ssio IKr (prolongando a repolariza\u00e7\u00e3o ventricular e o intervalo QT) e o L-sotalol exerce betabloqueio n\u00e3o seletivo, prevenindo taquiarritmias ventriculares e supraventriculares com risco aumentado de Torsades de Pointes."
  },
  digoxina: {
    pharmacologicalClass: "Glicos\u00eddeo card\u00edaco digit\u00e1lico",
    molecularTarget: "Bomba de Na+/K+-ATPase mioc\u00e1rdica e t\u00f4nus vagal",
    mechanism: "Inibe reversivelmente a subunidade alfa da enzima Na+/K+-ATPase mioc\u00e1rdica. Eleva a concentra\u00e7\u00e3o de s\u00f3dio citos\u00f3lico, desacelerando a extrus\u00e3o de c\u00e1lcio pelo trocador Na+/Ca2+ e aumentando o c\u00e1lcio livre armazenado no ret\u00edculo sarcoplasm\u00e1tico (efeito inotr\u00f3pico positivo). Estimula reflexos vagais no n\u00f3 AV (efeito cronotr\u00f3pico negativo)."
  },
  deslanosideo: {
    pharmacologicalClass: "Glicos\u00eddeo cardiot\u00f4nico intravenoso de a\u00e7\u00e3o r\u00e1pida",
    molecularTarget: "Bomba de Na+/K+-ATPase mioc\u00e1rdica e n\u00f3s el\u00e9tricos card\u00edacos",
    mechanism: "Inibe seletivamente a Na+/K+-ATPase no sarcolema mioc\u00e1rdico, promovendo ac\u00famulo de c\u00e1lcio intracelular com aumento direto da for\u00e7a de contra\u00e7\u00e3o sist\u00f3lica (inotropismo positivo) e lentifica\u00e7\u00e3o da condu\u00e7\u00e3o nodal atrioventricular por ativa\u00e7\u00e3o parassimp\u00e1tica vagomim\u00e9tica no controle r\u00e1pido de fibrila\u00e7\u00e3o atrial aguda."
  },
  enoxaparina: {
    pharmacologicalClass: "Heparina de Baixo Peso Molecular (HBPM)",
    molecularTarget: "Antitrombina III (inativa\u00e7\u00e3o preferencial do Fator Xa sobre o IIa)",
    mechanism: "Potencializa a a\u00e7\u00e3o inibit\u00f3ria natural da antitrombina III (AT-III) sobre os fatores de coagula\u00e7\u00e3o ativados. Possui alta rela\u00e7\u00e3o anti-Xa/anti-IIa (~3,8:1), inibindo a gera\u00e7\u00e3o de trombina e impedindo a forma\u00e7\u00e3o e propaga\u00e7\u00e3o de trombos com cin\u00e9tica farmacol\u00f3gica previs\u00edvel."
  },
  rivaroxabana: {
    pharmacologicalClass: "Anticoagulante Oral Direto (DOAC)",
    molecularTarget: "Fator Xa livre e ligado ao co\u00e1gulo (complexo protrombinase)",
    mechanism: "Inibidor direto, altamente seletivo e revers\u00edvel do s\u00edtio ativo do Fator Xa. Interrompe as vias intr\u00ednseca e extr\u00ednseca da cascata da coagula\u00e7\u00e3o, inibindo tanto o Fator Xa livre plasm\u00e1tico quanto aquele ligado ao trombo de fibrina, suprimindo a convers\u00e3o de protrombina em trombina."
  },
  varfarina: {
    pharmacologicalClass: "Antagonista da Vitamina K (Cumar\u00ednico)",
    molecularTarget: "Vitamina K ep\u00f3xido redutase complexo 1 (VKORC1)",
    mechanism: "Inibe a subunidade catal\u00edtica VKORC1, impedindo a regenera\u00e7\u00e3o da vitamina K reduzida (hidroquinona). Bloqueia a gama-carboxila\u00e7\u00e3o p\u00f3s-traducional de res\u00edduos de \u00e1cido glut\u00e2mico essenciais para a ativa\u00e7\u00e3o biol\u00f3gica dependente de c\u00e1lcio dos fatores II, VII, IX, X e prote\u00ednas C e S."
  },
  protamina: {
    pharmacologicalClass: "Ant\u00eddoto neutralizador de heparina (Prote\u00edna b\u00e1sica cati\u00f4nica)",
    molecularTarget: "Mol\u00e9cula de heparina \u00e1cida ani\u00f4nica",
    mechanism: "Prote\u00edna polication\u00edca rica em arginina que interage eletrostaticamente com as fortes cargas negativas ani\u00f4nicas dos grupos sulfato da heparina n\u00e3o fracionada. Forma um complexo salino est\u00e1vel equimolar (1 mg de protamina neutraliza ~100 UI de heparina), desprovido de atividade anticoagulante."
  },
  alteplase: {
    pharmacologicalClass: "Trombol\u00edtico ativador de plasminog\u00eanio tecidual recombinante (rt-PA)",
    molecularTarget: "Fibrina do trombo e plasminog\u00eanio tecidual",
    mechanism: "Glicoprote\u00edna recombinante an\u00e1loga ao t-PA humano com alta afinidade e especificidade pela fibrina do trombo. Ao ligar-se \u00e0 fibrina, sofre ativa\u00e7\u00e3o alost\u00e9rica catalisando a convers\u00e3o do plasminog\u00eanio em plasmina ativa, enzima que degrada a malha de fibrina e dissolve o co\u00e1gulo oclusivo no AVC isqu\u00eamico e TEP."
  },
  fitomenadiona: {
    pharmacologicalClass: "Vitamina K1 (Nutriente essencial / Ant\u00eddoto de cumar\u00ednicos)",
    molecularTarget: "Gama-glutamil-carboxilase hep\u00e1tica",
    mechanism: "Atua como cofator obrigat\u00f3rio da enzima gama-glutamil-carboxilase nos microssomos hep\u00e1ticos, promovendo a convers\u00e3o de res\u00edduos glut\u00e2micos em gama-carboxiglut\u00e2micos nos fatores de coagula\u00e7\u00e3o II, VII, IX e X. Restaura a hemostasia fisiol\u00f3gica e reverte a anticoagula\u00e7\u00e3o por antagonistas da vitamina K."
  },
  metilergometrina: {
    pharmacologicalClass: "Alcaloide do ergot ocit\u00f3cico uterot\u00f4nico",
    molecularTarget: "Receptores de Serotonina (5-HT2), Alfa-adren\u00e9rgicos e Dopamin\u00e9rgicos",
    mechanism: "Atua diretamente sobre a musculatura lisa do miom\u00e9trio como agonista de receptores serotonin\u00e9rgicos e alfa-adren\u00e9rgicos. Aumenta a frequ\u00eancia e amplitude das contra\u00e7\u00f5es r\u00edtmicas e induz contra\u00e7\u00e3o tet\u00e2nica sustentada da musculatura uterina p\u00f3s-parto, promovendo hemostasia mec\u00e2nica vascular imediata."
  },
  monoetanolamina: {
    pharmacologicalClass: "Agente esclerosante venoso (Oleato de monoetanolamina)",
    molecularTarget: "Endot\u00e9lio vascular venoso de varizes esof\u00e1gicas",
    mechanism: "Quando injetado nas varizes esof\u00e1gicas, provoca les\u00e3o e desnudamento inflamat\u00f3rio agudo do endot\u00e9lio vascular. Induz trombose intravascular est\u00e9ril imediata com necrose da parede venosa, seguida de substitui\u00e7\u00e3o tecidual por tecido fibroso cicatricial que oblitera permanentemente o vaso."
  },
  polidocanol: {
    pharmacologicalClass: "Agente esclerosante microespuma / detergente endotelial",
    molecularTarget: "Bicamada lip\u00eddica endotelial de vasos varicosos",
    mechanism: "Subst\u00e2ncia tensoativa n\u00e3o i\u00f4nica que interfere na camada fosfolip\u00eddica da membrana das c\u00e9lulas endoteliais dos vasos. Causa descolamento de c\u00e9lulas endoteliais, espasmo vascular imediato e agrega\u00e7\u00e3o plaquet\u00e1ria com oclus\u00e3o tromb\u00f3tica ass\u00e9ptica e fibrose fibrosante definitiva da veia tratada."
  },
  propofol: {
    pharmacologicalClass: "Agente hipn\u00f3tico e sedativo intravenoso (Derivado de alquilfenol)",
    molecularTarget: "Receptor GABA-A (subunidades beta-1 e beta-2)",
    mechanism: "Potencializa a corrente de cloreto inibit\u00f3ria ativada por GABA por liga\u00e7\u00e3o alost\u00e9rica ao receptor GABA-A no SNC e ativa diretamente o receptor em concentra\u00e7\u00f5es elevadas. Inibe tamb\u00e9m canais de s\u00f3dio dependentes de voltagem e receptores glutamat\u00e9rgicos NMDA, induzindo perda r\u00e1pida de consci\u00eancia e redu\u00e7\u00e3o da PIC."
  },
  cetamina: {
    pharmacologicalClass: "Anest\u00e9sico dissociativo",
    molecularTarget: "Complexo receptor-canal NMDA de glutamato",
    mechanism: "Bloqueia de modo n\u00e3o competitivo o poro aberto do canal de c\u00e1lcio do receptor NMDA no c\u00f3rtex cerebral e sistema l\u00edmbico. Desconecta funcionalmente a consci\u00eancia dos est\u00edmulos sensoriais perif\u00e9ricos ('anestesia dissociativa'), preservando a respira\u00e7\u00e3o espont\u00e2nea e estimulando o sistema cardiovascular por inibi\u00e7\u00e3o da recapta\u00e7\u00e3o de catecolaminas."
  },
  dexmedetomidina: {
    pharmacologicalClass: "Agonista altamente seletivo Alfa-2 adren\u00e9rgico (8 vezes superior \u00e0 clonidina)",
    molecularTarget: "Receptores Alfa-2 adren\u00e9rgicos no Locus Coeruleus",
    mechanism: "Ativa receptores pr\u00e9-sin\u00e1pticos alfa-2 adren\u00e9rgicos acoplados \u00e0 prote\u00edna Gi no locus coeruleus encef\u00e1lico, inibindo a adenilato ciclase e o efluxo de noradrenalina. Promove seda\u00e7\u00e3o cooperativa ('sono fisiol\u00f3gico REM/n\u00e3o-REM') e analgesia espinhal sem induzir depress\u00e3o respirat\u00f3ria clinicamente relevante."
  },
  midazolam: {
    pharmacologicalClass: "Benzodiazep\u00ednico de a\u00e7\u00e3o curta",
    molecularTarget: "S\u00edtio de liga\u00e7\u00e3o dos benzodiazep\u00ednicos no receptor GABA-A",
    mechanism: "Liga-se ao s\u00edtio alost\u00e9rico entre as subunidades alfa e gama do receptor GABA-A, aumentando a afinidade do GABA pelo seu s\u00edtio ativo e a frequ\u00eancia de abertura do canal de cloreto. A hiperpolariza\u00e7\u00e3o da membrana celular neuronal resulta em efeitos ansiol\u00edticos, hipn\u00f3ticos, amn\u00e9sicos e anticonvulsivantes r\u00e1pidos."
  },
  diazepam: {
    pharmacologicalClass: "Benzodiazep\u00ednico cl\u00e1ssico de a\u00e7\u00e3o prolongada",
    molecularTarget: "Receptor GABA-A p\u00f3s-sin\u00e1ptico",
    mechanism: "Potencializa a transmiss\u00e3o inibit\u00f3ria gaba\u00e9rgica atrav\u00e9s do aumento da frequ\u00eancia de abertura dos canais de cloreto associados ao complexo receptor GABA-A. Seus metab\u00f3litos ativos (desmetildiazepam) possuem meia-vida de elimina\u00e7\u00e3o prolongada (>100h) conferindo a\u00e7\u00e3o relaxante muscular, ansiol\u00edtica e anticonvulsivante."
  },
  clonazepam: {
    pharmacologicalClass: "Benzodiazep\u00ednico de alta pot\u00eancia e longa dura\u00e7\u00e3o",
    molecularTarget: "Receptor GABA-A no c\u00f3rtex cerebral e estruturas l\u00edmbicas",
    mechanism: "Facilita a a\u00e7\u00e3o inibidora do neurotransmissor GABA, abrindo canais i\u00f4nicos de cloreto e estabilizando a excitabilidade neuronal contra a propaga\u00e7\u00e3o de descargas epileptiformes parox\u00edsticas e crises de p\u00e2nico."
  },
  flumazenil: {
    pharmacologicalClass: "Antagonista competitivo do receptor de benzodiazep\u00ednicos",
    molecularTarget: "S\u00edtio alost\u00e9rico de benzodiazep\u00ednicos no complexo GABA-A",
    mechanism: "Inibe competitivamente por bloqueio espec\u00edfico o s\u00edtio de reconhecimento de benzodiazep\u00ednicos no complexo receptor GABA-A, revertendo rapidamente a seda\u00e7\u00e3o, hipnose e amn\u00e9sia induzidas por benzodiazep\u00ednicos sem antagonizar opioides ou anest\u00e9sicos gerais."
  },
  naloxona: {
    pharmacologicalClass: "Antagonista puro de receptores opioides",
    molecularTarget: "Receptores opioides Mu (\u03bc), Kappa (\u03ba) e Delta (\u03b4)",
    mechanism: "Antagonista competitivo puro com alt\u00edssima afinidade pelos receptores opioides Mu (\u03bc) centrais e perif\u00e9ricos. Desloca os agonistas opioides end\u00f3genos e ex\u00f3genos, revertendo instantaneamente a depress\u00e3o respirat\u00f3ria, seda\u00e7\u00e3o profunda e miose em situa\u00e7\u00f5es de intoxica\u00e7\u00e3o aguda por opioides."
  },
  morfina: {
    pharmacologicalClass: "Analg\u00e9sico opioide potente agonista puro",
    molecularTarget: "Receptores opioides Mu (\u03bc) no SNC e corno posterior da medula espinhal",
    mechanism: "Liga-se a receptores acoplados \u00e0 prote\u00edna Gi/Go na subst\u00e2ncia cinzenta periaquedutal, t\u00e1lamo e medula. Inibe a adenilato ciclase, fecha canais de c\u00e1lcio voltagem-dependentes pr\u00e9-sin\u00e1pticos (reduzindo libera\u00e7\u00e3o de subst\u00e2ncia P e glutamato) e abre canais de pot\u00e1ssio p\u00f3s-sin\u00e1pticos, hiperpolarizando os neur\u00f4nios e bloqueando a transmiss\u00e3o \u00e1lgica."
  },
  fentanil: {
    pharmacologicalClass: "Opioide sint\u00e9tico de alta pot\u00eancia (100x mais potente que morfina)",
    molecularTarget: "Receptores opioides Mu-1 e Mu-2",
    mechanism: "Agonista Mu de alta lipofilicidade que cruza instantaneamente a barreira hematoencef\u00e1lica. Liga-se seletivamente a receptores opioides inibit\u00f3rios centrais, promovendo analgesia profunda e atenua\u00e7\u00e3o de reflexos hemodin\u00e2micos e simp\u00e1ticos com r\u00e1pida redistribui\u00e7\u00e3o corporal."
  },
  metadona: {
    pharmacologicalClass: "Opioide sint\u00e9tico com antagonismo NMDA e inibi\u00e7\u00e3o de monoaminas",
    molecularTarget: "Receptores Mu-opioides + Receptor NMDA + Recapta\u00e7\u00e3o de serotonina e noradrenalina",
    mechanism: "Al\u00e9m de agonista pleno dos receptores opioides Mu, atua como antagonista n\u00e3o competitivo dos receptores glutamat\u00e9rgicos NMDA e inibe a recapta\u00e7\u00e3o de noradrenalina e serotonina, sendo excepcionalmente eficaz no manejo de dores neurop\u00e1ticas complexas e desmame de opioides."
  },
  tramadol: {
    pharmacologicalClass: "Analg\u00e9sico de a\u00e7\u00e3o central com duplo mecanismo",
    molecularTarget: "Receptor Mu-opioide + Bloqueio da recapta\u00e7\u00e3o de noradrenalina e serotonina",
    mechanism: "O enanti\u00f4mero (+) e seu metab\u00f3lito ativo O-desmetiltramadol (M1) ligam-se aos receptores Mu-opioides, enquanto o enanti\u00f4mero (-) inibe a recapta\u00e7\u00e3o de noradrenalina e serotonina na fenda pr\u00e9-sin\u00e1ptica, ativando as vias descendentes inibit\u00f3rias espinhais da dor."
  },
  codeina: {
    pharmacologicalClass: "Analg\u00e9sico opioide fraco e antituss\u00edgeno",
    molecularTarget: "Receptores Mu-opioides (ap\u00f3s convers\u00e3o hep\u00e1tica por CYP2D6 em morfina)",
    mechanism: "Pr\u00f3-f\u00e1rmaco que possui baixa afinidade intr\u00ednseca pelos receptores opioides. Cerca de 10% da dose administrada \u00e9 biotransformada no f\u00edgado pela isoenzima CYP2D6 em morfina livre, que se liga aos receptores Mu e promove analgesia espinhal e supress\u00e3o do reflexo da tosse no centro bulbar."
  },
  fenitoina: {
    pharmacologicalClass: "Hidanto\u00edna anticonvulsivante de amplo espectro",
    molecularTarget: "Canais de s\u00f3dio dependentes de voltagem (estado inativado)",
    mechanism: "Estabiliza a conforma\u00e7\u00e3o inativada dos canais de s\u00f3dio voltagem-dependentes neuronais, prolongando seu per\u00edodo refrat\u00e1rio. Bloqueia seletivamente os disparos repetitivos de alta frequ\u00eancia nos focos epil\u00e9pticos sem suprimir a atividade sin\u00e1ptica basal normal."
  },
  carbamazepina: {
    pharmacologicalClass: "Iminostilbeno anticonvulsivante e antineur\u00e1lgico",
    molecularTarget: "Canais de s\u00f3dio voltagem-dependentes neuronais",
    mechanism: "Bloqueia de modo uso-dependente os canais de s\u00f3dio dependentes de voltagem neuronais, reduzindo a despolariza\u00e7\u00e3o cont\u00ednua e a propaga\u00e7\u00e3o transin\u00e1ptica de potenciais excitat\u00f3rios no c\u00f3rtex e no n\u00facleo sensorial do nervo trig\u00eameo."
  },
  acido_valproico: {
    pharmacologicalClass: "\u00c1cido graxo carbox\u00edlico anticonvulsivante de amplo espectro",
    molecularTarget: "Canais de Na+, canais de Ca2+ tipo T e vias metab\u00f3licas do GABA",
    mechanism: "Bloqueia canais de s\u00f3dio dependentes de voltagem, inibe as correntes de c\u00e1lcio de baixo limiar tipo T em neur\u00f4nios tal\u00e2micos (inibindo crises de aus\u00eancia) e aumenta os n\u00edveis cerebrais de GABA por inibi\u00e7\u00e3o da GABA-transaminase e estimula\u00e7\u00e3o da s\u00edntese de \u00e1cido glut\u00e2mico descarboxilase."
  },
  fenobarbital: {
    pharmacologicalClass: "Barbit\u00farico anticonvulsivante e sedativo",
    molecularTarget: "Receptor GABA-A (prolongamento da dura\u00e7\u00e3o de abertura do canal de Cl-)",
    mechanism: "Liga-se a um s\u00edtio alost\u00e9rico espec\u00edfico do receptor GABA-A distinto dos benzodiazep\u00ednicos, aumentando o tempo m\u00e9dio de abertura do canal de cloreto ativado por GABA. Em altas concentra\u00e7\u00f5es, reduz correntes de c\u00e1lcio dependentes de voltagem e bloqueia receptores AMPA de glutamato."
  },
  levetiracetam: {
    pharmacologicalClass: "Anticonvulsivante derivado de pirrolidona de 2\u00aa gera\u00e7\u00e3o",
    molecularTarget: "Prote\u00edna 2A de ves\u00edcula sin\u00e1ptica (SV2A)",
    mechanism: "Liga-se estereoespecificamente \u00e0 prote\u00edna vesicular SV2A nos terminais ax\u00f4nicos pr\u00e9-sin\u00e1pticos cerebrais, modulando a exocitose e a libera\u00e7\u00e3o de neurotransmissores excitat\u00f3rios (como glutamato), sem interferir diretamente nos canais de s\u00f3dio basais ou no receptor GABA."
  },
  lacosamida: {
    pharmacologicalClass: "Amino\u00e1cido funcionalizado anticonvulsivante de 3\u00aa gera\u00e7\u00e3o",
    molecularTarget: "Inativa\u00e7\u00e3o lenta dos canais de s\u00f3dio voltagem-dependentes",
    mechanism: "Aumenta seletivamente a inativa\u00e7\u00e3o lenta dos canais de s\u00f3dio dependentes de voltagem neuronais, sem afetar a inativa\u00e7\u00e3o r\u00e1pida fisiol\u00f3gica, estabilizando membranas hiperexcit\u00e1veis de modo direcionado a neur\u00f4nios cronicamente despolarizados."
  },
  lamotrigina: {
    pharmacologicalClass: "Feniltriazina anticonvulsivante e estabilizador do humor",
    molecularTarget: "Canais de s\u00f3dio dependentes de voltagem neuronais",
    mechanism: "Inibe os canais de s\u00f3dio dependentes de voltagem uso e voltagem-dependentes, suprimindo especificamente a libera\u00e7\u00e3o pr\u00e9-sin\u00e1ptica desregulada de neurotransmissores excitat\u00f3rios glutamat\u00e9rgicos e aspartato."
  },
  haloperidol: {
    pharmacologicalClass: "Antipsic\u00f3tico t\u00edpico de alta pot\u00eancia (Butirofenona)",
    molecularTarget: "Receptores Dopamin\u00e9rgicos D2 na via mesol\u00edmbica e \u00e1rea postrema",
    mechanism: "Antagonista competitivo de alt\u00edssima afinidade pelos receptores dopamin\u00e9rgicos D2 p\u00f3s-sin\u00e1pticos no sistema l\u00edmbico e estriado. Reduz del\u00edrios e alucina\u00e7\u00f5es esquizofr\u00eanicas e exerce potente controle antiem\u00e9tico e sedativo em agita\u00e7\u00e3o psicomotora aguda (com propens\u00e3o a efeitos extrapiramidais e distonias)."
  },
  clorpromazina: {
    pharmacologicalClass: "Antipsic\u00f3tico t\u00edpico de baixa pot\u00eancia (Fenotiazina alif\u00e1tica)",
    molecularTarget: "Receptores Dopamin\u00e9rgicos D2, Histam\u00ednicos H1, Colin\u00e9rgicos M1 e Alfa-1 adren\u00e9rgicos",
    mechanism: "Bloqueia receptores dopamin\u00e9rgicos D2 p\u00f3s-sin\u00e1pticos no SNC. Apresenta expressivo bloqueio de receptores histam\u00ednicos H1 e adren\u00e9rgicos alfa-1 (efeito sedativo potente e hipotens\u00e3o postural) e inibe o centro do solu\u00e7o intrat\u00e1vel no tronco cerebral e n\u00e1useas na zona deflagradora quimiorreceptora."
  },
  quetiapina: {
    pharmacologicalClass: "Antipsic\u00f3tico at\u00edpico de 2\u00aa gera\u00e7\u00e3o (Dibenzotiazepina)",
    molecularTarget: "Receptores 5-HT2A de serotonina e D2 dopamin\u00e9rgicos (dissocia\u00e7\u00e3o r\u00e1pida)",
    mechanism: "Antagonista com maior afinidade pelos receptores cerebrais 5-HT2A de serotonina do que pelos receptores D2 de dopamina, com dissocia\u00e7\u00e3o ultrarr\u00e1pida do receptor D2. Confere a\u00e7\u00e3o antipsic\u00f3tica e estabilizadora do humor com baixo risco de sintomas extrapiramidais e forte seda\u00e7\u00e3o mediada por bloqueio H1."
  },
  risperidona: {
    pharmacologicalClass: "Antipsic\u00f3tico at\u00edpico derivado de benzisoxazol",
    molecularTarget: "Receptores Serotonin\u00e9rgicos 5-HT2A e Dopamin\u00e9rgicos D2",
    mechanism: "Antagonista monoamin\u00e9rgico seletivo com alta afinidade para receptores serotonin\u00e9rgicos 5-HT2A e dopamin\u00e9rgicos D2. O bloqueio serotonin\u00e9rgico reduz os efeitos colaterais motores e estende a efic\u00e1cia terap\u00eautica aos sintomas negativos e afetivos da psicose."
  },
  olanzapina: {
    pharmacologicalClass: "Antipsic\u00f3tico at\u00edpico tienobenzodiazep\u00ednico",
    molecularTarget: "Receptores 5-HT2A/2C, D1-D4, Histam\u00ednicos H1 e Colin\u00e9rgicos muscar\u00ednicos",
    mechanism: "Antagonista de m\u00faltiplos receptores no c\u00f3rtex e sistema l\u00edmbico, destacando-se a inibi\u00e7\u00e3o potente dos receptores 5-HT2A e afinidade moderada por D2. Possui efeito antipsic\u00f3tico abrangente com forte seda\u00e7\u00e3o mediada por H1 e potencial para ganho de peso metab\u00f3lico."
  },
  biperideno: {
    pharmacologicalClass: "Anticolin\u00e9rgico antimuscar\u00ednico central",
    molecularTarget: "Receptores muscar\u00ednicos centrais (M1)",
    mechanism: "Antagonista competitivo seletivo dos receptores muscar\u00ednicos centrais de acetilcolina. Restaura o balan\u00e7o funcional colin\u00e9rgico-dopamin\u00e9rgico nos g\u00e2nglios da base alterado por neurol\u00e9pticos bloqueadores de D2, abortando distonias agudas, acatisia e parkinsonismo medicamentoso."
  },
  fluoxetina: {
    pharmacologicalClass: "Inibidor Seletivo da Recapta\u00e7\u00e3o de Serotonina (ISRS)",
    molecularTarget: "Transportador de Serotonina pr\u00e9-sin\u00e1ptico (SERT)",
    mechanism: "Inibe seletivamente o transportador SERT na membrana pr\u00e9-sin\u00e1ptica, bloqueando a recapta\u00e7\u00e3o de 5-hidroxitriptamina e prolongando a neurotransmiss\u00e3o serotonin\u00e9rgica nas fendas sin\u00e1pticas cerebrais. Seu metab\u00f3lito norfluoxetina possui meia-vida longa de 7 a 15 dias."
  },
  sertralina: {
    pharmacologicalClass: "ISRS de alta seletividade",
    molecularTarget: "Transportador de Serotonina (SERT) e fraca inibi\u00e7\u00e3o do DAT",
    mechanism: "Bloqueia a recapta\u00e7\u00e3o neuronal de serotonina no SNC ligando-se ao SERT com m\u00ednima afinidade por receptores adren\u00e9rgicos, histam\u00ednicos ou colin\u00e9rgicos. Apresenta discreto bloqueio do transportador de dopamina (DAT), conferindo perfil ativador suave."
  },
  escitalopram: {
    pharmacologicalClass: "ISRS de maior seletividade molecular (S-enanti\u00f4mero puro)",
    molecularTarget: "S\u00edtio prim\u00e1rio e alost\u00e9rico do SERT",
    mechanism: "Liga-se com alta afinidade ao s\u00edtio de liga\u00e7\u00e3o prim\u00e1rio e ao s\u00edtio alost\u00e9rico do transportador SERT humano, estabilizando a conforma\u00e7\u00e3o inibida e elevando as concentra\u00e7\u00f5es sin\u00e1pticas de serotonina sem interferir em outros receptores de monoaminas."
  },
  citalopram: {
    pharmacologicalClass: "ISRS cl\u00e1ssico (mistura rac\u00eamica de R e S)",
    molecularTarget: "Transportador de Serotonina pr\u00e9-sin\u00e1ptico",
    mechanism: "Potente inibidor da recapta\u00e7\u00e3o de serotonina. O enanti\u00f4mero S exerce o efeito terap\u00eautico enquanto o enanti\u00f4mero R pode atenuar a afinidade de liga\u00e7\u00e3o; apresenta efeito dose-dependente de prolongamento do intervalo QT por bloqueio de canais IKr em doses >40 mg/dia."
  },
  paroxetina: {
    pharmacologicalClass: "ISRS de alta pot\u00eancia",
    molecularTarget: "SERT e fraca inibi\u00e7\u00e3o muscar\u00ednica M1",
    mechanism: "Inibidor altamente potente da recapta\u00e7\u00e3o de serotonina. Apresenta discreta afinidade muscar\u00ednica anticolin\u00e9rgica e \u00e9 potente inibidor suicida da enzima hep\u00e1tica citocromo CYP2D6."
  },
  venlafaxina: {
    pharmacologicalClass: "Inibidor da Recapta\u00e7\u00e3o de Serotonina e Noradrenalina (IRSN)",
    molecularTarget: "SERT (doses baixas) e NET (doses m\u00e9dias a altas)",
    mechanism: "Inibe seletivamente a recapta\u00e7\u00e3o de serotonina em baixas dosagens (<150 mg/dia) e inibe progressivamente a recapta\u00e7\u00e3o de noradrenalina em doses maiores, elevando o t\u00f4nus monoamin\u00e9rgico em vias de dor e humor sem efeito sobre receptores alfa ou histam\u00ednicos."
  },
  duloxetina: {
    pharmacologicalClass: "IRSN balanceado e potente",
    molecularTarget: "Transportadores SERT e NET",
    mechanism: "Inibidor balanceado e potente da recapta\u00e7\u00e3o pr\u00e9-sin\u00e1ptica tanto de serotonina quanto de noradrenalina em todas as faixas terap\u00eauticas. Fortalece as vias descendentes inibit\u00f3rias da dor na medula espinhal, conferindo excelente efic\u00e1cia em dor neurop\u00e1tica perif\u00e9rica e fibromialgia."
  },
  amitriptilina: {
    pharmacologicalClass: "Antidepressivo Tric\u00edclico (ADT)",
    molecularTarget: "SERT, NET, Receptores Histam\u00ednicos H1, Alfa-1 e Muscar\u00ednicos M1",
    mechanism: "Inibe a recapta\u00e7\u00e3o neuronal de serotonina e noradrenalina no SNC. Bloqueia tamb\u00e9m receptores muscar\u00ednicos (boca seca, reten\u00e7\u00e3o urin\u00e1ria), histam\u00ednicos H1 (seda\u00e7\u00e3o intensa) e adren\u00e9rgicos alfa-1 (hipotens\u00e3o), al\u00e9m de bloquear canais de s\u00f3dio card\u00edacos (alargamento do QRS e toxicidade card\u00edaca na overdose)."
  },
  bupropiona: {
    pharmacologicalClass: "Inibidor da Recapta\u00e7\u00e3o de Dopamina e Noradrenalina (IRDN)",
    molecularTarget: "Transportadores DAT e NET + Receptores Nicot\u00ednicos de Acetilcolina",
    mechanism: "Inibe fracamente a recapta\u00e7\u00e3o neuronal de dopamina e noradrenalina no c\u00f3rtex pr\u00e9-frontal e estriado, al\u00e9m de atuar como antagonista n\u00e3o competitivo de receptores nicot\u00ednicos centrais, sem provocar seda\u00e7\u00e3o, ganho de peso ou disfun\u00e7\u00e3o sexual."
  },
  mirtazapina: {
    pharmacologicalClass: "Antidepressivo Noradren\u00e9rgico e Espec\u00edfico Serotonin\u00e9rgico (NaSSA)",
    molecularTarget: "Receptores Alfa-2 adren\u00e9rgicos pr\u00e9-sin\u00e1pticos e receptores 5-HT2/5-HT3",
    mechanism: "Bloqueia autorreceptores e heterorreceptores alfa-2 adren\u00e9rgicos pr\u00e9-sin\u00e1pticos centrais, desinibindo a libera\u00e7\u00e3o de noradrenalina e serotonina. Bloqueia especificamente os receptores p\u00f3s-sin\u00e1pticos 5-HT2 e 5-HT3 (prevenindo ansiedade e n\u00e1useas) e bloqueia receptores H1 (seda\u00e7\u00e3o acentuada e aumento do apetite)."
  },
  simeticona: {
    pharmacologicalClass: "Antiflatulento tensoativo / Siloxano fisiologicamente inerte",
    molecularTarget: "Tens\u00e3o superficial das bolhas de g\u00e1s intraluminais",
    mechanism: "Agente com propriedades tensoativas que reduz fisicamente a tens\u00e3o superficial das bolhas de g\u00e1s retidas no muco do trato gastrintestinal. Faz com que as pequenas bolhas se coales\u00e7am em bolsas gasosas maiores facilmente transportadas e eliminadas por eructa\u00e7\u00e3o ou flatos, sem qualquer absor\u00e7\u00e3o sist\u00eamica ou interfer\u00eancia enzim\u00e1tica."
  },
  omeprazol: {
    pharmacologicalClass: "Inibidor da Bomba de Pr\u00f3tons (IBP)",
    molecularTarget: "H+/K+-ATPase da c\u00e9lula parietal g\u00e1strica",
    mechanism: "Pr\u00f3-f\u00e1rmaco lipof\u00edlico de base fraca que se acumula no ambiente fortemente \u00e1cido dos canal\u00edculos secretores da c\u00e9lula parietal g\u00e1strica, onde \u00e9 protonado e ativado a uma sulfenamida reativa. Forma pontes dissulfeto covalentes irrevers\u00edveis com res\u00edduos de ciste\u00edna da enzima H+/K+-ATPase, bloqueando a etapa final da secre\u00e7\u00e3o \u00e1cida g\u00e1strica."
  },
  pantoprazol: {
    pharmacologicalClass: "IBP de 2\u00aa gera\u00e7\u00e3o com alta estabilidade qu\u00edmica",
    molecularTarget: "Bomba de pr\u00f3tons H+/K+-ATPase g\u00e1strica (Cys813 e Cys822)",
    mechanism: "Inibe covalentemente a bomba de pr\u00f3tons H+/K+-ATPase parietal. Devido \u00e0 sua maior estabilidade em pH neutro ou moderadamente \u00e1cido, apresenta menor inibi\u00e7\u00e3o competitiva sobre a enzima citocromo CYP2C19 hep\u00e1tica comparado a outros IBPs, sendo seguro com clopidogrel."
  },
  metoclopramida: {
    pharmacologicalClass: "Pr\u00f3-cin\u00e9tico benzam\u00eddico e antiem\u00e9tico",
    molecularTarget: "Receptores Dopamin\u00e9rgicos D2 e receptores Serotonin\u00e9rgicos 5-HT3/5-HT4",
    mechanism: "Antagonista de receptores centrais e perif\u00e9ricos D2 de dopamina e agonista de 5-HT4 gastrointestinal. Aumenta a libera\u00e7\u00e3o fisiol\u00f3gica de acetilcolina no plexo mioent\u00e9rico, acelerando o esvaziamento g\u00e1strico e o tr\u00e2nsito do intestino delgado, enquanto bloqueia a zona de gatilho quimiorreceptora no assoalho do quarto ventr\u00edculo."
  },
  ondansetrona: {
    pharmacologicalClass: "Antiem\u00e9tico antagonista seletivo do receptor 5-HT3",
    molecularTarget: "Receptores de Serotonina 5-HT3 perif\u00e9ricos e na zona quimiorreceptora",
    mechanism: "Bloqueia competitivamente os receptores 5-HT3 de serotonina localizados nas termina\u00e7\u00f5es nervosas do nervo vago no trato gastrointestinal e centralmente na zona de deflagra\u00e7\u00e3o dos quimiorreceptores no assoalho do 4\u00ba ventr\u00edculo, prevenindo e abortando n\u00e1useas e v\u00f4mitos."
  },
  metformina: {
    pharmacologicalClass: "Biguanida antidiab\u00e9tica",
    molecularTarget: "Complexo I mitocondrial hep\u00e1tico e prote\u00edna quinase ativada por AMP (AMPK)",
    mechanism: "Inibe de modo suave e revers\u00edvel o Complexo I da cadeia respirat\u00f3ria mitocondrial nas c\u00e9lulas hep\u00e1ticas, elevando a rela\u00e7\u00e3o AMP/ATP celular. Ativa a enzima AMPK citoplasm\u00e1tica, suprimindo a transcri\u00e7\u00e3o dos genes da gliconeog\u00eanese hep\u00e1tica e estimulando a transloca\u00e7\u00e3o de GLUT4 e capta\u00e7\u00e3o de glicose no m\u00fasculo esquel\u00e9tico sem estimular a secre\u00e7\u00e3o de insulina."
  },
  dapagliflozina: {
    pharmacologicalClass: "Inibidor do Cotransportador S\u00f3dio-Glicose 2 (iSGLT-2)",
    molecularTarget: "Cotransportador SGLT-2 no t\u00fabulo contornado proximal renal",
    mechanism: "Inibe seletivamente o cotransportador de alta capacidade SGLT-2 respons\u00e1vel pela reabsor\u00e7\u00e3o de cerca de 90% da glicose filtrada nos rins. Promove glicos\u00faria e natriurese osm\u00f3tica, reduzindo a glicemia, a press\u00e3o arterial, a pr\u00e9-carga e restaurando o feedback tubuloglomerular e reduzindo a hiperfiltra\u00e7\u00e3o renal."
  },
  empagliflozina: {
    pharmacologicalClass: "Inibidor potente de SGLT-2 renal",
    molecularTarget: "Cotransportador SGLT-2 proximal",
    mechanism: "Bloqueia a reabsor\u00e7\u00e3o tubular proximal de glicose e s\u00f3dio mediada por SGLT-2, induzindo perda cal\u00f3rica urin\u00e1ria, redu\u00e7\u00e3o de sobrecarga hemodin\u00e2mica ventricular e prote\u00e7\u00e3o cardiovascular e renal comprovadas em insufici\u00eancia card\u00edaca cr\u00f4nica e doen\u00e7a renal cr\u00f4nica."
  },
  glibenclamida: {
    pharmacologicalClass: "Sulfonilureia de 2\u00aa gera\u00e7\u00e3o secretagoga de insulina",
    molecularTarget: "Subunidade SUR1 do canal de pot\u00e1ssio sens\u00edvel a ATP (K-ATP) da c\u00e9lula beta pancre\u00e1tica",
    mechanism: "Liga-se aos receptores SUR1 associados aos canais de K-ATP na membrana da c\u00e9lula beta do p\u00e2ncreas, fechando o canal e despolarizando a membrana plasm\u00e1tica. A despolariza\u00e7\u00e3o abre canais de c\u00e1lcio voltagem-dependentes, elevando o c\u00e1lcio intracelular e estimulando a exocitose das ves\u00edculas de insulina."
  },
  gliclazida: {
    pharmacologicalClass: "Sulfonilureia de 2\u00aa gera\u00e7\u00e3o com seletividade pancre\u00e1tica",
    molecularTarget: "Receptor SUR1 pancre\u00e1tico (alta especificidade sobre SUR2A mioc\u00e1rdico)",
    mechanism: "Fecha seletivamente os canais de K-ATP da c\u00e9lula beta pancre\u00e1tica estimulando a secre\u00e7\u00e3o de insulina na primeira fase, com menor afinidade pelos canais de pot\u00e1ssio vasculares e card\u00edacos e baixo risco de hipoglicemia prolongada."
  },
  sitagliptina: {
    pharmacologicalClass: "Inibidor da Enzima Dipeptidil Peptidase-4 (iDPP-4)",
    molecularTarget: "Enzima DPP-4 plasm\u00e1tica e endotelial",
    mechanism: "Inibe seletivamente a enzima DPP-4, impedindo a degrada\u00e7\u00e3o e inativa\u00e7\u00e3o r\u00e1pida das incretinas ativas GLP-1 (pept\u00eddeo semelhante ao glucagon 1) e GIP. Prolonga os n\u00edveis circulantes de GLP-1 p\u00f3s-prandial, estimulando a libera\u00e7\u00e3o de insulina e suprimindo o glucagon de forma estritamente glicose-dependente."
  },
  linagliptina: {
    pharmacologicalClass: "Inibidor de DPP-4 de elimina\u00e7\u00e3o predominantemente n\u00e3o renal",
    molecularTarget: "Enzima catal\u00edtica DPP-4",
    mechanism: "Inibe a DPP-4 preservando os horm\u00f4nios incret\u00ednicos intactos. Possui elimina\u00e7\u00e3o biliar e fecal predominante (>90%), sendo o \u00fanico inibidor da classe que n\u00e3o necessita de ajuste de dose em nenhum est\u00e1gio de insufici\u00eancia renal ou di\u00e1lise."
  },
  rosuvastatina: {
    pharmacologicalClass: "Inibidor potente da HMG-CoA Redutase (Estatina hidrof\u00edlica)",
    molecularTarget: "Enzima 3-hidroxi-3-metilglutaril-coenzima A redutase hep\u00e1tica",
    mechanism: "Inibe competitivamente a enzima HMG-CoA redutase, etapa limitante da s\u00edntese intracelular de colesterol nos hepat\u00f3citos. O esgotamento do colesterol hep\u00e1tico induz a superexpress\u00e3o de receptores de LDL na superf\u00edcie dos hepat\u00f3citos, aumentando a depura\u00e7\u00e3o plasm\u00e1tica de LDL-colesterol e triglicer\u00eddeos e estabilizando placas ateroscler\u00f3ticas."
  },
  atorvastatina: {
    pharmacologicalClass: "Inibidor da HMG-CoA Redutase (Estatina lipof\u00edlica de longa dura\u00e7\u00e3o)",
    molecularTarget: "HMG-CoA Redutase",
    mechanism: "Inibe a bioss\u00edntese hep\u00e1tica de colesterol por inibi\u00e7\u00e3o seletiva da HMG-CoA redutase com longa meia-vida inibit\u00f3ria tecidual (20-30h devido a metab\u00f3litos ativos), promovendo expressiva redu\u00e7\u00e3o do colesterol total, LDL-C e apolipoprote\u00edna B."
  },
  sinvastatina: {
    pharmacologicalClass: "Inibidor da HMG-CoA Redutase pr\u00f3-f\u00e1rmaco lact\u00f4nico",
    molecularTarget: "HMG-CoA Redutase ativa (ap\u00f3s abertura do anel lactona)",
    mechanism: "Lactona inativa hidrolisada in vivo no f\u00edgado \u00e0 sua forma beta-hidroxi\u00e1cida ativa correspondente, inibindo a HMG-CoA redutase e aumentando o catabolismo das part\u00edculas de LDL ricas em \u00e9steres de colesterol."
  },
  ezetimiba: {
    pharmacologicalClass: "Inibidor seletivo da absor\u00e7\u00e3o intestinal de colesterol",
    molecularTarget: "Prote\u00edna carreadora Niemann-Pick C1-Like 1 (NPC1L1)",
    mechanism: "Localiza-se na borda em escova das c\u00e9lulas do intestino delgado e inibe especificamente o transportador esterol NPC1L1, bloqueando a absor\u00e7\u00e3o ent\u00e9rica do colesterol biliar e diet\u00e9tico sem inibir a absor\u00e7\u00e3o de triglicer\u00eddeos ou vitaminas lipossol\u00faveis."
  },
  dexametasona: {
    pharmacologicalClass: "Glicocorticoide sint\u00e9tico fluorado de longa a\u00e7\u00e3o e alt\u00edssima pot\u00eancia",
    molecularTarget: "Receptor citoplasm\u00e1tico de glicocorticoide (GR) e fator nuclear NF-kB",
    mechanism: "Liga-se com alta afinidade ao receptor intracelular de glicocorticoide, translocando-se ao n\u00facleo onde inibe a transcri\u00e7\u00e3o do NF-kB e AP-1 e estimula a s\u00edntese de lipocortina-1 (anexina-1). Suprime a fosfolipase A2 e a cascata de citocinas pr\u00f3-inflamat\u00f3rias (IL-1, IL-6, TNF-alfa), praticamente desprovida de atividade mineralocorticoide de reten\u00e7\u00e3o h\u00eddrica."
  },
  hidrocortisona: {
    pharmacologicalClass: "Corticoide fisiol\u00f3gico de curta dura\u00e7\u00e3o com a\u00e7\u00e3o mista",
    molecularTarget: "Receptores de Glicocorticoide (GR) e Mineralocorticoide (MR)",
    mechanism: "Estrutura id\u00eantica ao cortisol end\u00f3geno. Al\u00e9m de potente a\u00e7\u00e3o anti-inflamat\u00f3ria e imunossupressora gen\u00f4mica, possui reten\u00e7\u00e3o fisiol\u00f3gica de s\u00f3dio e \u00e1gua mediada por receptores mineralocorticoides, restaurando a reatividade vascular \u00e0s catecolaminas em choque s\u00e9ptico refrat\u00e1rio."
  },
  prednisona: {
    pharmacologicalClass: "Glicocorticoide sint\u00e9tico de a\u00e7\u00e3o intermedi\u00e1ria pr\u00f3-f\u00e1rmaco",
    molecularTarget: "Receptor de Glicocorticoide (ap\u00f3s convers\u00e3o hep\u00e1tica em prednisolona)",
    mechanism: "Biotransformada no f\u00edgado pela 11-beta-hidroxiesteroide desidrogenase tipo 1 na forma ativa prednisolona, inibindo a s\u00edntese de mediadores inflamat\u00f3rios, a migra\u00e7\u00e3o neutrof\u00edlica e a imunidade celular com pot\u00eancia 4 vezes superior ao cortisol."
  },
  prednisolona: {
    pharmacologicalClass: "Glicocorticoide ativo de a\u00e7\u00e3o intermedi\u00e1ria",
    molecularTarget: "Receptor nuclear de glicocorticoides",
    mechanism: "Forma metabolicamente ativa de prednisona com alta biodisponibilidade. Modula a express\u00e3o g\u00eanica de enzimas inflamat\u00f3rias suprimindo a COX-2, \u00f3xido n\u00edtrico sintase induz\u00edvel (iNOS) e linfocinas T."
  },
  metilprednisolona: {
    pharmacologicalClass: "Glicocorticoide sint\u00e9tico de a\u00e7\u00e3o intermedi\u00e1ria para pulsoterapia",
    molecularTarget: "Receptor citoplasm\u00e1tico de glicocorticoides",
    mechanism: "Possui pot\u00eancia glicocorticoide 5 vezes superior \u00e0 hidrocortisona e menor efeito mineralocorticoide, permitindo administra\u00e7\u00e3o em megadoses intravenosas (pulsoterapia) para estabiliza\u00e7\u00e3o aguda de membranas lisossomais e supress\u00e3o profunda da imunidade em rejei\u00e7\u00e3o de enxertos e crises autoimunes."
  },
  succinilcolina: {
    pharmacologicalClass: "Bloqueador neuromuscular despolarizante de a\u00e7\u00e3o ultracurta",
    molecularTarget: "Receptores nicot\u00ednicos de acetilcolina (nAChR) da placa motora",
    mechanism: "Liga-se aos receptores nicot\u00ednicos na jun\u00e7\u00e3o neuromuscular e despolariza a membrana muscular de forma persistente como a acetilcolina, causando fascicula\u00e7\u00f5es transit\u00f3rias seguidas de bloqueio de despolariza\u00e7\u00e3o por dessensibiliza\u00e7\u00e3o dos canais de s\u00f3dio voltagem-dependentes. Degradada pela pseudocolinesterase plasm\u00e1tica."
  },
  rocuronio: {
    pharmacologicalClass: "Bloqueador neuromuscular adespolarizante aminodester\u00f3ide",
    molecularTarget: "Subunidades alfa do receptor nicot\u00ednico de acetilcolina (nAChR)",
    mechanism: "Antagonista competitivo puro dos receptores nicot\u00ednicos colin\u00e9rgicos na placa motora terminal muscular. Impede que a acetilcolina se ligue e despolarize o sarcolema, gerando paralisia fl\u00e1cida muscular esquel\u00e9tica completa e previs\u00edvel."
  },
  vecuronio: {
    pharmacologicalClass: "Bloqueador neuromuscular adespolarizante esteroidal de a\u00e7\u00e3o intermedi\u00e1ria",
    molecularTarget: "Receptor nicot\u00ednico muscular pr\u00e9 e p\u00f3s-juncional",
    mechanism: "Bloqueia competitivamente os receptores nicot\u00ednicos p\u00f3s-sin\u00e1pticos na jun\u00e7\u00e3o neuromuscular esquel\u00e9tica, desprovido de libera\u00e7\u00e3o de histamina ou efeito bloqueador vagal card\u00edaco, garantindo excelente estabilidade hemodin\u00e2mica."
  },
  atracurio: {
    pharmacologicalClass: "Bloqueador neuromuscular benzilisoquinol\u00ednico",
    molecularTarget: "Receptor nicot\u00ednico da placa motora",
    mechanism: "Inibe competitivamente a liga\u00e7\u00e3o da acetilcolina aos receptores nicot\u00ednicos motores. Apresenta degrada\u00e7\u00e3o espont\u00e2nea n\u00e3o enzim\u00e1tica por Elimina\u00e7\u00e3o de Hofmann em pH e temperatura fisiol\u00f3gicos e hidr\u00f3lise por esterases plasm\u00e1ticas inespec\u00edficas, n\u00e3o acumulando em fal\u00eancia hep\u00e1tica ou renal."
  },
  cisatracurio: {
    pharmacologicalClass: "Is\u00f4mero 1R-cis 1'R-cis do atrac\u00fario (alta pot\u00eancia)",
    molecularTarget: "Receptor nicot\u00ednico da placa neuromuscular",
    mechanism: "Antagonista neuromuscular n\u00e3o despolarizante 3 vezes mais potente que o atrac\u00fario. Sofre degrada\u00e7\u00e3o quase exclusiva por elimina\u00e7\u00e3o fisiol\u00f3gica de Hofmann em pH biol\u00f3gico corporal sem libera\u00e7\u00e3o cl\u00ednica de histamina, sendo a droga de escolha para bloqueio neuromuscular prolongado em UTIs."
  },
  neostigmina: {
    pharmacologicalClass: "Inibidor revers\u00edvel da acetilcolinesterase (Anticolinester\u00e1sico)",
    molecularTarget: "Enzima acetilcolinesterase (AChE) e butirilcolinesterase",
    mechanism: "Carbamilata o s\u00edtio ester\u00e1sico da enzima acetilcolinesterase retardando sua hidr\u00f3lise. Provoca ac\u00famulo transit\u00f3rio maci\u00e7o de acetilcolina end\u00f3gena na fenda sin\u00e1ptica da placa motora, deslocando os bloqueadores neuromusculares adespolarizantes e restaurando a contra\u00e7\u00e3o muscular normal."
  },
  desmopressina: {
    pharmacologicalClass: "An\u00e1logo sint\u00e9tico seletivo da vasopressina (DDAVP)",
    molecularTarget: "Receptores V2 de Vasopressina renais e endoteliais",
    mechanism: "Agonista seletivo com afinidade 4.000 vezes maior para receptores V2 do que para receptores vasoconstritores V1. Estimula a transloca\u00e7\u00e3o de ves\u00edculas contendo canais de aquaporina-2 na membrana apical dos ductos coletores renais (efeito antidiur\u00e9tico) e estimula a exocitose endotelial de Fator de von Willebrand (vWF), Fator VIII e t-PA a partir dos corp\u00fasculos de Weibel-Palade."
  },
  piridoxina: {
    pharmacologicalClass: "Vitamina hidrossol\u00favel B6 / Coenzima do metabolismo de amino\u00e1cidos",
    molecularTarget: "Enzimas piridoxal-5-fosfato dependentes (\u00e1cido glut\u00e2mico descarboxilase, transaminases)",
    mechanism: "Convertida intracelularmente em piridoxal-5-fosfato (PLP), cofator essencial para descarboxilases e transaminases de amino\u00e1cidos, incluindo a convers\u00e3o de glutamato no neurotransmissor inibit\u00f3rio GABA e s\u00edntese do heme. Atua como ant\u00eddoto biol\u00f3gico espec\u00edfico contra a toxicidade neurol\u00f3gica e convuls\u00f5es induzidas por isoniazida e hidrazinas."
  },
  mesna: {
    pharmacologicalClass: "Agente uroprotetor contra oxazafosforinas (Composto sulfidr\u00edlico)",
    molecularTarget: "Acrole\u00edna livre na bexiga urin\u00e1ria",
    mechanism: "Cont\u00e9m um grupo tiol (-SH) livre que, ap\u00f3s r\u00e1pida filtra\u00e7\u00e3o glomerular e concentra\u00e7\u00e3o na bexiga urin\u00e1ria, reage quimicamente por adi\u00e7\u00e3o de Michael com a acrole\u00edna (metab\u00f3lito urot\u00f3xico agressivo da ciclofosfamida e ifosfamida), formando um tio\u00e9ter est\u00e1vel e at\u00f3xico eliminado na urina, prevenindo cistite hemorr\u00e1gica qu\u00edmica."
  },
  bromoprida: {
    pharmacologicalClass: "Pr\u00f3-cin\u00e9tico benzam\u00eddico e antiem\u00e9tico",
    molecularTarget: "Receptores Dopamin\u00e9rgicos D2 e Serotonin\u00e9rgicos 5-HT4",
    mechanism: "Bloqueia os receptores dopamin\u00e9rgicos D2 centrais na zona de deflagra\u00e7\u00e3o quimiorreceptora e perif\u00e9ricos no trato gastrintestinal, sensibilizando os tecidos \u00e0 a\u00e7\u00e3o da acetilcolina e acelerando a motilidade e o esvaziamento g\u00e1strico."
  },
  rifampicina: {
    pharmacologicalClass: "Antimicrobiano rifamicina / Antituberculose",
    molecularTarget: "Subunidade Beta da RNA-polimerase bacteriana DNA-dependente",
    mechanism: "Forma um complexo est\u00e1vel com a subunidade beta da RNA-polimerase bacteriana DNA-dependente, bloqueando a inicia\u00e7\u00e3o da s\u00edntese da cadeia de RNA mensageiro bacteriano; potente indutor enzim\u00e1tico hep\u00e1tico do citocromo CYP3A4."
  },
  domperidona: {
    pharmacologicalClass: "Antiem\u00e9tico e gastrocin\u00e9tico antagonista D2 perif\u00e9rico",
    molecularTarget: "Receptores Dopamin\u00e9rgicos D2 perif\u00e9ricos e na \u00e1rea postrema",
    mechanism: "Antagonista espec\u00edfico dos receptores D2 de dopamina que atua predominantemente em receptores perif\u00e9ricos e na zona quimiorreceptora bulbar (localizada fora da barreira hematoencef\u00e1lica), aumentando o peristaltismo antral sem provocar efeitos extrapiramidais centrais significativos."
  },
  baclofeno: {
    pharmacologicalClass: "Relaxante muscular de a\u00e7\u00e3o central antiesp\u00e1stico",
    molecularTarget: "Receptor metabotr\u00f3pico GABA-B medular",
    mechanism: "Agonista espec\u00edfico dos receptores GABA-B pr\u00e9 e p\u00f3s-sin\u00e1pticos no corno dorsal da medula espinhal. Inibe o influxo de c\u00e1lcio pr\u00e9-sin\u00e1ptico e hiperpolariza neur\u00f4nios, bloqueando a libera\u00e7\u00e3o de neurotransmissores excitat\u00f3rios e suprimindo reflexos mono e polissin\u00e1pticos esp\u00e1sticos."
  },
  betametasona: {
    pharmacologicalClass: "Glicocorticoide sint\u00e9tico fluorado de longa dura\u00e7\u00e3o",
    molecularTarget: "Receptor citoplasm\u00e1tico de glicocorticoide",
    mechanism: "Glicocorticoide de alta pot\u00eancia anti-inflamat\u00f3ria e imunossupressora desprovido de a\u00e7\u00e3o retentora de s\u00f3dio mineralocorticoide. Atravessa a placenta estimulando a s\u00edntese e secre\u00e7\u00e3o de surfactante pulmonar alveolar pelos pneum\u00f3citos tipo II na preven\u00e7\u00e3o da s\u00edndrome do desconforto respirat\u00f3rio neonatal."
  },
  budesonida: {
    pharmacologicalClass: "Glicocorticoide anti-inflamat\u00f3rio t\u00f3pico de alta afinidade",
    molecularTarget: "Receptor de glicocorticoide mucoso",
    mechanism: "Apresenta elevada afinidade de liga\u00e7\u00e3o ao receptor de glicocorticoide tecidual e r\u00e1pida inativa\u00e7\u00e3o metab\u00f3lica hep\u00e1tica de primeira passagem (~90%), exercendo potente a\u00e7\u00e3o anti-inflamat\u00f3ria e antiedematosa local nas vias a\u00e9reas e mucosa intestinal com baixa exposi\u00e7\u00e3o sist\u00eamica."
  },
  gabapentina: {
    pharmacologicalClass: "Gabapentinoide antiepil\u00e9ptico e antineur\u00e1lgico",
    molecularTarget: "Subunidade auxiliar Alfa-2-Delta-1 dos canais de c\u00e1lcio voltagem-dependentes",
    mechanism: "Liga-se seletivamente \u00e0 subunidade auxiliar alfa-2-delta dos canais de c\u00e1lcio dependentes de voltagem pr\u00e9-sin\u00e1pticos neuronais no corno dorsal da medula e neoc\u00f3rtex, atenuando a entrada de c\u00e1lcio e diminuindo a libera\u00e7\u00e3o dependente de c\u00e1lcio de neurotransmissores excitat\u00f3rios como glutamato, subst\u00e2ncia P e noradrenalina."
  },
  pregabalina: {
    pharmacologicalClass: "Gabapentinoide de alta afinidade e biodisponibilidade linear",
    molecularTarget: "Subunidade Alfa-2-Delta dos canais de c\u00e1lcio neuronais",
    mechanism: "Modulador alost\u00e9rico dos canais de c\u00e1lcio tipo N e P/Q voltagem-dependentes via liga\u00e7\u00e3o de alta afinidade com a prote\u00edna alfa-2-delta pr\u00e9-sin\u00e1ptica, reduzindo a libera\u00e7\u00e3o excessiva de glutamato e monoaminas em redes neuronais hiperexcitadas associadas \u00e0 dor neurop\u00e1tica e ansiedade."
  },
  donepezila: {
    pharmacologicalClass: "Inibidor revers\u00edvel e n\u00e3o competitivo da acetilcolinesterase",
    molecularTarget: "Enzima Acetilcolinesterase (AChE) central",
    mechanism: "Inibe especificamente a hidr\u00f3lise da acetilcolina pela acetilcolinesterase nos neur\u00f4nios corticais e hipocampais, elevando a concentra\u00e7\u00e3o e o tempo de perman\u00eancia da acetilcolina nas sinapses colin\u00e9rgicas funcionais para melhora cognitiva em est\u00e1gios leve a moderado de dem\u00eancia de Alzheimer."
  },
  memantina: {
    pharmacologicalClass: "Antagonista n\u00e3o competitivo voltagem-dependente do receptor NMDA",
    molecularTarget: "Receptores Glutamat\u00e9rgicos NMDA cerebrais",
    mechanism: "Bloqueia de forma dependente de voltagem o poro i\u00f4nico aberto do receptor de glutamato NMDA com afinidade moderada e cin\u00e9tica r\u00e1pida de desassocia\u00e7\u00e3o, protegendo os neur\u00f4nios contra a toxicidade excitot\u00f3xica induzida por n\u00edveis tonicamente elevados de glutamato sem interferir na transmiss\u00e3o sin\u00e1ptica fisiol\u00f3gica normal."
  },
  fenofibrato: {
    pharmacologicalClass: "Fibrato agonista PPAR-alfa hipolipemiante",
    molecularTarget: "Receptor nuclear PPAR-alfa (Peroxisome Proliferator-Activated Receptor Alpha)",
    mechanism: "Ativa o receptor nuclear PPAR-alfa nos hepat\u00f3citos, aumentando a express\u00e3o da lipase lipoproteica e da apolipoprote\u00edna A-I e diminuindo a apolipoprote\u00edna C-III, promovendo catabolismo acentuado de part\u00edculas ricas em triglicer\u00eddeos (VLDL e quilom\u00edcrons) e elevando o HDL-colesterol."
  },
  saxagliptina: {
    pharmacologicalClass: "Inibidor seletivo e revers\u00edvel da enzima DPP-4",
    molecularTarget: "Enzima Dipeptidil Peptidase-4 (DPP-4)",
    mechanism: "Inibidor competitivo potente que desacelera a inativa\u00e7\u00e3o das incretinas end\u00f3genas GLP-1 e GIP, estimulando a s\u00edntese e a secre\u00e7\u00e3o de insulina pelas c\u00e9lulas beta pancre\u00e1ticas e inibindo a secre\u00e7\u00e3o de glucagon de modo estritamente glicose-dependente."
  },
  ivermectina: {
    pharmacologicalClass: "Antiparasit\u00e1rio lactona macroc\u00edclica (Avermectina)",
    molecularTarget: "Canais de Cloreto dependentes de glutamato em invertebrados",
    mechanism: "Liga-se com alta seletividade e afinidade aos canais de cloreto ativados por glutamato nas c\u00e9lulas nervosas e musculares de nemat\u00f3deos e artr\u00f3podes, provocando aumento irrevers\u00edvel da permeabilidade ao cloreto com hiperpolariza\u00e7\u00e3o da membrana, paralisia neuromuscular fl\u00e1cida e elimina\u00e7\u00e3o do parasita."
  },
  nitazoxanida: {
    pharmacologicalClass: "Antiprotozo\u00e1rio e anti-helm\u00edntico piruvato oxidorredutase",
    molecularTarget: "Enzima Piruvato-Ferredoxina Oxidorredutase (PFOR)",
    mechanism: "Interfere na rea\u00e7\u00e3o de transfer\u00eancia de el\u00e9trons dependente da enzima PFOR nos protozo\u00e1rios e bact\u00e9rias anaer\u00f3bias, bloqueando a respira\u00e7\u00e3o e o metabolismo energ\u00e9tico essencial do parasita, al\u00e9m de inibir a replica\u00e7\u00e3o de v\u00edrus ent\u00e9ricos in vitro."
  },
  eritropoietina: {
    pharmacologicalClass: "Agente estimulador da eritropoiese recombinante (rHuEPO)",
    molecularTarget: "Receptor de Eritropoietina (EpoR) na medula \u00f3ssea",
    mechanism: "Liga-se ao receptor EpoR em progenitores eritroides medulares (CFU-E), ativando a via de sinaliza\u00e7\u00e3o intracelular JAK2/STAT5 que suprime a apoptose celular, acelera a prolifera\u00e7\u00e3o e promove a diferencia\u00e7\u00e3o de reticul\u00f3citos maduros em hem\u00e1cias funcionais."
  },
  etomidato: {
    pharmacologicalClass: "Hipn\u00f3tico intravenoso derivado imidaz\u00f3lico",
    molecularTarget: "Subunidade Beta-3 do complexo receptor GABA-A",
    mechanism: "Potencializa as correntes inibit\u00f3rias mediadas por GABA no SNC atrav\u00e9s de a\u00e7\u00e3o alost\u00e9rica positiva no receptor GABA-A, induzindo hipnose r\u00e1pida sem bloqueio auton\u00f4mico ou efeito inotr\u00f3pico negativo mioc\u00e1rdico direto, mantendo estabilidade press\u00f3rica \u00fanica na indu\u00e7\u00e3o anest\u00e9sica em pacientes inst\u00e1veis."
  },
  tiopental: {
    pharmacologicalClass: "Barbit\u00farico tiobarbiturato anest\u00e9sico intravenoso de indu\u00e7\u00e3o r\u00e1pida",
    molecularTarget: "Receptor GABA-A e canais de c\u00e1lcio voltagem-dependentes",
    mechanism: "Prolonga a dura\u00e7\u00e3o da abertura do canal de cloreto acoplado ao receptor GABA-A diminuindo a excitabilidade neuronal. Induz depress\u00e3o profunda do metabolismo cerebral de oxig\u00eanio (CMRO2) e do fluxo sangu\u00edneo cerebral (FSC), exercendo efeito neuroprotetor e reduzindo agudamente a press\u00e3o intracraniana."
  },
  eszopiclona: {
    pharmacologicalClass: "Hipn\u00f3tico n\u00e3o benzodiazep\u00ednico (composto ciclopirrolona S-enanti\u00f4mero)",
    molecularTarget: "Complexo receptor GABA-A cerebral",
    mechanism: "Atua como modulador alost\u00e9rico positivo nos receptores GABA-A pr\u00f3ximos ao dom\u00ednio de liga\u00e7\u00e3o dos benzodiazep\u00ednicos, diminuindo o tempo de lat\u00eancia do in\u00edcio do sono e o n\u00famero de despertares noturnos sem afetar significativamente os est\u00e1gios de sono profundo REM e n\u00e3o REM."
  },
  zolpidem: {
    pharmacologicalClass: "Hipn\u00f3tico n\u00e3o benzodiazep\u00ednico seletivo (Imidazopiridina)",
    molecularTarget: "Subunidade Alfa-1 do receptor GABA-A (Receptor BZ1 / \u00d4mega-1)",
    mechanism: "Liga-se seletivamente com alta afinidade \u00e0 subunidade alfa-1 do receptor GABA-A no c\u00f3rtex sensoriomotor, preservando os canais alfa-2 e alfa-3. Produz r\u00e1pida indu\u00e7\u00e3o do sono fisiol\u00f3gico com m\u00ednimos efeitos residuais matinais, aus\u00eancia de relaxamento muscular significativo e preserva\u00e7\u00e3o do sono profundo."
  },
  difenidramina: {
    pharmacologicalClass: "Anti-histam\u00ednico de 1\u00aa gera\u00e7\u00e3o (Etanolamina) com a\u00e7\u00e3o anticolin\u00e9rgica",
    molecularTarget: "Receptores Histam\u00ednicos H1 perif\u00e9ricos e centrais + Receptores Colin\u00e9rgicos M1",
    mechanism: "Antagonista competitivo dos receptores perif\u00e9ricos e centrais H1 da histamina, bloqueando a vasodilata\u00e7\u00e3o, o aumento da permeabilidade capilar e o prurido. Atravessa a barreira hematoencef\u00e1lica onde seu potente efeito anticolin\u00e9rgico antimuscar\u00ednico promove acentuada seda\u00e7\u00e3o central e efeito antiem\u00e9tico."
  },
  dexclorfeniramina: {
    pharmacologicalClass: "Anti-histam\u00ednico de 1\u00aa gera\u00e7\u00e3o (Propilamina / Dextrois\u00f4mero ativo)",
    molecularTarget: "Receptores H1 de histamina",
    mechanism: "Antagonista competitivo do receptor histam\u00ednico H1 com potente atividade antial\u00e9rgica perif\u00e9rica, bloqueando a resposta al\u00e9rgica mediada pela histamina em mast\u00f3citos e bas\u00f3filos e exercendo leve seda\u00e7\u00e3o central comparada a outros compostos da primeira gera\u00e7\u00e3o."
  },
  dimenidrinato: {
    pharmacologicalClass: "Antiem\u00e9tico e antivertiginoso (Sal de difenidramina e 8-cloroteofilina)",
    molecularTarget: "Receptores Histam\u00ednicos H1 e Colin\u00e9rgicos muscar\u00ednicos centrais",
    mechanism: "Inibe a condu\u00e7\u00e3o vestibular e a estimula\u00e7\u00e3o labir\u00edntica no sistema vestibular do ouvido interno e no n\u00facleo do v\u00f4mito no tronco cerebral, inibindo impulsos de cinetose e vertigem perif\u00e9rica acompanhados de seda\u00e7\u00e3o central suave."
  },
  prometazina: {
    pharmacologicalClass: "Anti-histam\u00ednico fenotiaz\u00ednico de 1\u00aa gera\u00e7\u00e3o com forte a\u00e7\u00e3o sedativa",
    molecularTarget: "Receptores Histam\u00ednicos H1, Alfa-1 adren\u00e9rgicos e Muscar\u00ednicos centrais",
    mechanism: "Bloqueia competitivamente os receptores H1 centrais e perif\u00e9ricos da histamina com afinidade significativa por receptores alfa-adren\u00e9rgicos e muscar\u00ednicos. Exerce potente controle de rea\u00e7\u00f5es anafil\u00e1ticas e v\u00f4mitos refrat\u00e1rios, associado a forte efeito sedativo e ansiol\u00edtico no manejo de agita\u00e7\u00e3o e n\u00e1useas p\u00f3s-operat\u00f3rias."
  },
};
