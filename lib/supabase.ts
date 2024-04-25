import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./constants";

export class Supabase {
  private static client: SupabaseClient<any, "public", any> | undefined;

  private constructor() {
    // 외부에서 인스턴스 생성을 방지하기 위해 private 생성자 사용
  }

  public static getClient(publicKey: string) {
    if (!Supabase.client) {
      Supabase.client = createClient(SUPABASE_URL, publicKey);
    }
    return Supabase.client;
  }
}
