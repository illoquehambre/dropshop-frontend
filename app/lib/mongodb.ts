// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Configuración de opciones
const options = {
  tlsAllowInvalidCertificates: true, // Considerar remover en producción
};

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una conexión global para evitar problemas de múltiples conexiones
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, usa una nueva conexión cada vez
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
