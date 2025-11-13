import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

// Directorios
const inputDir = path.join(process.cwd(), 'src/assets/images');
const outputDir = path.join(process.cwd(), 'src/assets/images/optimized');

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = await fs.stat(inputPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    
    console.log(`Optimizando: ${path.basename(inputPath)} (${fileSizeInKilobytes.toFixed(2)} KB)`);
    
    // Optimizar imagen
    await sharp(inputPath)
      .resize(800, 600, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ quality: 80, progressive: true })
      .png({ compressionLevel: 9, progressive: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    // Obtener tamaño del archivo optimizado
    const optimizedStats = await fs.stat(outputPath);
    const optimizedSizeInKilobytes = optimizedStats.size / 1024;
    const savings = fileSizeInKilobytes - optimizedSizeInKilobytes;
    const savingsPercentage = (savings / fileSizeInKilobytes) * 100;
    
    console.log(`✓ Optimizado: ${path.basename(outputPath)} (${optimizedSizeInKilobytes.toFixed(2)} KB, ahorrado: ${savingsPercentage.toFixed(1)}%)`);
  } catch (error) {
    console.error(`Error al optimizar ${inputPath}:`, error.message);
  }
}

// Función para procesar todas las imágenes
async function processImages() {
  console.log('🚀 Iniciando optimización de imágenes...');
  
  try {
    await fs.access(inputDir);
  } catch (error) {
    console.log('⚠️  No se encontró el directorio de imágenes');
    return;
  }
  
  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No se encontraron imágenes para optimizar');
    return;
  }
  
  // Crear directorio de salida si no existe
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    // El directorio ya existe
  }
  
  console.log(`📁 Procesando ${imageFiles.length} imágenes...`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    await optimizeImage(inputPath, outputPath);
  }
  
  console.log('✅ Optimización completada');
}

// Ejecutar optimización
processImages().catch(error => {
  console.error('Error en la optimización:', error);
  process.exit(1);
});