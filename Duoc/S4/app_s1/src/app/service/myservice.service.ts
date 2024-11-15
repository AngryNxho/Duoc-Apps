import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection, CapacitorSQLite } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DbTaskService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    // Inicializamos SQLiteConnection
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  // Inicializar la base de datos y crear la tabla
  async initializeDatabase() {
    if (Capacitor.isNativePlatform()) {
      try {
        // Creación de conexión y asignación a `db`
        this.db = await this.sqlite.createConnection(
          'skeletonapp.db',
          false,
          'no-encryption',
          1,
          false // Parámetro 'readonly' agregado como false
        );

        if (this.db) {
          await this.db.open();

          // Crear tabla si no existe
          await this.db.execute(`
            CREATE TABLE IF NOT EXISTS sesion_data (
              user_name TEXT PRIMARY KEY NOT NULL,
              password INTEGER NOT NULL,
              active INTEGER NOT NULL
            );
          `);

          console.log('Base de datos inicializada y tabla creada');
        } else {
          console.error('No se pudo crear la conexión a la base de datos.');
        }
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
      }
    } else {
      console.warn('SQLite solo está disponible en plataformas móviles.');
    }
  }

  // Función para insertar un usuario
  async insertUser(userName: string, password: number) {
    if (this.db) {
      const query = `
        INSERT INTO sesion_data (user_name, password, active)
        VALUES (?, ?, 0)
      `;
      await this.db.run(query, [userName, password]);
      console.log('Usuario registrado exitosamente');
    } else {
      console.error('La base de datos no está inicializada.');
    }
  }

  // Función para obtener un usuario
  async getUser(userName: string, password: number) {
    if (this.db) {
      const query = `
        SELECT * FROM sesion_data
        WHERE user_name = ? AND password = ?
      `;
      const result = await this.db.query(query, [userName, password]);
      return result?.values && result.values.length > 0 ? result.values[0] : null;
    } else {
      console.error('La base de datos no está inicializada.');
      return null;
    }
  }

  // Cerrar la conexión de la base de datos
  async closeConnection() {
    if (this.db) {
      await this.db.close();
      await this.sqlite.closeConnection('skeletonapp.db', false); // Agregamos el parámetro 'readonly' como false
      this.db = null;
    } else {
      console.warn('No hay conexión de base de datos para cerrar.');
    }
  }
}
