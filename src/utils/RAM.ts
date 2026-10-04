export class RAM {
    /**
     * Definimos la memoria de la aplicación
     */
    private static memory : Map<string, any>;

    /**
     * Inicializamos la memoria de la aplicación
     */
    static {
        RAM.memory = new Map<string, any>();
    }

    /**
     * Método para obtener un valor de la memoria de la aplicación
     * @param key - La clave del valor que se quiere obtener
     * @returns El valor asociado a la clave
     */
    public static get(key: string): any | undefined {
        return RAM.memory.get(key);
    }

    /**
     * Método para establecer un valor en la memoria de la aplicación
     * @param key - La clave del valor que se quiere establecer
     * @param value - El valor que se quiere establecer
     */
    public static set(key: string, value: any): void {
        RAM.memory.set(key, value);
    }

    /**
     * Método para eliminar un valor de la memoria de la aplicación
     * @param key - La clave del valor que se quiere eliminar
     */
    public static delete(key: string): void {
        RAM.memory.delete(key);
    }

    /**
     * Método para limpiar toda la memoria de la aplicación
     */
    public static clear(): void {
        RAM.memory.clear();
    }

    /**
     * Método para verificar si una clave existe en la memoria de la aplicación
     * @param key - La clave que se quiere verificar
     * @returns true si la clave existe, false en caso contrario
     */
    public static has(key: string): boolean {
        return RAM.memory.has(key);
    }

    /**
     * Método para obtener el tamaño de la memoria de la aplicación
     * @returns El número de elementos en la memoria de la aplicación
     */
    public static size(): number {
        return RAM.memory.size;
    }
}