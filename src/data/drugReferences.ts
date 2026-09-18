export interface DrugReferenceInfo {
  brandName: string; // Nome comercial de referência ou padrão hospitalar
  manufacturer: string; // Empresa detentora do registro / Laboratório farmacêutico
  referenceType: 'referencia' | 'generico_padrao'; // Medicamento de referência ou genérico padrão
  bulaSlug: string; // Slug para busca e link no bula.com.br
  anvisaSearchQuery: string; // Termo de busca no portal oficial da ANVISA
  anvisaRegNumber?: string; // Registro ANVISA padrão
}

export const DRUG_REFERENCES: Record<string, DrugReferenceInfo> = {
  meropenem: {
    brandName: 'Meronem®',
    manufacturer: 'Pfizer / AstraZeneca',
    referenceType: 'referencia',
    bulaSlug: 'meronem',
    anvisaSearchQuery: 'Meronem',
    anvisaRegNumber: '1.2110.0150'
  },
  ertapenem: {
    brandName: 'Invanz®',
    manufacturer: 'Merck Sharp & Dohme (MSD)',
    referenceType: 'referencia',
    bulaSlug: 'invanz',
    anvisaSearchQuery: 'Invanz',
    anvisaRegNumber: '1.0029.0175'
  },
  linezolida: {
    brandName: 'Zyvox®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'zyvox',
    anvisaSearchQuery: 'Zyvox',
    anvisaRegNumber: '1.0216.0121'
  },
  vancomicina: {
    brandName: 'Vancocina®',
    manufacturer: 'Eli Lilly / Laboratório Teuto',
    referenceType: 'referencia',
    bulaSlug: 'vancocina',
    anvisaSearchQuery: 'Vancocina',
    anvisaRegNumber: '1.0070.1118'
  },
  polimixina_b: {
    brandName: 'Polixin® (Genérico Teuto / Eurofarma)',
    manufacturer: 'Eurofarma / Laboratório Teuto',
    referenceType: 'generico_padrao',
    bulaSlug: 'polimixina-b',
    anvisaSearchQuery: 'Polimixina B',
    anvisaRegNumber: '1.0043.0766'
  },
  amicacina: {
    brandName: 'Novamin® (Genérico Teuto)',
    manufacturer: 'Bristol-Myers Squibb / Laboratório Teuto',
    referenceType: 'referencia',
    bulaSlug: 'novamin',
    anvisaSearchQuery: 'Novamin',
    anvisaRegNumber: '1.0370.0463'
  },
  fenitoina: {
    brandName: 'Hidantal® (Genérico Teuto)',
    manufacturer: 'Sanofi Medley / Laboratório Teuto',
    referenceType: 'referencia',
    bulaSlug: 'hidantal',
    anvisaSearchQuery: 'Hidantal',
    anvisaRegNumber: '1.1300.0270'
  },
  midazolam: {
    brandName: 'Dormonid®',
    manufacturer: 'Roche',
    referenceType: 'referencia',
    bulaSlug: 'dormonid',
    anvisaSearchQuery: 'Dormonid',
    anvisaRegNumber: '1.0100.0075'
  },
  diazepam: {
    brandName: 'Valium®',
    manufacturer: 'Roche',
    referenceType: 'referencia',
    bulaSlug: 'valium',
    anvisaSearchQuery: 'Valium',
    anvisaRegNumber: '1.0100.0080'
  },
  metoclopramida: {
    brandName: 'Plasil®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'plasil',
    anvisaSearchQuery: 'Plasil',
    anvisaRegNumber: '1.1300.0245'
  },
  bromoprida: {
    brandName: 'Digesan® (Genérico EMS / Teuto)',
    manufacturer: 'Sanofi / Aché / Laboratório Teuto',
    referenceType: 'referencia',
    bulaSlug: 'digesan',
    anvisaSearchQuery: 'Digesan',
    anvisaRegNumber: '1.0573.0305'
  },
  domperidona: {
    brandName: 'Motilium®',
    manufacturer: 'Janssen-Cilag Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'motilium',
    anvisaSearchQuery: 'Motilium',
    anvisaRegNumber: '1.1236.0022'
  },
  rifampicina: {
    brandName: 'Rifaldin®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'rifaldin',
    anvisaSearchQuery: 'Rifaldin',
    anvisaRegNumber: '1.1300.0210'
  },
  anfotericina_b: {
    brandName: 'Fungizon®',
    manufacturer: 'Bristol-Myers Squibb',
    referenceType: 'referencia',
    bulaSlug: 'fungizon',
    anvisaSearchQuery: 'Fungizon',
    anvisaRegNumber: '1.0180.0125'
  },
  anfotericina_desoxicolato: {
    brandName: 'Fungizon® (Anfotericina B Cristália)',
    manufacturer: 'Bristol-Myers Squibb / Cristália',
    referenceType: 'referencia',
    bulaSlug: 'fungizon',
    anvisaSearchQuery: 'Fungizon',
    anvisaRegNumber: '1.0298.0120'
  },
  anfotericina_complexo_lipidico: {
    brandName: 'Abelcet®',
    manufacturer: 'United Medical / Teva',
    referenceType: 'referencia',
    bulaSlug: 'abelcet',
    anvisaSearchQuery: 'Abelcet',
    anvisaRegNumber: '1.2568.0142'
  },
  fluconazol: {
    brandName: 'Zoltec®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'zoltec',
    anvisaSearchQuery: 'Zoltec',
    anvisaRegNumber: '1.0216.0068'
  },
  itraconazol: {
    brandName: 'Sporanox®',
    manufacturer: 'Janssen-Cilag Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'sporanox',
    anvisaSearchQuery: 'Sporanox',
    anvisaRegNumber: '1.1236.3312'
  },
  voriconazol: {
    brandName: 'Vfend®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'vfend',
    anvisaSearchQuery: 'Vfend',
    anvisaRegNumber: '1.0216.0128'
  },
  cetoconazol: {
    brandName: 'Nizoral®',
    manufacturer: 'Janssen-Cilag Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'nizoral',
    anvisaSearchQuery: 'Nizoral',
    anvisaRegNumber: '1.1236.3330'
  },
  micafungina: {
    brandName: 'Mycamine®',
    manufacturer: 'Astellas Farma Brasil',
    referenceType: 'referencia',
    bulaSlug: 'mycamine',
    anvisaSearchQuery: 'Mycamine',
    anvisaRegNumber: '1.7759.0003'
  },
  flucitosina: {
    brandName: 'Ancotil®',
    manufacturer: 'Meda Pharma / Valeant',
    referenceType: 'referencia',
    bulaSlug: 'ancotil',
    anvisaSearchQuery: 'Ancotil',
    anvisaRegNumber: '1.0573.0118'
  },
  gentamicina: {
    brandName: 'Garamicina®',
    manufacturer: 'Schering-Plough / Mantecorp',
    referenceType: 'referencia',
    bulaSlug: 'garamicina',
    anvisaSearchQuery: 'Garamicina',
    anvisaRegNumber: '1.0093.0033'
  },
  cefepima: {
    brandName: 'Maxcef®',
    manufacturer: 'Bristol-Myers Squibb',
    referenceType: 'referencia',
    bulaSlug: 'maxcef',
    anvisaSearchQuery: 'Maxcef',
    anvisaRegNumber: '1.0180.0381'
  },
  ceftriaxona: {
    brandName: 'Rocefin®',
    manufacturer: 'Roche',
    referenceType: 'referencia',
    bulaSlug: 'rocefin',
    anvisaSearchQuery: 'Rocefin',
    anvisaRegNumber: '1.0100.0078'
  },
  cefazolina: {
    brandName: 'Kefazol®',
    manufacturer: 'ABL (Antibióticos do Brasil)',
    referenceType: 'referencia',
    bulaSlug: 'kefazol',
    anvisaSearchQuery: 'Kefazol',
    anvisaRegNumber: '1.0430.0004'
  },
  ceftazidima_avibactam: {
    brandName: 'Zavicefta®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'zavicefta',
    anvisaSearchQuery: 'Zavicefta',
    anvisaRegNumber: '1.2110.0468'
  },
  aztreonam: {
    brandName: 'Azactam®',
    manufacturer: 'Bristol-Myers Squibb',
    referenceType: 'referencia',
    bulaSlug: 'azactam',
    anvisaSearchQuery: 'Azactam',
    anvisaRegNumber: '1.0180.0152'
  },
  ceftazidima: {
    brandName: 'Fortaz®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'fortaz',
    anvisaSearchQuery: 'Fortaz',
    anvisaRegNumber: '1.0107.0116'
  },
  ampicilina_sulbactam: {
    brandName: 'Unasyn®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'unasyn',
    anvisaSearchQuery: 'Unasyn',
    anvisaRegNumber: '1.0216.0024'
  },
  amoxicilina_clavulanato: {
    brandName: 'Clavulin®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'clavulin',
    anvisaSearchQuery: 'Clavulin',
    anvisaRegNumber: '1.0107.0076'
  },
  piperacilina_tazobactam: {
    brandName: 'Tazocin®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'tazocin',
    anvisaSearchQuery: 'Tazocin',
    anvisaRegNumber: '1.0216.0142'
  },
  levofloxacino: {
    brandName: 'Tavanic® / Levaquin®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'tavanic',
    anvisaSearchQuery: 'Tavanic',
    anvisaRegNumber: '1.1300.0264'
  },
  ciprofloxacino: {
    brandName: 'Cipro®',
    manufacturer: 'Bayer',
    referenceType: 'referencia',
    bulaSlug: 'cipro',
    anvisaSearchQuery: 'Cipro',
    anvisaRegNumber: '1.7056.0028'
  },
  smx_tmp: {
    brandName: 'Bactrim®',
    manufacturer: 'Roche',
    referenceType: 'referencia',
    bulaSlug: 'bactrim',
    anvisaSearchQuery: 'Bactrim',
    anvisaRegNumber: '1.0100.0054'
  },
  metronidazol: {
    brandName: 'Flagyl®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'flagyl',
    anvisaSearchQuery: 'Flagyl',
    anvisaRegNumber: '1.1300.0255'
  },
  claritromicina: {
    brandName: 'Klaricid®',
    manufacturer: 'Abbott Laboratórios',
    referenceType: 'referencia',
    bulaSlug: 'klaricid',
    anvisaSearchQuery: 'Klaricid',
    anvisaRegNumber: '1.0553.0201'
  },
  azitromicina: {
    brandName: 'Zitromax®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'zitromax',
    anvisaSearchQuery: 'Zitromax',
    anvisaRegNumber: '1.0216.0045'
  },
  daptomicina: {
    brandName: 'Cubicin®',
    manufacturer: 'Merck Sharp & Dohme (MSD)',
    referenceType: 'referencia',
    bulaSlug: 'cubicin',
    anvisaSearchQuery: 'Cubicin',
    anvisaRegNumber: '1.0029.0189'
  },
  tigeciclina: {
    brandName: 'Tygacil®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'tygacil',
    anvisaSearchQuery: 'Tygacil',
    anvisaRegNumber: '1.0216.0177'
  },
  isoniazida: {
    brandName: 'Isoniazida (Padrão Oficial SUS)',
    manufacturer: 'Fiocruz / Farmanguinhos',
    referenceType: 'generico_padrao',
    bulaSlug: 'isoniazida',
    anvisaSearchQuery: 'Isoniazida',
    anvisaRegNumber: '1.1063.0031'
  },
  pirazinamida: {
    brandName: 'Pirazinamida (Padrão Oficial SUS)',
    manufacturer: 'Fiocruz / Farmanguinhos',
    referenceType: 'generico_padrao',
    bulaSlug: 'pirazinamida',
    anvisaSearchQuery: 'Pirazinamida',
    anvisaRegNumber: '1.1063.0034'
  },
  etambutol: {
    brandName: 'Etambutol (Padrão Oficial SUS)',
    manufacturer: 'Fiocruz / Farmanguinhos',
    referenceType: 'generico_padrao',
    bulaSlug: 'etambutol',
    anvisaSearchQuery: 'Etambutol',
    anvisaRegNumber: '1.1063.0032'
  },
  carbamazepina: {
    brandName: 'Tegretol®',
    manufacturer: 'Novartis Biociências',
    referenceType: 'referencia',
    bulaSlug: 'tegretol',
    anvisaSearchQuery: 'Tegretol',
    anvisaRegNumber: '1.0068.0084'
  },
  acido_valproico: {
    brandName: 'Depakene® / Depakote®',
    manufacturer: 'Abbott Laboratórios',
    referenceType: 'referencia',
    bulaSlug: 'depakene',
    anvisaSearchQuery: 'Depakene',
    anvisaRegNumber: '1.0553.0007'
  },
  fenobarbital: {
    brandName: 'Gardenal®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'gardenal',
    anvisaSearchQuery: 'Gardenal',
    anvisaRegNumber: '1.1300.0260'
  },
  levetiracetam: {
    brandName: 'Keppra®',
    manufacturer: 'UCB Biopharma',
    referenceType: 'referencia',
    bulaSlug: 'keppra',
    anvisaSearchQuery: 'Keppra',
    anvisaRegNumber: '1.2310.0051'
  },
  propofol: {
    brandName: 'Diprivan®',
    manufacturer: 'Aspen Pharma',
    referenceType: 'referencia',
    bulaSlug: 'diprivan',
    anvisaSearchQuery: 'Diprivan',
    anvisaRegNumber: '1.2904.0006'
  },
  cetamina: {
    brandName: 'Ketamin®',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos',
    referenceType: 'referencia',
    bulaSlug: 'ketamin',
    anvisaSearchQuery: 'Ketamin',
    anvisaRegNumber: '1.0298.0082'
  },
  dexmedetomidina: {
    brandName: 'Precedex®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'precedex',
    anvisaSearchQuery: 'Precedex',
    anvisaRegNumber: '1.0216.0125'
  },
  morfina: {
    brandName: 'Dimorf®',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos',
    referenceType: 'referencia',
    bulaSlug: 'dimorf',
    anvisaSearchQuery: 'Dimorf',
    anvisaRegNumber: '1.0298.0090'
  },
  fentanil: {
    brandName: 'Fentanest®',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos',
    referenceType: 'referencia',
    bulaSlug: 'fentanest',
    anvisaSearchQuery: 'Fentanest',
    anvisaRegNumber: '1.0298.0093'
  },
  metadona: {
    brandName: 'Metadon®',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos',
    referenceType: 'referencia',
    bulaSlug: 'metadon',
    anvisaSearchQuery: 'Metadon',
    anvisaRegNumber: '1.0298.0123'
  },
  hidralazina: {
    brandName: 'Apresolina®',
    manufacturer: 'Novartis Biociências',
    referenceType: 'referencia',
    bulaSlug: 'apresolina',
    anvisaSearchQuery: 'Apresolina',
    anvisaRegNumber: '1.0068.0016'
  },
  clonidina: {
    brandName: 'Atensina®',
    manufacturer: 'Boehringer Ingelheim',
    referenceType: 'referencia',
    bulaSlug: 'atensina',
    anvisaSearchQuery: 'Atensina',
    anvisaRegNumber: '1.0367.0078'
  },
  quetiapina: {
    brandName: 'Seroquel®',
    manufacturer: 'AstraZeneca',
    referenceType: 'referencia',
    bulaSlug: 'seroquel',
    anvisaSearchQuery: 'Seroquel',
    anvisaRegNumber: '1.1618.0095'
  },
  haloperidol: {
    brandName: 'Haldol®',
    manufacturer: 'Janssen-Cilag Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'haldol',
    anvisaSearchQuery: 'Haldol',
    anvisaRegNumber: '1.1236.3347'
  },
  ondansetrona: {
    brandName: 'Vonau Flash® / Zofran®',
    manufacturer: 'Biolab Sanus / GlaxoSmithKline',
    referenceType: 'referencia',
    bulaSlug: 'zofran',
    anvisaSearchQuery: 'Zofran',
    anvisaRegNumber: '1.0107.0177'
  },
  baclofeno: {
    brandName: 'Lioresal®',
    manufacturer: 'Novartis Biociências',
    referenceType: 'referencia',
    bulaSlug: 'lioresal',
    anvisaSearchQuery: 'Lioresal',
    anvisaRegNumber: '1.0068.0039'
  },
  furosemida: {
    brandName: 'Lasix®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'lasix',
    anvisaSearchQuery: 'Lasix',
    anvisaRegNumber: '1.1300.0076'
  },
  dolutegravir: {
    brandName: 'Tivicay®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'tivicay',
    anvisaSearchQuery: 'Tivicay',
    anvisaRegNumber: '1.0107.0315'
  },
  abacavir: {
    brandName: 'Ziagenavir®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'ziagenavir',
    anvisaSearchQuery: 'Ziagenavir',
    anvisaRegNumber: '1.0107.0229'
  },
  zidovudina: {
    brandName: 'Retrovir®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'retrovir',
    anvisaSearchQuery: 'Retrovir',
    anvisaRegNumber: '1.0107.0108'
  },
  efavirenz: {
    brandName: 'Stocrin®',
    manufacturer: 'Merck Sharp & Dohme (MSD)',
    referenceType: 'referencia',
    bulaSlug: 'stocrin',
    anvisaSearchQuery: 'Stocrin',
    anvisaRegNumber: '1.0029.0019'
  },
  nevirapina: {
    brandName: 'Viramune®',
    manufacturer: 'Boehringer Ingelheim',
    referenceType: 'referencia',
    bulaSlug: 'viramune',
    anvisaSearchQuery: 'Viramune',
    anvisaRegNumber: '1.0367.0112'
  },
  atazanavir: {
    brandName: 'Reyataz®',
    manufacturer: 'Bristol-Myers Squibb',
    referenceType: 'referencia',
    bulaSlug: 'reyataz',
    anvisaSearchQuery: 'Reyataz',
    anvisaRegNumber: '1.0180.0388'
  },
  darunavir: {
    brandName: 'Prezista®',
    manufacturer: 'Janssen-Cilag Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'prezista',
    anvisaSearchQuery: 'Prezista',
    anvisaRegNumber: '1.1236.3382'
  },
  ritonavir: {
    brandName: 'Norvir®',
    manufacturer: 'AbbVie Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'norvir',
    anvisaSearchQuery: 'Norvir',
    anvisaRegNumber: '1.9860.0006'
  },
  lopinavir_ritonavir: {
    brandName: 'Kaletra®',
    manufacturer: 'AbbVie Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'kaletra',
    anvisaSearchQuery: 'Kaletra',
    anvisaRegNumber: '1.9860.0007'
  },
  aciclovir: {
    brandName: 'Zovirax®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'zovirax',
    anvisaSearchQuery: 'Zovirax',
    anvisaRegNumber: '1.0107.0101'
  },
  tenofovir: {
    brandName: 'Viread®',
    manufacturer: 'Gilead Sciences Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'viread',
    anvisaSearchQuery: 'Viread',
    anvisaRegNumber: '1.0929.0003'
  },
  lamivudina: {
    brandName: 'Epivir®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'epivir',
    anvisaSearchQuery: 'Epivir',
    anvisaRegNumber: '1.0107.0142'
  },
  noradrenalina: {
    brandName: 'Levophed® / Hyponor®',
    manufacturer: 'Pfizer / Hypofarma',
    referenceType: 'referencia',
    bulaSlug: 'levophed',
    anvisaSearchQuery: 'Levophed',
    anvisaRegNumber: '1.0216.0089'
  },
  amiodarona: {
    brandName: 'Ancoron®',
    manufacturer: 'Libbs Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'ancoron',
    anvisaSearchQuery: 'Ancoron',
    anvisaRegNumber: '1.0033.0039'
  },
  nitroprussiato: {
    brandName: 'Nipride®',
    manufacturer: 'Biolab Sanus Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'nipride',
    anvisaSearchQuery: 'Nipride',
    anvisaRegNumber: '1.0974.0116'
  },
  nitroglicerina: {
    brandName: 'Tridil®',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos',
    referenceType: 'referencia',
    bulaSlug: 'tridil',
    anvisaSearchQuery: 'Tridil',
    anvisaRegNumber: '1.0298.0080'
  },
  enoxaparina: {
    brandName: 'Clexane®',
    manufacturer: 'Sanofi Medley',
    referenceType: 'referencia',
    bulaSlug: 'clexane',
    anvisaSearchQuery: 'Clexane',
    anvisaRegNumber: '1.1300.0276'
  },
  rivaroxabana: {
    brandName: 'Xarelto®',
    manufacturer: 'Bayer',
    referenceType: 'referencia',
    bulaSlug: 'xarelto',
    anvisaSearchQuery: 'Xarelto',
    anvisaRegNumber: '1.7056.0097'
  },
  varfarina: {
    brandName: 'Marevan®',
    manufacturer: 'Farmoquímica (FQM)',
    referenceType: 'referencia',
    bulaSlug: 'marevan',
    anvisaSearchQuery: 'Marevan',
    anvisaRegNumber: '1.0390.0150'
  },
  omeprazol: {
    brandName: 'Losec Mups® (Genérico Teuto)',
    manufacturer: 'AstraZeneca / Laboratório Teuto',
    referenceType: 'referencia',
    bulaSlug: 'losec',
    anvisaSearchQuery: 'Losec',
    anvisaRegNumber: '1.1618.0019'
  },
  pantoprazol: {
    brandName: 'Pantozol®',
    manufacturer: 'Takeda Pharma',
    referenceType: 'referencia',
    bulaSlug: 'pantozol',
    anvisaSearchQuery: 'Pantozol',
    anvisaRegNumber: '1.0639.0182'
  },
  prednisona: {
    brandName: 'Meticorten®',
    manufacturer: 'Schering-Plough / Mantecorp',
    referenceType: 'referencia',
    bulaSlug: 'meticorten',
    anvisaSearchQuery: 'Meticorten',
    anvisaRegNumber: '1.0093.0039'
  },
  prednisolona: {
    brandName: 'Prelone®',
    manufacturer: 'Aché Laboratórios',
    referenceType: 'referencia',
    bulaSlug: 'prelone',
    anvisaSearchQuery: 'Prelone',
    anvisaRegNumber: '1.0573.0232'
  },
  metilprednisolona: {
    brandName: 'Solu-Medrol®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'solu-medrol',
    anvisaSearchQuery: 'Solu-Medrol',
    anvisaRegNumber: '1.0216.0094'
  },
  dexametasona: {
    brandName: 'Decadron®',
    manufacturer: 'Aché Laboratórios',
    referenceType: 'referencia',
    bulaSlug: 'decadron',
    anvisaSearchQuery: 'Decadron',
    anvisaRegNumber: '1.0573.0002'
  },
  hidrocortisona: {
    brandName: 'Solu-Cortef® / Flebodil®',
    manufacturer: 'Pfizer / Teuto',
    referenceType: 'referencia',
    bulaSlug: 'solu-cortef',
    anvisaSearchQuery: 'Solu-Cortef',
    anvisaRegNumber: '1.0216.0095'
  },
  betametasona: {
    brandName: 'Celestone®',
    manufacturer: 'Schering-Plough / Mantecorp',
    referenceType: 'referencia',
    bulaSlug: 'celestone',
    anvisaSearchQuery: 'Celestone',
    anvisaRegNumber: '1.0093.0045'
  },
  budesonida: {
    brandName: 'Pulmicort®',
    manufacturer: 'AstraZeneca',
    referenceType: 'referencia',
    bulaSlug: 'pulmicort',
    anvisaSearchQuery: 'Pulmicort',
    anvisaRegNumber: '1.1618.0069'
  },
  gabapentina: {
    brandName: 'Neurontin®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'neurontin',
    anvisaSearchQuery: 'Neurontin',
    anvisaRegNumber: '1.0216.0062'
  },
  pregabalina: {
    brandName: 'Lyrica®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'lyrica',
    anvisaSearchQuery: 'Lyrica',
    anvisaRegNumber: '1.0216.0149'
  },
  tramadol: {
    brandName: 'Tramal®',
    manufacturer: 'Grünenthal do Brasil',
    referenceType: 'referencia',
    bulaSlug: 'tramal',
    anvisaSearchQuery: 'Tramal',
    anvisaRegNumber: '1.8610.0002'
  },
  fluoxetina: {
    brandName: 'Prozac®',
    manufacturer: 'Eli Lilly do Brasil',
    referenceType: 'referencia',
    bulaSlug: 'prozac',
    anvisaSearchQuery: 'Prozac',
    anvisaRegNumber: '1.1260.0007'
  },
  sertralina: {
    brandName: 'Zoloft®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'zoloft',
    anvisaSearchQuery: 'Zoloft',
    anvisaRegNumber: '1.0216.0084'
  },
  escitalopram: {
    brandName: 'Lexapro®',
    manufacturer: 'Lundbeck Brasil',
    referenceType: 'referencia',
    bulaSlug: 'lexapro',
    anvisaSearchQuery: 'Lexapro',
    anvisaRegNumber: '1.0475.0044'
  },
  citalopram: {
    brandName: 'Cipramil®',
    manufacturer: 'Lundbeck Brasil',
    referenceType: 'referencia',
    bulaSlug: 'cipramil',
    anvisaSearchQuery: 'Cipramil',
    anvisaRegNumber: '1.0475.0039'
  },
  paroxetina: {
    brandName: 'Aropax®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'aropax',
    anvisaSearchQuery: 'Aropax',
    anvisaRegNumber: '1.0107.0145'
  },
  duloxetina: {
    brandName: 'Cymbalta®',
    manufacturer: 'Eli Lilly do Brasil',
    referenceType: 'referencia',
    bulaSlug: 'cymbalta',
    anvisaSearchQuery: 'Cymbalta',
    anvisaRegNumber: '1.1260.0163'
  },
  venlafaxina: {
    brandName: 'Efexor XR®',
    manufacturer: 'Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'efexor-xr',
    anvisaSearchQuery: 'Efexor',
    anvisaRegNumber: '1.0216.0102'
  },
  amitriptilina: {
    brandName: 'Tryptanol®',
    manufacturer: 'Merck Sharp & Dohme (MSD)',
    referenceType: 'referencia',
    bulaSlug: 'tryptanol',
    anvisaSearchQuery: 'Tryptanol',
    anvisaRegNumber: '1.0029.0016'
  },
  bupropiona: {
    brandName: 'Wellbutrin XL®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'wellbutrin',
    anvisaSearchQuery: 'Wellbutrin',
    anvisaRegNumber: '1.0107.0250'
  },
  mirtazapina: {
    brandName: 'Remeron SolTab®',
    manufacturer: 'Organon / MSD',
    referenceType: 'referencia',
    bulaSlug: 'remeron-soltab',
    anvisaSearchQuery: 'Remeron',
    anvisaRegNumber: '1.0171.0084'
  },
  clonazepam: {
    brandName: 'Rivotril®',
    manufacturer: 'Roche',
    referenceType: 'referencia',
    bulaSlug: 'rivotril',
    anvisaSearchQuery: 'Rivotril',
    anvisaRegNumber: '1.0100.0072'
  },
  lamotrigina: {
    brandName: 'Lamictal®',
    manufacturer: 'GlaxoSmithKline (GSK)',
    referenceType: 'referencia',
    bulaSlug: 'lamictal',
    anvisaSearchQuery: 'Lamictal',
    anvisaRegNumber: '1.0107.0141'
  },
  risperidona: {
    brandName: 'Risperdal®',
    manufacturer: 'Janssen-Cilag Farmacêutica',
    referenceType: 'referencia',
    bulaSlug: 'risperdal',
    anvisaSearchQuery: 'Risperdal',
    anvisaRegNumber: '1.1236.3323'
  },
  olanzapina: {
    brandName: 'Zyprexa®',
    manufacturer: 'Eli Lilly do Brasil',
    referenceType: 'referencia',
    bulaSlug: 'zyprexa',
    anvisaSearchQuery: 'Zyprexa',
    anvisaRegNumber: '1.1260.0074'
  },
  donepezila: {
    brandName: 'Erandis® / Eranz®',
    manufacturer: 'Wyeth / Pfizer',
    referenceType: 'referencia',
    bulaSlug: 'eranz',
    anvisaSearchQuery: 'Eranz',
    anvisaRegNumber: '1.2110.0088'
  },
  memantina: {
    brandName: 'Ebix®',
    manufacturer: 'Lundbeck Brasil',
    referenceType: 'referencia',
    bulaSlug: 'ebix',
    anvisaSearchQuery: 'Ebix',
    anvisaRegNumber: '1.0475.0049'
  }
};
