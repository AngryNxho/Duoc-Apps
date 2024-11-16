import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection, CapacitorSQLite } from '@capacitor-community/sqlite';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DbTaskService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  // Inicializar almacenamiento interno
  public async initializeStorage(): Promise<void> {
    this.storage = await this.storageService.create();
    console.log('Almacenamiento interno inicializado');
  }

  // Inicializar base de datos SQLite
  public async initializeDatabase(): Promise<void> {
    if (Capacitor.isNativePlatform() || !Capacitor.isNativePlatform()) { // Agregado para soporte navegador
      try {
        this.db = await this.sqlite.createConnection('skeletonapp.db', false, 'no-encryption', 1, false);
        if (this.db) {
          await this.db.open();

          // Crear tabla de sesión
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

  // Registrar usuario en la base de datos
  public async insertUser(userName: string, password: number): Promise<void> {
    if (this.db) {
      const query = `
        INSERT INTO sesion_data (user_name, password, active)
        VALUES (?, ?, 0)
      `;
      try {
        await this.db.run(query, [userName, password]);
        console.log('Usuario registrado exitosamente');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    } else {
      console.error('La base de datos no está inicializada.');
    }
  }

  // Validar usuario al iniciar sesión
  public async getUser(userName: string, password: number): Promise<any | null> {
    if (this.db) {
      const query = `
        SELECT * FROM sesion_data
        WHERE user_name = ? AND password = ?
      `;
      try {
        const result = await this.db.query(query, [userName, password]);
        return result?.values && result.values.length > 0 ? result.values[0] : null;
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        return null;
      }
    } else {
      console.error('La base de datos no está inicializada.');
      return null;
    }
  }
  // Verificar si existe una sesión activa
  public async isSessionActive(): Promise<boolean> {
    if (this.db) {
      const query = `SELECT * FROM sesion_data WHERE active = 1`;
      try {
        const result = await this.db.query(query);
        // Aseguramos que siempre se retorne un booleano
        return !!(result?.values && result.values.length > 0);
      } catch (error) {
        console.error('Error al validar sesión activa:', error);
        return false;
      }
    }
    console.error('La base de datos no está inicializada.');
    return false;
  }

  // Activar sesión
  public async activateSession(userName: string): Promise<void> {
    if (this.db) {
      const query = `UPDATE sesion_data SET active = 1 WHERE user_name = ?`;
      try {
        await this.db.run(query, [userName]);
        console.log('Sesión activada');
      } catch (error) {
        console.error('Error al activar sesión:', error);
      }
    } else {
      console.error('La base de datos no está inicializada.');
    }
  }

  // Desactivar sesión
  public async deactivateSession(userName: string): Promise<void> {
    if (this.db) {
      const query = `UPDATE sesion_data SET active = 0 WHERE user_name = ?`;
      try {
        await this.db.run(query, [userName]);
        console.log('Sesión desactivada');
      } catch (error) {
        console.error('Error al desactivar sesión:', error);
      }
    } else {
      console.error('La base de datos no está inicializada.');
    }
  }

  // Guardar datos en Ionic Storage
  public async saveToStorage(key: string, value: any): Promise<void> {
    if (this.storage) {
      try {
        await this.storage.set(key, value);
        console.log(`Dato con clave ${key} guardado en almacenamiento interno`);
      } catch (error) {
        console.error('Error al guardar en almacenamiento interno:', error);
      }
    }
  }

  // Obtener datos de Ionic Storage
  public async getFromStorage(key: string): Promise<any> {
    if (this.storage) {
      try {
        return await this.storage.get(key);
      } catch (error) {
        console.error('Error al obtener datos del almacenamiento interno:', error);
        return null;
      }
    }
    return null;
  }

  // Cerrar conexión a la base de datos
  public async closeConnection(): Promise<void> {
    if (this.db) {
      try {
        await this.db.close();
        await this.sqlite.closeConnection('skeletonapp.db', false);
        this.db = null;
        console.log('Conexión cerrada');
      } catch (error) {
        console.error('Error al cerrar conexión:', error);
      }
    } else {
      console.warn('No hay conexión de base de datos para cerrar.');
    }
  }
}
