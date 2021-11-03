export interface Ciudades {
    value: string;
    text: string;
}

export interface TiposDocumento {
    value: string;
    text: string;
}

export interface Sexos {
    value : string;
    text : string;
    selector: string;
}

export interface TamañoEmpresas {
    value: string;
    text: string;
}

export interface Categorias {
    value: string;
    text: string;
}

export interface FechaMes {
    value: string;
    text: string;
}

export interface Experiencia {
    value : number;
    text : string;
    selector : string;
    altertext?: string;
}

export interface PeriodoPublicacion {
    value : string;
    text : string;
    selector : string;
}

export interface TipoPostulacion {
    value : string;
    text : string;
}

export interface Publicacion {
    value : number;
    text : string;
}

export interface Remoto {
    value : string;
    text : string;
}

export interface Idioma{
    value: string;
    text: string;
}

export interface NivelIdioma{
    value: string;
    text: string;
}

export interface NivelGeneral{
    value: string;
    text: string;
}

export interface MesPeriodo{
    value: string;
    text: string;
}

export interface NivelEstudio {
    value: string;
    text: string;
}

export interface EstadoEstudio {
    value: string;
    text: string;
}

export const Publicacion: Publicacion [] = [
    { value: 7, text: 'Semanal'},
    { value: 15, text: 'Quincenal'},
    { value: 30, text: 'Mensual'}
]

export const Remoto: Remoto [] = [
    { value: 'Remoto', text: 'Remoto'},
    { value: 'Presencial', text: 'Presencial'},
    { value: 'Semi-Presencial', text: 'Semi-Presencial'}
]



export const TipoPostulacion: TipoPostulacion[] = [
    { value: 'Part-Time', text: 'Part-Time' },
    { value: 'Full-Time', text: 'Full-Time' } 
]




export const Ciudades: Ciudades[] = [
    { value: 'Bagua Grande', text: 'Bagua Grande' },
    { value: 'Chachapoyas', text: 'Chachapoyas' },
    { value: 'Bagua', text: 'Bagua' },
    { value: 'Chimbote', text: 'Chimbote' },
    { value: 'Huaraz', text: 'Huaraz' },
    { value: 'Huarmey', text: 'Huarmey' },
    { value: 'Casma', text: 'Casma' },
    { value: 'Caraz', text: 'Caraz' },
    { value: 'Abancay', text: 'Abancay' },
    { value: 'Andahuaylas', text: 'Andahuaylas' },
    { value: 'Arequipa', text: 'Arequipa' },
    { value: 'Camaná', text: 'Camaná' },
    { value: 'Mollendo', text: 'Mollendo' },
    { value: 'Mejía', text: 'Mejía' },
    { value: 'Majes', text: 'Majes' },
    { value: 'Ayacucho', text: 'Ayacucho' },
    { value: 'Huanta', text: 'Huanta' },
    { value: 'Puquio', text: 'Puquio' },
    { value: 'Cora Cora', text: 'Cora Cora' },
    { value: 'San Miguel', text: 'San Miguel' },
    { value: 'Vilcashuamán', text: 'Vilcashuamán' },
    { value: 'Cangallo', text: 'Cangallo' },
    { value: 'Cajamarca', text: 'Cajamarca' },
    { value: 'Jaén', text: 'Jaén' },
    { value: 'Cutervo', text: 'Cutervo' },
    { value: 'Chota', text: 'Chota' },
    { value: 'Celendín', text: 'Celendín' },
    { value: 'Cajabamba', text: 'Cajabamba' },
    { value: 'Bambamarca', text: 'Bambamarca' },
    { value: 'San Ignacio', text: 'San Ignacio' },
    { value: 'Callao', text: 'Callao' },
    { value: 'Cusco', text: 'Cusco' },
    { value: 'Sicuani', text: 'Sicuani' },
    { value: 'Quillabamba', text: 'Quillabamba' },
    { value: 'Espinar', text: 'Espinar' },
    { value: 'Huancavelica', text: 'Huancavelica' },
    { value: 'Huánuco', text: 'Huánuco' },
    { value: 'Tingo María', text: 'Tingo María' },
    { value: 'Ica', text: 'Ica' },
    { value: 'Chincha Alta', text: 'Chincha Alta' },
    { value: 'Pisco', text: 'Pisco' },
    { value: 'Nasca', text: 'Nasca' },
    { value: 'Huancayo', text: 'Huancayo' },
    { value: 'Tarma', text: 'Tarma' },
    { value: 'Jauja', text: 'Jauja' },
    { value: 'La Oroya', text: 'La Oroya' },
    { value: 'Trujillo', text: 'Trujillo' },
    { value: 'Chepén', text: 'Chepén' },
    { value: 'Pacasmayo', text: 'Pacasmayo' },
    { value: 'Guadalupe', text: 'Guadalupe' },
    { value: 'Casa Grande', text: 'Casa Grande' },
    { value: 'Chiclayo', text: 'Chiclayo' },
    { value: 'Lambayeque', text: 'Lambayeque' },
    { value: 'Ferreñafe', text: 'Ferreñafe' },
    { value: 'Monsefú', text: 'Monsefú' },
    { value: 'Lima', text: 'Lima' },
    { value: 'Huacho', text: 'Huacho' },
    { value: 'Huaral', text: 'Huaral' },
    { value: 'Cañete', text: 'Cañete' },
    { value: 'Barranca', text: 'Barranca' },
    { value: 'Chancay', text: 'Chancay' },
    { value: 'Paramonga', text: 'Paramonga' },
    { value: 'Iquitos', text: 'Iquitos' },
    { value: 'Yurimaguas', text: 'Yurimaguas' },
    { value: 'Requena', text: 'Requena' },
    { value: 'Puerto Maldonado', text: 'Puerto Maldonado' },
    { value: 'Moquegua', text: 'Moquegua' },
    { value: 'Ilo', text: 'Ilo' },
    { value: 'Cerro de Pasco', text: 'Cerro de Pasco' },
    { value: 'Oxapampa', text: 'Oxapampa' },
    { value: 'Piura', text: 'Piura' },
    { value: 'Sullana', text: 'Sullana' },
    { value: 'Paita', text: 'Paita' },
    { value: 'Talara', text: 'Talara' },
    { value: 'Catacaos', text: 'Catacaos' },
    { value: 'Chulucanas', text: 'Chulucanas' },
    { value: 'Sechura', text: 'Sechura' },
    { value: 'Juliaca', text: 'Juliaca' },
    { value: 'Puno', text: 'Puno' },
    { value: 'Azángaro', text: 'Azángaro' },
    { value: 'Ilave', text: 'Ilave' },
    { value: 'Tarapoto', text: 'Tarapoto' },
    { value: 'Moyobamba', text: 'Moyobamba' },
    { value: 'Juanjuí', text: 'Juanjuí' },
    { value: 'Rioja', text: 'Rioja' },
    { value: 'Tacna', text: 'Tacna' },
    { value: 'Tumbes', text: 'Tumbes' },
    { value: 'Zarumilla', text: 'Zarumilla' },
    { value: 'Pucallpa', text: 'Pucallpa' }
]

export const TiposDocumento: TiposDocumento[] = [
    { value: 'DNI', text: 'DNI - Documento Nacional de Identidad' },
    { value: 'CE', text: 'CE - Carné de Extranjería' },
    { value: 'PAS', text: 'PAS - Pasaporte' }
]

export const Sexos: Sexos[] = [
    { value: 'Femenino', text: 'Femenino', selector: 'femenin' },
    { value: 'Masculino', text: 'Masculino', selector: 'mascul' },
    { value: 'Otros', text: 'Otros', selector: 'otr'}
  //no contemplado  { value: 'Otros', text: 'Otros' }
]

export const TamañoEmpresas: TamañoEmpresas[] = [
    { value: '1 a 5 Empleados', text: '1 a 5 Empleados' },
    { value: '6 a 20 Empleados', text: '6 a 20 Empleados' },
    { value: '21 a 100 Empleados', text: '21 a 100 Empleados'},
    { value: '101 a mas Empleados', text: '101 a mas Empleados'}
]

export const Categorias: Categorias[] = [
    { value: 'Administración de Empresas', text: 'Administración de Empresas' },
    { value: 'Call Center', text: 'Call Center' },
    { value: 'Comercio Exterior', text: 'Comercio Exterior' },
    { value: 'Compras', text: 'Compras' },
    { value: 'Consultoría', text: 'Consultoría' },
    { value: 'Contabilidad', text: 'Contabilidad' },
    { value: 'Auditoría', text: 'Auditoría' },
    { value: 'Finanzas', text: 'Finanzas' },
    { value: 'Gerencia de Empresas', text: 'Gerencia de Empresas' },
    { value: 'Informática', text: 'Informática' },
    { value: 'Logística', text: 'Logística' },
    { value: 'Marketing', text: 'Marketing' },
    { value: 'Recursos Humanos', text: 'Recursos Humanos' },
    { value: 'Relaciones Públicas', text: 'Relaciones Públicas' },
    { value: 'Secretaría', text: 'Secretaría' },
    { value: 'Atención al Cliente', text: 'Atención al Cliente' },
    { value: 'Seguridad', text: 'Seguridad' },
    { value: 'Ventas', text: 'Ventas' },
    { value: 'Belleza y Estética', text: 'Belleza y Estética' },
    { value: 'Diseño de Interiores', text: 'Diseño de Interiores' },
    { value: 'Diseño Gráfico', text: 'Diseño Gráfico' },
    { value: 'Economía', text: 'Economía' },
    { value: 'Educación', text: 'Educación' },
    { value: 'Fotografía', text: 'Fotografía' },
    { value: 'Gerencia de Proyectos', text: 'Gerencia de Proyectos' },
    { value: 'Jurídica y Legales', text: 'Jurídica y Legales' },
    { value: 'Salud y Nutrición', text: 'Salud y Nutrición' },
    { value: 'Servicio Social', text: 'Servicio Social' },
    { value: 'Veterinaria', text: 'Veterinaria' },
    { value: 'Agropecuaria', text: 'Agropecuaria' },
    { value: 'Arquitectura', text: 'Arquitectura' },
    { value: 'Biología', text: 'Biología' },
    { value: 'Bioquímica', text: 'Bioquímica' },
    { value: 'Comunicación Audiovisual', text: 'Comunicación Audiovisual' },
    { value: 'Construcción Civil', text: 'Construcción Civil' },
    { value: 'Electrónica', text: 'Electrónica' },
    { value: 'Farmacia', text: 'Farmacia' },
    { value: 'Gastronomia', text: 'Gastronomia' },
    { value: 'Geología', text: 'Geología' },
    { value: 'Hotelería', text: 'Hotelería' },
    { value: 'Ingeniería Civil', text: 'Ingeniería Civil' },
    { value: 'Ingeniería Industrial', text: 'Ingeniería Industrial' },
    { value: 'Mecánica', text: 'Mecánica' },
    { value: 'Metalúrgica', text: 'Metalúrgica' },
    { value: 'Periodismo', text: 'Periodismo' },
    { value: 'Publicidad', text: 'Publicidad' },
    { value: 'Seguros', text: 'Seguros' },
    { value: 'Servicios Ministeriales', text: 'Servicios Ministeriales' },
    { value: 'Telecomunicaciones', text: 'Telecomunicaciones' }
]

export const PeriodoPublicacion: PeriodoPublicacion[] = [
    { value: '1', text: 'Última Hora', selector:'1' },
    { value: '24', text: 'Últimas 24 Horas', selector:'2' },
    { value: '168', text: 'Últimos 7 dias' , selector:'3'},
    { value: '336', text: 'Últimos 14 dias', selector:'4' },
    { value: '720', text: 'Últimos 30 dias', selector:'5' }
]

export const Experiencia: Experiencia[] = [
    { value: 0 , text: 'Sin Experiencia', selector:'6', altertext: 'Sin Experiencia'},
    { value: 3 , text: '3 Meses de Experiencia', selector:'7', altertext: 'Mínimo 3 Meses' },
    { value: 6 , text: '6 Meses de Experiencia', selector:'8', altertext: 'Mínimo 6 Meses' },
    { value: 12, text: '1 Año de Experiencia' , selector:'9', altertext: 'Mínimo 1 Año' },
    { value: 36, text: '3 Años de Experiencia', selector:'10', altertext: 'Mínimo 3 Años' },
    { value: 60, text: '5 Años de Experiencia', selector:'11', altertext: 'Mínimo 5 Años' },
]
    

export const Idioma: Idioma [] = [  	
	{ value: 'Alemán'   , text: 'Alemán'    },	
	{ value: 'Árabe'    , text: 'Árabe'     },	
	{ value: 'Arameo'   , text: 'Arameo'    },	
	{ value: 'Armenio'  , text: 'Armenio'   },	
	{ value: 'Aimara'   , text: 'Aimara'    },
	{ value: 'Birmano'  , text: 'Birmano'   },	
	{ value: 'Búlgaro'  , text: 'Búlgaro'   },	
	{ value: 'Catalán'  , text: 'Catalán'   },		
	{ value: 'Checo'    , text: 'Checo'     },		
	{ value: 'Chino'    , text: 'Chino'     },
	{ value: 'Coreano'  , text: 'Coreano'   },	 
	{ value: 'Croata'   , text: 'Croata'    },	
	{ value: 'Danés'    , text: 'Danés'     },	
	{ value: 'Eslavo'   , text: 'Eslavo'    },	
	{ value: 'Español'  , text: 'Español'   },	
	{ value: 'Francés'  , text: 'Francés'   },	
	{ value: 'Galés'    , text: 'Galés'     },	
	{ value: 'Griego'   , text: 'Griego'    },
	{ value: 'Hebreo'   , text: 'Hebreo'    },
	{ value: 'Húngaro'  , text: 'Húngaro'   },	
	{ value: 'Indonesio', text: 'Indonesio' },	
	{ value: 'Inglés'   , text: 'Inglés'    },
	{ value: 'Irlandés' , text: 'Irlandés'  },	
	{ value: 'Islandés' , text: 'Islandés'  },	
	{ value: 'Italiano' , text: 'Italiano'  },	
	{ value: 'Japonés'  , text: 'Japonés'   },	
	{ value: 'Judeo'    , text: 'Judeo'     },	
	{ value: 'Latín'    , text: 'Latín'     },	
    { value: 'Noruego'  , text: 'Noruego'   },
	{ value: 'Portugués', text: 'Portugués' },
	{ value: 'Quechua'  , text: 'Quechua'   },
	{ value: 'Rumano'   , text: 'Rumano'    },	
	{ value: 'Ruso'     , text: 'Ruso'      },	
	{ value: 'Sueco'    , text: 'Sueco'     },		
	{ value: 'Turco'    , text: 'Turco'     },	
	{ value: 'Ucraniano', text: 'Ucraniano' }	
] 
	
export const NivelIdioma: NivelIdioma [] = [
	{ value: 'Básico', text: 'Básico' },
    { value: 'Intermedio', text: 'Intermedio' },
    { value: 'Avanzado', text: 'Avanzado' },
	{ value: 'Nativo', text: 'Nativo' }		
]

export const NivelGeneral: NivelGeneral [] = [
	{ value: 'Básico', text: 'Básico' },
    { value: 'Intermedio', text: 'Intermedio' },
    { value: 'Avanzado', text: 'Avanzado' },
]

export const MesPeriodo: MesPeriodo [] = [
	{ value: 'Enero'    ,   text: 'Enero' },
    { value: 'Febrero'  ,   text: 'Febrero' },
    { value: 'Marzo'    ,   text: 'Marzo' },
    { value: 'Abril'    ,   text: 'Abril'  },
    { value: 'Mayo'     ,   text: 'Mayo'    },
    { value: 'Junio'    ,   text: 'Junio'   },
    { value: 'Julio'    ,   text: 'Julio'   },
    { value: 'Agosto'   ,   text: 'Agosto'   },
    { value: 'Septiembre',  text: 'Septiembre'},
    { value: 'Octubre'  ,   text: 'Octubre'  },
    { value: 'Noviembre',   text: 'Noviembre' },
    { value: 'Diciembre',   text: 'Diciembre' }
]

export const NivelEstudio: NivelEstudio [] = [
    { value: 'Educación Primaria', text: 'Educación Primaria'},
    { value: 'Educación Secundaria', text: 'Educación Secundaria'},
    { value: 'Técnico', text: 'Técnico'},
    { value: 'Universitario', text: 'Universitario'},
    { value: 'Maestría', text: 'Maestría'},
    { value: 'Doctorado', text: 'Doctorado'}

]
               
export const EstadoEstudio: EstadoEstudio [] = [
    { value: 'Culminado', text: 'Culminado'},
    { value: 'Cursando', text: 'Cursando'},
    { value: 'Trunco', text: 'Trunco'}
]