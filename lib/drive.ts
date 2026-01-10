const DRIVE_API_KEY = process.env.DRIVE_API_KEY;

export type DrivePDF = {
  id: string;
  name: string;
  createdTime: string;
};

const DRIVE_FOLDERS: Record<string, string> = {
  turkce: process.env.DRIVE_FOLDERS_TURKCE || "turkce_folder_id",
  tarih: process.env.DRIVE_FOLDERS_TARIH || "tarih_folder_id",
  cografya: process.env.DRIVE_FOLDERS_COGRAFYA || "cografya_folder_id",
  vatandaslik: process.env.DRIVE_FOLDERS_VATANDASLIK || "vatandaslik_folder_id",
};

export async function fetchPDFsByLesson(slug: string): Promise<DrivePDF[]> {
  const folderId = DRIVE_FOLDERS[slug];
  console.log(slug, folderId);
  if (!folderId) {
    throw new Error("Bu ders icin Drive klasoru tanimli degil");
  }

  const query = encodeURIComponent(
    `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`
  );

  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,createdTime)&key=${DRIVE_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Drive API istegi basarisiz");
  }

  const data = await res.json();
  return data.files;
}
