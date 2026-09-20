export interface MediaStore { upload(image: Buffer, filename: string): Promise<string>; }
export class CloudinaryMediaStore implements MediaStore { async upload(_image: Buffer, filename: string) { return filename; } }
