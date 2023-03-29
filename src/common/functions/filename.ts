import { v4 } from 'uuid';
import { extname } from 'path';

export const generateUniqueFileName = (file: string): string => {
    const UNIQUE_ID = v4();

    const EXTENSION = extname(file);

    return `${UNIQUE_ID}${EXTENSION}`;
};
