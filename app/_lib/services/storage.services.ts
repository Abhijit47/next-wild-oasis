'use server';

import { createClient } from '@/app/_utils/supabase/server';

// type Bucket = {
//   id: string;
//   name: string;
//   owner: string;
//   file_size_limit: number | undefined;
//   allowed_mime_types: string[] | undefined;
//   created_at: string;
//   updated_at: string;
//   public: boolean;
// };

export async function allBuckets() {
  const supabase = await createClient();

  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }

  return data;
}

export async function deleteBucket(bucketId: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage.deleteBucket(bucketId);

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }
}

export async function emptyBucket(bucketId: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage.emptyBucket(bucketId);

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }
}

export async function downloadAFile(path: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage.from('bucket').download(path);

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }

  return data;
}

export async function listFiles(from: string, to: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage.from(from).list(to, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }

  return data;
}

export async function searchFileInBucket(
  from: string,
  to: string,
  query: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage.from(from).list(to, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
    search: query,
  });

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }

  return data;
}

export async function createSignedUrl(from: string, path: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(from)
    .createSignedUrl(path, 60);

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }

  return data;
}

type AssetTransformation = {
  // format:"webp"|"png"|"jpeg"|{}& string;
  format: 'origin' | ({} & string);
  height: number;
  quality: number; // 20 - 100
  resize: 'cover' | 'contain' | 'fill';
  width: number;
};

type CreateSignedUrlWithTransformation = {
  from: string;
  path: string;
  transformation?: AssetTransformation;
};

export async function createSignedUrlWithTransformation(
  params: CreateSignedUrlWithTransformation
) {
  const { from, path, transformation } = params;
  const supabase = await createClient();

  const { data } = await supabase.storage
    .from(from)
    .createSignedUrl(path, transformation?.quality || 60, {
      transform: {
        width: transformation?.width || 100,
        height: transformation?.height || 100,
        resize: transformation?.resize || 'contain',
        format: 'origin',
      },
    });

  return data;
}

export async function triggerFileDownload(from: string, to: string) {
  const supabase = await createClient();
  const { data } = await supabase.storage.from(from).createSignedUrl(to, 60, {
    download: true,
  });

  return data;
}

export async function deleteFilesInABucket(from: string, to: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage.from(from).remove([to]);

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }
}
