import type { EducationContent } from '../types/education';

export const EDUCATION_CONTENT: EducationContent[] = [
  {
    id: 'edu_001',
    title: '¿Qué es la Diabetes Tipo 2?',
    content: `La diabetes tipo 2 es una condición crónica donde el cuerpo no usa adecuadamente la insulina o no produce suficiente. Esta hormona permite que las células utilicen la glucosa (azúcar) de los alimentos como energía.

**Factores de Riesgo:**
- Sobrepeso u obesidad
- Antecedentes familiares
- Sedentarismo
- Dieta alta en carbohidratos procesados

**Síntomas Comunes:**
- Aumento de sed y hambre
- Fatiga
- Visión borrosa
- Cicatrización lenta

El diagnóstico temprano y el manejo adecuado son clave para mantener una buena calidad de vida.`,
    type: 'article',
    duration: '8 min',
    level: 'basic',
    tags: ['diabetes', 'básico', 'introducción']
  },
  {
    id: 'edu_002',
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
- Agrega en porciones moderadas`,
    type: 'interactive',
    duration: '10 min',
    level: 'basic',
    tags: ['nutrición', 'plato', 'porciones']
  },
  {
    id: 'edu_003',
    title: 'Entendiendo el Índice Glucémico',
    content: `El Índice Glucémico (IG) mide qué tan rápido un alimento eleva tu glucosa en sangre.

**IG Bajo (0-55) - Verde:**
- Liberación lenta de glucosa
- Mayor saciedad
- Mejor control glucémico
- Ejemplos: manzana, quinua, lentejas

**IG Medio (56-69) - Amarillo:**
- Liberación moderada
- Consumir con moderación
- Combinar con proteínas
- Ejemplos: arroz integral, pan integral

**IG Alto (70+) - Rojo:**
- Liberación rápida
- Picos de glucosa
- Evitar o consumir muy ocasionalmente
- Ejemplos: azúcar blanca, pan blanco, golosinas

Recuerda: el IG es una herramienta, pero también importa la porción y cómo combinas los alimentos.`,
    type: 'article',
    duration: '12 min',
    level: 'intermediate',
    tags: ['índice glucémico', 'carbohidratos', 'glucosa']
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

**Recomendaciones:**
- 150 minutos semanales de ejercicio moderado
- Combinar cardio y fuerza
- Caminar, nadar, bicicleta
- Entrenamiento con pesas 2-3 veces/semana

**Consideraciones:**
- Monitorear glucosa antes y después
- Mantenerse hidratado
- Tener snack a mano por si baja la glucosa
- Consultar con médico antes de empezar`,
    type: 'article',
    duration: '7 min',
    level: 'basic',
    tags: ['ejercicio', 'actividad física', 'salud']
  },
  {
    id: 'edu_005',
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
- Portionar snacks`,
    type: 'interactive',
    duration: '15 min',
    level: 'intermediate',
    tags: ['planificación', 'menú', 'organización']
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

