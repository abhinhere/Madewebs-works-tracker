'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function deleteProject(projectId: string) {
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (error) {
    console.error("Error deleting project:", error);
    return { error: error.message };
  }
  revalidatePath('/projects');
  revalidatePath('/');
  revalidatePath('/domains');
  return { success: true };
}

export async function revalidateProjects() {
  revalidatePath('/projects');
  revalidatePath('/');
  revalidatePath('/domains');
}
