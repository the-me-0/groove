"use server"

import { revalidatePath } from "next/cache"

const clearCachesByServerAction = async (path?: string) => {
    try {
      if (path) {revalidatePath(path)}
      else {
        revalidatePath("/")
      }
    } catch (error) {
      console.error("clearCachesByServerAction=> ", error)
    }
  }
export default clearCachesByServerAction;