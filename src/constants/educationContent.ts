import type { EducationContent } from '../types/education';

export const EDUCATION_CONTENT: EducationContent[] = [
  // Nivel Básico
  {
    id: 'edu_001',
    title: '¿Qué es la Diabetes Tipo 2?',
    content: `La diabetes tipo 2 es una condición crónica donde el cuerpo no usa adecuadamente la insulina o no produce suficiente. Esta hormona permite que las células utilicen la glucosa (azúcar) de los alimentos como energía.

**¿Qué es la insulina?**
La insulina es una hormona producida por el páncreas que actúa como una llave que permite a la glucosa entrar en las células para ser usada como energía. En la diabetes tipo 2, las células se vuelven resistentes a la insulina o el páncreas no produce suficiente.

**Factores de Riesgo:**
- Sobrepeso u obesidad
- Antecedentes familiares
- Sedentarismo
- Dieta alta en carbohidratos procesados
- Edad avanzada (más de 45 años)
- Hipertensión
- Niveles altos de colesterol

**Síntomas Comunes:**
- Aumento de sed y hambre
- Fatiga
- Visión borrosa
- Cicatrización lenta
- Infecciones frecuentes
- Pérdida de peso inexplicable

**Diagnóstico:**
La diabetes se diagnostica mediante pruebas de glucosa en sangre:
- Glucosa en ayunas ≥ 126 mg/dL
- Glucosa 2 horas después de comer ≥ 200 mg/dL
- Hemoglobina glicosilada (HbA1c) ≥ 6.5%

El diagnóstico temprano y el manejo adecuado son clave para mantener una buena calidad de vida.`,
    type: 'article',
    duration: '10 min',
    level: 'basic',
    tags: ['diabetes', 'básico', 'introducción', 'diagnóstico']
  },
  {
    id: 'edu_002',
    title: 'Conceptos Básicos de Nutrición',
    content: `Entender los nutrientes es fundamental para manejar la diabetes tipo 2.

**Carbohidratos:**
Los carbohidratos tienen el mayor impacto en los niveles de glucosa. Se dividen en:
- Simples: Azúcares (frutas, leche, golosinas)
- Complejos: Almidones y fibra (granos, vegetales, legumbres)

**Proteínas:**
Ayudan a mantener la masa muscular y tienen poco impacto en la glucosa.
- Animales: Carne, pescado, huevos, productos lácteos
- Vegetales: Frijoles, lentejas, nueces, tofu

**Grasas:**
Son importantes para la absorción de vitaminas y saciedad.
- Saturadas: Mantequilla, carne roja (limitar)
- Insaturadas: Aceite de oliva, aguacate, nueces (preferir)
- Trans: Margarina, alimentos procesados (evitar)

**Fibra:**
Ralentiza la absorción de azúcar y mejora el control glucémico.
- Soluble: Avena, manzanas, frijoles
- Insoluble: Vegetales verdes, nueces

**Vitaminas y Minerales:**
Esenciales para funciones corporales. Una dieta variada suele proporcionar suficientes.`,
    type: 'article',
    duration: '12 min',
    level: 'basic',
    tags: ['nutrición', 'básico', 'carbohidratos', 'proteínas']
  },
  {
    id: 'edu_003',
    title: 'El Plato Saludable',
    content: `El método del plato saludable te ayuda a planificar comidas balanceadas:

**50% del plato - Verduras sin almidón:**
- Espinacas, brócoli, zanahorias
- Pimientos, coliflor, lechuga
- Estas aportan fibra y nutrientes sin elevar mucho la glucosa

**25% del plato - Proteínas magras:**
- Pollo, pescado, pavo
- Legumbres, huevos, tofu
- Aportan saciedad y ayudan a mantener masa muscular

**25% del plato - Carbohidratos complejos:**
- Quinua, arroz integral, camote
- Avena, cebada
- Elige granos integrales con fibra

**Grasas saludables:**
- Aceite de oliva, palta, nueces
- Agrega en porciones moderadas

**Bebidas:**
- Agua (preferida)
- Té sin azúcar
- Café sin azúcar
- Evita refrescos y jugos`,
    type: 'interactive',
    duration: '10 min',
    level: 'basic',
    tags: ['nutrición', 'plato', 'porciones', 'básico']
  },
  {
    id: 'edu_004',
    title: 'Ejercicio y Diabetes',
    content: `La actividad física es uno de los pilares del manejo de diabetes.

**Beneficios del Ejercicio:**
- Mejora la sensibilidad a la insulina
- Ayuda a mantener peso saludable
- Reduce riesgo cardiovascular
- Mejora el ánimo y energía
- Ayuda a controlar la presión arterial

**Recomendaciones:**
- 150 minutos semanales de ejercicio moderado
- Combinar cardio y fuerza
- Caminar, nadar, bicicleta
- Entrenamiento con pesas 2-3 veces/semana

**Consideraciones:**
- Monitorear glucosa antes y después
- Mantenerse hidratado
- Tener snack a mano por si baja la glucosa
- Consultar con médico antes de empezar

**Ejercicios Seguros:**
- Caminata rápida
- Natación
- Yoga
- Ejercicios de resistencia con peso corporal`,
    type: 'article',
    duration: '8 min',
    level: 'basic',
    tags: ['ejercicio', 'actividad física', 'salud', 'básico']
  },
  
  // Nivel Intermedio
  {
    id: 'edu_005',
    title: 'Entendiendo el Índice Glucémico',
    content: `El Índice Glucémico (IG) mide qué tan rápido un alimento eleva tu glucosa en sangre.

**IG Bajo (0-55) - Verde:**
- Liberación lenta de glucosa
- Mayor saciedad
- Mejor control glucémico
- Ejemplos: manzana, quinua, lentejas, frijoles, avena

**IG Medio (56-69) - Amarillo:**
- Liberación moderada
- Consumir con moderación
- Combinar con proteínas
- Ejemplos: arroz integral, pan integral, plátano

**IG Alto (70+) - Rojo:**
- Liberación rápida
- Picos de glucosa
- Evitar o consumir muy ocasionalmente
- Ejemplos: azúcar blanca, pan blanco, papas, arroz blanco

**Factores que afectan el IG:**
- Procesamiento: Alimentos más procesados tienen IG más alto
- Fibra: Más fibra = IG más bajo
- Grasa y proteína: Ralentizan la absorción
- Temperatura: Alimentos calientes pueden tener IG más alto

**Carga Glucémica (CG):**
Combina IG con cantidad de carbohidratos:
CG = (IG × Carbohidratos por porción) / 100
- Baja: < 10
- Media: 11-19
- Alta: > 20`,
    type: 'article',
    duration: '15 min',
    level: 'intermediate',
    tags: ['índice glucémico', 'carbohidratos', 'glucosa', 'intermedio']
  },
  {
    id: 'edu_006',
    title: 'Planificación de Comidas',
    content: `Planificar tus comidas es clave para un buen control glucémico.

**Tips de Planificación:**
1. Prepara snacks saludables
2. Cocina en batch los fines de semana
3. Ten lista de comidas favoritas balanceadas
4. Lee etiquetas nutricionales
5. Usa el semáforo nutricional como guía

**Ejemplo de Día:**
- Desayuno: Avena + palta + huevo
- Snack: Manzana + nueces
- Almuerzo: Ensalada + quinua + pollo
- Snack: Yogur con semillas
- Cena: Pescado + verduras al vapor + camote

**Preparación:**
- Dedica 2 horas el domingo
- Pre-cortar verduras
- Cocinar proteínas y granos
- Portionar snacks

**Control de Porciones:**
- Usa tu mano como guía:
  * Puño: Carbohidratos
  * Palma: Proteínas
  * Pulgar: Grasas
  * Dos puños: Vegetales

**Comer Fuera:**
- Elige restaurantes con opciones saludables
- Pide aderezos al lado
- Controla porciones
- Lleva snacks de respaldo`,
    type: 'interactive',
    duration: '18 min',
    level: 'intermediate',
    tags: ['planificación', 'menú', 'organización', 'intermedio']
  },
  {
    id: 'edu_007',
    title: 'Monitoreo de Glucosa',
    content: `Monitorear tu glucosa es esencial para entender cómo tu cuerpo responde a alimentos y ejercicio.

**Cuándo Medir:**
- En ayunas (antes de desayunar)
- Antes de comer
- 1-2 horas después de comer
- Antes de dormir
- Antes y después de ejercicio
- Cuando te sientas mal

**Valores Objetivo:**
- En ayunas: 80-130 mg/dL
- 1-2 horas después de comer: < 180 mg/dL
- Antes de dormir: 100-140 mg/dL

**Factores que Afectan la Glucosa:**
- Alimentos: Carbohidratos elevan, proteínas y grasas moderan
- Ejercicio: Generalmente baja la glucosa
- Estrés: Puede elevar la glucosa
- Enfermedad: Eleva la glucosa
- Medicamentos: Pueden afectar los niveles

**Registrar Resultados:**
- Lleva un diario de mediciones
- Anota lo que comiste y cuándo
- Registra ejercicio y medicamentos
- Busca patrones y compártelos con tu médico

**Tecnología:**
- Medidores de glucosa
- Sistemas continuos de monitoreo (CGM)
- Apps para registrar datos`,
    type: 'article',
    duration: '14 min',
    level: 'intermediate',
    tags: ['monitoreo', 'glucosa', 'medición', 'intermedio']
  },
  {
    id: 'edu_008',
    title: 'Manejo del Estrés y Sueño',
    content: `El estrés y la falta de sueño pueden afectar significativamente el control de la glucosa.

**Estrés y Glucosa:**
- Las hormonas del estrés elevan la glucosa
- El estrés crónico dificulta el control
- Técnicas de relajación son esenciales

**Técnicas de Relajación:**
- Respiración profunda
- Meditación
- Yoga
- Caminatas al aire libre
- Escuchar música relajante
- Baños calientes

**Sueño y Diabetes:**
- Dormir 7-9 horas por noche
- La falta de sueño afecta la sensibilidad a la insulina
- Puede aumentar el apetito y antojos

**Consejos para Mejor Sueño:**
- Mantén horarios regulares
- Evita cafeína 6 horas antes de dormir
- Crea un ambiente oscuro y fresco
- Limita pantallas antes de dormir
- Ejercicio regular (pero no cerca de dormir)
- Relájate antes de acostarte

**Impacto en la Diabetes:**
- Mejor control glucémico
- Menos antojos
- Mayor energía
- Mejor estado de ánimo
- Reducción de complicaciones`,
    type: 'article',
    duration: '12 min',
    level: 'intermediate',
    tags: ['estrés', 'sueño', 'salud mental', 'intermedio']
  },
  
  // Nivel Avanzado
  {
    id: 'edu_009',
    title: 'Complicaciones de la Diabetes',
    content: `Conocer las posibles complicaciones ayuda a prevenirlas con un buen control.

**Complicaciones Agudas:**
- Hipoglucemia (glucosa baja < 70 mg/dL)
- Hiperglucemia (glucosa alta > 180 mg/dL)
- Cetoacidosis diabética (más común en tipo 1)
- Estado hiperglucémico hiperosmolar (más común en tipo 2)

**Complicaciones Crónicas:**
- Cardiovasculares: Enfermedad del corazón, derrame cerebral
- Neuropatía: Daño nervioso, especialmente en pies
- Nefropatía: Daño renal
- Retinopatía: Problemas de visión
- Problemas circulatorios: Heridas que sanan mal

**Prevención:**
- Mantener glucosa en rango objetivo
- Controlar presión arterial y colesterol
- Exámenes médicos regulares
- Cuidado de pies
- No fumar
- Ejercicio regular

**Señales de Alerta:**
- Visión borrosa persistente
- Entumecimiento o dolor en pies/manos
- Heridas que no sanan
- Infecciones frecuentes
- Cambios en la micción

**Importancia del Control:**
- Cada 1% que reduces tu HbA1c, reduces 35% el riesgo de complicaciones
- El control temprano es clave`,
    type: 'article',
    duration: '16 min',
    level: 'advanced',
    tags: ['complicaciones', 'prevención', 'salud', 'avanzado']
  },
  {
    id: 'edu_010',
    title: 'Medicamentos para Diabetes',
    content: `Existen varios tipos de medicamentos para manejar la diabetes tipo 2.

**Metformina:**
- Primer medicamento recomendado
- Reduce producción de glucosa en hígado
- Mejora sensibilidad a insulina
- Efectos secundarios: Náuseas, diarrea (mejoran con el tiempo)

**Sulfonilureas:**
- Estimulan producción de insulina
- Ejemplos: Glimepirida, Glipizida
- Riesgo de hipoglucemia

**Inhibidores de DPP-4:**
- Ayudan a mantener niveles de hormonas que estimulan insulina
- Ejemplos: Sitagliptina, Saxagliptina
- Menos riesgo de hipoglucemia

**GLP-1 Receptor Agonistas:**
- Ralentizan vaciamiento gástrico
- Estimulan producción de insulina
- Ayudan a perder peso
- Ejemplos: Liraglutida, Semaglutida

**SGLT2 Inhibidores:**
- Hacen que el riñón elimine glucosa por orina
- Ayudan a perder peso y reducir presión
- Ejemplos: Empagliflozina, Dapagliflozina

**Insulina:**
- Usada cuando otros medicamentos no son suficientes
- Varios tipos: Rápida, intermedia, larga duración

**Importante:**
- Nunca cambies dosis sin consultar a tu médico
- Conoce los efectos secundarios de tus medicamentos
- Lleva lista de medicamentos actualizada`,
    type: 'article',
    duration: '18 min',
    level: 'advanced',
    tags: ['medicamentos', 'tratamiento', 'farmacología', 'avanzado']
  },
  {
    id: 'edu_011',
    title: 'Nutrición Avanzada para Diabetes',
    content: `Conceptos avanzados de nutrición para un control óptimo.

**Cetogénesis y Diabetes:**
- Dietas bajas en carbohidratos pueden mejorar el control
- Requieren monitoreo médico cercano
- Pueden reducir necesidad de medicamentos
- Riesgos y beneficios deben evaluarse individualmente

**Ayuno Intermitente:**
- Puede mejorar sensibilidad a insulina
- Distintos métodos: 16:8, 5:2
- Requiere supervisión médica
- No recomendado para todos

**Microbioma Intestinal:**
- Bacterias intestinales afectan metabolismo
- Fibra alimenta bacterias beneficiosas
- Probióticos y prebióticos pueden ayudar
- Diversidad de alimentos mejora microbioma

**Suplementos:**
- Cromo: Puede mejorar sensibilidad a insulina
- Magnesio: Deficiencia común en diabéticos
- Vitamina D: Importante para metabolismo
- Omega-3: Para salud cardiovascular
- Consulta con médico antes de tomar suplementos

**Personalización Nutricional:**
- Respuestas a alimentos varían entre personas
- Factores genéticos, estilo de vida, microbioma
- Nutrición personalizada es el futuro
- Tecnología puede ayudar a identificar respuestas individuales`,
    type: 'article',
    duration: '20 min',
    level: 'advanced',
    tags: ['nutrición avanzada', 'dietas especiales', 'suplementos', 'avanzado']
  },
  
  // Ejercicios (ya existentes, mejorados)
  {
    id: 'edu_012',
    title: 'Ejercicios para Diabetes - Cardio',
    content: `Los ejercicios cardiovasculares son esenciales para el manejo de la diabetes. Aquí tienes una rutina completa:

**Calentamiento (5 minutos):**
- Caminata ligera en el lugar
- Movimientos de brazos y piernas
- Estiramientos suaves

**Rutina Principal (20 minutos):**
- Caminata rápida o trote suave (10 minutos)
- Ejercicios de bajo impacto como bicicleta estática o elíptica
- Ejercicios de resistencia con peso corporal (sentadillas, estocadas)

**Enfriamiento (5 minutos):**
- Caminata lenta
- Estiramientos estáticos

**Recomendaciones:**
- Comienza con 15-20 minutos y aumenta gradualmente
- Monitorea tu glucosa antes y después
- Mantén una intensidad moderada (puedes hablar mientras ejercitas)
- Hidrátate adecuadamente`,
    type: 'video',
    duration: '30 min',
    level: 'basic',
    tags: ['ejercicio', 'cardio', 'video', 'básico']
  },
  {
    id: 'edu_013',
    title: 'Ejercicios de Fuerza para Diabetes',
    content: `Los ejercicios de fuerza ayudan a mejorar la sensibilidad a la insulina y mantener masa muscular.

**Rutina de Cuerpo Completo (30 minutos):**
- Sentadillas con peso corporal (3 series de 12-15 repeticiones)
- Flexiones de brazos modificadas (3 series de 8-12 repeticiones)
- Zancadas alternas (3 series de 10 repeticiones por pierna)
- Plancha abdominal (3 series de 30-60 segundos)
- Remo con banda elástica (3 series de 12-15 repeticiones)
- Press de hombros con mancuernas ligeras (3 series de 10-12 repeticiones)

**Consejos:**
- Descansa 30-60 segundos entre series
- Comienza con pesos ligeros o solo peso corporal
- Mantén buena forma durante los ejercicios
- Realiza 2-3 sesiones por semana con días de descanso intermedios`,
    type: 'video',
    duration: '35 min',
    level: 'intermediate',
    tags: ['ejercicio', 'fuerza', 'video', 'entrenamiento']
  },
  {
    id: 'edu_014',
    title: 'Yoga para Diabetes',
    content: `El yoga puede ayudar a reducir el estrés, mejorar la flexibilidad y controlar la glucosa.

**Secuencia de Yoga Suave (25 minutos):**
- Saludo al sol (5 repeticiones)
- Postura del perro mirando hacia abajo
- Warrior I y II
- Postura del árbol
- Postura del guerrero
- Postura del puente
- Postura del niño
- Meditación guiada (5 minutos)

**Beneficios:**
- Reduce el estrés y la ansiedad
- Mejora la circulación
- Aumenta la conciencia corporal
- Ayuda con el control emocional de la diabetes

**Recomendaciones:**
- Practica en un espacio cómodo y silencioso
- Usa un tapete antideslizante
- Escucha a tu cuerpo y no fuerces las posturas
- Combina con respiración consciente`,
    type: 'video',
    duration: '25 min',
    level: 'basic',
    tags: ['yoga', 'relajación', 'video', 'flexibilidad']
  },
  {
    id: 'edu_015',
    title: 'Ejercicios de Flexibilidad',
    content: `Mantener la flexibilidad es importante para la movilidad y prevención de lesiones.

**Rutina de Estiramientos (20 minutos):**
- Estiramiento de cuello y hombros
- Estiramiento de brazos y muñecas
- Estiramiento de espalda
- Estiramiento de caderas y muslos
- Estiramiento de pantorrillas y tobillos
- Rotaciones de tobillos y muñecas

**Técnicas:**
- Mantén cada estiramiento 15-30 segundos
- Respira profundamente durante los estiramientos
- No rebotes ni fuerces las posturas
- Siente una tensión suave, no dolor

**Cuándo hacerlos:**
- Después del calentamiento
- Al finalizar tu rutina de ejercicios
- Durante pausas activas en el trabajo`,
    type: 'interactive',
    duration: '20 min',
    level: 'basic',
    tags: ['flexibilidad', 'estiramiento', 'movilidad', 'básico']
  }
];

/**
 * Categorías educativas
 */
export const EDUCATION_CATEGORIES = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado'
};